import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();
// pages/minesignin/minesignin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'2019-05',
    recordList:null,
    totalCount:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getnowTime().then(res=>{
      //获取签到列表
      this.getSignList(this.data.date, app.globalData.openId);
    });
    //获取签到总天数
    this.getSignCount();
  },
  //获取签到总天数
  getSignCount:function(){
    Model.getSignCount(app.globalData.openId,data=>{
      console.log(data);
      this.setData({
        totalCount:data.data
      })
    },res=>{})
  },
  //获取当前时间
  getnowTime:function(){
    return new Promise((resolve, reject)=>{
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;

      if (Number(month) < 10) {
        month = '0' + month;
      }
      this.setData({
        date: year + '-' + month
      })
      resolve(year + '-' + month)
    })
    
    
  },
  //查询签到列表
  getSignList: function (keytime, openId){
    wx.showLoading({
      title: '加载中',
    })
    Model.getSignList(keytime,openId,data=>{
      console.log(data);
      for(var i=0;i<data.data.length;i++){
        data.data[i].signTimenew = data.data[i].signTime.substring(5,10)
      }
      this.setData({
        recordList:data.data
      })
      wx.hideLoading();
    },res=>{})
  },
  //签到
  addSaveSign:function(){
    var that=this;
    Model.addSaveSign(app.globalData.openId,data=>{
      console.log(data);
      if (data.status==200){
        wx.showToast({
          title: '签到成功!',
        })
        //获取签到列表
        that.getSignList(that.data.date, app.globalData.openId);
      } else if (data.status == -2){
        wx.showToast({
          title: '今日已签到!',
          icon:'none'
        })
      }
    },res=>{})
  },
  bindDateChange:function(e){  
    this.setData({
      date: e.detail.value
    })
    //获取签到列表
    this.getSignList(this.data.date, app.globalData.openId);
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