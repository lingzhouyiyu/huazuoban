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
    couponData: '',
    hascoupon: false,
    couponprice: 0,
    trueprice: 0,
    totalcount: 0,
    showModal: true,
    isSelected: false
  },
  //勾选用户协议
  radioChange: function() {
    this.setData({
      isSelected: !this.data.isSelected
    })
  },
  //显示协议组件
  showagreement: function() {
    this.setData({
      showModal: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      count: app.globalData.taocanGoodsData.buyCount,
      price: app.globalData.taocanGoodsData.totalPrice,
      goodsData: app.globalData.taocanGoodsData.goodsData,
      jiagougoodsData: app.globalData.taocanGoodsData.jiagougoodsData,
      zengsonggoodsData: app.globalData.taocanGoodsData.zengsonggoodsData,
      goodsprice: app.globalData.taocanGoodsData.goodsprice,
      goodsMessage: app.globalData.taocanGoodsData.goodsMessage,
      goodsId: app.globalData.taocanGoodsData.goodsId,
      totalcount: app.globalData.taocanGoodsData.buyCount + app.globalData.taocanGoodsData.jiagougoodsData.length + app.globalData.taocanGoodsData.zengsonggoodsData.length,
      jiacount: app.globalData.taocanGoodsData.jiagougoodsData.length,
      zengcount: app.globalData.taocanGoodsData.zengsonggoodsData.length,
    })

  },
  //根据商品id查询优惠券
  getCouponList: function(goodsId) {
    var that = this;
    Model.getCouponList(goodsId, data => {
      // console.log(data);

      if (data.status == 200) {
        var temp = [];
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].maxPrice <= app.globalData.taocanGoodsData.totalPrice) {
            temp.push(data.data[i]);
          }
        }
        // console.log(temp);
        if (temp.length == 0) { //没有优惠券
          app.globalData.selectedCoupon = null;
          this.setData({
            couponData: {},
            hascoupon: false,
            couponprice: 0,
            trueprice: (this.data.price - 0).toFixed(2)
          })
          // console.log('没有优惠券');
        } else { //有优惠券
          app.globalData.selectedCoupon = temp[0];
          this.setData({
            couponData: temp[0],
            hascoupon: true,
            couponprice: temp[0].price,
            trueprice: (this.data.price - temp[0].price).toFixed(2)
          })
          // console.log('有优惠券');
        }
        // console.log(this.data.couponData);
      }
    }, res => {})
  },
  //跳转选择优惠券界面
  gotominecard: function() {
    wx.navigateTo({
      url: '../goodsCoupon/goodsCoupon?goodsId=' + this.data.goodsId + '&totalPrice=' + app.globalData.taocanGoodsData.totalPrice,
    })
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
    var addBuyId = app.globalData.taocanGoodsData.addBuyId;
    var addBuyTitle = app.globalData.taocanGoodsData.addBuyTitle;
    var buyCount = app.globalData.taocanGoodsData.buyCount;
    var getTimeTitle = app.globalData.taocanGoodsData.getTimeTitle;
    var getTimeValue = app.globalData.taocanGoodsData.getTimeValue;
    var giftId = app.globalData.taocanGoodsData.giftId;
    var giftTitle = app.globalData.taocanGoodsData.giftTitle;
    var goodsId = app.globalData.taocanGoodsData.goodsId;
    var monthId = app.globalData.taocanGoodsData.monthId;
    var openId = app.globalData.taocanGoodsData.openId;
    var sendWeekTypeTitle = app.globalData.taocanGoodsData.sendWeekTypeTitle;
    var sendWeekTypeValue = app.globalData.taocanGoodsData.sendWeekTypeValue;
    var totalPrice = app.globalData.taocanGoodsData.totalPrice;
    var userAddress = app.globalData.taocanGoodsData.userAddress;
    var userName = app.globalData.taocanGoodsData.userName;
    var userPhone = app.globalData.taocanGoodsData.userPhone;
    var userPrivence = app.globalData.taocanGoodsData.userPrivence;
    var couponId = '';
    if (app.globalData.selectedCoupon) {
      couponId = app.globalData.selectedCoupon.id;
    }
    var addBuyCount = this.data.jiacount;
    var giftCount = this.data.zengcount;
    Model.downOrderPackage(addBuyCount, giftCount, couponId, addBuyId, addBuyTitle, buyCount, getTimeTitle, getTimeValue, giftId, giftTitle, goodsId, monthId, openId, sendWeekTypeTitle, sendWeekTypeValue, userAddress, userName, userPhone, userPrivence, data => {
      // console.log(data);
      this.setData({
        payBtnStatus: false
      })
      var out_trade_no = data.data;
      if (data.status == 200) {
        //支付
        Model.prePay('花作伴商品购买', out_trade_no, datas => {
          // console.log(datas);
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
    }, res => {

    })
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
            url: '../orders/orders?optselect=listthree'+'&tag=paySucess',
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
   
    if (app.globalData.isBack){
      wx.navigateBack({
        delta: 2
      })
    }
    if (app.globalData.selectedCoupon) {
      this.setData({
        couponData: app.globalData.selectedCoupon,
        couponprice: app.globalData.selectedCoupon.price,
        hascoupon: true,
        trueprice: (this.data.price - app.globalData.selectedCoupon.price).toFixed(2)
      })
    } else {
      //根据商品id查询优惠券
      this.getCouponList(app.globalData.taocanGoodsData.goodsId);
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