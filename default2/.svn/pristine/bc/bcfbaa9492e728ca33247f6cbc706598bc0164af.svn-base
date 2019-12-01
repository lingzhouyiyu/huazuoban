import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp()
// pages/gotopay/gotopay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNum:null,
    orderDetailData:null,
    Furl: getApp().globalData.Serverurl,
    addBuyList:[],
    giftList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNum: options.orderNum
    })
    //获取订单详情
    this.orderDetailByOrderNum(options.orderNum);
  },
  //获取订单详情
  orderDetailByOrderNum: function (orderNum){
    Model.orderDetailByOrderNum(orderNum,app.globalData.openId, data=>{
      console.log(data);
     
      //处理自由购订单数据
      var goodsTemp = data.data;
  
        if (goodsTemp.orderType == '5') {
    
          var goodsDataTemp = [];
          goodsTemp.gtemps = goodsTemp.goodsName.split(",");
          if (goodsTemp.gtemps != "") {
          
            for (let j = 0; j < goodsTemp.gtemps.length; j++) {
              if (goodsTemp.gtemps[j].split("|") != "") {
              
                var lastTemp = {};

                lastTemp.myImg = goodsTemp.gtemps[j].split("|")[0],
                  lastTemp.myName = goodsTemp.gtemps[j].split("|")[1],
                  lastTemp.myCount = goodsTemp.gtemps[j].split("|")[2],
                  lastTemp.myPrice = goodsTemp.gtemps[j].split("|")[3],
                  lastTemp.myTotalPrice = goodsTemp.gtemps[j].split("|")[4],
                  goodsDataTemp.push(lastTemp);
              }
            }

            goodsTemp.goodsDataTemp = goodsDataTemp;
          }

        }
      

      this.setData({
        orderDetailData: goodsTemp
      })
      console.log('主订单数据');
      console.log(this.data.orderDetailData);
      //组合加购商品信息
      if (data.data.addBuyId){        

      }
    },res=>{})
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