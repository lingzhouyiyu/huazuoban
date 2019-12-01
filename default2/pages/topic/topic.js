import {
  Class
} from '../../commonClass/add.js';

let Model = new Class();
//获取应用实例
const app = getApp()
// pages/topic/topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getTalkCategory();
  },
  // 获取话题分类
  getTalkCategory: function () {
    Model.getTalkCategory(data => {
      // console.log(data);
      this.setData({
        topicData: data.data
      })
      wx.hideLoading();
    }, res => { })
  },
  //添加话题
  gettopic:function(e){
    var text=e.currentTarget.dataset.text;
    var id = e.currentTarget.dataset.id;
    var hastag=false;
    if (app.globalData.topicContent.length>0){
      for (let i = 0; i < app.globalData.topicContent.length; i++) {
        if (app.globalData.topicContent[i].text == text) {
          hastag=true;
          break;
        }
      }
      if (!hastag){
        app.globalData.topicContent.push({'text':text,'id':id});
       wx.switchTab({
         url: '../add/add',
       })
      }
    }else{
      app.globalData.topicContent.push({ 'text': text, 'id': id });
     
      wx.switchTab({
        url: '../add/add',
      })
    }
   
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