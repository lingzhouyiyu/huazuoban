import {
  Class
} from '../../commonClass/add.js';

let Model = new Class();
//获取应用实例
const app = getApp()
// pages/userAuth/userAuth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.tag) {
      this.setData({
        tag: options.tag
      })
    }
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      app.globalData.userInfo = e.detail.userInfo;
      // this.getSetting().then(res=>{
        if (this.data.tag == 'mine') {
          wx.switchTab({
            url: '../mine/mine'
          })
        } else if (this.data.tag == 'add') {
          wx.switchTab({
            url: '../add/add'
          })
        } else {
          wx.navigateBack({
            delta: 1
          })
        }
      // });
     
    } else {
      //用户按了拒绝按钮

    }
  },
  //保存用户信息
  getSetting: function () {
    return new Promise((resolve, reject)=>{
      var that = this;
      // 显示加载图标
      wx.showLoading({
        title: '加载中',
      })
      //判断是否授权
      wx.getSetting({
        success: res => {
          //用户信息授权
          if (res.authSetting['scope.userInfo']) { //用户已经授权
            console.log('已经授权');
            // 隐藏加载框
            wx.hideLoading();
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框         
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo;
                console.log('用户信息');
                console.log(res.userInfo);
                //更新用户信息
                Model.updateUserinfo(res.encryptedData, res.iv, app.globalData.session_key, data => {
                  console.log('更新回调');
                  console.log(data);
                  if (data.status == 200) {
                    app.getToken();
                    app.globalData.authCode = true;
                    resolve(app.globalData.authCode)
                  }
                }, fail => { });

              }
            })
          } else { //用户未授权   
            // 隐藏加载框
            wx.hideLoading();
            //跳转授权页面
            wx.navigateTo({
              url: '../userAuth/userAuth?tag=add',
            })
          }
        }
      })
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