import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp()
//主订单分页参数
var limit = 100;
var page = 1;
//子订单分页参数
var sublimit = 100;
var subpage = 1;
// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optselect: 'listone',
    orderData: [],
    suborderData: [],
    Furl: getApp().globalData.Serverurl,
    currentOrderMainid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.tag) {
      if (options.tag == 'paySucess') {
        app.globalData.isBack = true;
      }
    }
    if (options.optselect) {
      this.setData({
        optselect: options.optselect
      })
    } else {
      this.setData({
        optselect: 'listone'
      })
    }

    if (app.globalData.openId) {
      //订单列表
      this.orderMainList(this.data.optselect);

    } else {
      app.getToken().then(data => {
        //订单列表
        this.orderMainList(this.data.optselect);

      });
    }
  },
  //查看物流
  gotologistics: function(e) {
    var tag = e.currentTarget.dataset.tag;
    if (tag == 'zi') {
      var orderNum = e.currentTarget.dataset.ordernum;
      wx.navigateTo({
        url: '../logistics/logistics?tag=zi' + '&orderNum=' + orderNum,
      })
    } else if (tag == 'zhu') {
      var orderNum = e.currentTarget.dataset.ordernum;
      var orderId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../logistics/logistics?tag=zhu' + '&orderId=' + orderId,
      })
    }

  },
  //延迟收花
  delayReceipt: function(e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '系统提示',
      content: '收货时间将向后推迟7天，确定延迟收货吗？',
      success: function(res) {
        if (res.confirm) {
          Model.delayReceipt(app.globalData.openId, id, '7', data => {
            console.log(data);
            wx.showToast({
              title: '延迟收货成功！',
            })
            //重载子订单列表
            that.orderDetailList(that.data.currentOrderMainid);
          }, res => {})
        }
      }
    })

  },
  //订单列表
  orderMainList: function(tag) {
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    Model.orderMainList(limit, page, app.globalData.openId, data => {
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].showcontenttag = false;
        if (data.data[i].addBuyCount) {
          data.data[i].addBuyCount = parseInt(data.data[i].addBuyCount);
        } else {
          data.data[i].addBuyCount = 0;
        }
        if (data.data[i].giftCount) {
          data.data[i].giftCount = parseInt(data.data[i].giftCount);
        } else {
          data.data[i].giftCount = 0;
        }

      }

      switch (tag) {
        //全部
        case 'listone':
          this.setData({
            orderData: data.data
          })
          break;
          //待付款
        case 'listtwo':
          var temp = [];
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].orderStatus == '0') {
              temp.push(data.data[i])
            }
          }
          this.setData({
            orderData: temp
          })
          break;
          //待发货
        case 'listthree':
          var temp = [];
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].orderStatus == '1') {
              temp.push(data.data[i])
            }
          }
          this.setData({
            orderData: temp
          })
          break;
          //待收货
        case 'listfour':
          var temp = [];
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].orderStatus == '2') {
              temp.push(data.data[i])
            }
          }
          this.setData({
            orderData: temp
          })
          break;
          //已完成
        case 'listfive':
          var temp = [];
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].orderStatus == '4') {
              temp.push(data.data[i])
            }
          }
          this.setData({
            orderData: temp
          })
          break;
          //默认
        default:
          this.setData({
            orderData: data.data
          })
          break;
      }
      //处理自由购订单数据
      var goodsTemp = this.data.orderData;
      for (let i = 0; i < goodsTemp.length; i++) {
        if (goodsTemp[i].orderType == '5') {
          var goodsDataTemp = [];
          goodsTemp[i].gtemps = goodsTemp[i].goodsName.split(",");
          if (goodsTemp[i].gtemps != "") {
            for (let j = 0; j < goodsTemp[i].gtemps.length; j++) {
              if (goodsTemp[i].gtemps[j].split("|") != "") {
                var lastTemp = {};

                lastTemp.myImg = goodsTemp[i].gtemps[j].split("|")[0],
                lastTemp.myName = goodsTemp[i].gtemps[j].split("|")[1],
                lastTemp.myCount = goodsTemp[i].gtemps[j].split("|")[2],
                lastTemp.myPrice = goodsTemp[i].gtemps[j].split("|")[3],
                lastTemp.myTotalPrice = goodsTemp[i].gtemps[j].split("|")[4],


                goodsDataTemp.push(lastTemp);
              }
            }

            goodsTemp[i].goodsDataTemp = goodsDataTemp;
          }

        }
      }

      this.setData({
        orderData: goodsTemp
      })
      console.log('主订单数据');
      console.log(this.data.orderData);
      wx.hideLoading();
    }, res => {})
  },
  //子订单列表
  orderDetailList: function(orderId) {
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    Model.orderDetailList(sublimit, subpage, app.globalData.openId, orderId, data => {
      console.log('子订单数据');
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].receiveTime) {
          data.data[i].receiveTime = data.data[i].receiveTime.substring(0, 10);
        }
      }
      this.setData({
        suborderData: data.data
      })
      wx.hideLoading();
    }, res => {})
  },
  //显示收花时间面板
  showcontent: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var temp = this.data.orderData;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id == id) {
        temp[i].showcontenttag = !temp[i].showcontenttag;
        if (temp[i].showcontenttag) {
          that.setData({
            currentOrderMainid: id
          })
          that.orderDetailList(id);
        }
      }
    }
    this.setData({
      orderData: temp
    })
  },

  //顶部选项切换
  jumpTo: function(e) {
    var that = this;
    that.setData({
      optselect: e.currentTarget.dataset.opt,
    })
    //订单列表
    this.orderMainList(e.currentTarget.dataset.opt);
  },
  //去付款
  gotopay: function(e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var out_trade_no = e.currentTarget.dataset.ordernum;
    if (out_trade_no) {
      //支付
      Model.prePay('花作伴商品购买', out_trade_no, datas => {
        // console.log(datas);
        wx.hideLoading();
        if (datas.status == 200) {
          //调微信支付
          that.wxPayment(datas.data);
        } else {
          wx.showToast({
            title: '付款失败！',
          })
        }

      }, res => {})
    }
    // wx.navigateTo({
    //   url: '../ordersrepay/ordersrepay',
    // })
  },
  /**
   * 调用微信支付
   */
  wxPayment: function(options) {
    var that = this;
    wx.requestPayment({
      'timeStamp': options.timeStamp,
      'nonceStr': options.nonceStr,
      'package': options.package,
      'signType': options.signType,
      'paySign': options.paySign,
      'success': function(res) {

        if (res.errMsg == "requestPayment:ok") {
          //支付成功
          that.orderMainList('listthree');
          that.setData({
            optselect: 'listthree'
          })
        }
      },
      'fail': function(res) {

      },
      'complete': function(res) {

      }
    })
  },
  //订单详情跳转
  gotoordersDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    var orderNum = e.currentTarget.dataset.ordernum;
    wx.navigateTo({
      url: '../ordersDetail/ordersDetail?orderNum=' + orderNum,
    })
  },
  //取消订单
  closeorder: function(e) {
    var that = this;
    var orderNum = e.currentTarget.dataset.ordernum;
    wx.showModal({
      title: '系统提示',
      content: '确定要取消该订单吗？',
      success: function(res) {
        if (res.confirm) {
          Model.cancelOrder(orderNum, app.globalData.openId, data => {
            console.log(data);
            that.orderMainList(that.data.optselect);
          }, res => {})
        } else if (res.cancel) {

        }
      }
    })
  },
  //申请退款
  applyRefund: function(e) {
    var that = this;
    var orderNum = e.currentTarget.dataset.ordernum;
    wx.showModal({
      title: '系统提示',
      content: '确定退款吗？',
      success: function(res) {
        if (res.confirm) {
          Model.applyRefund(orderNum, app.globalData.openId, data => {
            console.log(data.status);
            if (data.status == 500) {

              wx.showToast({
                title: '该订单不支持退款！',
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: '申请成功,款项7日内退还成功！',
                icon: 'none'
              })
              setTimeout(function() {
                that.orderMainList(that.data.optselect);
              }, 1500)
            }


          }, res => {})
        } else if (res.cancel) {

        }
      }
    })

  },
  //子单修改地址
  gotoorderAddress: function(e) {
    var orderNum = e.currentTarget.dataset.ordernum;
    var userAddress = e.currentTarget.dataset.useraddress;
    var userName = e.currentTarget.dataset.username;
    var userPhone = e.currentTarget.dataset.userphone;
    var userPrivence = e.currentTarget.dataset.userprivence;
    wx.navigateTo({
      url: '../orderAddress/orderAddress?orderNum=' + orderNum + '&userAddress=' + userAddress + '&userName=' + userName + '&userPhone=' + userPhone + '&userPrivence=' + userPrivence,
    })
  },
  //主单修改地址
  gotoorderAddressMain: function(e) {
    var orderNum = e.currentTarget.dataset.ordernum;
    var userAddress = e.currentTarget.dataset.useraddress;
    var userName = e.currentTarget.dataset.username;
    var userPhone = e.currentTarget.dataset.userphone;
    var userPrivence = e.currentTarget.dataset.userprivence;
    wx.navigateTo({
      url: '../orderAddressMain/orderAddressMain?orderNum=' + orderNum + '&userAddress=' + userAddress + '&userName=' + userName + '&userPhone=' + userPhone + '&userPrivence=' + userPrivence,
    })
  },
  //确认收货
  confirmReceipt: function(e) {
    var that = this;
    var orderNum = e.currentTarget.dataset.ordernum;

    wx.showModal({
      title: '系统提示',
      content: '确定收货吗？请确保您已经收到所有商品再确认收货！',
      success: function(res) {
        if (res.confirm) {
          Model.confirmReceipt(orderNum, app.globalData.openId, data => {
            console.log(data);
            that.orderMainList(that.data.optselect);
          }, res => {})
        } else if (res.cancel) {

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

  },
})