import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
//获取应用实例
const app = getApp()
// pages/mineaddress/mineaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //获取地址列表
  listAddress:function(){
    Model.listAddress(app.globalData.openId,data=>{
      // console.log(data);
      for(let i=0;i<data.data.length;i++){
        data.data[i].userPrivence = data.data[i].userPrivence.split(',')[0] + data.data[i].userPrivence.split(',')[1] + data.data[i].userPrivence.split(',')[2]
      }
      this.setData({
        addressList:data.data
      })
    },res=>{})
  },
  //删除地址
  deleteAddress:function(e){
    var id=e.currentTarget.dataset.id
    Model.deleteAddress(id,data=>{
      if (data.status==200){
        wx.showToast({
          title: '删除成功！',
        })
        this.listAddress();
      }     
    },res=>{})
  },
  //设为默认
  setDefaultAddress:function(e){
    var id = e.currentTarget.dataset.id
    Model.setDefaultAddress(app.globalData.openId,id,data=>{
      if (data.status == 200) {
        wx.showToast({
          title: '设置成功！',
        })
        this.listAddress();
      }  
    },res=>{})
  },
  //添加地址
  gotoaddAddress: function () {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  //编辑地址
  gotoeditAddress: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../editAddress/editAddress?id='+id,
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
    if (app.globalData.openId) {
      this.listAddress();
    } else {
      app.getToken().then(data => {
        this.listAddress();
      })
    }
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