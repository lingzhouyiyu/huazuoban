import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();
//主订单分页参数
var limit = 100;
var page = 1;
// pages/refund/refund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    windowheight: 0,
    orderData:[],
    Furl: getApp().globalData.Serverurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度   
    var winHgt = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowWidth: winWid,
      windowheight: winHgt,
    })
    if (app.globalData.openId) {
      //订单列表
      this.orderMainList();

    } else {
      app.getToken().then(data => {
        //订单列表
        this.orderMainList();
      });
    }
  },
  //订单列表
  orderMainList: function (tag) {
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    Model.orderMainList(limit, page, app.globalData.openId, data => {
      // console.log(data.data);
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].showcontenttag = false;
        if (data.data[i].addBuyCount) {
          data.data[i].addBuyCount = parseInt(data.data[i].addBuyCount);
        } else {
          data.data[i].addBuyCount = 0;
        }
        if (data.data[i].giftCount) {
          data.data[i].giftCount = parseInt(data.data[i].giftCount);
        } else {
          data.data[i].giftCount = 0;
        }
      }
      var temp = [];
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].orderStatus == '5' || data.data[i].orderStatus == '6' || data.data[i].orderStatus == '7') {
          temp.push(data.data[i])
        }
      }
      this.setData({
        orderData: temp
      })
     
      console.log(this.data.orderData);
      wx.hideLoading();
    }, res => { })
  },
  //订单详情跳转
  gotoordersDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var orderNum = e.currentTarget.dataset.ordernum;
    wx.navigateTo({
      url: '../ordersDetail/ordersDetail?orderNum=' + orderNum,
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

  }
})