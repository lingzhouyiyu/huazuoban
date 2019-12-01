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
    orderDetailData: null,
    Furl: getApp().globalData.Serverurl,
    addBuyList: [],
    giftList: [],
    wuliu:[],
    wuliuName:'中通',
    mailCode:'',
    mailNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.tag);
    if (options.tag == 'zi') {
      
      // 获取订单详情
      this.getChildOrderDetail(options.orderNum).then(data=>{
        //获取物流信息
        this.search(options.orderNum);
      });     
    } else if (options.tag == 'zhu'){
      //获取子订单订单号
      this.getChildOrderNum(options.orderId).then(data => {
        // 获取订单详情
        this.getChildOrderDetail(data).then(data => {
          //获取物流信息
          this.search(data);
        });
      });     
    }
   
  

  },
   //获取物流信息
  search: function (orderNum){
    var expCode = this.data.mailCode;//快递公司编码
    var expNum = this.data.mailNum;//物流单号
    // var expCode = 'SF';//快递公司编码
    // var expNum = '231300874177';//物流单号
     Model.search(expCode, expNum, orderNum,data=>{
       console.log('物流信息');
       console.log(data);
       var message = JSON.parse(data.data);
       var temp=[];
       for (var i = message.Traces.length-1;i>=0;i--){
         
         if (i == (message.Traces.length - 1)){
           message.Traces[i].isLast=true;
         }else{
           message.Traces[i].isLast = false;
         }
         
         temp.push(message.Traces[i]);
       }
       console.log(temp);
       this.setData({
         wuliu:temp
       })
     },res=>{});
   },
  //获取子订单详情
  getChildOrderDetail: function(orderNum) {
    return new Promise((resolve,reject)=>{
      Model.getChildOrderDetail(orderNum, data => {
        console.log('子单详情');
        console.log(data);
        //获取物流信息
        // this.search(orderNum);
        switch (data.data.mailCode) {
          case "JD":
            this.setData({
              wuliuName: '京东'
            })
            break;
          case "ZTO":
            this.setData({
              wuliuName: '中通'
            })
            break;
          case "YTO":
            this.setData({
              wuliuName: '圆通'
            })
            break;
          case "SF":
            this.setData({
              wuliuName: '顺丰'
            })
            break;
          default:
            break;
        }
        this.setData({
          orderDetailData: data.data,
          mailNum: data.data.mailNum,
          mailCode: data.data.mailCode
        })
        resolve(data.data);
      }, res => { })
    })
   
  },
  //获取子订单订单编号
  getChildOrderNum: function (orderId) {
    return new Promise((resolve, reject) => {
      Model.getChildOrderNum(orderId, data => {
        console.log('子单编号');
        console.log(data);
        if (data.status == 200) {
          // 获取订单详情
          // this.getChildOrderDetail(data.data);
        }
        resolve(data.data);
      }, res => { })
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

  }
})