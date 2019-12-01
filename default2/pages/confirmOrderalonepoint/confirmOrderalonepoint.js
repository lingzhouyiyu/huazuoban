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
    chooseProduct: '',
    goodsData: '',
    trueprice: 0,
    totalPrice: 0,
    isselectpoint: true,//是勾选了积分选项
    needpoint: 0,//购买商品所需积分
    totalpoints: 0,//我拥有的积分
    haspoint: false, //是否显示积分选项
    usePoints:'0',//是否使用积分
    oldPrice:0,//商品原价
    showModal: true,
    isSelected: false
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
  onLoad: function(options) {
    //获取个人拥有的积分
    this.myIntegral();
    this.setData({
      count: app.globalData.aloneGoodsDatapoint.buyCount,
      price: app.globalData.aloneGoodsDatapoint.price,
      chooseProduct: app.globalData.aloneGoodsDatapoint.chooseProduct,
      goodsData: app.globalData.aloneGoodsDatapoint.goodsData,
      goodsId: app.globalData.aloneGoodsDatapoint.goodsId,
      jiagougoodsData: app.globalData.aloneGoodsDatapoint.jiagougoodsData,
      zengsonggoodsData: app.globalData.aloneGoodsDatapoint.zengsonggoodsData,
      jiaprice: app.globalData.aloneGoodsDatapoint.jiaprice,
      jiacount: app.globalData.aloneGoodsDatapoint.jiagougoodsData.length,
      zengcount: app.globalData.aloneGoodsDatapoint.zengsonggoodsData.length,
      totalPrice: (app.globalData.aloneGoodsDatapoint.price * app.globalData.aloneGoodsDatapoint.buyCount + app.globalData.aloneGoodsDatapoint.jiaprice).toFixed(2),
      needpoint: app.globalData.aloneGoodsDatapoint.needpoint,
      oldPrice: app.globalData.aloneGoodsDatapoint.oldPrice,
    })

  },

  //获取个人拥有的积分
  myIntegral: function() {
    Model.myIntegral(app.globalData.openId, data => {
      console.log('积分信息');
      console.log(data);
      this.setData({
        totalpoints: data.data
      })
      var needpoint = app.globalData.aloneGoodsDatapoint.needpoint;
      console.log('商品所需积分')
      console.log(needpoint);
      if (data.data < (needpoint*this.data.count)) {//不能用积分
        this.setData({
          haspoint: false,
          trueprice: this.data.oldPrice*this.data.count,
          usePoints:'1'
        })
      } else {//能用积分
        this.setData({
          haspoint: true,
          trueprice: this.data.totalPrice,
          usePoints: '0'
        })
      }
    }, res => {})
  },
  //获取地址列表
  listAddress: function() {

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
        app.globalData.aloneGoodsDatapoint.userAddress = this.data.addressData.address;
        app.globalData.aloneGoodsDatapoint.userName = this.data.addressData.userName;
        app.globalData.aloneGoodsDatapoint.userPhone = this.data.addressData.phone;
        app.globalData.aloneGoodsDatapoint.userPrivence = this.data.addressData.userPrivence;
        this.setData({
          payBtnStatus: false
        })
      } else { //没有地址
        this.setData({
          hasAddress: false
        })
      }
      wx.hideLoading();

    }, res => {})
  },
  //选择或添加地址
  gotoaddAddress: function() {


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
  //勾选积分
  selectpoints: function() {
    this.setData({
      isselectpoint: !this.data.isselectpoint
    })
    if (this.data.isselectpoint){
      this.setData({
        usePoints:'0',
        trueprice: this.data.totalPrice
      })
    }else{
      this.setData({
        usePoints: '1',
        trueprice: this.data.oldPrice * this.data.count
      })
    }
  },
  //下单
  downOrder: function() {
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
    var buyCount = app.globalData.aloneGoodsDatapoint.buyCount;
    var chosedAttrId = app.globalData.aloneGoodsDatapoint.chosedAttrId;
    var getTimeTitle = app.globalData.aloneGoodsDatapoint.getTimeTitle;
    var getTimeValue = app.globalData.aloneGoodsDatapoint.getTimeValue;
    var goodsId = app.globalData.aloneGoodsDatapoint.goodsId;
    var openId = app.globalData.aloneGoodsDatapoint.openId;
    var userAddress = app.globalData.aloneGoodsDatapoint.userAddress;
    var userName = app.globalData.aloneGoodsDatapoint.userName;
    var userPhone = app.globalData.aloneGoodsDatapoint.userPhone;
    var userPrivence = app.globalData.aloneGoodsDatapoint.userPrivence;
    var usePoints = this.data.usePoints;
    Model.downOrderIntegral(usePoints,buyCount, chosedAttrId, getTimeTitle, getTimeValue, goodsId, openId, userAddress, userName, userPhone, userPrivence, data => {
      console.log(data);
      this.setData({
        payBtnStatus: false
      })
      var out_trade_no = data.data;
      if (data.status == 200) {
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

        }, res => {})
      }

    }, res => {})
  },
  /**
   * 调用微信支付
   */
  wxPayment: function(options) {
    var that = this;

    wx.requestPayment({
      'timeStamp': options.timeStamp,
      'nonceStr': options.nonceStr,
      'package': options.package,
      'signType': options.signType,
      'paySign': options.paySign,
      'success': function(res) {

        if (res.errMsg == "requestPayment:ok") {
         
          //支付成功
          wx.navigateTo({
            url: '../orders/orders?optselect=listthree' + '&tag=paySucess',
          })
        }
      },
      'fail': function(res) {

      },
      'complete': function(res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
      app.globalData.aloneGoodsDatapoint.userAddress = this.data.addressData.address;
      app.globalData.aloneGoodsDatapoint.userName = this.data.addressData.userName;
      app.globalData.aloneGoodsDatapoint.userPhone = this.data.addressData.phone;
      app.globalData.aloneGoodsDatapoint.userPrivence = this.data.addressData.userPrivence;

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
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})