import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();
// pages/companycollect/companycollect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    company: '',
    job: ''
  },
  //需求
  getcontext: function(e) {
    this.setData({
      context: e.detail.value
    })
  },
  //姓名
  getname: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //手机号
  getphone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //电子邮箱
  getemail: function(e) {
    this.setData({
      email: e.detail.value
    })
  },
  //所在城市
  getcity: function(e) {
    this.setData({
      city: e.detail.value
    })
  },
  //公司名称
  getcompany: function(e) {
    this.setData({
      company: e.detail.value
    })
  },
  //职位
  getjob: function(e) {
    this.setData({
      job: e.detail.value
    })
  },
  //提交数据
  submitData: function() {
    var context = this.data.context;
    var name = this.data.name;
    var phone = this.data.phone;
    var email = this.data.email;
    var city = this.data.city;
    var company = this.data.company;
    var job = this.data.job;
    
    if (!context){
      wx.showToast({
        title: '请输入您的需求！',
        icon:'none'
      })
      return;
    }
    if (!name) {
      wx.showToast({
        title: '请输入您的姓名！',
        icon: 'none'
      })
      return;
    }
    if (!phone) {
      wx.showToast({
        title: '请输入您的手机号！',
        icon: 'none'
      })
      return;
    }
    if (!city) {
      wx.showToast({
        title: '请输入您所在城市！',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中！',
    })
    // console.log(context, name, phone, email, city, company, job);
    Model.addSavecompany(context, name, phone, email, city, company, job,data=>{
      // console.log(data);
      wx.hideLoading();
      if(data.status==200){
        wx.showToast({
          title: '提交成功！',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta:1
          })
        },1500)
      }
    },res=>{})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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