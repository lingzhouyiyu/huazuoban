import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();
var limit=10;
var page=1;
var end=2;
var pageCount=0;
// pages/minepoints/minepoints.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: null,
    userData:null,
    Furl: getApp().globalData.Serverurl,
    showModal:true
  },
  //显示积分规则
  showrule:function(){
    this.setData({
      showModal:false
    })
  },
  //隐藏积分规则
  colserule: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取我的积分
    this.getUserCenter();
    //获取商品列表
    this.getPointsGoodsList();
    //查询商品详情
    // this.pointgetGoodsById();
  },
  //获取我的积分
  getUserCenter:function(){
    Model.getUserCenter(app.globalData.openId,data=>{
      // console.log(data);
      this.setData({
        userData:data.data
      })
    },res=>{});
  },
  //获取商品列表
  getPointsGoodsList: function () {
    Model.getPointsGoodsList(limit,page, data => {
      console.log(data);
      this.setData({
        goodsList: data.data
      })
    }, res => { });
  },
  //商品详情跳转
  gotogoodsDetail: function (e) {
    var id=e.currentTarget.dataset.id;
    app.globalData.isBack = false;
    wx.navigateTo({
      url: '../goodsDetailalonepoint/goodsDetailalonepoint?id='+id,
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