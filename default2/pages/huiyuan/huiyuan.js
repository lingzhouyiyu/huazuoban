import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
const app = getApp()
// pages/huiyuan/huiyuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tophuiyuanData: [],
    huiyuanData: [],
    payBtnStatus: false,
    noticeTxt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.userTopCardList();
    //会员卡列表
    this.userCardList();
    //获取会员卡须知
    this.getById_xuzhi();
    //通知文字
    this.getShowText();
  },
  //通知文字
  getShowText: function () {
    Model.getShowText('2', data => {
      console.log(data);
      this.setData({
        noticeTxt: data.data[0].talkShow
      })
    }, res => { })
  },
  //获取会员卡须知
  getById_xuzhi: function () {
    var that=this;
    Model.getById_xuzhi('2', data => {
      console.log('会员卡须知');
      console.log(data);
      if (data.data.contexts) {
        WxParse.wxParse('contexts', 'html', data.data.contexts, that, 5);
      }
    }, res => { })
  },
  //购买会员卡
  downOrder: function() {
    var that = this;
    //防止重复点击
    if (this.data.payBtnStatus) return;
    this.setData({
      payBtnStatus: true
    })
    wx.showLoading({
      title: '加载中',
    })
    var openId = app.globalData.openId;
    var cardId = '';
    for (let i = 0; i < this.data.huiyuanData.length; i++) {
      if (this.data.huiyuanData[i].isSelected) {
        cardId = this.data.huiyuanData[i].id;
      }
    }
    if (this.data.tophuiyuanData.isSelected){
      cardId = this.data.tophuiyuanData.id;
    }
    if (!cardId) {
      wx.showToast({
        title: '请选择要购买的会员卡！',
        icon: 'none'
      })
      this.setData({
        payBtnStatus: false
      })
      return;
    }
    console.log(openId, cardId);
    Model.memberOrder(cardId, openId, data => {
      console.log(data);
      this.setData({
        payBtnStatus: false
      })
      var out_trade_no = data.data;
      if (data.status == 200) {
        //支付
        Model.freeprePay('花作伴商品购买', out_trade_no, datas => {

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
      } else if (data.status == 408){
        wx.hideLoading();
        wx.showToast({
          title: '您已经是会员身份！',
          icon:'none'
        })
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
          wx.navigateBack({
            delta:1
          })
        
        }
      },
      'fail': function(res) {

      },
      'complete': function(res) {

      }
    })
  },
  //获取顶部会员卡
  userTopCardList: function() {
    Model.userTopCardList(data => {
      console.log('获取顶部会员卡');
      console.log(data);
      data.data.isSelected = false;
      this.setData({
        tophuiyuanData: data.data
      })
    }, res => {})
  },

  //获取会员卡列表
  userCardList: function() {
    Model.userCardList(data => {
      console.log('获取会员卡列表');
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        if (i == 0){
          data.data[i].isSelected = true;
        }else{
          data.data[i].isSelected = false;
        }
        
      }
      this.setData({
        tophuiyuanData:data.data[0],
        huiyuanData: data.data
      })
    }, res => {})
  },
  //选择顶部会员卡
  topselecthuiyuan: function() {
    // return;
    // var temp = this.data.huiyuanData;
    // for (let i = 0; i < temp.length; i++) {
    //   temp[i].isSelected = false;
    // }
    // var temp1 = this.data.tophuiyuanData;
    // temp1.isSelected = !temp1.isSelected;
    
    // this.setData({
    //   huiyuanData:temp,
    //   tophuiyuanData:temp1
    // })
  },
  //选择会员卡
  selecthuiyuan: function(e) {
    var id = e.currentTarget.dataset.id;
    var temp = this.data.huiyuanData;

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id == id) {
        temp[i].isSelected = !temp[i].isSelected;
        this.setData({
          tophuiyuanData: temp[i]
        })
      } else {
        temp[i].isSelected = false;
      }
    }
    // var temp1 = this.data.tophuiyuanData;
    // temp1.isSelected = false;
    this.setData({
      huiyuanData: temp,
      // tophuiyuanData: temp1
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

  }
})