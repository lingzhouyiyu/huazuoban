import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp()
// pages/changeList/changeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    challengeList:null,
    Furl: getApp().globalData.Serverurl,
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //获取挑战列表
    this.myChallengeHis();
  },
  //返回首页
  gotomall: function () {
    wx.switchTab({
      url: '../mall/mall',
    })

  },
    //获取挑战列表
  myChallengeHis:function(){
    Model.myChallengeHis(app.globalData.openId,data=>{
      console.log(data.data);
    
    
      
      //获取当前时间戳
      var timestamp = (new Date()).getTime();
      
      for (var i = 0; i < data.data.length;i++){
        data.data[i].endTime = data.data[i].endTime.replace(/-/g, '/');     
        var endTime = (new Date(data.data[i].endTime)).getTime(); 
        // var endTime = Date.parse(data.data[i].endTime)         
        data.data[i].lessTime = Math.floor((endTime - timestamp) / 1000)
        
      }
      this.setData({
        challengeList:data.data
      })
      this.countDown();
    },res=>{})
  },
  //倒计时函数
  countDown: function () {
    let that = this;
    let len = that.data.challengeList.length;//时间数据长度
    var timeData = this.data.challengeList;
    function nowTime() {//时间函数
      // console.log(a)
      for (var i = 0; i < len; i++) {
        var intDiff = timeData[i].lessTime;//获取数据中的时间戳
        // console.log(intDiff)
        var day = 0, hour = 0, minute = 0, second = 0;
        if (intDiff > 0) {//转换时间
          day = Math.floor(intDiff / (60 * 60 * 24));
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          timeData[i].lessTime--;
          var str = day + '天' + hour + '小时' + minute + '分' + second + '秒'
          // console.log(str)    
        } else {
          var str = "0天0小时0分0秒";
          // clearInterval(timer);
        }

        timeData[i].difftime = str;//在数据中添加difftime参数名，把时间放进去
      }
      that.setData({
        challengeList: timeData
      })
      // console.log(that)
    }

    nowTime();
    var timer = setInterval(nowTime, 1000);

  },
  //挑战详情跳转
  gotomineChallenge: function (e) {
    var teamType = e.currentTarget.dataset.teamtype;
    var teamId = e.currentTarget.dataset.id;  
    var activityId = e.currentTarget.dataset.activityid;    
    if (teamType=="1"){
      wx.navigateTo({
        url: '../mineChallenge/mineChallenge?teamId=' + teamId + '&activityId=' + activityId,
      })   
    }else{
      wx.navigateTo({
        url: '../mineChallengemany/mineChallengemany?teamId=' + teamId + '&activityId=' + activityId,
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