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
    youhuidata: [],
    zengsongdata: [],
    selectxing: 0,
    selectxings: 0,
    selectyue: 0,
    isdisplay: false,
    goodsData: [],
    Furl: getApp().globalData.Serverurl,
    getTime: [],
    month: [],
    week: [],
    yueprice: 0,
    jiaprice: 0,
    goodsId: '',
    getTimeTitle: '',
    getTimeValue: '',
    goumaiBtnStatus: true, //立即购买按钮状态(初始不能点击，等数据加载完才能点击)
    querenBtnStatus: true, //确认按钮状态
    shouhuaTime: '',
    isCollection: false,
    soldOut: '0' //是否售完
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度 
    var winHgt = wx.getSystemInfoSync().windowHeight; //获取当前屏幕的宽度 
    this.setData({
      windowWidth: winWid,
      windowHeight: winHgt,
      goodsId: options.id
    })
    // console.log(options.id);
    if (app.globalData.openId) {
      //获取商品详情
      this.getGoodsById(options.id);
      //计算收花日期
      this.getdate(0);
      //判断商品是否被收藏
      this.hasGoodsCollection(options.id);
    } else {
      app.getToken().then(data => {
        //获取商品详情
        this.getGoodsById(options.id);
        //计算收花日期
        this.getdate(0);
        //判断商品是否被收藏
        this.hasGoodsCollection(options.id);
      });
    }

  },
  //判断商品是否被收藏
  hasGoodsCollection: function(goodsId) {
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
    }, res => {})
  },
  //跳转商城首页
  gotomall: function() {
    // wx.switchTab({
    //   url: '../mall/mall',
    // })
  },
  //商品收藏点击事件
  doCollect: function() {
    if (this.data.isCollection) { //已经收藏
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
  goodsCollection: function() {
    Model.goodsCollection(this.data.goodsId, app.globalData.openId, data => {
      console.log('收藏');
      console.log(data);
    }, res => {})
  },
  //商品取消收藏
  cancleGoodsCollection: function() {
    Model.cancleGoodsCollection(this.data.goodsId, app.globalData.openId, data => {
      console.log('取消收藏');
      console.log(data);
    }, res => {})
  },
  //获取img路径
  getimgsrc: function(htmlstr) {
    var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    var imgsrcArr = [];
    var tem = reg.exec(htmlstr);
    console.log(tem);
    while (tem = reg.exec(htmlstr)) {
      imgsrcArr.push(tem[2]);
    }
    // imgsrcArr.push(reg.exec(htmlstr));
    return imgsrcArr;
  },
  //获取商品详情
  getGoodsById: function(goodsId) {
    // console.log('详情页' + goodsId)
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    Model.getGoodsById(goodsId, data => {

      console.log(data.data);
      var imgStr = that.getimgsrc(data.data.goods.goodsDetails);
      console.log(imgStr);
      data.data.goods.topimgs = data.data.goods.playImg.split(',');

      this.setData({
        goodsData: data.data.goods,
        getTime: data.data.getTime,
        month: data.data.month,
        week: data.data.week,
        yueprice: data.data.month[0].currentPrice,
        oldprice: data.data.month[0].price,
        yuepriceNew: data.data.month[0].currentPrice + '-' + data.data.month[data.data.month.length - 1].currentPrice,
        oldpriceNew: data.data.month[0].price + '-' + data.data.month[data.data.month.length - 1].price,
        monthId: data.data.month[0].id,
        sendWeekTypeTitle: data.data.week[0].name,
        sendWeekTypeValue: data.data.week[0].value,
        selectxings: data.data.week[0].value,
        getTimeTitle: data.data.getTime[0].name,
        getTimeValue: '1',
        soldOut: data.data.goods.soldOut

      })
      if (data.data.month) {
        this.setData({
          selectyueData: data.data.month[0].name,
        })
      }
      if (data.data.getTime) {
        this.setData({
          selectxingData: data.data.getTime[0].name,
        })
      }
      if (data.data.week) {
        this.setData({
          selectxingsData: data.data.week[0].name,
        })
      }
      // console.log(this.data.goodsData);
      if (data.data.goods.goodsDetails) {
        WxParse.wxParse('goodsDetail', 'html', data.data.goods.goodsDetails, that, 5);
      }


      //根据商品id查加购列表
      this.getAddBuyList(goodsId);

    }, res => {})
  },
  //根据商品id查加购列表
  getAddBuyList: function(goodsId) {
    var that = this;
    Model.getAddBuyList(goodsId, data => {
      if (data.status == 200) {
        if (data.data.length > 0) {
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
    }, res => {})
  },
  //根据商品id查赠品列表
  getGoodsGiftList: function(goodsId) {
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
    }, res => {})
  },


  gotomall: function() {
    wx.switchTab({
      url: '../mall/mall',
    })
  },
  buynow: function() {
    var that = this;
    //防止重复点击
    if (this.data.goumaiBtnStatus) return;
    that.setData({
      goumaiBtnStatus: true,
      hidetag: false,
    })
  },
  hidebuynow: function() {
    var that = this;
    that.setData({
      hidetag: true,
      goumaiBtnStatus: false,
      querenBtnStatus: false
    })
  },
  myCatchTouch: function() {
    return;
  },
  //提交下单商品数据
  gotoconfirmOrder: function() {
    if (this.data.soldOut == '1') {
      wx.showToast({
        title: '该商品已售完！',
        icon:'none'
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
    var jiagoucount = 0;
    if (this.data.youhuidata) {
      if (this.data.youhuidata.length > 0) {
        for (let i = 0; i < this.data.youhuidata.length; i++) {
          if (this.data.youhuidata[i].selected) {
            addBuyId += this.data.youhuidata[i].id + ',';
            addBuyTitle += this.data.youhuidata[i].name + ',';
            jiagoucount += 1;
          }
        }
        addBuyId = addBuyId.substring(0, addBuyId.length - 1);
        addBuyTitle = addBuyTitle.substring(0, addBuyTitle.length - 1);
      }
    }
    // 商品总件数
    var buyCount = 1;
    //周一收花或周六收花
    var getTimeTitle = this.data.getTimeTitle;
    var getTimeValue = this.data.getTimeValue;
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

    //商品id
    var goodsId = this.data.goodsId;
    //选中订几个月的ID
    var monthId = this.data.monthId
    //openId
    var openId = app.globalData.openId;
    //每周配送或隔周配送
    var sendWeekTypeTitle = this.data.sendWeekTypeTitle;
    var sendWeekTypeValue = this.data.sendWeekTypeValue;
    //支付总金额yueprice+jiaprice
    var totalPrice = this.data.yueprice + this.data.jiaprice;
    // //优惠券id
    // var couponId = app.globalData.selectedCoupon.id;
    //套餐商品信息
    var goodsData = this.data.goodsData;
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
    //商品价格
    var goodsprice = this.data.yueprice;
    //商品选择信息
    var goodsMessage = this.data.selectyueData + ',' + this.data.selectxingData + ',' + this.data.selectxingsData;

    //将下单数据存进全局变量taocanGoodsData
    app.globalData.taocanGoodsData.addBuyId = addBuyId;
    app.globalData.taocanGoodsData.addBuyTitle = addBuyTitle;
    app.globalData.taocanGoodsData.buyCount = buyCount;
    app.globalData.taocanGoodsData.getTimeTitle = getTimeTitle;
    app.globalData.taocanGoodsData.getTimeValue = getTimeValue;
    app.globalData.taocanGoodsData.giftId = giftId;
    app.globalData.taocanGoodsData.giftTitle = giftTitle;
    app.globalData.taocanGoodsData.goodsId = goodsId;
    app.globalData.taocanGoodsData.monthId = monthId;
    app.globalData.taocanGoodsData.openId = openId;
    app.globalData.taocanGoodsData.sendWeekTypeTitle = sendWeekTypeTitle;
    app.globalData.taocanGoodsData.sendWeekTypeValue = sendWeekTypeValue;
    app.globalData.taocanGoodsData.totalPrice = totalPrice;
    app.globalData.taocanGoodsData.goodsData = goodsData;
    app.globalData.taocanGoodsData.jiagougoodsData = jiagougoodsData;
    app.globalData.taocanGoodsData.zengsonggoodsData = zengsonggoodsData;
    app.globalData.taocanGoodsData.goodsprice = goodsprice;
    app.globalData.taocanGoodsData.goodsMessage = goodsMessage;
    this.setData({
      querenBtnStatus: false
    })
    wx.navigateTo({
      url: '../confirmOrder/confirmOrder',
    })
  },
  // 优惠
  selectoption: function(e) {
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
  // 赠送
  selectoptions: function(e) {
    var index = e.currentTarget.dataset.index;
    var temp = this.data.zengsongdata;
    for (var i = 0; i < temp.length; i++) {
      if (i == index) {
        temp[i].selected = !temp[i].selected;
      }
      this.setData({
        zengsongdata: temp
      })
    }
  },
  // 订几个月
  selectyue: function(e) {
    var index = e.currentTarget.dataset.index;
    var data = e.currentTarget.dataset.data;
    var price = e.currentTarget.dataset.price;
    var oldprice = e.currentTarget.dataset.oldprice;
    var id = e.currentTarget.dataset.id;
    this.setData({
      selectyue: index,
      selectyueData: data,
      yueprice: price,
      monthId: id,
      oldprice: oldprice
    })

  },
  // 收花时间
  selectxing: function(e) {
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
  getdate: function(index) {
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
  //获取当前时间
  getNowTime: function() {
    var d = new Date();
    var year = d.getFullYear();
    var month = change(d.getMonth() + 1);
    var day = change(d.getDate());
    var hour = change(d.getHours());
    var minute = change(d.getMinutes());
    var second = change(d.getSeconds());

    function change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    }
    var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return time;
  },
  //获取n天后时间
  getaffterTime: function(n) {
    var date1 = new Date(),

      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间

    var date2 = new Date(date1);

    date2.setDate(date1.getDate() + n);

    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

    return time2;
  },
  // 配送星期
  selectxings: function(e) {
    var index = e.currentTarget.dataset.index;
    var data = e.currentTarget.dataset.data;
    console.log(data);
    this.setData({
      selectxings: index,
      selectxingsData: data,
      sendWeekTypeTitle: data
    })
    if (index == 0) {
      this.setData({
        sendWeekTypeValue: '0'
      })
    } else {
      this.setData({
        sendWeekTypeValue: '1'
      })
    }
  },
  dakaimian: function() {
    this.setData({
      isdisplay: !this.data.isdisplay
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
    app.globalData.selectedCoupon = null;
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