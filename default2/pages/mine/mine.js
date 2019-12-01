import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    windowheight: 0,
    avatarUrl: '../../images/find/header.png',
    nickName: 'Lewa',
    centerUserInfo: null,
    unreadCount: '0',
    hasGuanzhu: false, //是否关注
    waitPayCount: 0,
    waitReceiveCount: 0,
    waitReturnCount: 0,
    waitSendCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度   
    var winHgt = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowWidth: winWid,
      windowheight: winHgt,
    })



  },
  //获取未读消息数量
  getNoLookCount: function() {
    Model.getNoLookCount(app.globalData.openId, data => {
      // console.log(data);
      this.setData({
        unreadCount: parseInt(data.data)
      })
      if (parseInt(data.data) > 0) {
        wx.showTabBarRedDot({
          index: 4
        })
      } else {
        wx.hideTabBarRedDot({
          index: 4
        })
      }
    }, res => {})
  },
  // 获取个人基本信息
  getUserCenter: function() {
    Model.getUserCenter(app.globalData.openId, data => {
      console.log('获取个人基本信息');
      console.log(data)
      this.setData({
        centerUserInfo: data.data
      })
    }, res => {})
  },
  //关注数量提示
  talkFlowCount: function() {
    Model.talkFlowCount(app.globalData.openId, data => {

      if (data.data > 0) {
        this.setData({
          hasGuanzhu: true
        })
      } else {
        this.setData({
          hasGuanzhu: false
        })
      }
    }, res => {})
  },
  //订单数量提示
  waitOrderCount: function() {
    Model.waitOrderCount(app.globalData.openId, data => {
      console.log('订单数量提示');
      console.log(data);
      this.setData({
        waitPayCount: data.data.waitPayCount,
        waitReceiveCount: data.data.waitReceiveCount,
        waitReturnCount: data.data.waitReturnCount,
        waitSendCount: data.data.waitSendCount
      })
    }, res => {})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    if (app.globalData.openId) {
      this.isAuth();

      // 获取未读消息数量
      this.getNoLookCount();
      // 关注数量提示
      this.talkFlowCount();
      // 订单数量提示
      this.waitOrderCount();
    } else {

      app.getToken().then(res => {
        this.isAuth();
        // 获取未读消息数量
        this.getNoLookCount();

        // 关注数量提示
        this.talkFlowCount();
        // 订单数量提示
        this.waitOrderCount();
      })
    }

  },
  // 授权逻辑
  isAuth: function() {
    if (app.globalData.authCode) { //已经授权 
      console.log('已经授权');
      var that = this;
      // 获取个人基本信息
      app.getToken().then(as => {
        that.getUserCenter();
      });
      this.setData({
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl
      })
    } else {
      console.log('还未授权');
      //判断用户是否授权
      this.getSetting();
    }
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
              // 获取个人基本信息
              app.getToken().then(as => {
                that.getUserCenter();
              });
              app.globalData.userInfo = res.userInfo;
              that.setData({
                nickName: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
              })
              Model.updateUserinfo(res.encryptedData, res.iv, app.globalData.session_key, data => {
                if (data.status == 200) {
                  app.getToken();
                  app.globalData.authCode = true;
                } else {
                  that.getSetting();
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
            url: '../userAuth/userAuth?tag=mine',
          })
        }
      }
    })
  },
  //我的二维码
  gotominecode: function() {

    if (app.globalData.authCode) { //已经授权   
      // if (app.globalData.unionId) {
      // wx.navigateTo({
      //   url: '../minecode/minecode',
      // })
      wx.navigateTo({
        url: '../minecodeNew/minecodeNew',
      })
      // }

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
                nickName: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
              })
              Model.updateUserinfo(res.encryptedData, res.iv, app.globalData.session_key, data => {
                if (data.status == 200) {
                  app.getToken().then(res => {
                    app.globalData.authCode = true;
                    // if (app.globalData.unionId) {
                    // wx.navigateTo({
                    //   url: '../minecode/minecode',
                    // })
                    wx.navigateTo({
                      url: '../minecodeNew/minecodeNew',
                    })
                    // }else{
                    //   that.getSettings();
                    // }
                  });
                } else {
                  that.getSettings();
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
            url: '../userAuth/userAuth?tag=mine',
          })
        }
      }
    })
  },
  //跳转我的主页
  gotomineCenter: function() {
    wx.navigateTo({
      url: '../mineCenter/mineCenter?tag=mine',
    })
  },
  //跳转我的收藏
  gotomineCollect: function() {
    wx.navigateTo({
      url: '../mineCollect/mineCollect',
    })
  },
  //跳转我的足迹
  gotomineLook: function() {
    wx.navigateTo({
      url: '../mineLook/mineLook',
    })
  },
  //跳转我的积分
  gotominepoints: function() {
    wx.navigateTo({
      url: '../minepoints/minepoints',
    })
  },
  //跳转我的订单
  gotoorders: function(e) {
    var that = this;
    var optselect = e.currentTarget.dataset.optselect;
    wx.navigateTo({
      url: '../orders/orders?optselect=' + optselect,
    })
  },
  // 退款
  gotorefund: function() {
    wx.navigateTo({
      url: '../refund/refund',
    })
  },
  // 消息中心
  gotominemessage: function() {
    wx.navigateTo({
      url: '../minemessage/minemessage',
    })
  },
  // 签到
  gotominesignin: function() {
    wx.navigateTo({
      url: '../minesignin/minesignin',
    })
  },
  // 卡券红包
  gotominecard: function() {
    wx.navigateTo({
      url: '../minecard/minecard',
    })
  },
  //收获地址
  gotomineaddress: function() {
    wx.navigateTo({
      url: '../mineaddress/mineaddress',
    })
  },
  //我的客服
  gotomineservice: function() {
    wx.navigateTo({
      url: '../mineservice/mineservice',
    })
  },
  //我的挑战
  gotomineChallenge: function() {
    // wx.navigateTo({
    //   url: '../mineChallenge/mineChallenge?tag=many',
    // })
    wx.navigateTo({
      url: '../changeList/changeList',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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