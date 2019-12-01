import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
//获取应用实例
const app = getApp()
// pages/confirmOrder/confirmOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAddress: false,
    hasDefault: false,
    addressData: '',
    count: 0,
    price: 0,
    payBtnStatus: true,
    Furl: app.globalData.Serverurl,
    trueprice: 0,
    totalcount: 0,
    showModal: true,
    isSelected: false,
    freeGoodsData:null,
    freeGoods: null,
    isFreeMember:'0'
  },
  //勾选用户协议
  radioChange: function () {
    this.setData({
      isSelected: !this.data.isSelected
    })
  },
  //显示协议组件
  showagreement: function () {
    this.setData({
      showModal: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      freeGoods: app.globalData.freeGoods,
      freeGoodsData: app.globalData.freeGoodsData,
      isFreeMember: app.globalData.isFreeMember  
    })
    var count=0;
    var price=0;
    for (var i = 0; i < this.data.freeGoodsData.length;i++){
      count += this.data.freeGoodsData[i].count;
      if (this.data.isFreeMember == '1' && this.data.freeGoodsData[i].isMemberGoods=='1'){
        price += this.data.freeGoodsData[i].memberPrice * this.data.freeGoodsData[i].count;
      }else{
        price += this.data.freeGoodsData[i].basePrice * this.data.freeGoodsData[i].count;
      }     
    }
    this.setData({
      totalcount: count,
      price: Number(price).toFixed(2)
    })
    console.log(this.data.freeGoods);
    console.log(this.data.freeGoodsData);
  },

  //获取地址列表
  listAddress: function () {
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    Model.listAddress(app.globalData.openId, data => {
      //有地址
      if (data.data.length > 0) {
        this.setData({
          hasAddress: true
        })
        for (let i = 0; i < data.data.length; i++) {
          data.data[i].userPrivenceNew = data.data[i].userPrivence.split(',')[0] + data.data[i].userPrivence.split(',')[1] + data.data[i].userPrivence.split(',')[2]
          //有默认地址
          if (data.data[i].type == '1') {
            this.setData({
              hasDefault: true,
              addressData: data.data[i]
            })
            break;
          } else {
            this.setData({
              hasDefault: false,
              addressData: data.data[0]
            })
          }
        }
        app.globalData.taocanGoodsData.userAddress = this.data.addressData.address;
        app.globalData.taocanGoodsData.userName = this.data.addressData.userName;
        app.globalData.taocanGoodsData.userPhone = this.data.addressData.phone;
        app.globalData.taocanGoodsData.userPrivence = this.data.addressData.userPrivence;
        this.setData({
          payBtnStatus: false
        })
      } else { //没有地址
        this.setData({
          hasAddress: false
        })
      }

      wx.hideLoading();


    }, res => { })
  },
  //选择或添加地址
  gotoaddAddress: function () {
    if (this.data.hasAddress) {
      wx.navigateTo({
        url: '../selectAddress/selectAddress',
      })
    } else {
      wx.navigateTo({
        url: '../addAddress/addAddress',
      })
    }

  },
  //下单
  downOrder: function () {
    var that = this;
    if (!this.data.isSelected) {
      wx.showToast({
        title: '请勾选花作伴商城用户协议！',
        icon: 'none'
      })
      return;
    }
    if (!this.data.hasAddress) {
      wx.showToast({
        title: '请先添加地址！',
        icon: 'none'
      })
      return;
    }
    //防止重复点击
    if (this.data.payBtnStatus) return;
    this.setData({
      payBtnStatus: true
    })
    wx.showLoading({
      title: '加载中',
    })
    var parms = {};
    parms.openId = app.globalData.openId;
    parms.userName = app.globalData.selectedAddress.userName;
    parms.userPhone = app.globalData.selectedAddress.phone;
    parms.userPrivence = app.globalData.selectedAddress.userPrivence;
    parms.userAddress = app.globalData.selectedAddress.address;
    parms.goods = app.globalData.freeGoods;
    console.log(parms);
    this.freePieceOrder(parms);
  },
  //调用下单接口
  freePieceOrder: function (parms) {
    var that = this;
    wx.request({
      url: app.globalData.Serverurl + '/wxapi/order/freePieceOrder',
      data: JSON.stringify(parms),
      method: "POST",
      header: {
        'Content-Type': 'application/json;charset=utf-8',
        'openId': app.globalData.openId,
        'Authorization': app.globalData.token
      },
      success: function (data) { //成功回调
        console.log('下单');
        console.log(data.data);
        that.setData({
          payBtnStatus: false
        })

        var out_trade_no = data.data.data;
        if (data.data.status == 200) {
          //支付
          Model.prePay('花作伴商品购买', out_trade_no, datas => {
            console.log(datas);
            wx.hideLoading();
            if (datas.status == 200) {
              //调微信支付
              that.wxPayment(datas.data);
            } else {
              wx.showToast({
                title: '付款失败！',
              })
            }

          }, res => { })
        }
      },
      fail: function (err) { //失败回调
        // console.log(err);
      },
      complete: function (res) { //执行完回调
        // console.log(res);
      }
    })
  },
  /**
   * 调用微信支付
   */
  wxPayment: function (options) {
    var that = this;

    wx.requestPayment({
      'timeStamp': options.timeStamp,
      'nonceStr': options.nonceStr,
      'package': options.package,
      'signType': options.signType,
      'paySign': options.paySign,
      'success': function (res) {
        if (res.errMsg == "requestPayment:ok") {
          //支付成功
          wx.navigateTo({
            url: '../orders/orders?optselect=listthree' + '&tag=paySucess',
          })
        }
      },
      'fail': function (res) {

      },
      'complete': function (res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    if (app.globalData.isBack) {
      wx.navigateBack({
        delta: 2
      })
    }
    if (app.globalData.selectedAddress) {
      this.setData({
        addressData: app.globalData.selectedAddress,
        hasAddress: true,
        payBtnStatus: false
      })
      app.globalData.taocanGoodsData.userAddress = this.data.addressData.address;
      app.globalData.taocanGoodsData.userName = this.data.addressData.userName;
      app.globalData.taocanGoodsData.userPhone = this.data.addressData.phone;
      app.globalData.taocanGoodsData.userPrivence = this.data.addressData.userPrivence;

    } else {
      if (app.globalData.openId) {
        this.listAddress();
      } else {
        app.getToken().then(data => {
          this.listAddress();
        })
      }
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})