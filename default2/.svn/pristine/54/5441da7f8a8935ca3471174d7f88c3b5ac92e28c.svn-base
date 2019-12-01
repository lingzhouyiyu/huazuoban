import {
  Class
} from '../../commonClass/grow.js';

let Model = new Class();
// pages/growingflowers/growingflowers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Furl: getApp().globalData.Serverurl,
    flowerList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.categoryId);
    this.getCuringGoodsList(options.categoryId);
  },
  //鲜花养护列表
  getCuringGoodsList: function (categoryId) {

    Model.getCuringGoodsList(categoryId, data => {
      // console.log(data.data);
     this.setData({
       flowerList:data.data
     })
    }, res => { })
  },
  gotogrowingDetail: function (e) {
    // console.log(e)
    wx.navigateTo({
      url: '../growingDetail/growingDetail?goodsId=' + e.currentTarget.dataset.goodsid,
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

  },

})