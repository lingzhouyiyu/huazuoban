import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
const app = getApp()
// pages/inviteSingle/inviteSingle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parentId:'',
    activityId:'',
    goodsId:'',
    goodsType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (options.openId && options.activityId && options.teamId){
      this.setData({
        parentId: options.openId,
        activityId: options.activityId,
        teamId: options.teamId
      })
      console.log(this.data.parentId);
      console.log('活动id'+this.data.activityId);
      console.log(this.data.teamId);
      if (app.globalData.openId){
        //绑定团队上下级关系
        that.bindChallengeTeamMember(this.data.activityId, app.globalData.openId, this.data.parentId, this.data.teamId);
        //获取活动商品详情
        this.getActivityById(this.data.activityId);
      }else{
        app.getToken().then(res=>{
          //绑定团队上下级关系
          that.bindChallengeTeamMember(this.data.activityId, app.globalData.openId, this.data.parentId, this.data.teamId);
          //获取活动商品详情
          this.getActivityById(this.data.activityId);
        })
      }
     
    }
    
   //获取规则
    this.list_yaoqing();
  },
  //获取详情
  getActivityById: function (id) {
    var that = this;
    Model.getActivityById(id, data => {
      console.log('活动详情');
      console.log(data);
      this.setData({
        goodsId: data.data.goodsId,
        goodsType: data.data.goodsType
      })
     
    }, res => { })
  },
  list_yaoqing:function(){
    var that=this;
    Model.list_yaoqing(data=>{
      console.log('活动规则');
      console.log(data);
   
      WxParse.wxParse('activeDetail', 'html', data.data[0].context, that, 5);
    },res=>{});
  },
  //绑定团队上下级关系
  bindChallengeTeamMember: function (activityId, openId, parentId, teamId){
    Model.bindChallengeTeamMember(activityId, openId, parentId, teamId,data=>{
      console.log(data);
    },res=>{})
  },
//去商城购买
  gotomall:function(){
    
    if(this.data.goodsId&&this.data.goodsType){
      if (this.data.goodsType == '0') {
        console.log("单品");
        wx.navigateTo({
          url: '../goodsDetailalone/goodsDetailalone?id=' + this.data.goodsId,
         
        })
      } else if (this.data.goodsType == '1') {
        console.log("套餐");
        wx.navigateTo({
          url: '../goodsDetail/goodsDetail?id=' + this.data.goodsId,
        
        })
      }
    }
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