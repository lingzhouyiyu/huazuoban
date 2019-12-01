import {
  Class
} from '../../commonClass/mall.js';

let Model = new Class();
//获取应用实例
const app = getApp()
// pages/addAddress/addAddress.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ['请选择'],
    userName: '',
    phone: '',
    address: '',
    userPrivence: '',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    if (app.globalData.openId) {
      // 获取地址详情
      this.getByIdAddress(options.id);
    } else {
      app.getToken().then(data => {
        // 获取地址详情
        this.getByIdAddress(options.id);
      })
    }
  },
  //获取地址详情
  getByIdAddress:function(id){
    Model.getByIdAddress(id,data=>{
      // console.log(data);      
      
      if (data.status==200){
        this.setData({
          userName: data.data.userName,
          phone: data.data.phone,
          address: data.data.address,
          userPrivence: data.data.userPrivence,
          region: data.data.userPrivence.split(',')
        })
      }
    },res=>{})
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
  //省市区选择
  bindRegionChange: function (e) {
    var that = this;
    var data = e.detail.value;
    this.setData({
      region: data,
      userPrivence: data[0] + "," + data[1] + "," + data[2]
    })
  },
  //收货人姓名
  getuserName: function (e) {
    var data = e.detail.value.trim();
    this.setData({
      userName: data
    })
  },
  //手机号
  getphone: function (e) {
    var data = e.detail.value.trim();
    this.setData({
      phone: data
    })
  },
  //详细地址
  getaddress: function (e) {
    var data = e.detail.value.trim();
    this.setData({
      address: data
    })
  },
  //提交保存
  gotoconfirmOrder: function () {
    var that = this;
    var userName = that.data.userName;
    var phone = that.data.phone;
    var userPrivence = that.data.userPrivence;
    var address = that.data.address;
    if (userName == '') {
      wx.showToast({
        title: '请输入姓名！'
      })
      return;
    }
    if (phone == '') {
      wx.showToast({
        title: '请输入手机号！'
      })
      return;
    }
    if (phone.length > 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none'
      })
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {

      wx.showToast({
        title: '手机号有误！',
        icon: 'none'
      })
      return;

    }
    if (userPrivence == '') {
      wx.showToast({
        title: '请选择省市区！'
      })
      return;
    }
    if (address == '') {
      wx.showToast({
        title: '请输入详细地址！'
      })
      return;
    }
    if (app.globalData.openId) {
      Model.updateSaveAddress(that.data.id,address, app.globalData.openId, phone, userName, userPrivence, data => {

        if (data.status == 200) {
          wx.showToast({
            title: '保存成功！'
          })
          setTimeout(function () {
            // wx.navigateTo({
            //   url: '../mineaddress/mineaddress',
            // })
           wx.navigateBack({
             delta:1
           })
          }, 1500)
        }
      }, res => { });
    } else {
      app.getToken().then(data => {
        Model.addSaveAddress(address, app.globalData.openId, phone, userName, userPrivence, data => {
          if (data.status == 200) {
            wx.showToast({
              title: '保存成功！'
            })
            setTimeout(function () {
              // wx.navigateTo({
              //   url: '../mineaddress/mineaddress',
              // })
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          }
        }, res => { });
      });
    }


  }
})