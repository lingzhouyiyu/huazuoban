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
    selectedMessage:'',
    totalPrice: 0,
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
  onLoad: function (options) {
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })

    this.setData({
      count: app.globalData.taocanGoodsDatatuan.buyCount,
      price: app.globalData.taocanGoodsDatatuan.totalPrice,
      goodsData: app.globalData.taocanGoodsDatatuan.goodsData,
      goodsId: app.globalData.taocanGoodsDatatuan.goodsId,
      selectedMessage: app.globalData.taocanGoodsDatatuan.selectedMessage,
      jiagougoodsData: app.globalData.taocanGoodsDatatuan.jiagougoodsData,
      zengsonggoodsData: app.globalData.taocanGoodsDatatuan.zengsonggoodsData,
      jiaprice: app.globalData.taocanGoodsDatatuan.jiaprice,
      jiacount: app.globalData.taocanGoodsDatatuan.jiagougoodsData.length,
      zengcount: app.globalData.taocanGoodsDatatuan.zengsonggoodsData.length,
      totalPrice: (app.globalData.taocanGoodsDatatuan.totalPrice * app.globalData.taocanGoodsDatatuan.buyCount + app.globalData.taocanGoodsDatatuan.jiaprice).toFixed(2)
    })

  }, 
  //获取地址列表
  listAddress: function () {

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
        app.globalData.taocanGoodsDatatuan.userAddress = this.data.addressData.address;
        app.globalData.taocanGoodsDatatuan.userName = this.data.addressData.userName;
        app.globalData.taocanGoodsDatatuan.userPhone = this.data.addressData.phone;
        app.globalData.taocanGoodsDatatuan.userPrivence = this.data.addressData.userPrivence;
        this.setData({
          payBtnStatus: false
        })
      } else {//没有地址
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
    var activityId = app.globalData.taocanGoodsDatatuan.activityId;
    var addBuyId = app.globalData.taocanGoodsDatatuan.addBuyId;
    var addBuyTitle = app.globalData.taocanGoodsDatatuan.addBuyTitle;
    var buyCount = app.globalData.taocanGoodsDatatuan.buyCount;
    var giftId = app.globalData.taocanGoodsDatatuan.giftId;
    var giftTitle = app.globalData.taocanGoodsDatatuan.giftTitle;
    var goodsId = app.globalData.taocanGoodsDatatuan.goodsId;
    var openId = app.globalData.taocanGoodsDatatuan.openId;
    var orderType = app.globalData.taocanGoodsDatatuan.orderType;    
    var userAddress = app.globalData.taocanGoodsDatatuan.userAddress;
    var userName = app.globalData.taocanGoodsDatatuan.userName;
    var userPhone = app.globalData.taocanGoodsDatatuan.userPhone;
    var userPrivence = app.globalData.taocanGoodsDatatuan.userPrivence;

    var addBuyCount = this.data.jiacount;
    var giftCount = this.data.zengcount;
    var getTimeTitle = app.globalData.taocanGoodsDatatuan.getTimeTitle;
    var getTimeValue = app.globalData.taocanGoodsDatatuan.getTimeValue;
    Model.downOrderPackageGroup(getTimeTitle, getTimeValue,addBuyCount, giftCount, activityId, addBuyId, addBuyTitle, buyCount, giftId, giftTitle, goodsId, openId, orderType, userAddress, userName, userPhone, userPrivence, data => {
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

        }, res => { })
      }
    }, res => { })
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
      app.globalData.taocanGoodsDatatuan.userAddress = this.data.addressData.address;
      app.globalData.taocanGoodsDatatuan.userName = this.data.addressData.userName;
      app.globalData.taocanGoodsDatatuan.userPhone = this.data.addressData.phone;
      app.globalData.taocanGoodsDatatuan.userPrivence = this.data.addressData.userPrivence;

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