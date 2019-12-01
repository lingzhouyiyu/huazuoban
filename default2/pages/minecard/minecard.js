import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();

//获取应用实例
const app = getApp();

var limit = 10;
var page = 1;
var hasNextPage = false;
var nextPage = 2;
//优惠券id
var vid = '';
var tags = '';
var phonedata = '';
var courseAdvancePayment = '';
var courseId = '';
// pages/ coupon/ coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    animationData: '',
    hongbaoList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 获取优惠券列表
    this.getUserCenterCoupon();
  },

 // 获取优惠券列表
  getUserCenterCoupon:function(){
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    Model.getUserCenterCoupon(app.globalData.openId,data=>{
      console.log(data);
      this.setData({
        hongbaoList:data.data
      })
      wx.hideNavigationBarLoading();
    },res=>{})
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getUserCenterCoupon();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
  
  },

    
  myCatchTouch: function () {
    return;
  },
  //弹框函数
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

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
})