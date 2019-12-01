import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp()
// pages/mineChallenge/mineChallenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    teamId: '',
    activityId:'',
    buyList:[],
    effectiveSize:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度   
    this.setData({
      windowWidth: winWid,
    })
    this.setData({
      teamId: options.teamId
    })
    //获取团队成员以及团信息
    this.myTeam(options.teamId);
    //购买人员信息
    this.myShareMember(options.activityId,options.teamId);
  },
   //购买人员信息
  myShareMember: function (activityId,teamId){
    Model.myShareMember(activityId,app.globalData.openId,teamId,data=>{
      console.log("购买人员信息");
      console.log(data);
      this.setData({
        buyList:data.data
      })
    },res=>{})
  },
  //获取团队成员以及团信息
  myTeam: function(teamId) {
    Model.myTeam(teamId, data => {
      console.log("获取团队成员以及团信息");
      console.log(data);
      //获取当前时间戳
      var timestamp = (new Date()).getTime();
      data.data.team.endTime = data.data.team.endTime.replace(/-/g, '/'); 
      var endTime = (new Date(data.data.team.endTime)).getTime();
      data.data.team.lessTime = Math.floor((endTime - timestamp) / 1000)
      this.setData({
        teamData: data.data.team,
        activityId: data.data.team.activityId,
        effectiveSize: data.data.team.effectiveSize
      })
      console.log(this.data.activityId);
      this.countDown();
    }, res => {})
  },
  //倒计时函数
  countDown: function() {
    let that = this;

    var timeData = this.data.teamData;

    function nowTime() { //时间函数

      var intDiff = timeData.lessTime; //获取数据中的时间戳
      // console.log(intDiff)
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;
      if (intDiff > 0) { //转换时间
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        timeData.lessTime--;
        var str = day + '天' + hour + '小时' + minute + '分' + second + '秒'
        // console.log(str)    
      } else {
        var str = "活动已结束！";
        // clearInterval(timer);
      }
      timeData.difftime = str; //在数据中添加difftime参数名，把时间放进去
      that.setData({
        teamData: timeData
      })
      // console.log(that)
    }

    nowTime();
    var timer = setInterval(nowTime, 1000);

  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    var that=this;
    var openId = app.globalData.openId;
    var shareobj = {
      title: "我的挑战",
      path: 'pages/inviteBuy/inviteBuy?openId=' + openId + '&activityId=' + that.data.activityId + '&teamId=' + that.data.teamId,
      imgUrl: '',
      withShareTicket: true
    };
    return shareobj;
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

 
})