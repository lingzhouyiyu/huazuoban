import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
//获取应用实例
const app = getApp();
// pages/createGroup/createGroup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapcurrent: 0,
    effectiveDay: '',
    avatarUrl: '',
    nickName: '',
    activityId: '',
    // teamSize: '3',
    // teamType: '3',
    teamSize: '4',
    teamType: '4',
    groupList: [],
    activityIdjoin: '',
    teamId: '',
    isshow:false,
    effectiveSize:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      activityId: options.activityId
    })
    //获取详情
    this.getActivityById(options.activityId);
    //查询所有正在活跃的团
    this.activeTeams(options.activityId);
  },
  //获取详情
  getActivityById: function(id) {
    var that = this;
    Model.getActivityById(id, data => {
      // console.log(data);
      this.setData({
        effectiveDay: data.data.effectiveDay,
        effectiveSize: data.data.categoryName
      })
      wx.hideLoading();
    }, res => {})
  },
  //查询所有正在活跃的团
  activeTeams: function(id) {
    var that = this;
    Model.activeTeams(id, data => {
      console.log(data);
      if (data.data.length == 0) {
        this.setData({
          isshow: false
        })
      } else {
        this.setData({
          isshow: true
        })
      }
      //获取当前时间戳
      var timestamp = (new Date()).getTime();
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].endTime = data.data[i].endTime.replace(/-/g, '/');
        var endTime = (new Date(data.data[i].endTime)).getTime();
        // var endTime = Date.parse(data.data[i].endTime)         
        data.data[i].lessTime = Math.floor((endTime - timestamp) / 1000)

      }
      this.setData({
        groupList: data.data
      })
      wx.hideLoading();
      this.countDown();
    }, res => {})
  },
  //倒计时函数
  countDown: function() {
    let that = this;
    let len = that.data.groupList.length; //时间数据长度
    var timeData = this.data.groupList;

    function nowTime() { //时间函数
      // console.log(a)
      for (var i = 0; i < len; i++) {
        var intDiff = timeData[i].lessTime; //获取数据中的时间戳
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
          timeData[i].lessTime--;
          var str = day + '天' + hour + '小时' + minute + '分' + second + '秒'
          // console.log(str)    
        } else {
          var str = "0天0小时0分0秒";
          // clearInterval(timer);
        }

        timeData[i].difftime = str; //在数据中添加difftime参数名，把时间放进去
      }
      that.setData({
        groupList: timeData
      })
      // console.log(that)
    }

    nowTime();
    var timer = setInterval(nowTime, 1000);

  },
  //参加组队点击事件
  jionChallengeTeam: function(e) {
    var activityIdjoin = e.currentTarget.dataset.activityid;
    var teamId = e.currentTarget.dataset.teamid;
    this.setData({
      activityIdjoin: activityIdjoin,
      teamId: teamId
    })
    if (app.globalData.authCode) { //已经授权
      this.setData({
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl
      })
      this.join();
    } else {
      //判断用户是否授权
      this.getSettings();
    }

  },
  //参加组队
  join: function() {
    var activityId = this.data.activityIdjoin;
    var isLeader = 0;
    var ncImage = this.data.avatarUrl;
    var ncName = this.data.nickName;
    var openId = app.globalData.openId;
    var teamId = this.data.teamId;
    Model.jionChallengeTeam(activityId, isLeader, ncImage, ncName, openId, teamId, data => {

      console.log(data);
      if (data.status == 200) {
        wx.showToast({
          title: '参加成功！',
        })
        setTimeout(function() {
          wx.navigateTo({
            url: '../mineChallengemany/mineChallengemany?teamId=' + teamId,
          })
        }, 1000)
      } else if (data.status == 800) {
        wx.showToast({
          title: '创客不能参加该活动！',
          icon: 'none'
        })
      } else if (data.status == 500) {
        wx.showToast({
          title: '您正在组队中，不能重复参与！',
          icon: 'none'
        })
      }
    }, res => {})
  },
  getSettings: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    //判断是否授权
    wx.getSetting({
      success: res => {
        //用户信息授权
        if (res.authSetting['scope.userInfo']) { //用户已经授权
          // 隐藏加载框
          wx.hideLoading();
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框         
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo;
              that.setData({
                nickName: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
              })
              that.join();
              Model.updateUserinfo(res.encryptedData, res.iv, app.globalData.session_key, data => {
                if (data.status == 200) {
                  app.getToken();
                  app.globalData.authCode = true;
                }
              }, fail => {

              });
            }
          })
        } else { //用户未授权   
          // 隐藏加载框
          wx.hideLoading();
          //跳转授权页面
          wx.navigateTo({
            url: '../userAuth/userAuth?tag=active',
          })
        }
      }
    })
  },
  //导航切换
  menutap: function(e) {
    this.setData({
      tapcurrent: e.currentTarget.dataset.current
    });
    if (e.currentTarget.dataset.current == '0') {
      this.setData({
        teamSize: '3',
        teamType: '3'
      })
    } else {
      this.setData({
        teamSize: '5',
        teamType: '5'
      })
    }
  },
  //开启组队挑战点击事件
  gotomineChallenge: function() {
    if (app.globalData.authCode) { //已经授权
      this.setData({
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl
      })
      this.groupteam();
    } else {
      //判断用户是否授权
      this.getSetting();
    }

  },
  //多人挑战创建团
  groupteam: function() {
    wx.showLoading({
      title: '加载中',
    })
    var activityId = this.data.activityId;
    var hasCount = 1;
    var isFull = 0;
    var teamSize = this.data.teamSize;
    var teamType = this.data.teamType;
    var leaderOpenId = app.globalData.openId;
    var leaderNcname = this.data.nickName;
    var ncImage = this.data.avatarUrl;
    var effectiveDay = this.data.effectiveDay;
    var effectiveSize = this.data.effectiveSize;
    Model.createChallengeTeam(effectiveSize,activityId, effectiveDay, hasCount, isFull, leaderNcname, leaderOpenId, ncImage, teamSize, teamType, data => {
      console.log('创建多人团');
      console.log(data);
      wx.hideLoading();
      if (data.status == 200) {
        wx.showToast({
          title: '报名成功！',
          duration: 1000,
          icon: 'success'
        })
        setTimeout(function() {
          wx.navigateTo({
            url: '../changeList/changeList',
          })
        }, 1000)
      } else if (data.status == 800) {
        wx.showToast({
          title: '本项活动，只作为对花粉的出国游福利，店主无法参加！',
          icon: 'none'
        })
      } else if (data.status == 900) {
        wx.showToast({
          title: '团已经创建，不允许重复创建！',
          icon: 'none'
        })
        setTimeout(function() {
          wx.navigateTo({
            url: '../changeList/changeList',
          })
        }, 1000)
      } else if (data.status == 500) {
        wx.showToast({
          title: '您正在参与活动中，请勿重复参与！',
          icon: 'none'
        })
        setTimeout(function() {
          wx.navigateTo({
            url: '../changeList/changeList',
          })
        }, 1000)
      }
    }, res => {})
  },
  getSetting: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    //判断是否授权
    wx.getSetting({
      success: res => {
        //用户信息授权
        if (res.authSetting['scope.userInfo']) { //用户已经授权
          // 隐藏加载框
          wx.hideLoading();
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框         
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo;
              that.setData({
                nickName: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
              })
              that.groupteam();
              Model.updateUserinfo(res.encryptedData, res.iv, app.globalData.session_key, data => {
                if (data.status == 200) {
                  app.getToken();
                  app.globalData.authCode = true;
                }
              }, fail => {

              });
            }
          })
        } else { //用户未授权   
          // 隐藏加载框
          wx.hideLoading();
          //跳转授权页面
          wx.navigateTo({
            url: '../userAuth/userAuth?tag=active',
          })
        }
      }
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