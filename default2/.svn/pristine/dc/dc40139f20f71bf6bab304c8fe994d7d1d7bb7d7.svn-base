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
    chooseProduct:'',
    goodsData:'',
    couponData: '',
    hascoupon:false,
    couponprice: 0,
    trueprice: 0,
    totalPrice:0,
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
      count: app.globalData.aloneGoodsData.buyCount,
      price: app.globalData.aloneGoodsData.price,
      chooseProduct: app.globalData.aloneGoodsData.chooseProduct, 
      goodsData: app.globalData.aloneGoodsData.goodsData, 
      goodsId: app.globalData.aloneGoodsData.goodsId ,
      jiagougoodsData: app.globalData.aloneGoodsData.jiagougoodsData,
      zengsonggoodsData: app.globalData.aloneGoodsData.zengsonggoodsData,
      jiaprice: app.globalData.aloneGoodsData.jiaprice,
      jiacount: app.globalData.aloneGoodsData.jiagougoodsData.length,  
      zengcount: app.globalData.aloneGoodsData.zengsonggoodsData.length,
      totalPrice: (app.globalData.aloneGoodsData.price * app.globalData.aloneGoodsData.buyCount + app.globalData.aloneGoodsData.jiaprice).toFixed(2)
    })
  
  },
  //根据商品id查询优惠券
  getCouponList: function (goodsId) {
    var that=this;
    Model.getCouponList(goodsId, data => {
      // console.log(data);
      if (data.status == 200) {
        var temp = [];
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].maxPrice <= that.data.totalPrice) {
            temp.push(data.data[i]);
          }
        }
        // console.log(temp);
        if (temp.length==0){
          app.globalData.selectedCoupon = null;
          this.setData({
            couponData: {},
            hascoupon: false,
            couponprice: 0,
            trueprice: (this.data.totalPrice - 0).toFixed(2)
          })
        }else{
          app.globalData.selectedCoupon = temp[0];
          this.setData({
            couponData: temp[0],
            hascoupon:true,
            couponprice: temp[0].price,
            trueprice: (this.data.totalPrice - temp[0].price).toFixed(2)
          })
        }
       

      }
    }, res => { })
  },
  //跳转选择优惠券界面
  gotominecard: function () {

    wx.navigateTo({
      url: '../goodsCoupon/goodsCoupon?goodsId=' + this.data.goodsId + '&totalPrice=' + this.data.totalPrice,
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
        app.globalData.aloneGoodsData.userAddress = this.data.addressData.address;
        app.globalData.aloneGoodsData.userName = this.data.addressData.userName;
        app.globalData.aloneGoodsData.userPhone = this.data.addressData.phone;
        app.globalData.aloneGoodsData.userPrivence = this.data.addressData.userPrivence;
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
    var that=this;
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
    var buyCount = app.globalData.aloneGoodsData.buyCount;
    var chosedAttrId = app.globalData.aloneGoodsData.chosedAttrId;
    var goodsId = app.globalData.aloneGoodsData.goodsId;
    var openId = app.globalData.aloneGoodsData.openId;
    var userAddress = app.globalData.aloneGoodsData.userAddress;
    var userName = app.globalData.aloneGoodsData.userName;
    var userPhone = app.globalData.aloneGoodsData.userPhone;
    var userPrivence = app.globalData.aloneGoodsData.userPrivence;
    var addBuyId = app.globalData.aloneGoodsData.addBuyId;
    var giftId = app.globalData.aloneGoodsData.giftId;
    var couponId = '';
    if (app.globalData.selectedCoupon) {
      couponId = app.globalData.selectedCoupon.id;
    }
    var addBuyCount = this.data.jiacount;
    var giftCount = this.data.zengcount;
    var addBuyTitle = app.globalData.aloneGoodsData.addBuyTitle;
    var giftTitle = app.globalData.aloneGoodsData.giftTitle;
    var getTimeTitle = app.globalData.aloneGoodsData.getTimeTitle;
    var getTimeValue = app.globalData.aloneGoodsData.getTimeValue;

    Model.downOrderSameSeries(getTimeTitle, getTimeValue,addBuyCount, giftCount, addBuyTitle,giftTitle,addBuyId,giftId,buyCount, chosedAttrId, couponId, goodsId, openId, userAddress, userName, userPhone, userPrivence, data => {
      console.log(data);
      this.setData({
        payBtnStatus: false
      })
      var out_trade_no = data.data;
      if(data.status==200){
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
    if (app.globalData.selectedCoupon) {
      this.setData({
        couponData: app.globalData.selectedCoupon,
        couponprice: app.globalData.selectedCoupon.price,
        hascoupon: true,
        trueprice: (this.data.totalPrice - app.globalData.selectedCoupon.price).toFixed(2)
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
      app.globalData.aloneGoodsData.userAddress = this.data.addressData.address;
      app.globalData.aloneGoodsData.userName = this.data.addressData.userName;
      app.globalData.aloneGoodsData.userPhone = this.data.addressData.phone;
      app.globalData.aloneGoodsData.userPrivence = this.data.addressData.userPrivence;

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