import {
  Class
} from '../../commonClass/find.js';

let Model = new Class();

//获取应用实例
const app = getApp();
var limit = 10;
var page = 1;
var end = 2; //上拉加载当前页
var pageCount = 0;
var guanzhulimit = 10;
var guanzhupage = 1;
var guanzhuend = 2; //上拉加载当前页
var guanzhupageCount = 0;
var Fkeyworlds='';
//计算图片总高度
var leftHight = 0;
var rightHight = 0;
var leftList = [];
var rightList = [];
var guanzhuleftHight = 0;
var guanzhurightHight = 0;
var guanzhuleftList = [];
var guanzhurightList = [];
// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapcurrent: 0,
    Hotdata: '12345',
    bannersimages: ['../../images/mall/banner.jpg', '../../images/mall/banner.jpg', '../../images/mall/banner.jpg'],
    inputdistance: 0,
    tabbarHight: 0,
    windowWidth: 0,
    windowheight: 0,
    realImgWidth: 0,
    realImgHeight: 0,
    findList: [],
    isShow: false,
    Furl: getApp().globalData.Serverurl,
    followList: [],
    leftData: [],
    rightData: [],
     guanzhuleftData: [],
    guanzhurightData: [],
    searchTxt:''
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

    if (app.globalData.openId) {
      // 发现列表
      this.findLists();
      // 关注列表
      this.followList();
    } else {
      app.getToken().then(res => {
        // 发现列表
        this.findLists();
        // 关注列表
        this.followList();
      })
    }
    //发现搜索框提示文字
    this.getShowText();
  },
  //发现搜索框提示文字
  getShowText:function(){
    Model.getShowText('1',data=>{
      console.log(data);
      this.setData({
        searchTxt: data.data[0].talkShow
      })
    },res=>{})
  },
  //发现列表(初次加载)
  findLists: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    Model.list(Fkeyworlds,limit, page, app.globalData.openId, data => {
      // 隐藏加载框
      wx.hideLoading();
      // console.log('初次加载');
      // console.log(data);
      // return;
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
      //计算图片总高度
      leftHight = data.data[0].talkImages[0].height;
      rightHight = data.data[1].talkImages[0].height;
      var temp = data.data;
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
      this.setData({
        findList: data.data,
        isShow: true,
        leftData: leftList,
        rightData: rightList
      })
      console.log(leftList);
    }, res => {})
  },
  //发现列表(刷新)
  findList: function() {
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.clearOut();
    Model.list(Fkeyworlds,limit, page, app.globalData.openId, data => {
 
      // console.log('刷新');
      // console.log(data);
      // return;
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
      //计算图片总高度
      leftHight = data.data[0].talkImages[0].height;
      rightHight = data.data[1].talkImages[0].height;
      var temp = data.data;

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
      this.setData({
        findList: data.data,
        isShow: true,
        leftData: leftList,
        rightData: rightList
      })

    }, res => {})
  },
  //发现列表加载
  findListLoad: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    Model.list(Fkeyworlds,limit, end, app.globalData.openId, data => {
      // 隐藏加载框
      wx.hideLoading();
      var temp = [];

      pageCount = this.getPageCount(data.count, limit);
      if (end > pageCount) {} else {
        end = end + 1;

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
          temp.push(data.data[i]);
        }
        for (var j = 0; j < temp.length; j++) {

          if (leftHight == rightHight) {
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
        this.setData({
          findList: temp,
          leftData: leftList,
          rightData: rightList
        })
      }
      
    }, res => {})
  },
  //计算总页数
  getPageCount: function(totalCount, pageSize) {
    var p = totalCount / pageSize;
    return Math.ceil(p);
  },
  // 关注列表
  followList() {
    var that = this;
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.guanzhuclearOut();
    Model.getFollowtList(guanzhulimit, guanzhupage, app.globalData.openId, data => {
    
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
      guanzhuleftHight = data.data[0].talkImages[0].height;
      guanzhurightHight = data.data[1].talkImages[0].height;
      var temp = data.data;

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
      this.setData({
        followList: data.data,
        guanzhuleftData: guanzhuleftList,
        guanzhurightData: guanzhurightList
      })
    
    }, res => {})
  },
  //关注列表加载
  followListLoad: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    Model.getFollowtList(guanzhulimit, guanzhuend, app.globalData.openId, data => {
      // 隐藏加载框
      wx.hideLoading();
      var temp = [];

      guanzhupageCount = this.getPageCount(data.count, guanzhulimit);
      if (guanzhuend > guanzhupageCount) { } else {
        guanzhuend = guanzhuend + 1;

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
          temp.push(data.data[i]);
        }
        for (var j = 0; j < temp.length; j++) {

          if (guanzhuleftHight == guanzhurightHight) {
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
        this.setData({
          followList: temp,
          guanzhuleftData: leftList,
          guanzhurightData: rightList
        })
      }
     
    }, res => {})
  },
  imgHeight: function(e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度   
    var imgh = e.detail.height; //图片高度   
    var imgw = e.detail.width; //图片宽度   
    var swiperH = winWid * imgh / imgw + "px";
    this.setData({
      Height: swiperH, //设置高度 
    })
    var trullyimgwidth = winWid * 0.94 * 0.485;
    var trullyimgheight = trullyimgwidth * imgh / imgw;
    if (trullyimgheight < 160) {
      this.setData({
        realImgWidth: 160 * imgw / imgh,
        realImgHeight: 160
      })
    } else {
      this.setData({
        realImgWidth: trullyimgwidth,
        realImgHeight: trullyimgwidth,
      })
    }

  },
  //搜索
  search:function(e){
    Fkeyworlds=e.detail.value;
    this.findLists();
  },
  //发现点赞
  zanclick: function(e) {
    var id = e.currentTarget.dataset.id;
    var temp1 = this.data.leftData;
    for (let i = 0; i < temp1.length; i++) {
      if (id == temp1[i].id) {
        temp1[i].iszan = !temp1[i].iszan;
        if (temp1[i].iszan) {         
          temp1[i].praiseCount += 1;
          this.findzan(id, app.globalData.openId);
        } else {          
          this.findzancancel(id, app.globalData.openId);
          temp1[i].praiseCount -= 1;
        }
        break;
      }
    }
    this.setData({
      leftData: temp1
    })
    var temp2 = this.data.rightData;
    for (let i = 0; i < temp2.length; i++) {
      if (id == temp2[i].id) {
        temp2[i].iszan = !temp2[i].iszan;
        if (temp2[i].iszan) {
         
          this.findzan(id, app.globalData.openId);
          temp2[i].praiseCount += 1;
        } else {
         
          this.findzancancel(id, app.globalData.openId);
          temp2[i].praiseCount -= 1;
        }
        break;
      }
    }
    this.setData({
      rightData: temp2
    })

 
  },
  //关注点赞
  followzanclick: function(e) {
    var id = e.currentTarget.dataset.id;
    var temp1 = this.data.guanzhuleftData;
    for (let i = 0; i < temp1.length; i++) {
      if (id == temp1[i].id) {
        temp1[i].iszan = !temp1[i].iszan;
        if (temp1[i].iszan) {
          temp1[i].praiseCount += 1;
          this.findzan(id, app.globalData.openId);
        } else {
          this.findzancancel(id, app.globalData.openId);
          temp1[i].praiseCount -= 1;
        }
        break;
      }
    }
    this.setData({
      guanzhuleftData: temp1
    })
    var temp2 = this.data.guanzhurightData;
    for (let i = 0; i < temp2.length; i++) {
      if (id == temp2[i].id) {
        temp2[i].iszan = !temp2[i].iszan;
        if (temp2[i].iszan) {
          this.findzan(id, app.globalData.openId);
          temp2[i].praiseCount += 1;
        } else {
          this.findzancancel(id, app.globalData.openId);
          temp2[i].praiseCount -= 1;
        }
        break;
      }
    }
    this.setData({
      guanzhurightData: temp2
    })

  },
  //点赞接口
  findzan: function(articleId, openId) {
    Model.praiseClickArticle(articleId, openId, data => {
  
    }, res => {})
  },
  //取消点赞接口
  findzancancel: function (articleId, openId) {
    Model.canclePraiseClickArticle(articleId, openId, data => {
     
    }, res => { })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.getSystemInfo({
      success(data) {
        that.setData({
          tabbarHight: data.screenHeight - data.windowHeight
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.clearOut();
    //发现列表
    this.findList();
  },
  //初始化数据
  clearOut: function() {
    leftHight = 0;
    rightHight = 0;
    leftList = [];
    rightList = [];
  },
  //初始化数据
  guanzhuclearOut: function () {
    guanzhuleftHight = 0;
    guanzhurightHight = 0;
    guanzhuleftList = [];
    guanzhurightList = [];
  },

  shuaxin: function() {
    if (this.data.tapcurrent == '0') {
      this.findList();
    } else if (this.data.tapcurrent == '1') {
      this.followList();
    }
  },
  jiazai: function() {
    
    if (this.data.tapcurrent == '0') {
      if (end > pageCount) return;
      this.findListLoad();
    } else if (this.data.tapcurrent == '1') {
      if (guanzhuend > guanzhupageCount) return;
      this.followListLoad();
    }
  },

  // 发现关注切换
  menutap: function(e) {

    this.setData({
      tapcurrent: e.currentTarget.dataset.current
    });
    if (this.data.tapcurrent == '0') {
      this.findList();
    } else if (this.data.tapcurrent == '1') {
      this.followList();
    }
  },

  getfocus: function(e) {
    var that = this;
    var temp = e.detail.height;

    that.setData({
      // inputdistance: e.detail.height - that.data.tabbarHight
    })

  },
  losefocus: function() {
    var that = this;
    that.setData({

    })
  },
  gotofindDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    var categoryId = e.currentTarget.dataset.categoryid;
    Model.articleLookHistory(id,app.globalData.openId,data=>{
     
    },res=>{})
    wx.navigateTo({
      url: '../findDetail/findDetail?id=' + id + '&categoryId=' + categoryId,
    })
  },
  gotoadd: function() {
    wx.switchTab({
      url: '../add/add',
    })

  },
  //个人主页
  gotomineCenter: function(e) {
    var openId=e.currentTarget.dataset.openid;
    var nickName = e.currentTarget.dataset.nickname;
    var avatarUrl = e.currentTarget.dataset.avatarurl;
    wx.navigateTo({
      url: '../mineCenter/mineCenter?tag=find' + '&openId=' + openId + '&nickName=' + nickName + '&avatarUrl=' + avatarUrl,
    })
  },
  gotomineCenters: function () {
    wx.navigateTo({
      url: '../mineCenter/mineCenter?tag=mine',
    })
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