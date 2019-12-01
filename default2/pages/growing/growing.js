import {
  Class
} from '../../commonClass/grow.js';

let Model = new Class();
// pages/growing/growing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topcateData: ['鲜花','多肉植物'],
    optionselect:'0',
    windowWidth: 0,
    windowheight: 0,
    centercateData:[],
    Furl: getApp().globalData.Serverurl,
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度   
    var winHgt = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowWidth: winWid,
      windowheight: winHgt,
    })
    //获取顶部分类
    this.getTopCategory();
  },
  //获取顶部分类
  getTopCategory:function(){
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    Model.getTopCategory(data=>{
      console.log(data.data);
      this.setData({
        topcateData:data.data
      })
      this.getCenterCategory(data.data[0].danceCategoryId);
    },res=>{})
  },
  //获取中间分类
  getCenterCategory: function (categoryId) {
   
    // Model.getCenterCategory(categoryId,data => {
    //   // console.log(categoryId);
    //   console.log(data.data);
    //   // 隐藏加载框
    //   wx.hideLoading();
    //   this.setData({
    //     centercateData: data.data,
    //     isShow:true
    //   })
    // }, res => { })
    Model.getCuringGoodsList(categoryId, data => {
      console.log(data.data);
          // 隐藏加载框
      wx.hideLoading();
      this.setData({
        centercateData: data.data,
        isShow:true
      })
    }, res => { })
  },
  // 顶部选项点击
  optionselected: function (e) {
    var tap = e.currentTarget.dataset.tap;
    this.setData({
      optionselect: tap
    })
    var categoryId = e.currentTarget.dataset.cateid;

    this.getCenterCategory(categoryId);
  },
  //鲜花详情
  gotogrowingflowers: function (e) {
    // wx.navigateTo({
    //   url: '../growingflowers/growingflowers?categoryId=' + e.currentTarget.dataset.twocateid,
    // })
    wx.navigateTo({
      url: '../growingDetail/growingDetail?goodsId=' + e.currentTarget.dataset.goodsid,
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

  },
  
})