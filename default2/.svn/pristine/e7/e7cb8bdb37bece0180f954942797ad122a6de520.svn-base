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
// pages/guanzhu/guanzhu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Furl: getApp().globalData.Serverurl,
    guanzhuData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId:options.openId
    })
    //获取关注列表
    this.getUserFollowList(options.openId);
  },
  //获取关注列表
  getUserFollowList: function (openId){
    Model.getUserFollowList(limit, page, openId,data=>{
      console.log(data);
      this.setData({
        guanzhuData:data.data
      })
    },res=>{})
  },
  //按钮点击事件
  clicks:function(e){
    console.log(this.data.openId, app.globalData.openId);
    if (this.data.openId != app.globalData.openId) return;
    var that=this;
    
    wx.showModal({
      title: '提示',
      content: '要取消关注吗？',
      success(res) {
        if (res.confirm) {
          that.cancleFollow(e.currentTarget.dataset.id);
        } else if (res.cancel) {
          
        }
      }
    })
  },
  //关注
  articleFollow: function (articleId){
    Model.articleFollow(articleId, app.globalData.openId,data=>{
      console.log('关注');
      console.log(data);
    },res=>{})
  },
  //取消关注
  cancleFollow: function (articleId) {
    Model.cancleFollow(articleId, app.globalData.openId, data => {
      console.log('取消关注');
      console.log(data);
      this.getUserFollowList();
    }, res => { })
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