import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
//获取应用实例
const app = getApp()
var datas = [];
var timer = null;
// pages/mall/mall.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categoryData: ['推荐', '日常鲜花', '礼品花束', '多肉植物', '花瓶周边', '多肉植物'],
    categoryDatas: [],
    catalogSelect: 0,
    currentTab: 0,
    navScrollLeft: 0,
    windowWidth: 0,
    windowheight: 0,
    bannersimages: ['../../images/mall/banner.jpg', '../../images/mall/banner.jpg', '../../images/mall/banner.jpg'],
    Hotdata: [],
    xianshiindex: 0,
    goodsNewData: [],
    findData: [],
    goodsindex: 0,
    Furl: getApp().globalData.Serverurl,
    othertopimg: '',
    categoryData: [],
    limitData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度   
    var winHgt = wx.getSystemInfoSync().windowHeight; //获取当前屏幕的高度  
    this.setData({
      windowWidth: winWid,
      windowheight: winHgt
    })

    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })

  },
  imgHeight: function(e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度   
    var imgh = e.detail.height; //图片高度   
    var imgw = e.detail.width; //图片宽度   
    var swiperH = winWid * imgh / imgw + "px";
    this.setData({
      Height: swiperH //设置高度 
    })
  },
  //自由购
  gotofreePurchase: function() {
    this.isLogin(data => {
      console.log(data);
      if (data) {
        wx.navigateTo({
          url: '../freePurchase/freePurchase',
        })
      } else {
        wx.showToast({
          title: '您还未授权！',
          icon: 'none'
        })
      }
    })
  
  },
  // 获取顶部分类
  getTopCategory: function() {

    Model.getTopCategory(data => {
      // console.log('顶部分类');
      // console.log(data.data);
      this.setData({
        categoryData: data.data
      })
      // 获取中间三个分类
      this.getCenterCategory();

    }, res => {})
  },
  // 获取中间三个分类
  getCenterCategory: function() {
    var that=this;
    Model.getCenterCategory(data => {
     
      var temp = that.data.categoryData;
      for(let i=0;i<temp.length;i++){
        for (let j = 0; j < data.data.length; j++) {
          if (temp[i].danceCategoryId == data.data[j].danceCategoryId){
            data.data[j].order=i;
          }
        }
      }
      // console.log('中间三个分类');
      // console.log(data.data);      
      this.setData({
        categoryDatas: data.data
      })
      // 加载其他页面数据
      // this.getGoodsListByCategoryId().then(res => {
      //   // console.log(res);
      //   this.setData({
      //     categoryDatafinal: res
      //   })

      // });
      // 新品专区商品
      this.getGoodsNewList();
      // 热卖专区商品
      this.getGoodsHOTList();
      // 发现专区商品
      this.getGoodsFindList();
      //限时团购列表
      this.getLimitTeamGoodsList();
    }, res => {})
  },
  //根据分类id查询商品列表
  getGoodsListByCategoryId: function() {

    return new Promise((resolve, reject) => {
      var that = this;

      for (var i = 1; i < that.data.categoryData.length; i++) {
        this.getArrayList(i, that.data.categoryData.length - 1).then(res => {
          resolve(res);
        })
      }

    })

  },
  // 数据请求封装
  getArrayList: function(index, length) {
    return new Promise((resolve, reject) => {
      var that = this;
      var categoryId = that.data.categoryData[index].danceCategoryId;

      Model.getGoodsListByCategoryId(categoryId, data => {

        var temp = that.data.categoryData;
        for (var i = 0; i < temp.length; i++) {

          if (temp[i].danceCategoryId == data.data[0].categoryId) {
            temp[i].goodsList = data.data;
            if (length == index) {
              that.setData({
                categoryData: temp
              })
              resolve(that.data.categoryData)
            }
          }
        }


      }, res => {})
    })
  },
  // 新品专区商品
  getGoodsNewList: function() {
    Model.getGoodsNewList(data => {
      //  console.log(data)
      // 隐藏加载框
      wx.hideLoading();
      this.setData({
        goodsNewData: data.data
      })

    }, res => {})
  },
  // 热卖专区商品
  getGoodsHOTList: function() {
    Model.getGoodsHOTList(data => {
      // console.log(data);
      this.setData({
        Hotdata: data.data
      })
    }, res => {})
  },
  // 发现专区商品
  getGoodsFindList: function() {
    Model.getGoodsFindList(data => {
      // console.log(data);
      this.setData({
        findData: data.data
      })
    }, res => {})
  },


  //导航栏切换
  tabSelect: function(e) {
    var that = this;
    var singleNavWidth = this.data.windowWidth / 4;
    that.setData({ //把选中值放入判断值
      catalogSelect: e.currentTarget.dataset.select
    })
    if (e.currentTarget.dataset.select == 0) return;
    var categoryId = e.currentTarget.dataset.cateid;
    var topimg = e.currentTarget.dataset.topimg;
    // this.setData({
    //   othertopimg: topimg
    // })

    // 根据分类id查询商品列表
    // this.getGoodsListByCategoryId(categoryId);
  },
  //内容切换
  switchContent: function(e) {
    var that = this;
    var cur = e.detail.current;
    that.setData({ //把选中值放入判断值
      catalogSelect: cur
    })
    if (cur == 0) return;
    for (let i = 0; i < that.data.categoryData.length; i++) {
      if (cur == that.data.categoryData[i].orderNum - 1) {
        var categoryId = that.data.categoryData[i].danceCategoryId;
        var topimg = that.data.categoryData[i].categoryImageOne;
        // this.setData({
        //   othertopimg: topimg
        // })

        // 根据分类id查询商品列表
        // this.getGoodsListByCategoryId(categoryId);
        break;
      }
    }
  },
  //点击图片切换导航栏
  changeSelect: function(e) {
    this.isLogin(data => {
      console.log(data);
      if (data) {
        var that = this;
        var select = e.currentTarget.dataset.select;

        that.setData({
          catalogSelect: select
        })
        if (e.currentTarget.dataset.select == 0) return;
        var categoryId = e.currentTarget.dataset.cateid;
        var topimg = e.currentTarget.dataset.topimg;
    // this.setData({
    //   othertopimg: topimg
    // })

    // 根据分类id查询商品列表
    // this.getGoodsListByCategoryId(categoryId);
      } else {
        wx.showToast({
          title: '您还未授权！',
          icon: 'none'
        })
      }
    })
    
  },

  //商品详情跳转
  gotogoodsDetail: function(e) {
    this.isLogin(data => {
      console.log(data);
      if (data) {
        var id = e.currentTarget.dataset.id;
        var type = e.currentTarget.dataset.type;
        console.log(id);
        app.globalData.isBack = false;
        //添加商品浏览足迹
        this.goodsLookHistory(id);
        if (type == '0') {
          console.log("单品");
          wx.navigateTo({
            url: '../goodsDetailalone/goodsDetailalone?id=' + id,
            // url: '../goodsDetailalone/goodsDetailalone?id=1000000177510688',
          })
        } else if (type == '1') {
          console.log("套餐");
          wx.navigateTo({
            url: '../goodsDetail/goodsDetail?id=' + id,
            // url: '../goodsDetail/goodsDetail?id=1000000177510688',
          })
        }
      } else {
        wx.showToast({
          title: '您还未授权！',
          icon: 'none'
        })
      }
    })
    

  },
  //添加商品浏览足迹
  goodsLookHistory: function(id) {
    Model.goodsLookHistory(id, app.globalData.openId, data => {
      // console.log(data);
    }, rees => {})
  },
  stopmove: function() {
    return;
  },
  getindex: function(e) {
    this.setData({
      xianshiindex: e.detail.current
    })
  },
  getgoodsindex: function(e) {
    this.setData({
      goodsindex: e.detail.current
    })
  },
  //获取轮播图数据
  getActivityList: function() {
    Model.getActivityList(data => {

      this.setData({
        bannersimages: data.data
      })
      // console.log(this.data.bannersimages);
    }, res => {})
  },
  //轮播图点击事件
  gotoactive: function(e) {
    this.isLogin(data => {
      console.log(data);
      if (data){
        var type = e.currentTarget.dataset.type;
        var id = e.currentTarget.dataset.id;
        var goodsType = e.currentTarget.dataset.goodstype;
        var goodsId = e.currentTarget.dataset.goodsid;
        if (type == '0') {
          // wx.navigateTo({
          //   url: '../activeNomal/activeNomal?id='+id,
          // })
          if (goodsType == '0') {
            wx.navigateTo({
              url: '../goodsDetailalone/goodsDetailalone?id=' + goodsId,
            })
          } else if (goodsType == '1') {
            wx.navigateTo({
              url: '../goodsDetail/goodsDetail?id=' + goodsId,
            })
          }
        } else if (type == '3') {
          wx.navigateTo({
            url: '../activeChallenge/activeChallenge?id=' + id,
          })
        }
      }else{
        wx.showToast({
          title: '您还未授权！',
          icon:'none'
        })
      }
    })
   

  },
  //限时团购详情跳转
  gotogoodsDetails: function(e) {
    this.isLogin(data => {
      console.log(data);
      if (data) {
        app.globalData.isBack = false;
        var goodsid = e.currentTarget.dataset.goodsid;
        var id = e.currentTarget.dataset.id;
        var type = e.currentTarget.dataset.type;
        var status = e.currentTarget.dataset.status;
        if (status == '2') {
          wx.showToast({
            title: '活动已结束！',
            icon: 'none'
          })
          return;
        }
        //添加商品浏览足迹
        this.goodsLookHistory(id);
        if (type == '0') {
          console.log('单品');
          wx.navigateTo({
            url: '../goodsDetails/goodsDetails?id=' + id + '&goodsid=' + goodsid,
          })
        } else if (type == '1') {
          console.log('套餐');
          wx.navigateTo({
            url: '../goodsDetailstao/goodsDetailstao?id=' + id + '&goodsid=' + goodsid,
          })
        }
      } else {
        wx.showToast({
          title: '您还未授权！',
          icon: 'none'
        })
      }
    })
    

  },
  //限时团购列表
  getLimitTeamGoodsList: function() {
    Model.getLimitTeamGoodsList(data => {
      // console.log('限时团购列表');
      // console.log(data.data);
      for (let i = 0; i < data.data.length; i++) {
        data.data[i].lessTime = Math.floor((data.data[i].lessTime) / 1000)
        // console.log(data.data[i].lessTime);
      }
      this.setData({
        limitData: data.data
      })
      this.countDown();
    }, res => {})
  },
  //倒计时函数
  countDown: function() {
    let that = this;
    let len = that.data.limitData.length; //时间数据长度
    var timeData = this.data.limitData;

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
          var str = "活动已结束！";
          clearInterval(timer);
        }

        timeData[i].difftime = str; //在数据中添加difftime参数名，把时间放进去
      }
      that.setData({
        limitData: timeData
      })
      // console.log(that)
    }

    nowTime();
    timer = setInterval(nowTime, 1000);

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    clearInterval(timer)
    if (app.globalData.openId) {
      // 获取顶部分类
      this.getTopCategory();
      //获取首页轮播图
      this.getActivityList();
      //获取未读消息数量
      this.getNoLookCount();
      // 关注数量提示
      this.talkFlowCount();
      // 订单数量提示
      this.waitOrderCount();

    } else {
      app.getToken().then(data => {
        // 获取顶部分类
        this.getTopCategory();
        //获取首页轮播图
        this.getActivityList();
        //获取未读消息数量
        this.getNoLookCount();
        // 关注数量提示
        this.talkFlowCount();
        // 订单数量提示
        this.waitOrderCount();
      });
    }
  },
  //获取未读消息数量
  getNoLookCount: function() {
    Model.getNoLookCount(app.globalData.openId, data => {
      // console.log('获取未读消息数量');
      // console.log(data);
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
  //关注数量提示
  talkFlowCount: function() {
    Model.talkFlowCount(app.globalData.openId, data => {
      // console.log('关注数量提示');
      // console.log(data);
      if (data.data > 0) {
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
  //订单数量提示
  waitOrderCount: function() {
    Model.waitOrderCount(app.globalData.openId, data => {
      // console.log('订单数量提示');
      // console.log(data);
      if (data.data.waitPayCount > 0 || data.data.waitReceiveCount > 0 || data.data.waitReturnCount > 0 || data.data.waitSendCount > 0) {
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

  //判断是否登录
  isLogin: function (callback) {
    if (app.globalData.openId){
      console.log('已经登录');
      this.isAuth(callback);
    }else{
      app.getToken().then(res => {
        console.log('还未登录');
        this.isAuth(callback);
      })
    }
    // app.getToken().then(res => {     
    //   this.isAuth(callback);
    // })
    
  },
  //判断是否授权
  isAuth: function (callback){
    if (app.globalData.authCode) { //已经授权 
      console.log('已经授权');
      callback(true);
    } else {
      console.log('还未授权');
      //判断用户是否授权
      this.getSetting(callback);
    }
  },
  getSetting: function (callback) {
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
              //更新个人信息
              Model.updateUserinfo(res.encryptedData, res.iv, app.globalData.session_key, data => {
                if (data.status == 200) {
                  console.log('更新个人信息成功');
                  callback(true);
                  app.getToken();
                  app.globalData.authCode = true;
                } else {
                  that.getSetting(callback);
                }
              }, fail => {

              });
            }
          })
        } else { //用户未授权   
          // 隐藏加载框
          wx.hideLoading();
          callback(false);
          //跳转授权页面
          wx.navigateTo({
            url: '../userAuth/userAuth',
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