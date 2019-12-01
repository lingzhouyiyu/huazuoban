// pages/mineservice/mineservice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  //联系我们
  gotoservicecontact:function(){
    wx.navigateTo({
      url: '../servicecontact/servicecontact',
    })
  },
  //跳转我的订单
  gotoorders: function (e) {
    var that = this;
    var optselect = e.currentTarget.dataset.optselect;
    wx.navigateTo({
      url: '../orders/orders?optselect=' + optselect,
    })
  },
  //跳转建议反馈
  gotoservicefeedback:function(){
    wx.navigateTo({
      url: '../servicefeedback/servicefeedback',
    })
  },
  //企业集采
  gotocompanycollect:function(){
    wx.navigateTo({
      url: '../companycollect/companycollect',
    })
  },
  // 退款
  gotorefund: function () {
    wx.navigateTo({
      url: '../refund/refund',
    })
  },
})