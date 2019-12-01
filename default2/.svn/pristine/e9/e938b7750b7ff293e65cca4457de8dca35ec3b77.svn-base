import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();
var limit = 10;
var page = 1;
var end = 2; //上拉加载当前页
var pageCount = 0;
// pages/zan/zan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Furl: getApp().globalData.Serverurl,
    zanData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      openId: options.openId
    })
    //获取粉丝列表
    this.getLikeMeList(options.openId);
    Model.talkFlowCountCancle(app.globalData.openId, data => {
      console.log('关注数量提示取消');
      console.log(data);
    }, res => { })
  },
  //获取粉丝列表
  getLikeMeList: function (openId) {
    Model.getLikeMeList(limit, page, openId, data => {
      console.log(data);
      this.setData({
        zanData: data.data
      })
    }, res => {})
  },
  //按钮点击事件
  clicks: function(e) {
    // console.log(this.data.openId, app.globalData.openId);
    if (this.data.openId != app.globalData.openId) return;
    var id = e.currentTarget.dataset.id;
    for (var i = 0; i < this.data.zanData.length; i++) {
      if (this.data.zanData[i].appletsOpenId == id) {
        if (this.data.zanData[i].hasFollow == '0') {
          this.articleFollow(id);
        } else {
          this.cancleFollow(id);
        }
      }
    }
  },
  //关注
  articleFollow: function(articleId) {
 
    Model.articleFollow(articleId, app.globalData.openId, data => {
      console.log('关注');
      console.log(data);
      this.getLikeMeList(this.data.openId);
    }, res => {})
  },
  //取消关注
  cancleFollow: function(articleId) {
    var that=this;
    wx.showModal({
      title: '系统提示',
      content: '要取消关注吗？',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          Model.cancleFollow(articleId, app.globalData.openId, data => {
            console.log('取消关注');
            console.log(data);
            that.getLikeMeList(that.data.openId);
          }, res => { })
        }
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