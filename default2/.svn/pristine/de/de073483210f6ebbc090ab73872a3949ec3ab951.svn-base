import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp();
var limit = 100;
var page = 1;
var end = 2; //上拉加载当前页
var pageCount = 0;
var guanzhulimit = 100;
var guanzhupage = 1;
var guanzhuend = 2; //上拉加载当前页
var guanzhupageCount = 0;
//计算图片总高度
var leftHight = 0;
var rightHight = 0;
var leftList = [];
var rightList = [];
var guanzhuleftHight = 0;
var guanzhurightHight = 0;
var guanzhuleftList = [];
var guanzhurightList = [];
// pages/mineCenter/mineCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapcurrent: 0,
    bannersimages: ['../../images/mall/banner.jpg', '../../images/mall/banner.jpg', '../../images/mall/banner.jpg'],
    windowWidth: 0,
    avatarUrl: '../../images/find/header.png',
    nickName: 'Lewa',
    userData: null,
    windowWidth: 0,
    windowheight: 0,
    Furl: getApp().globalData.Serverurl,
    leftData: [],
    rightData: [],
    guanzhuleftData: [],
    guanzhurightData: [],
    openId: '',
    showModal: true,
    hasGuanzhu: false,
    isAuthor:false
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
    this.getInfoMessage(options).then(res => {
    
      if (this.data.openId == app.globalData.openId){
        this.setData({
          isAuthor:true
        })
      }else{
        this.setData({
          isAuthor: false
        }) 
      }
     
      //获取个人信息
      this.getMyInfo();
      //个人主页--笔记列表
      this.myTalkList();
      //个人主页--收藏列表
      this.getCollectionList();
    })


  },
  //删除文章
  deleteMsg: function(e) {
    var articleId = e.currentTarget.dataset.id;
    var openId = e.currentTarget.dataset.openid;
    var that=this;
    wx.showModal({
      title: '系统提示',
      content: '确定要删除该笔记吗？',
      success: function(res) {
        if (res.confirm) {
          Model.articleDelete(articleId, openId, data => {
            console.log('删除');
            console.log(data);
            that.myTalkList();
          }, res => {})
        }
      }
    })

  },
  //显示升级规则
  showrule: function() {
    this.setData({
      showModal: false
    })
  },
  //隐藏升级规则
  colserule: function() {
    this.setData({
      showModal: true
    })
  },
  //获取初始化所需参数
  getInfoMessage: function(options) {
    return new Promise((resolve, reject) => {
      if (options.tag == 'mine') { //从我的进来
        this.setData({
          openId: app.globalData.openId
        })
        if (app.globalData.userInfo) {
          this.setData({
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl
          })
        } else {
          this.setData({
            nickName: app.globalData.nickName,
            avatarUrl: app.globalData.avatarUrl
          })
        }

      } else if (options.tag == 'find') { //从发现页面进来
        this.setData({
          openId: options.openId,
          nickName: options.nickName,
          avatarUrl: options.avatarUrl
        })

      }
      resolve(options)
    })
  },
  //获取个人信息
  getMyInfo: function() {
    console.log(this.data.openId);
    Model.getMyInfo(this.data.openId, data => {
      console.log('个人信息');
      console.log(data);
      this.setData({
        userData: data.data
      })
    }, res => {})
  },
  //个人主页--笔记列表
  myTalkList: function() {
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.clearOut();
    Model.myTalkList(limit, page, this.data.openId, data => {
      console.log('笔记');
      console.log(data);

      wx.hideNavigationBarLoading();
      for (var i = 0; i < data.data.length; i++) {
        // data.data[i].talkImages = data.data[i].talkImages.split(',')[0];
        if (data.data[i].hasPraise == '1') {
          data.data[i].iszan = true;
        } else {
          data.data[i].iszan = false;
        }
        data.data[i].talkImages = JSON.parse(data.data[i].talkImages);
        data.data[i].faceimg = data.data[i].talkImages[0].url;
        for (var p = 0; p < data.data[i].talkImages.length; p++) {
          data.data[i].talkImages[p].height = (data.data[i].talkImages[p].height * (that.data.windowWidth * 0.485 * 0.94)) / data.data[i].talkImages[p].width;
          data.data[i].talkImages[p].width = that.data.windowWidth * 0.485 * 0.94;
        }
      }
      pageCount = this.getPageCount(data.count, limit);
      end = 2;
      // console.log(data.data[0]);
      // console.log(data.data[1]);
      // return;只有一条数据要判断
      //计算图片总高度
      var temp = data.data;
      if (data.data.length == 1) {
        leftHight = data.data[0].talkImages[0].height;
        rightHight = 0;
        leftList.push(temp[0]);
      } else if (data.data.length > 1) {
        leftHight = data.data[0].talkImages[0].height;
        rightHight = data.data[1].talkImages[0].height;
        leftList.push(temp[0]);
        rightList.push(temp[1]);

        for (var j = 2; j < data.data.length; j++) {
          if (leftHight == rightHight) { //第1个item放左边
            leftList.push(temp[j]);

            leftHight = leftHight + temp[j].talkImages[0].height;
          } else if (leftHight < rightHight) {
            leftList.push(temp[j]);

            leftHight = leftHight + temp[j].talkImages[0].height;
          } else {
            rightList.push(temp[j]);
            rightHight = rightHight + temp[j].talkImages[0].height;
          }
        }
      }


      this.setData({
        leftData: leftList,
        rightData: rightList
      })

    }, res => {})
  },
  //个人主页--收藏列表
  getCollectionList: function() {
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.guanzhuclearOut();
    Model.getCollectionList(limit, page, this.data.openId, data => {
      console.log('收藏');
      console.log(data);
      wx.hideNavigationBarLoading();
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].hasPraise == '1') {
          data.data[i].iszan = true;
        } else {
          data.data[i].iszan = false;
        }
        data.data[i].talkImages = JSON.parse(data.data[i].talkImages);
        data.data[i].faceimg = data.data[i].talkImages[0].url;
        for (var p = 0; p < data.data[i].talkImages.length; p++) {
          data.data[i].talkImages[p].height = (data.data[i].talkImages[p].height * (that.data.windowWidth * 0.485 * 0.94)) / data.data[i].talkImages[p].width;
          data.data[i].talkImages[p].width = that.data.windowWidth * 0.485 * 0.94;
        }
      }
      guanzhupageCount = this.getPageCount(data.count, guanzhulimit);
      guanzhuend = 2;
      //计算图片总高度
      var temp = data.data;
      if (data.data.length == 1) {
        guanzhuleftHight = data.data[0].talkImages[0].height;
        guanzhurightHight = 0;
        guanzhuleftList.push(temp[0]);
      } else if (data.data.length > 1) {
        guanzhuleftHight = data.data[0].talkImages[0].height;
        guanzhurightHight = data.data[1].talkImages[0].height;
        guanzhuleftList.push(temp[0]);
        guanzhurightList.push(temp[1]);

        for (var j = 2; j < data.data.length; j++) {
          if (guanzhuleftHight == guanzhurightHight) { //第1个item放左边
            guanzhuleftList.push(temp[j]);

            guanzhuleftHight = guanzhuleftHight + temp[j].talkImages[0].height;
          } else if (guanzhuleftHight < guanzhurightHight) {
            guanzhuleftList.push(temp[j]);

            guanzhuleftHight = guanzhuleftHight + temp[j].talkImages[0].height;
          } else {
            guanzhurightList.push(temp[j]);

            guanzhurightHight = guanzhurightHight + temp[j].talkImages[0].height;
          }
        }
      }

      this.setData({
        guanzhuleftData: guanzhuleftList,
        guanzhurightData: guanzhurightList
      })
    }, res => {})
  },
  //计算总页数
  getPageCount: function(totalCount, pageSize) {
    var p = totalCount / pageSize;
    return Math.ceil(p);
  },
  //关注数量提示
  talkFlowCount: function() {
    Model.talkFlowCount(app.globalData.openId, data => {
      console.log('关注数量');
      console.log(data);
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.clearOut();
    if (app.globalData.openId) {

      // 关注数量提示
      this.talkFlowCount();
    } else {
      app.getToken().then(res => {

        // 关注数量提示
        this.talkFlowCount();
      })
    }
  },
  //初始化数据
  clearOut: function() {
    leftHight = 0;
    rightHight = 0;
    leftList = [];
    rightList = [];
  },
  //初始化数据
  guanzhuclearOut: function() {
    guanzhuleftHight = 0;
    guanzhurightHight = 0;
    guanzhuleftList = [];
    guanzhurightList = [];
  },
  //导航栏切换
  menutap: function(e) {

    this.setData({
      tapcurrent: e.currentTarget.dataset.current
    });
  },

  //文章详情页跳转
  gotofindDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    var categoryId = e.currentTarget.dataset.categoryid;

    wx.navigateTo({
      url: '../findDetail/findDetail?id=' + id + '&categoryId=' + categoryId,
    })
  },

  //关注列表跳转
  gotoguanzhu: function() {
    wx.navigateTo({
      url: '../guanzhu/guanzhu?openId=' + this.data.openId,
    })
  },
  //粉丝列表跳转
  gotozan: function() {
    wx.navigateTo({
      url: '../zan/zan?openId=' + this.data.openId,
    })
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
})