import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
const app = getApp()
// pages/goodsCoupon/goodsCoupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hongbaoList:'123',
    goodsId:'',
    showModalStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsId: options.goodsId,
      totalPrice: options.totalPrice
    })
    wx.showLoading({
      title: '加载中',
    })
    //根据商品id查询优惠券
    this.getCouponList(options.goodsId); 
  },
  //根据商品id查询优惠券
  getCouponList: function (goodsId) {
    Model.getCouponList(goodsId, data => {
      // console.log(data);
      if (data.status == 200) {
        var temp = [];
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].maxPrice <= this.data.totalPrice) {
            temp.push(data.data[i]);
          }
        }
        this.setData({
          hongbaoList: temp
        })
      }
      wx.hideLoading();
    }, res => { })
  },
  //选择后跳转
  gotoconfirmOrder:function(e){
    var id=e.currentTarget.dataset.id;
    var temp = this.data.hongbaoList;
    for(let i=0;i<temp.length;i++){
      if(temp[i].id==id){
        app.globalData.selectedCoupon=temp[i];
        wx.navigateBack({
          delta:1
        })
        break;
      }
    }

  },
  //隐藏说明
  hideModal:function(){
    this.setData({
      showModalStatus:false
    })
  },
  //显示说明
  showModal: function () {
    this.setData({
      showModalStatus: true
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

  }
})