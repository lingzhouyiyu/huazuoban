import {
  Class
} from '../../commonClass/find.js';

let Model = new Class();
//获取应用实例
const app = getApp()
var limit = 10;
var page = 1;
var end = 2;
var pageCount = 0;
//为Date原型添加时间格式化方法的方法
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

// pages/commentDetai/commentDetai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: null,
    nickName: '',
    avatarUrl: '',
    inputValue: null,
    commentList: [],
    commentId: '', //评论id
    replyContent: '', //回复内容
    replyUserId: '', //回复人id
    replyUserNickImage: '', //回复人头像
    replyUserNickName: '', //回复人昵称
    toUserId: '', //被回复人id
    toUserNickImage: '', //被回复人头像
    toUserNickName: '', //被回复人昵称
    selfopenId: app.globalData.openId, //登陆小程序的openId
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.articleId) {
      this.setData({
        articleId: options.articleId
      })
      // 获取评论列表
      this.getCommentList(options.articleId);
    }
    this.setData({
      selfopenId: app.globalData.openId
    })
    console.log(this.data.selfopenId);
  },
  //评论删除
  commentDelete: function (e) {
    var that = this;
    var commentId = e.currentTarget.dataset.commentid;
    var openId = e.currentTarget.dataset.openid;
    wx.showModal({
      title: '系统提示',
      content: '确定删除该评论吗？',
      success: function (as) {
        if (as.confirm) {
          Model.commentDelete(commentId, openId, data => {
            console.log('评论删除');
            console.log(data);
            // 获取评论列表
            that.getCommentList(that.data.articleId);
          }, res => { })
        }
      }
    })
  },
  //回复删除
  replayDelete: function(e) {
    var that = this;
    var replayId = e.currentTarget.dataset.replayid;
    var replyUserId = e.currentTarget.dataset.replyiserid;
    wx.showModal({
      title: '系统提示',
      content: '确定删除该回复吗？',
      success: function(as) {
        if (as.confirm) {
          Model.replayDelete(replayId, replyUserId, data => {
            console.log('回复删除');
            console.log(data);
            // 获取评论列表
            that.getCommentList(that.data.articleId);
          }, res => {})
        }
      }
    })
  },
  // 获取评论列表
  getCommentList: function(articleId) {
    Model.getCommentList(articleId, limit, page, data => {

      for (var i = 0; i < data.data.length; i++) {
        data.data[i].showReplay = false;
        data.data[i].focus = false;
      }
      this.setData({
        commentList: data.data
      })
      console.log(this.data.commentList);
    }, res => {})
  },
  //回复点击事件
  addSaveReplay: function(e) {
    var that = this;

    this.setData({
      articleId: e.currentTarget.dataset.articleid, //文章id
      commentId: e.currentTarget.dataset.commentid, //评论id
      replyContent: '', //回复内容
      replyUserId: app.globalData.openId, //回复人id
      replyUserNickImage: '', //回复人头像
      replyUserNickName: '', //回复人昵称
      toUserId: e.currentTarget.dataset.touserid, //被回复人id
      toUserNickImage: e.currentTarget.dataset.tousernickimage, //被回复人头像
      toUserNickName: e.currentTarget.dataset.tousernickname, //被回复人昵称
    })
    var temp = this.data.commentList;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id == e.currentTarget.dataset.commentid) {
        temp[i].showReplay = true;
        temp[i].focus = true;
      } else {
        temp[i].showReplay = false;
        temp[i].focus = false;
      }
    }
    this.setData({
      commentList: temp
    })


  },
  //提交数据方法
  addSaveReplaysubmit() {
    var articleId = this.data.articleId;
    var commentId = this.data.commentId;
    var replyContent = this.data.replyContent;
    var replyUserId = this.data.replyUserId;
    var replyUserNickImage = this.data.replyUserNickImage;
    var replyUserNickName = this.data.replyUserNickName;
    var toUserId = this.data.toUserId;
    var toUserNickImage = this.data.toUserNickImage;
    var toUserNickName = this.data.toUserNickName;
    Model.addSaveReplay(articleId, commentId, replyContent, replyUserId, replyUserNickImage, replyUserNickName, toUserId, toUserNickImage, toUserNickName, data => {

    }, res => {})
  },
  //输入框提交事件
  submitreplay: function(e) {
    this.setData({
      replyContent: e.detail.value
    })
    if (!e.detail.value) {
      wx.showToast({
        title: '回复内容不能为空！',
        icon: 'none'
      })
      return;
    }
    //获取当前时间
    var nowtime = new Date().format("yyyy-MM-dd hh:mm:ss");
    var replyContent = this.data.replyContent;
    var replyUserNickImage = this.data.replyUserNickImage;
    var replyUserNickName = this.data.replyUserNickName;
    var replaytemp = {
      'createTime': nowtime,
      'replyContent': replyContent,
      'replyUserNickImage': replyUserNickImage,
      'replyUserNickName': replyUserNickName
    }
    var id = e.currentTarget.dataset.id;
    var temp = this.data.commentList;

    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id == id) {
        temp[i].showReplay = false;
        temp[i].focus = false;
        temp[i].replyList.push(replaytemp);
        break;
      }
    }

    this.setData({
      commentList: temp
    })
    this.addSaveReplaysubmit();
  },
  auth: function() {
    if (app.globalData.authCode) { //已经授权
      this.setData({
        replyUserNickImage: app.globalData.avatarUrl,
        replyUserNickName: app.globalData.nickName
      })

    } else {
      //判断用户是否授权
      this.getSettings();
    }
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
              this.setData({
                replyUserNickName: app.globalData.userInfo.nickName,
                replyUserNickImage: app.globalData.userInfo.avatarUrl
              })

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
            url: '../userAuth/userAuth?tag=findDetail',
          })
        }
      }
    })
  },
  //输入框值发生变化
  getcomment: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  //评论输入框点击
  getfocus: function(e) {
    var that = this;
    if (app.globalData.authCode) { //已经授权
      this.setData({
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl
      })

    } else {
      //判断用户是否授权
      this.getSetting();
    }

  },
  //添加评论
  addSaveComment: function(e) {
    var that = this;
    // var replyContent = e.detail.value;
    var replyContent = this.data.comment;
    if (!replyContent) {
      wx.showToast({
        title: '内容不能为空！',
        icon: 'none'
      })
      return;
    }
    var openId = app.globalData.openId;
    var articleId = this.data.articleId;
    var nickImage = this.data.avatarUrl;
    var nickName = this.data.nickName;

    //添加评论
    Model.addSaveComment(articleId, nickImage, nickName, openId, replyContent, data => {

      this.setData({
        inputValue: ''
      })
      // 获取评论列表
      this.getCommentList(this.data.articleId);
    }, res => {})
  },
  getSetting: function() {
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
              this.setData({
                nickName: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
              })
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
            url: '../userAuth/userAuth?tag=findDetail',
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