import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();
var limit = 10;
var page = 1;
var end = 2;
var pageCount = 0;
// pages/minemessage/minemessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapcurrent: 0,
    personalList: null,
    systemList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //将消息变为已读
  updateLookType: function(messageId) {
    Model.updateLookType(app.globalData.openId, messageId, data => {
      console.log('变为已读')
      console.log(data);
    }, res => {})
  },
  // 个人通知列表
  personalMessageList: function() {
    wx.showNavigationBarLoading();
    Model.personalMessageList(limit, page, app.globalData.openId, data => {
      console.log('个人通知列表')
      console.log(data);
      pageCount = this.getPageCount(data.count, limit);
      end = 2;
      this.setData({
        personalList: data.data
      })
      // 系统通知列表
      this.systemMessageList();
      wx.hideNavigationBarLoading();
    }, res => {})
  },
  // 个人通知列表加载
  personalMessageListLoad: function() {
    wx.showLoading({
      title: '加载中',
    })
    Model.personalMessageList(limit, end, app.globalData.openId, data => {
      console.log('个人通知列表')
      console.log(data);
      var temp = this.data.personalList;
      pageCount = this.getPageCount(data.count, limit);
      if (end > pageCount) {} else {
        end = end + 1;
        for (var i = 0; i < data.data.length; i++) {
          temp.push(data.data[i]);
        }
        this.setData({
          personalList: temp
        })
      }
      wx.hideLoading();


    }, res => {})
  },
  // 系统通知列表
  systemMessageList: function() {

    Model.systemMessageList(limit, page, data => {
      // console.log(data);
      this.setData({
        systemList: data.data
      })

    }, res => {})
  },
  //计算总页数
  getPageCount: function(totalCount, pageSize) {
    var p = totalCount / pageSize;
    return Math.ceil(p);
  },
  menutap: function(e) {
    this.setData({
      tapcurrent: e.currentTarget.dataset.current
    });
  },
  //评论详情
  gotocommentDetail: function(e) {
    var articleId = e.currentTarget.dataset.articleid;
    var messageId = e.currentTarget.dataset.id;
    var categoryId = e.currentTarget.dataset.categoryid;
    //变为已读
    this.updateLookType(messageId);
    if (categoryId && articleId){
      wx.navigateTo({
        url: '../findDetail/findDetail?id=' + articleId + '&categoryId=' + categoryId,
      })
    }else{
      wx.showToast({
        title: '文章已删除！',
        icon:'none'
      })
    }
    
    // wx.navigateTo({
    //   url: '../commentDetai/commentDetai?articleId=' + articleId,
    // })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (app.globalData.openId) {
      // 个人通知列表
      that.personalMessageList();
    } else {
      app.getToken().then(res => {
        // 个人通知列表
        that.personalMessageList();
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    //下拉刷新
    this.personalMessageList();
    console.log('下拉刷新');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (end > pageCount) return;
    this.personalMessageListLoad();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})