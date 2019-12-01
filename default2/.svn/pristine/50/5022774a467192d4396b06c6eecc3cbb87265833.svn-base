import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();
// pages/servicefeedback/servicefeedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: '',
    phone: '',
    email: '',
  },
  //建议
  getcontext: function (e) {
    this.setData({
      context: e.detail.value
    })
  },
  //手机号
  getphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //电子邮箱
  getemail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  //提交数据
  submitData: function () {
    var context = this.data.context;
    var phone = this.data.phone;
    var email = this.data.email;
    if (!context) {
      wx.showToast({
        title: '请输入您的建议！',
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
   
    wx.showLoading({
      title: '加载中！',
    })
    // console.log(context, name, phone, email, city, company, job);
    Model.addSavesuggest(context, email, phone,data => {
      // console.log(data);
      wx.hideLoading();
      if (data.status == 200) {
        wx.showToast({
          title: '提交成功！',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      }
    }, res => { })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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