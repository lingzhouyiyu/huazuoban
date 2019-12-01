import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
const app = getApp()
// pages/activeChallenge/activeChallenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singletag: false,
    manytag: false,
    selected: '0',
    manytxt: '立即报名',
    toptxt: '选择挑战方式',
    avatarUrl: '',
    nickName: '',
    effectiveDay: '',
    activityId:'',
    effectiveSize:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      activityId: options.id
    })
    //获取详情
    this.getActivityById(options.id);
  },
  //获取详情
  getActivityById: function(id) {
    var that = this;
    Model.getActivityById(id, data => {
      console.log(id);
      console.log('活动详情');
      console.log(data);
      this.setData({
        effectiveDay: data.data.effectiveDay,
        effectiveSize: data.data.categoryName
      })
      if (data.data) {
        WxParse.wxParse('activeDetail', 'html', data.data.content, that, 5);
      }
      wx.hideLoading();
    }, res => {})
  },

  preventTouchMove: function() {
    return;
  },
  //单人挑战点击事件
  single: function() {
    // this.setData({
    //   singletag: true,
    // })

    if (app.globalData.authCode) { //已经授权
      this.setData({
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl
      })
      this.singleteam();
    } else {
      //判断用户是否授权
      this.getSetting();
    }

  },
  //单人挑战创建团
  singleteam: function() {
    wx.showLoading({
      title: '加载中',
    })
    var activityId = this.data.activityId;
    var hasCount = 1;
    var isFull = 1;
    var teamSize = 1;
    var teamType = 1;
    var leaderOpenId = app.globalData.openId;
    var leaderNcname = this.data.nickName;
    var ncImage = this.data.avatarUrl;
    var effectiveDay = this.data.effectiveDay;
    var effectiveSize = this.data.effectiveSize;
    Model.createChallengeTeam(effectiveSize,activityId,effectiveDay, hasCount,  isFull, leaderNcname, leaderOpenId, ncImage, teamSize, teamType, data => {
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
      } else if (data.status == 800){
        wx.showToast({
          title: '本项活动，只作为对花粉的出国游福利，店主无法参加！',
          icon:'none'
        })
      } else if (data.status == 900) {
        wx.showToast({
          title: '团已经创建，不允许重复创建！',
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../changeList/changeList',
          })
        }, 1000)
      }
      else if (data.status == 500) {
        wx.showToast({
          title: '您正在参与活动中，请勿重复参与！',
          icon: 'none'
        })
        setTimeout(function () {
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
              that.singleteam();
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
  //多人挑战
  many: function() {
    // this.setData({
    //   manytag: true,
    // })
    // console.log(this.data.activityId);
    wx.navigateTo({
      url: '../createGroup/createGroup?activityId=' + this.data.activityId,
    })
  },
  close_mask: function() {
    this.setData({
      singletag: false,
      manytag: false,
    })
  },
  gotomineChallenge: function() {
    wx.navigateTo({
      url: '../mineChallenge/mineChallenge?tag=single',
    })
  },
  changetxt: function() {
    if (this.data.manytxt == '立即报名') {
      this.setData({
        manytxt: '前往“我的挑战”查看',
        toptxt: '报名成功'
      })
    } else {
      wx.navigateTo({
        url: '../mineChallenge/mineChallenge?tag=many',
      })
    }

  },
  selectoptions: function(e) {

    this.setData({
      selected: e.currentTarget.dataset.select
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

  },
})