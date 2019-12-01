import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();
//分页参数
var limit=100;
var page=1;
var end=2;
var pageCount=0;
//计算图片总高度
var leftHight = 0;
var rightHight = 0;
var leftList = [];
var rightList = [];
// pages/mineCollect/mineCollect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapcurrent: 0,
    goodsList: null,
    windowWidth: 0,
    Furl: getApp().globalData.Serverurl,
    leftData: [],
    rightData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度   
    var winHgt = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowWidth: winWid,
      windowheight: winHgt,
    })
    //获取文章浏览足迹列表
    this.getLookHistoryList();
    //获取商品浏览足迹列表
    this.getgoodsLookList();
  },
    //获取文章浏览足迹列表
  getLookHistoryList:function(){
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.clearOut();
    Model.getLookHistoryList(limit, page, app.globalData.openId,data=>{
      console.log('文章');
      console.log(data);
      wx.hideNavigationBarLoading();
      for (var i = 0; i < data.data.length; i++) {
        // data.data[i].talkImages = data.data[i].talkImages.split(',')[0];
        if (data.data[i].hasPraise == '1') {
          data.data[i].iszan = true;
        } else {
          data.data[i].iszan = false;
        }
        data.data[i].talkImages = JSON.parse(data.data[i].talkImages);
        data.data[i].faceimg = data.data[i].talkImages[0].url;
        for (var p = 0; p < data.data[i].talkImages.length; p++) {
          data.data[i].talkImages[p].height = (data.data[i].talkImages[p].height * (that.data.windowWidth * 0.485 * 0.94)) / data.data[i].talkImages[p].width;
          data.data[i].talkImages[p].width = that.data.windowWidth * 0.485 * 0.94;
        }
      }
      pageCount = this.getPageCount(data.count, limit);
      end = 2;
      //计算图片总高度
      leftHight = data.data[0].talkImages[0].height;
      rightHight = data.data[1].talkImages[0].height;
      var temp = data.data;

      leftList.push(temp[0]);
      rightList.push(temp[1]);

      for (var j = 2; j < data.data.length; j++) {
        if (leftHight == rightHight) { //第1个item放左边
          leftList.push(temp[j]);

          leftHight = leftHight + temp[j].talkImages[0].height;
        } else if (leftHight < rightHight) {
          leftList.push(temp[j]);

          leftHight = leftHight + temp[j].talkImages[0].height;
        } else {
          rightList.push(temp[j]);

          rightHight = rightHight + temp[j].talkImages[0].height;
        }
      }
      this.setData({
        leftData: leftList,
        rightData: rightList
      })
    },res=>{});
  },
  //计算总页数
  getPageCount: function (totalCount, pageSize) {
    var p = totalCount / pageSize;
    return Math.ceil(p);
  },
  //文章详情页跳转
  gotofindDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var categoryId = e.currentTarget.dataset.categoryid;

    wx.navigateTo({
      url: '../findDetail/findDetail?id=' + id + '&categoryId=' + categoryId,
    })
  },
  //初始化数据
  clearOut: function () {
    leftHight = 0;
    rightHight = 0;
    leftList = [];
    rightList = [];
  },
  //获取商品浏览足迹列表
  getgoodsLookList: function () {
    Model.getgoodsLookList(limit, page, app.globalData.openId, data => {
      console.log('商品');
      console.log(data);
      this.setData({
        goodsList:data.data
      })
    }, res => { });
  },
  menutap: function (e) {

    this.setData({
      tapcurrent: e.currentTarget.dataset.current
    });
  },
//商品详情页跳转
  gotogoodsDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    if (type == '0') {
      wx.navigateTo({
        url: '../goodsDetailalone/goodsDetailalone?id=' + id,
      })
    } else if (type == '1') {
      wx.navigateTo({
        url: '../goodsDetail/goodsDetail?id=' + id,
      })
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
    this.clearOut();
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