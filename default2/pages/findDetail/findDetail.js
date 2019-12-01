import {
  Class
} from '../../commonClass/find.js';

let Model = new Class();
//获取应用实例
const app = getApp()
var limit = 10;
var page = 1;
var end = 2; //上拉加载当前页
var pageCount = 0;
// pages/findDetail/findDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannersimages: ['../../images/mall/test.jpg', '../../images/mall/banner.jpg', '../../images/mall/test.jpg'],
    windowWidth: 0,
    imgwidth: 0,
    imgheight: 0,
    mytext: '从鲜花最初采摘下来到最终配送前，会经过32道保鲜处理，在确保鲜花品质的同时尽可能减少人工成本，花加向深度合作的花田明确提出要求，休眠和杀菌的预处理过程必不可少。同时，生产、运输、配送全过程也必须严格依照标准和规范进行操作处理',
    hasfocus: false,
    contentSigle: [],
    contentList: [],
    Furl: getApp().globalData.Serverurl,
    articleId: '', //分享的文章id
    nickName: '',
    avatarUrl: '',
    openId: '',
    inputValue: null,
    showModal: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      categoryId: options.categoryId,
      openId: app.globalData.openId
    })

    // 文章详情
    this.getArticleById(options.id, app.globalData.openId);

    // 文章详情列表
    this.getArticlelistByCategoryId(options.id, app.globalData.openId, options.categoryId);

    //获取元素高度
    wx.createSelectorQuery().selectAll('.flowertxt').boundingClientRect(function(rect) {

    }).exec();
    var temp = '';
    for (var i = 0; i < this.data.mytext.length; i++) {
      temp = temp + this.data.mytext[i]
      if (i == 51) {
        break;
      }
    }
    this.setData({
      mytextnew: temp + '...'
    })
    var that = this;
    //分享信息追踪
    if (options.openid != null && options.openid != '') {

    }
  },
  // 文章详情
  getArticleById: function(articleId, openId) {
    wx.showLoading({
      title: '加载中',
    })
    Model.getArticleById(articleId, openId, data => {


      // data.data.talkImages = data.data.talkImages.split(',');
      data.data.talkImages = JSON.parse(data.data.talkImages);
      if (data.data.hasPraise == '1') {
        data.data.iszan = true;
      } else {
        data.data.iszan = false;
      }
      if (data.data.hasCollection == '1') {
        data.data.isshou = true;
      } else {
        data.data.isshou = false;
      }
      data.data.islong = false;
      data.data.isShow = false;

      if (data.data.talkContent.length > 52) {
        data.data.talkContentNew = data.data.talkContent.substring(0, 52) + '...';
        data.data.islong = true;
        data.data.isShow = true;
      }
      if (data.data.comments) {
        if (data.data.comments.length > 3) {
          var tempcomment = [];
          for (var i = 0; i < 3; i++) {
            tempcomment.push(data.data.comments[i]);
          }
          data.data.comments = tempcomment;
        }
      }

      this.setData({
        contentSigle: data.data
      })
      console.log(this.data.contentSigle);
      wx.hideLoading();
    }, res => {});
  },
  // 文章详情列表
  getArticlelistByCategoryId: function(articleId, openId, categoryId) {
    Model.getArticlelistByCategoryId(articleId, openId, categoryId, limit, page, data => {
      // console.log(data);

      for (var i = 0; i < data.data.length; i++) {
        // data.data[i].talkImages = data.data[i].talkImages.split(',');
        data.data[i].talkImages = JSON.parse(data.data[i].talkImages);
        if (data.data[i].hasPraise == '1') {
          data.data[i].iszan = true;
        } else {
          data.data[i].iszan = false;
        }
        if (data.data[i].hasCollection == '1') {
          data.data[i].isshou = true;
        } else {
          data.data[i].isshou = false;
        }
        data.data[i].islong = false;
        data.data[i].isShow = false;

        if (data.data[i].talkContent.length > 52) {
          data.data[i].talkContentNew = data.data[i].talkContent.substring(0, 52) + '...';
          data.data[i].islong = true;
          data.data[i].isShow = true;
        }
        if (data.data[i].comments) {
          if (data.data[i].comments.length > 3) {
            var tempcomment = [];
            for (var j = 0; j < 3; j++) {
              tempcomment.push(data.data[i].comments[j]);
            }
            data.data[i].comments = tempcomment;
          }
        }

      }
      this.setData({
        contentList: data.data
      })
    }, res => {});
  },
  // 文章详情文字展开收起
  topclickpackup: function() {
    if (!this.data.contentSigle.isShow) return;
    var temp = this.data.contentSigle;
    temp.islong = !temp.islong;
    this.setData({
      contentSigle: temp
    })
  },
  //文章详情列表文字展开收起
  clickpackup: function(e) {
    var id = e.currentTarget.dataset.id;
    var temp = this.data.contentList;
    for (let i = 0; i < temp.length; i++) {
      if (id == temp[i].id) {
        if (!temp[i].isShow) return;
        temp[i].islong = !temp[i].islong;
      }
    }
    this.setData({
      contentList: temp
    })
  },

  imgHeight: function(e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度   
    var imgh = e.detail.height; //图片高度   
    var imgw = e.detail.width; //图片宽度   
    var swiperH = winWid * imgh / imgw + "px";

    this.setData({
      Height: swiperH, //设置高度 
      windowWidth: winWid
    })
  },




  //评论输入框点击
  getfocus: function(e) {
    
    var that = this;
    var temp = e.detail.height;
    if (app.globalData.authCode) { //已经授权
      this.setData({
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl
      })
      //已经授权用户可以评论
      that.setData({
        hasfocus: true
      })
    } else {
      //判断用户是否授权
      this.getSetting();
    }

  },
  //评论输入框失去焦点
  losefocus: function(e) {
    this.setData({
      hasfocus: false
    })
  },
  //添加评论
  addSaveComment: function(e) {
    var that = this;
    that.setData({
      hasfocus: false
    })

    var replyContent = e.detail.value;
    if (!replyContent) {
      wx.showToast({
        title: '内容不能为空！',
        icon: 'none'
      })
      return;
    }
    var openId = app.globalData.openId;
    var articleId = e.currentTarget.dataset.id;
    var nickImage = this.data.avatarUrl;
    var nickName = this.data.nickName;

    // 添加页面上的临时数据
    var tag = e.currentTarget.dataset.tag;
    var tempcontent = {
      'nickName': nickName,
      'replyContent': replyContent
    }
    if (tag == 'single') {
      var temp = this.data.contentSigle;
      if (!temp.comments){        
        temp.comments = [];
        temp.comments.push(tempcontent);
        
      }else{       
        temp.comments.push(tempcontent);
      }
      temp.commentCount = temp.commentCount+1;    
      this.setData({
        contentSigle: temp
      })
    } else if (tag == 'group') {
      var temp = this.data.contentList;
      for (var i = 0; i < temp.length; i++) {
        if (articleId == temp[i].id) {
          if (!temp[i].comments) {
            temp[i].comments = [];
            temp[i].comments.push(tempcontent);
          }else{
            temp[i].comments.push(tempcontent);
          }  
          temp[i].commentCount = temp[i].commentCount + 1;         
          break;
        }
      }
      this.setData({
        contentList: temp
      })
    }
    //添加评论
    Model.addSaveComment(articleId, nickImage, nickName, openId, replyContent, data => {
      console.log(data);
      this.setData({
        inputValue: ''
      })
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
                  //已经授权用户可以评论
                  that.setData({
                    hasfocus: true
                  })
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
  gotominecenter: function(e) {
    var openId = e.currentTarget.dataset.openid;
    var nickName = e.currentTarget.dataset.nickname;
    var avatarUrl = e.currentTarget.dataset.avatarurl;
    wx.navigateTo({
      url: '../mineCenter/mineCenter?tag=find' + '&openId=' + openId + '&nickName=' + nickName + '&avatarUrl=' + avatarUrl,
    })
  },
  //评论详情
  gotocommentDetail: function(e) {
    var articleId = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../commentDetai/commentDetai?articleId=' + articleId,
    })
  },
  //点赞接口
  findzan: function(articleId, openId) {
    Model.praiseClickArticle(articleId, openId, data => {

    }, res => {})
  },
  //取消点赞接口
  findzancancel: function(articleId, openId) {
    Model.canclePraiseClickArticle(articleId, openId, data => {

    }, res => {})
  },
  //第一条赞点击
  zanclick: function() {
    var temp = this.data.contentSigle;
    var id = temp.id;
    temp.iszan = !temp.iszan;
    if (temp.iszan) {
      this.findzan(id, app.globalData.openId);
      temp.praiseCount += 1;
    } else {
      this.findzancancel(id, app.globalData.openId);
      temp.praiseCount -= 1;
    }
    this.setData({
      contentSigle: temp
    })
  },

  //其他赞点击
  otherzanclick: function(e) {
    var id = e.currentTarget.dataset.id;
    var temp = this.data.contentList;
    for (let i = 0; i < temp.length; i++) {
      if (id == temp[i].id) {
        temp[i].iszan = !temp[i].iszan;
        if (temp[i].iszan) {
          this.findzan(id, app.globalData.openId);
          temp[i].praiseCount += 1;
        } else {
          this.findzancancel(id, app.globalData.openId);
          temp[i].praiseCount -= 1;
        }
      }
    }
    this.setData({
      contentList: temp
    })
  },
  //收藏接口
  articleCollection: function(articleId, openId) {
    Model.articleCollection(articleId, openId, data => {
      // console.log(data)
    }, res => {})
  },
  //取消收藏接口
  cancleArticleCollection: function(articleId, openId) {
    Model.cancleArticleCollection(articleId, openId, data => {
      // console.log(data)
    }, res => {})
  },
  //第一条收藏点击
  shouclick: function(e) {
    var temp = this.data.contentSigle;
    var articleId = e.currentTarget.dataset.id;
    var openId = app.globalData.openId;
    temp.isshou = !temp.isshou;
    if (temp.isshou) {
      temp.collectCount += 1;
      //  收藏      
      this.articleCollection(articleId, openId)
    } else {
      // 取消收藏      
      this.cancleArticleCollection(articleId, openId)
      temp.collectCount -= 1;
    }
    this.setData({
      contentSigle: temp
    })
  },
  //其他收藏点击
  othershouclick: function(e) {
    var id = e.currentTarget.dataset.id;
    var openId = app.globalData.openId;
    var temp = this.data.contentList;
    for (let i = 0; i < temp.length; i++) {
      if (id == temp[i].id) {
        temp[i].isshou = !temp[i].isshou;
        if (temp[i].isshou) {
          temp[i].collectCount += 1;
          //  收藏      
          this.articleCollection(id, openId)
        } else {
          // 取消收藏      
          this.cancleArticleCollection(id, openId)
          temp[i].collectCount -= 1;
        }
      }
    }
    this.setData({
      contentList: temp
    })
  },
  //关注接口
  guanzhu: function(articleId, openId) {
    Model.articleFollow(articleId, openId, data => {

    }, res => {})
  },
  //取消关注接口
  guanzhucancel: function(articleId, openId) {
    Model.cancleFollow(articleId, openId, data => {

    }, res => {})
  },
  //第一条文章关注
  articleFollow: function(e) {
    var articleId = e.currentTarget.dataset.openid;
    var openId = app.globalData.openId;
    var temp = this.data.contentSigle;
    if (temp.hasFollow == '0') {
      temp.hasFollow = '1'
      //关注     
      this.guanzhu(articleId, openId)
    } else if (temp.hasFollow == '1') {
      temp.hasFollow = '0'
      // 取消关注   
      this.guanzhucancel(articleId, openId)
    }
    this.setData({
      contentSigle: temp
    })
  },
  //其他关注点击
  otherarticleFollow: function(e) {
    var articleId = e.currentTarget.dataset.openid;
    var openId = app.globalData.openId;
    var temp = this.data.contentList;
    // var id = e.currentTarget.dataset.id;
    var tag = 0;
    for (let i = 0; i < temp.length; i++) {
      if (articleId == temp[i].openId) {
        tag++;
        if (temp[i].hasFollow == '0') {
          temp[i].hasFollow = '1'
          if (tag == 1) {
            //关注     
            this.guanzhu(articleId, openId)
          }

        } else if (temp[i].hasFollow == '1') {
          temp[i].hasFollow = '0'
          if (tag == 1) {
            // 取消关注   
            this.guanzhucancel(articleId, openId)
          }

        }
      }
    }
    this.setData({
      contentList: temp
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    var that = this;
    var openid = app.globalData.openId;
    var id = e.target.dataset.id; //文章id
    // console.log('文章id' + id);
    // console.log('分类id' + this.data.categoryId);
    // console.log('分享着openid' + openid);
    var shareobj = {
      title: "我的作品",
      path: 'pages/findDetail/findDetail?shareId=' + openid + '&id=' + id + '&categoryId=' + this.data.categoryId,
      imgUrl: '',
      withShareTicket: true
    };
    return shareobj;
  },
  getshareid: function(e) {

    this.setData({
      articleId: e.currentTarget.dataset.id
    })

    Model.shareArticle(e.currentTarget.dataset.id, app.globalData.openId, data => {
      // console.log(data);
    }, res => {})
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
    // wx.switchTab({
    //   url: '../find/find',
    // })   
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