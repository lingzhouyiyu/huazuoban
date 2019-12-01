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
    selectyue: 0,
    hidetag: true,
    isdisplay: false,
    goodsData: [],
    Furl: getApp().globalData.Serverurl,
    goodsId: '',
    goumaiBtnStatus: true, //立即购买按钮状态(初始不能点击，等数据加载完才能点击)
    querenBtnStatus: true, //确认按钮状态
    chosedAttrId: '',
    productData: [],
    productName: '产品',
    buyCount: 1,
    productPrice: 0,
    selectproduct: '',
    chooseProduct: '',
    youhuidata: [],
    zengsongdata: [],
    jiaprice: 0,
    selectxing: 0,
    getTimeTitle: '',
    getTimeValue: '',
    isCollection: false,
    soldOut:'0'
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
    //获取商品详情
    this.getGoodsById(options.id);
    //计算收花日期
    this.getdate(0);
    //判断商品是否被收藏
    this.hasGoodsCollection(options.id);

  },
  //跳转商城首页
  gotomall: function () {
    // wx.switchTab({
    //   url: '../mall/mall',
    // })
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
  //获取商品详情
  getGoodsById: function(goodsId) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    Model.getGoodsById(goodsId, data => {
      console.log("商品详情");
      console.log(data.data);
      data.data.goods.topimgs = data.data.goods.playImg.split(',');

      this.setData({
        goodsData: data.data.goods,
        getTime: data.data.getTime,
        soldOut: data.data.goods.soldOut
      })
      if (data.data.aloneAttrs) {
        if (data.data.aloneAttrs.length > 0) {
          this.setData({
            productData: data.data.aloneAttrs[0].attr,
            productName: data.data.aloneAttrs[0].name,
            selectproduct: data.data.aloneAttrs[0].attr[0].attrOptionalName,
            productPrice: data.data.aloneAttrs[0].attr[0].currentOptionalPrice,
            oldPrice: data.data.aloneAttrs[0].attr[0].attrOptionalPrice,
            chosedAttrId: data.data.aloneAttrs[0].attr[0].id,
            chooseProduct: data.data.aloneAttrs[0].attr[0]
          })
        }
      }
      if (data.data.getTime) {
        this.setData({
          getTimeTitle: data.data.getTime[0].name,
          getTimeValue: '1'
        })
      }
      if (data.data.goods.goodsDetails){
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
      // console.log(data);
      if (data.status == 200) {
        if (data.data.length > 0) {
          if (data.data > 0) {
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
        }
        //根据商品id查赠品列表
        this.getGoodsGiftList(goodsId);
      }

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
  // 优惠加购选择
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
    //商品总件数   
    var buyCount = this.data.buyCount;
    //商品选择属性id
    var chosedAttrId = this.data.chosedAttrId;

    //商品id
    var goodsId = this.data.goodsId;
    //openId
    var openId = app.globalData.openId;
    //产品价格
    var price = this.data.productPrice;
    //选择的商品信息
    var chooseProduct = this.data.chooseProduct;
    //商品信息
    var goodsData = this.data.goodsData;
    //加购商品总价格
    var jiaprice = this.data.jiaprice;
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
    //周一收花或周六收花
    var getTimeTitle = this.data.getTimeTitle;
    var getTimeValue = this.data.getTimeValue;
    //将下单数据存进全局变量aloneGoodsData
    app.globalData.aloneGoodsData.buyCount = buyCount;
    app.globalData.aloneGoodsData.chosedAttrId = chosedAttrId;
    app.globalData.aloneGoodsData.goodsId = goodsId;
    app.globalData.aloneGoodsData.openId = openId;
    app.globalData.aloneGoodsData.price = price;
    app.globalData.aloneGoodsData.chooseProduct = chooseProduct;
    app.globalData.aloneGoodsData.goodsData = goodsData;
    app.globalData.aloneGoodsData.jiaprice = jiaprice;
    app.globalData.aloneGoodsData.jiagougoodsData = jiagougoodsData;
    app.globalData.aloneGoodsData.zengsonggoodsData = zengsonggoodsData;
    app.globalData.aloneGoodsData.addBuyId = addBuyId;
    app.globalData.aloneGoodsData.giftId = giftId;
    app.globalData.aloneGoodsData.addBuyTitle = addBuyTitle;
    app.globalData.aloneGoodsData.giftTitle = giftTitle;
    app.globalData.aloneGoodsData.getTimeTitle = getTimeTitle;
    app.globalData.aloneGoodsData.getTimeValue = getTimeValue;
    // console.log(app.globalData.aloneGoodsData);
    // return;
    this.setData({
      querenBtnStatus: false
    })
    wx.navigateTo({
      url: '../confirmOrderalone/confirmOrderalone',
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

  // 选择产品
  selectyue: function(e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var selectproduct = e.currentTarget.dataset.name;
    var productPrice = e.currentTarget.dataset.price;
    var oldprice = e.currentTarget.dataset.oldprice;
    this.setData({
      selectyue: index,
      chosedAttrId: id,
      selectproduct: selectproduct,
      productPrice: productPrice,
      oldPrice: oldprice
    })
    var temp = this.data.productData;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id == id) {
        this.setData({
          chooseProduct: temp[i]
        })
      }
    }
  },


  dakaimian: function() {
    this.setData({
      isdisplay: !this.data.isdisplay
    })
  },

  //输入购买数量
  ordercounts: function(e) {
    this.setData({
      buyCount: e.detail.value
    })
  },
  //减少数量
  countsub: function() {
    var that = this;
    if (that.data.buyCount != 1) {
      that.setData({
        buyCount: that.data.buyCount - 1,
      })
    }
  },
  //增加数量
  countadd: function() {
    var that = this;
    that.setData({
      buyCount: that.data.buyCount + 1,
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
  //获取n天后时间
  getaffterTime: function(n) {
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