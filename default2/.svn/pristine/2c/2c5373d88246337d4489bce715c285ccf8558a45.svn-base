import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
const app = getApp()
// pages/freePurchase/freePurchase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: [],
    Furl: getApp().globalData.Serverurl,
    showModal: true,
    limitPrice: 0,
    selectCount: 0,
    selectPrice: 0,
    isfull: false,
    selectImg: [],
    imgId: '',
    selectImgs: [{
      id: '123',
      img: '../../images/free/btn.png'
    }, {
      id: '123',
      img: '../../images/free/btn.png'
    }, {
      id: '123',
      img: '../../images/free/btn.png'
    }],
    topImg: '',
    hasAddress: false,
    payBtnStatus: false,
    selectListData: [], //选择商品的数据
    showModalStatus: false, //已选择的商品显示隐藏
    animationData: '', //已选择的商品显示隐藏动画
    isFreeMember: getApp().globalData.isFreeMember,
    keshengPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //顶部图片
    this.freeBanner();

    //限制价格
    this.limitPrice().then(res => {
      //商品列表
      this.getGoodsListfree();
    });
    //获取购花须知
    this.getById_xuzhi();
  },
  //获取购花须知
  getById_xuzhi: function() {
    var that = this;
    Model.getById_xuzhi('1', data => {
      console.log('购花须知');
      console.log(data);
      if (data.data.contexts) {
        WxParse.wxParse('contexts', 'html', data.data.contexts, that, 5);
      }
    }, res => {})
  },
  //下单
  freePieceOrder: function() {
    var that = this;
    if (!this.data.isfull) {
      wx.showToast({
        title: '满' + that.data.limitPrice + '元即可购买！',
        icon: 'none'
      })
      return;
    }
    //防止重复点击
    if (this.data.payBtnStatus) return;
    this.setData({
      payBtnStatus: true
    })
    // wx.showLoading({
    //   title: '加载中',
    // })
    var goods = [];
    //新增代码
    var goodsData = [];
    //end
    for (var i = 0; i < this.data.goodsData.length; i++) {
      if (this.data.goodsData[i].count > 0) {
        var temp = {};
        temp.goodsId = this.data.goodsData[i].goodsId;
        temp.count = this.data.goodsData[i].count;
        goods.push(temp);
        //新增代码
        goodsData.push(this.data.goodsData[i]);
        //end
      }
    }


    // if (this.data.hasAddress && app.globalData.selectedAddress) {
      // var parms = {};
      // parms.openId = app.globalData.openId;
      // parms.userName = app.globalData.selectedAddress.userName;
      // parms.userPhone = app.globalData.selectedAddress.phone;
      // parms.userPrivence = app.globalData.selectedAddress.userPrivence;
      // parms.userAddress = app.globalData.selectedAddress.address;
      // parms.goods = goods;
      // console.log(parms);
      // this.downOrder(parms);

      //新增代码
    if (goodsData && goods){
        app.globalData.freeGoodsData = goodsData;
        app.globalData.freeGoods = goods;

        wx.navigateTo({
          url: '../confirmOrderFree/confirmOrderFree',
        })
      }     
      //end
    // } else {
    //   wx.showToast({
    //     title: '请先添加地址！',
    //     icon: 'none'
    //   })
    //   setTimeout(function() {
    //     wx.navigateTo({
    //       url: '../selectAddress/selectAddress',
    //     })
    //   }, 1000)

    // }
  },
  //调用下单接口
  downOrder: function(parms) {
    var that = this;
    wx.request({
      url: app.globalData.Serverurl + '/wxapi/order/freePieceOrder',
      data: JSON.stringify(parms),
      method: "POST",
      header: {
        'Content-Type': 'application/json;charset=utf-8',
        'openId': app.globalData.openId,
        'Authorization': app.globalData.token
      },
      success: function(data) { //成功回调
        console.log('下单');
        console.log(data.data);
        that.setData({
          payBtnStatus: false
        })

        var out_trade_no = data.data.data;
        if (data.data.status == 200) {
          //支付
          Model.prePay('花作伴商品购买', out_trade_no, datas => {
            console.log(datas);
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
      },
      fail: function(err) { //失败回调
        // console.log(err);
      },
      complete: function(res) { //执行完回调
        // console.log(res);
      }
    })
  },
  //获取地址列表
  listAddress: function() {
    wx.showLoading({
      title: '加载中',
    })
    Model.listAddress(app.globalData.openId, data => {
      console.log("地址数据");
      console.log(data);
      //有地址
      if (data.data.length > 0) {
        this.setData({
          hasAddress: true
        })
        for (let i = 0; i < data.data.length; i++) {
          data.data[i].userPrivenceNew = data.data[i].userPrivence.split(',')[0] + data.data[i].userPrivence.split(',')[1] + data.data[i].userPrivence.split(',')[2]
          //有默认地址
          if (data.data[i].type == '1') {
            this.setData({
              addressData: data.data[i]
            })
            break;
          } else {
            this.setData({
              addressData: data.data[0]
            })
          }
        }
        app.globalData.selectedAddress = this.data.addressData;
        this.setData({
          payBtnStatus: false
        })
      } else { //没有地址
        this.setData({
          hasAddress: false
        })
      }
      wx.hideLoading();
    }, res => {})
  },
  // 获取限制价格
  limitPrice: function() {
    return new Promise((resolve, reject) => {
      Model.limitPrice(data => {
        // console.log('限制价格');
        // console.log(data);
        this.setData({
          limitPrice: data.data.limitPrice
        })
        resolve(data.data.limitPrice)
      }, res => {})
    })

  },
  // 获取商品数据
  getGoodsListfree: function() {
    wx.showLoading({
      title: '加载中',
    })
    Model.getGoodsListfree(data => {
      console.log('商品数据');
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].count = 0;
      }
      this.setData({
        goodsData: data.data
      })
      wx.hideLoading();
    }, res => {})
  },
  //顶部图片
  freeBanner: function() {
    Model.freeBanner(data => {
      // console.log(data);
      this.setData({
        topImg: data.data.image
      })
    }, res => {})
  },
  // 商品数量加
  add: function(e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    var temp = this.data.goodsData;
    //找到点击的商品数量加一
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].goodsId == goodsId) {
        temp[i].count++;
      }
    }
    this.setData({
      goodsData: temp
    })

    var selectCount = 0; //选择商品件数
    var selectPrice = 0; //选择商品总价

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].count > 0) {
        selectCount += temp[i].count;
        if (app.globalData.isFreeMember == '1' && temp[i].isMemberGoods == '1') {
          selectPrice += temp[i].memberPrice * temp[i].count;
        } else {
          selectPrice += temp[i].basePrice * temp[i].count;
        }
      }
    }
    this.setData({
      selectCount: selectCount,
      selectPrice: Number(selectPrice.toFixed(1)),
    })
    //计算会员价与非会员价
    var huiyuanPrice = 0;
    var feihuiyuanPrice = 0;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].count > 0) {

        if (temp[i].isMemberGoods == '1') {
          huiyuanPrice += temp[i].memberPrice * temp[i].count;
        } else {
          huiyuanPrice += temp[i].basePrice * temp[i].count;
        }

      }
    }
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].count > 0) {

        feihuiyuanPrice += temp[i].basePrice * temp[i].count;

      }
    }
    this.setData({
      keshengPrice: (feihuiyuanPrice - huiyuanPrice).toFixed(2),
    })
    //判断是否满足购买条件
    if (selectPrice > this.data.limitPrice) {
      this.setData({
        isfull: true
      })
    } else {
      this.setData({
        isfull: false
      })
    }

    //选中的数据列表selectData
    var selectListData = this.data.selectListData;
    var hasData = false;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].goodsId == goodsId) {
        for (let j = 0; j < selectListData.length; j++) {
          if (selectListData[j].goodsId == temp[i].goodsId) {
            hasData = true;
            console.log('存在数据');
          }
        }
        if (!hasData || selectListData == []) {
          selectListData.push(temp[i]);
        }

      }
    }

    this.setData({
      selectListData: selectListData
    })
    //下方图片的显示逻辑
    // var selectImg = this.data.selectImg;
    // var hasData = false;
    // for (let i = 0; i < temp.length; i++) {
    //   if (temp[i].goodsId == goodsId) {
    //     for (let j = 0; j < selectImg.length; j++) {
    //       if (selectImg[j].id == temp[i].goodsId) {
    //         hasData = true;
    //       }
    //     }
    //     if (!hasData || selectImg == []) {
    //       selectImg.push({
    //         id: temp[i].goodsId,
    //         img: this.data.Furl+ temp[i].faceImg
    //       });
    //     }

    //   }
    // }

    // this.setData({
    //   selectImg: selectImg
    // })
    // for (let i = 0; i < this.data.selectImg.length; i++) {
    //   if (i == this.data.selectImg.length - 1) {
    //     this.setData({
    //       imgId: this.data.selectImg[i].id,
    //     })
    //   }
    // }

  },
  // 商品数量减
  sub: function(e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    var temp = this.data.goodsData;
    for (let i = 0; i < temp.length; i++) {

      if (temp[i].goodsId == goodsId) {
        if (temp[i].count > 0) {
          temp[i].count--;
        }
      }
    }
    this.setData({
      goodsData: temp
    })
    var selectCount = 0;
    var selectPrice = 0;

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].count > 0) {
        selectCount += temp[i].count;
        if (app.globalData.isFreeMember == '1' && temp[i].isMemberGoods == '1') {
          selectPrice += temp[i].memberPrice * temp[i].count;
        } else {
          selectPrice += temp[i].basePrice * temp[i].count;
        }

      }
    }
    this.setData({
      selectCount: selectCount,
      selectPrice: Number(selectPrice.toFixed(1)),
    })
    if (selectPrice > this.data.limitPrice) {
      this.setData({
        isfull: true
      })
    } else {
      this.setData({
        isfull: false
      })
    }

    //选中的数据列表selectData
    var selectListData = this.data.selectListData;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].goodsId == goodsId && temp[i].count == 0) {
        for (let j = 0; j < selectListData.length; j++) {
          if (selectListData[j].goodsId == temp[i].goodsId) {
            selectListData.splice(j, 1);
          }
        }
      }
    }


    this.setData({
      selectListData: selectListData
    })
    if (this.data.selectCount == 0) {

      this.setData({
        showModalStatus: false
      })
    }
    //下方图片的显示逻辑
    // var selectImg = this.data.selectImg;
    // for (let i = 0; i < temp.length; i++) {
    //   if (temp[i].goodsId == goodsId && temp[i].count==0) {
    //     for (let j = 0; j < selectImg.length; j++) {
    //       if (selectImg[j].id == temp[i].goodsId) {
    //         selectImg.splice(j, 1);
    //       }
    //     }
    //   }
    // }


    // this.setData({
    //   selectImg: selectImg
    // })
    // for (let i = 0; i < this.data.selectImg.length; i++) {
    //   if (i == this.data.selectImg.length - 1) {
    //     this.setData({
    //       imgId: this.data.selectImg[i].id,
    //     })
    //   }
    // }
  },

  //跳转会员卡
  gotohuiyuan: function() {
    wx.navigateTo({
      url: '../huiyuan/huiyuan',
    })
  },
  //显示积分规则
  showrule: function() {
    this.setData({
      showModal: false
    })
  },
  //隐藏积分规则
  colserule: function() {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function() {
    return;
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
          wx.navigateTo({
            url: '../orders/orders?optselect=listthree' + '&tag=paySucess',
          })
        }
      },
      'fail': function(res) {

      },
      'complete': function(res) {

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
    //查询是否为会员
    app.getToken().then(data => {
      this.setData({
        isFreeMember: app.globalData.isFreeMember
      })
      console.log(this.data.isFreeMember);
    })
    //获取地址信息
    if (app.globalData.selectedAddress) {
      this.setData({
        addressData: app.globalData.selectedAddress,
        hasAddress: true,
        payBtnStatus: false
      })
    } else {
      if (app.globalData.openId) {
        this.listAddress();
      } else {
        app.getToken().then(data => {
          this.listAddress();
        })
      }
    }
  },
  //隐藏已经选择的商品列表
  hideGoodsList: function() {
    this.setData({
      showModalStatus: false
    })
  },
  //显示已经选择的商品列表
  showGoodsList: function() {
    if (this.data.selectCount > 0) {
      this.setData({
        showModalStatus: !this.data.showModalStatus
      })
    }

  },
  myCatchTouch: function() {
    return;
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