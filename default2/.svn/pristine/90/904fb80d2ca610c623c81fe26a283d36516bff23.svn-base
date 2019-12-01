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
    peoplenum: 3,
    teamId: '',
    activityId: '',
    buyList: [],
    currentNcname: '',
    challengeMembers: [],
    sharetag: '',
    isFullTag:false,//是否满员
    isLeaderTag: false,//是否团长
    effectiveSize: 0
   
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
      teamId: options.teamId,
      activityId: options.activityId
    })
    //获取团队成员以及团信息
    this.myTeam(options.teamId);
    //购买人员信息
    this.myShareMember(options.activityId,options.teamId);
  },
  //购买人员信息
  myShareMember: function (activityId,teamId) {
    Model.myShareMember(activityId,app.globalData.openId, teamId, data => {
      console.log("购买人员信息");
      console.log(data);
      this.setData({
        buyList: data.data,
        currentNcname: app.globalData.nickName,
      })
    }, res => {})
  },
  //点击头像事件
  getmyShareMember: function(e) {
    var ncName = e.currentTarget.dataset.ncname;
    var openId = e.currentTarget.dataset.openid;
    var teamId = this.data.teamId;
    if (!ncName || !openId) {
      return;
    } else {
      this.setData({
        currentNcname: ncName
      })
      Model.myShareMember(this.data.activityId,openId, teamId, data => {
        console.log("购买人员信息");
        console.log(data);
        this.setData({
          buyList: data.data
        })
      }, res => {})
    }

  },
  //获取团队成员以及团信息
  myTeam: function(teamId) {
    Model.myTeam(teamId, data => {
      console.log("获取团队成员以及团信息");
      console.log(data);
      //是否团长
      if (app.globalData.openId == data.data.team.leaderOpenId){
        this.setData({
          isLeaderTag:true
        })
      console.log('是团长');
      }else{
        this.setData({
          isLeaderTag: false
        })
        console.log('不是是团长');
      }
      //是否满员
      if (data.data.team.isFull=='0') {
        this.setData({
          isFullTag: false
        })
        console.log('未满员');
      } else {
        this.setData({
          isFullTag: true
        })
        console.log('已满员');
      }
      //获取当前时间戳
      var timestamp = (new Date()).getTime();
      data.data.team.endTime = data.data.team.endTime.replace(/-/g, '/');
      var endTime = (new Date(data.data.team.endTime)).getTime();
      data.data.team.lessTime = Math.floor((endTime - timestamp) / 1000)
      this.setData({
        teamData: data.data.team,
        activityId: data.data.team.activityId,
        // currentNcname: data.data.team.leaderNcname,
        peoplenum: data.data.team.teamSize,
        effectiveSize: data.data.team.effectiveSize
      })

      var final = [];
      var temp = data.data.challengeMembers;
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].isLeader == '1') {
          final.push(temp[i]);
          break;
        }
      }
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].isLeader != '1') {
          final.push(temp[i]);
        }
      }
      var obj = {
        createTime: "",
        id: "",
        isLeader: "0",
        ncImage: "../../images/people.png",
        ncName: "",
        openId: "",
        teamId: "",
      }
      var length = final.length;
      if (final.length <= this.data.peoplenum) {
        for (var i = 0; i < this.data.peoplenum - length; i++) {
          final.push(obj);
        }
      }
      this.setData({
        challengeMembers: final
      })
      console.log(this.data.challengeMembers);
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
  //邀请组队
  zudui: function(e) {
    console.log(e.currentTarget.dataset.tag);
    this.setData({
      sharetag: e.currentTarget.dataset.tag
    })
  },
  //邀请购买
  goumai: function(e) {
    console.log(e.currentTarget.dataset.tag);
    this.setData({
      sharetag: e.currentTarget.dataset.tag
    })
  },
  //返回首页
  gotomall: function () {
    wx.switchTab({
      url: '../mall/mall',
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this;
    var openId = app.globalData.openId;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      if (res.target.id == "1") {
        return {
          title: '我的挑战',
          path: 'pages/inviteGroup/inviteGroup?openId=' + openId + '&activityId=' + that.data.activityId + '&teamId=' + that.data.teamId,
        }
      }
      if (res.target.id == "2") {
        return {
          title: '我的挑战',
          path: 'pages/inviteBuy/inviteBuy?openId=' + openId + '&activityId=' + that.data.activityId + '&teamId=' + that.data.teamId,
        }
      }
    } else {
      return {
        title: '我的挑战',
        path: 'pages/inviteBuy/inviteBuy?openId=' + openId + '&activityId=' + that.data.activityId + '&teamId=' + that.data.teamId,
      }
    }
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