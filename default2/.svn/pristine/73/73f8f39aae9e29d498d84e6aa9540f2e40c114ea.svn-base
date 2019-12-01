import {
  Class
} from '../../commonClass/mine.js';

let Model = new Class();
//获取应用实例
const app = getApp()
// pages/share/share.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    codeimgurl: '',
    windowWidth: 0,
    windowHeight: 0,
    scale: 0,
    imgurl: '',
    hide: false,
    Furl: getApp().globalData.Serverurl,
    isLoad: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取二维码
  genWechatQRcode: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    var url = '../../images/mine/share.jpg'
    //获取小程序码
    Model.genWechatQRcode(app.globalData.openId, app.globalData.unionId, data => {
      console.log(data);
      //获取小程序码临时路径
      wx.downloadFile({
        url: that.data.Furl + data.data,
        success: function (res) {
          console.log('临时路径获取完成');
          that.setData({
            codeimgurl: res.tempFilePath
          })
          //开始绘制图片
          that.drawImage().then(as => {
            console.log(as);
            that.canvasToImage()
          });
          // setTimeout(function () {
          //   that.canvasToImage()
          // }, 2000)
        }
      })
    }, res => { })

  },
  drawImage() {
    return new Promise((resolve, reject) => {
      console.log('开始绘制');
      //绘制canvas图片
      var that = this
      const ctx = wx.createCanvasContext('myCanvas')
      var bgPath = '../../images/free/freeShare.jpg'
      // var portraitPath = that.data.portrait_temp
      var hostNickname = app.globalData.nickName
      var qrPath = that.data.codeimgurl;
      var windowWidth = that.data.windowWidth;
      var windowHeight = that.data.windowHeight;
      that.setData({
        scale: 1.6
      })

      //绘制背景图片
      ctx.drawImage(bgPath, 0, 0, windowWidth * 0.92, windowHeight * 0.82)

      //绘制头像
      // ctx.save()
      // ctx.beginPath()
      // ctx.arc(windowWidth / 2, 0.32 * windowWidth, 0.15 * windowWidth, 0, 2 * Math.PI)
      // ctx.clip()
      // ctx.drawImage(portraitPath, 0.7 * windowWidth / 2, 0.17 * windowWidth, 0.3 * windowWidth, 0.3 * windowWidth)
      // ctx.restore()
      // // 绘制第一段文本
      // ctx.setFillStyle('#101010')
      // ctx.setFontSize(12)
      // ctx.setTextAlign('left')
      // ctx.fillText('我是' + hostNickname, windowWidth * 0.37, windowHeight * 0.52)
      // // //绘制第二段文本
      // ctx.setFillStyle('#101010')
      // ctx.setFontSize(10)
      // ctx.setTextAlign('left')
      // ctx.fillText('邀请你一起畅游花世界~', windowWidth * 0.32, windowHeight * 0.55)
      // //绘制二维码
      ctx.drawImage(qrPath, windowWidth * 0.332, windowHeight * 0.52, windowWidth * 0.92 * 0.262, windowWidth * 0.92 * 0.265)
      // //绘制第三段文本
      // ctx.setFillStyle('#101010')
      // ctx.setFontSize(10)
      // ctx.setTextAlign('left')
      // ctx.fillText('长安识别下方二维码进入', windowWidth * 0.32, windowHeight * 0.58)
      ctx.draw();
      resolve('绘制完成');
    })

  },
  //绘制完图片后还要把它转化成图片
  canvasToImage() {
    console.log('开始转化')
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.windowWidth * 0.77 * 5,
      height: that.data.windowHeight * 0.65 * 5,
      destWidth: that.data.windowWidth * 0.77 * 5,
      destHeight: that.data.windowHeight * 0.65 * 5,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log('转化完成')
        that.setData({
          imgurl: res.tempFilePath
        })
        // 隐藏加载框
        wx.hideLoading();
        that.setData({
          isLoad: true
        })
        // setTimeout(function () {
        //   that.setData({
        //     // hide: true
        //   })
        // }, 1000)
      },
      fail: function (err) {

      }
    })
  },
  previewImage: function () {
    var that = this;
    wx.previewImage({
      current: that.data.codeimgurl, // 当前显示图片的http链接
      urls: [that.data.codeimgurl] // 需要预览的图片http链接列表
    })
  },
  saveImg: function () {
    var that = this;
    if (!that.data.isLoad) {
      return;
    }
    wx.showLoading({
      title: '图片保存中',
    })
    wx.getSetting({
      success: function (res) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: function (e) {
            wx.saveImageToPhotosAlbum({
              filePath: that.data.imgurl,
              success: function (r) {
                wx.showToast({
                  title: '保存成功!',
                  duration: 1500,
                  icon: 'success'
                })
                setTimeout(function () {
                  // 隐藏加载框
                  wx.hideLoading();
                }, 1000)
              }
            })
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var that = this;
    var openid = app.globalData.openid;
    var shareobj = {
      title: "花作伴",
      path: 'pages/mall/mall?openid=' + openid,
      imgUrl: '',
      withShareTicket: true
    };
    return shareobj;
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
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight,
    })
    if (app.globalData.openId && app.globalData.unionId) {
      // 获取二维码
      this.genWechatQRcode();
    } else {
      app.getToken().then(res => {
        // 获取二维码
        this.genWechatQRcode();
      })
    }

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
})