import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
const app = getApp()
// pages/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    windowHeight: 0,
    hidetag: true,
    isdisplay: false,
    goodsData: [],
    Furl: getApp().globalData.Serverurl,
    goodsId: '',
    goumaiBtnStatus: true,//立即购买按钮状态(初始不能点击，等数据加载完才能点击)
    querenBtnStatus: true,//确认按钮状态  
    buyCount: 1,
    issingle: true,
    productPrice:0,
    tuanprice:0,
    singleprice: 0,
    oldPrice: 0,
    youhuidata: [],
    zengsongdata: [],
    jiaprice: 0,
    selectxing: 0,
    getTimeTitle: '',
    getTimeValue: '',
    isCollection: false,
    teamSize:3,
    activeStatus: '0',
    limitCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度 
    var winHgt = wx.getSystemInfoSync().windowHeight; //获取当前屏幕的宽度 
    this.setData({
      windowWidth: winWid,
      windowHeight: winHgt,
      goodsId: options.goodsid,
      activeId: options.id
    })
    if (app.globalData.openId) {
      //获取商品详情
      this.getActivityGoodsById(options.id, options.goodsid);
      //计算收花日期
      this.getdate(0);
      // 获取活动详情
      this.getLimitTimeById(options.id);
      //判断商品是否被收藏
      this.hasGoodsCollection(options.id);

    } else {
      app.getToken().then(data => {
        //获取商品详情
        this.getActivityGoodsById(options.id, options.goodsid);
        //计算收花日期
        this.getdate(0);
        // 获取活动详情
        this.getLimitTimeById(options.id);
        //判断商品是否被收藏
        this.hasGoodsCollection(options.id);
      });
    }
  
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var that = this;
    var shareobj = {
      title: "花作伴",
      path: 'pages/goodsDetailstao/goodsDetailstao?goodsid=' + that.data.goodsId + '&id=' + that.data.activeId,
      imgUrl: '',
      withShareTicket: true
    };
    return shareobj;
  },
  //跳转商城首页
  gotomall: function () {
    // wx.switchTab({
    //   url: '../mall/mall',
    // })
  },
  //判断商品是否被收藏
  hasGoodsCollection: function (goodsId) {
    Model.hasGoodsCollection(goodsId, app.globalData.openId, data => {
      // console.log(data);
      if (data.data == -1) {
        this.setData({
          isCollection: true
        })
      } else {
        this.setData({
          isCollection: false
        })
      }
    }, res => { })
  },
  //商品收藏点击事件
  doCollect: function () {
    if (this.data.isCollection) {//已经收藏
      this.setData({
        isCollection: !this.data.isCollection
      })
      this.cancleGoodsCollection();
    } else {
      this.setData({
        isCollection: !this.data.isCollection
      })
      this.goodsCollection();
    }


  },
  //商品收藏
  goodsCollection: function () {
    Model.goodsCollection(this.data.goodsId, app.globalData.openId, data => {
      // console.log('收藏');
      // console.log(data);
    }, res => { })
  },
  //商品取消收藏
  cancleGoodsCollection: function () {
    Model.cancleGoodsCollection(this.data.goodsId, app.globalData.openId, data => {
      console.log('取消收藏');
      console.log(data);
    }, res => { })
  },
  //获取商品详情
  getActivityGoodsById: function (id, goodsid) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    Model.getActivityGoodsById(id, goodsid, data => {
      console.log('商品信息');
      console.log(data.data);
      data.data.limitMonth.topimgs = data.data.limitMonth.playImg.split(',');

      this.setData({
        goodsData: data.data.limitMonth,
        tuanprice: data.data.limitMonth.groupPrice, 
        singleprice: data.data.limitMonth.signlePrice,  
        oldPrice: data.data.limitMonth.oldPrice,
        getTime: data.data.getTime
      })
      if (data.data.getTime) {
        this.setData({
          getTimeTitle: data.data.getTime[0].name,
          getTimeValue: '1'
        })
      }
     
      if (data.data.goods.goodsDetails) {
        WxParse.wxParse('goodsDetail', 'html', data.data.limitMonth.goodsDetails, that, 5);
      }
      //根据商品id查加购列表
      this.getAddBuyList(goodsid);
    }, res => { })
  },
  //根据商品id查加购列表
  getAddBuyList: function (goodsId) {
    var that = this;
    Model.getAddBuyList(goodsId, data => {
      // console.log(data);
      if (data.status == 200) {
        if (data.data.length>0){
          var temp = data.data;
          for (let i = 0; i < temp.length; i++) {
            if (i == 0) {
              temp[i].selected = true;
            } else {
              temp[i].selected = false;
            }
          }
          this.setData({
            youhuidata: temp,
            jiaprice: temp[0].currentPrice
          })
        }       
        //根据商品id查赠品列表
        this.getGoodsGiftList(goodsId);
      }
      // console.log(that.data.youhuidata);
    }, res => { })
  },
  //根据商品id查赠品列表
  getGoodsGiftList: function (goodsId) {
    Model.getGoodsGiftList(goodsId, data => {
      // console.log(data);
      if (data.status == 200 || data.status == 555) {
        this.setData({
          zengsongdata: data.data,
          goumaiBtnStatus: false,
          querenBtnStatus: false
        })
      }    
      wx.hideLoading();
    }, res => { })
  },
  // 优惠
  selectoption: function (e) {
    this.setData({
      jiaprice: 0
    })
    var index = e.currentTarget.dataset.index;
    var temp = this.data.youhuidata;
    for (var i = 0; i < temp.length; i++) {
      if (i == index) {
        temp[i].selected = !temp[i].selected;
      }
      this.setData({
        youhuidata: temp
      })
    }
    // console.log(this.data.youhuidata);
    for (let j = 0; j < this.data.youhuidata.length; j++) {
      if (this.data.youhuidata[j].selected) {
        this.setData({
          jiaprice: this.data.jiaprice + this.data.youhuidata[j].currentPrice
        })
      }
    }
  },
  // 获取活动详情
  getLimitTimeById: function (id) {
    Model.getLimitTimeById(id, data => {
      console.log("活动信息");
      console.log(data);
      this.setData({
        teamSize: data.data.teamSize,
        activeStatus: data.data.status,
        limitCount: data.data.limitCount
      })
    }, res => { })
  },

  
  gotomall: function () {
    wx.switchTab({
      url: '../mall/mall',
    })
  },
  //点击团购购买
  buynow: function (e) {
    var that = this;
    //防止重复点击
    if (this.data.goumaiBtnStatus) return;
    var tag = e.currentTarget.dataset.tag;

    if (that.data.limitCount > 0) {
      if (tag == 'single') {
        that.setData({
          productPrice: that.data.goodsData.signlePrice,
          issingle: true,
          orderType: 1
        })
      } else if (tag == 'group') {
        that.setData({
          productPrice: that.data.goodsData.groupPrice,
          issingle: false,
          orderType: 2
        })
      }

      that.setData({
        goumaiBtnStatus: true,
        hidetag: false,
      })
    }else{
      wx.showToast({
        title: '没有库存了！',
        icon: 'none'
      })
    }
   
  },
  hidebuynow: function () {
    var that = this;
    that.setData({
      hidetag: true,
      goumaiBtnStatus: false,
      querenBtnStatus: false
    })
  },
  myCatchTouch: function () {
    return;
  },
  //提交下单商品数据
  gotoconfirmOrder: function () {
    if (this.data.activeStatus == '0') {
      wx.showToast({
        title: '活动未开始！',
        icon: 'none'
      })
      return;
    } else if (this.data.activeStatus == '2') {
      wx.showToast({
        title: '活动已结束！',
        icon: 'none'
      })
      return;
    } else if (this.data.activeStatus == '3') {
      wx.showToast({
        title: '商品已售完！',
        icon: 'none'
      })
      return;
    }
    //防止重复点击
    if (this.data.querenBtnStatus) return;
    this.setData({
      querenBtnStatus: true
    })
    //加够商品ID,以逗号分隔形式传参
    //加够商品名称,以逗号分隔形式传参
    var addBuyId = '';
    var addBuyTitle = '';
    if (this.data.youhuidata) {
      if (this.data.youhuidata.length > 0) {
        for (let i = 0; i < this.data.youhuidata.length; i++) {
          if (this.data.youhuidata[i].selected) {
            addBuyId += this.data.youhuidata[i].id + ',';
            addBuyTitle += this.data.youhuidata[i].name + ',';
          }
        }
        addBuyId = addBuyId.substring(0, addBuyId.length - 1);
        addBuyTitle = addBuyTitle.substring(0, addBuyTitle.length - 1);
      }
    }
    //赠品ID,以逗号分隔形式传参
    //赠送商品名称,以逗号分隔形式传参
    var giftId = '';
    var giftTitle = '';
    if (this.data.zengsongdata) {
      if (this.data.zengsongdata.length > 0) {
        for (let j = 0; j < this.data.zengsongdata.length; j++) {
          giftId += this.data.zengsongdata[j].id + ',';
          giftTitle += this.data.zengsongdata[j].name + ',';
        }
        giftId = giftId.substring(0, giftId.length - 1);
        giftTitle = giftTitle.substring(0, giftTitle.length - 1);
      }
    }
    //加购商品信息
    var jiagougoodsData = [];
    if (this.data.youhuidata) {
      if (this.data.youhuidata.length > 0) {
        for (let j = 0; j < this.data.youhuidata.length; j++) {
          if (this.data.youhuidata[j].selected) {
            jiagougoodsData.push(this.data.youhuidata[j])
          }
        }
      }
    }
    //赠送商品信息
    var zengsonggoodsData = [];
    if (this.data.zengsongdata) {
      if (this.data.zengsongdata.length > 0) {
        zengsonggoodsData = this.data.zengsongdata;
      }
    }
  
    //加购商品价格
    var jiaprice = this.data.jiaprice;
    //活动id
    var activityId = this.data.activeId;

    //商品总件数   
    var buyCount = this.data.buyCount;

    //商品id
    var goodsId = this.data.goodsId;
    //openId
    var openId = app.globalData.openId;
    //购买方式
    var orderType = this.data.orderType;
    //总价格
    var totalPrice = this.data.productPrice;
    //商品信息
    var goodsData = this.data.goodsData;
    //已选
    var selectedMessage='';
    if (this.data.issingle){
      selectedMessage = this.data.singleprice+'元单买';
    }else{
      selectedMessage = this.data.tuanprice + '元3人团';
    }
    //周一收花或周六收花
    var getTimeTitle = this.data.getTimeTitle;
    var getTimeValue = this.data.getTimeValue;
    //将下单数据存进全局变量taocanGoodsDatatuan
    app.globalData.taocanGoodsDatatuan.activityId = activityId;
    app.globalData.taocanGoodsDatatuan.addBuyId = addBuyId; 
    app.globalData.taocanGoodsDatatuan.addBuyTitle = addBuyTitle;
    app.globalData.taocanGoodsDatatuan.jiagougoodsData = jiagougoodsData;
    app.globalData.taocanGoodsDatatuan.zengsonggoodsData = zengsonggoodsData;
    app.globalData.taocanGoodsDatatuan.jiaprice = jiaprice;
    app.globalData.taocanGoodsDatatuan.buyCount = buyCount; 
    app.globalData.taocanGoodsDatatuan.giftId = giftId;
    app.globalData.taocanGoodsDatatuan.giftTitle = giftTitle;   
    app.globalData.taocanGoodsDatatuan.goodsId = goodsId;
    app.globalData.taocanGoodsDatatuan.openId = openId;
    app.globalData.taocanGoodsDatatuan.orderType = orderType;
    app.globalData.taocanGoodsDatatuan.totalPrice = totalPrice;
    app.globalData.taocanGoodsDatatuan.goodsData = goodsData;
    app.globalData.taocanGoodsDatatuan.selectedMessage = selectedMessage;
    app.globalData.taocanGoodsDatatuan.addBuyTitle = addBuyTitle;
    app.globalData.taocanGoodsDatatuan.giftTitle = giftTitle;
    app.globalData.taocanGoodsDatatuan.getTimeTitle = getTimeTitle;
    app.globalData.taocanGoodsDatatuan.getTimeValue = getTimeValue;
    // console.log(app.globalData.taocanGoodsDatatuan);
    // return;
    this.setData({
      querenBtnStatus: false
    })
    wx.navigateTo({
      url: '../confirmOrdertuan/confirmOrdertuan',
    })
  },


  dakaimian: function () {
    this.setData({
      isdisplay: !this.data.isdisplay
    })
  },

  // 收花时间
  selectxing: function (e) {
    var index = e.currentTarget.dataset.index;
    var data = e.currentTarget.dataset.data;

    this.setData({
      selectxing: index,
      selectxingData: data,
      getTimeTitle: data
    })
    if (index == 0) {
      this.setData({
        getTimeValue: '1'
      })
    } else {
      this.setData({
        getTimeValue: '6'
      })
    }

    //计算收花日期
    this.getdate(index);
  },
  getdate: function (index) {
    var that = this;
    var a = ["日", "一", "二", "三", "四", "五", "六"];
    var week = new Date().getDay();
    var str = a[week];
    switch (str) {
      case '一':
        if (index == 0) { //周一收花
          this.setData({
            shouhuaTime: that.getaffterTime(7),
          })
        } else if (index == 1) { //周六收花
          this.setData({
            shouhuaTime: that.getaffterTime(5),
          })
        }
        break;
      case '二':
        if (index == 0) { //周一收花
          this.setData({
            shouhuaTime: that.getaffterTime(6),
          })
        } else if (index == 1) { //周六收花
          this.setData({
            shouhuaTime: that.getaffterTime(4),
          })
        }
        break;
      case '三':
        if (index == 0) { //周一收花
          this.setData({
            shouhuaTime: that.getaffterTime(5),
          })
        } else if (index == 1) { //周六收花
          this.setData({
            shouhuaTime: that.getaffterTime(3),
          })
        }
        break;
      case '四':
        if (index == 0) { //周一收花
          this.setData({
            shouhuaTime: that.getaffterTime(4),
          })
        } else if (index == 1) { //周六收花
          this.setData({
            shouhuaTime: that.getaffterTime(9),
          })
        }
        break;
      case '五':
        if (index == 0) { //周一收花
          this.setData({
            shouhuaTime: that.getaffterTime(3),
          })
        } else if (index == 1) { //周六收花
          this.setData({
            shouhuaTime: that.getaffterTime(8),
          })
        }
        break;
      case '六':
        if (index == 0) { //周一收花
          this.setData({
            shouhuaTime: that.getaffterTime(9),
          })
        } else if (index == 1) { //周六收花
          this.setData({
            shouhuaTime: that.getaffterTime(7),
          })
        }
        break;
      case '日':
        if (index == 0) { //周一收花
          this.setData({
            shouhuaTime: that.getaffterTime(8),
          })
        } else if (index == 1) { //周六收花
          this.setData({
            shouhuaTime: that.getaffterTime(6),
          })
        }
        break;
      default:
        break;
    }

  },
  //获取n天后时间
  getaffterTime: function (n) {
    var date1 = new Date(),

      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间

    var date2 = new Date(date1);

    date2.setDate(date1.getDate() + n);

    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

    return time2;
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

  },
})