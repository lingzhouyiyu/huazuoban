import {
  Class
} from '../../commonClass/add.js';

let Model = new Class();
//图片路径
var imageStr = "";
//图片宽高
var MessageArray = [];
//获取应用实例
const app = getApp();

var isdisable = false;
// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    pics: [],
    path: '',
    hastopic: false,
    topicData: [],
    nickName: 'Lewa',
    nickImages: '../../images/find/header.png',
    talkContent: '',
    textvalue: '',
    mmp: [],
    showModal: true,
    imgCheck: true,
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openId){
      this.getAgree();
    }else{
      app.getToken().then(res=>{
        this.getAgree();
      })
    }
    
  },

//用户是否同意发贴协议
  getAgree:function(){
    Model.getAgree(app.globalData.openId,data=>{
      console.log('查询');
      console.log(data);
      if(data.data=='0'){
        this.setData({
          showModal:false
        })
      }else{
        this.setData({
          showModal: true
        })
      }
    },res=>{})
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.getToken();
    if (app.globalData.topicContent.length > 0) {
      this.setData({
        hastopic: true,
        topicData: app.globalData.topicContent
      })
    } else {
      this.setData({
        hastopic: false
      })
    }
  },
  //获取小程序access_token
  authAppletsAccessToken: function() {
    return new Promise((resolve, reject) => {
      Model.authAppletsAccessToken(data => {
        console.log(data);
        resolve(data.data)
      }, res => {})
    })

  },
  //检测发布内容
  msgSecCheck: function(content) {
    return new Promise((resolve, reject) => {
      Model.msgSecCheck(content, data => {
        console.log(data);
        resolve(data.data)
      }, res => {})
    })
  },
 
  gototopic: function() {
    wx.navigateTo({
      url: '../topic/topic',
    })
  },
  //图片选择
  selectimg: function() {
    var _this = this;
    var pics = this.data.pics;
    this.setData({
      mmp: [],
      pics: [],
      path: '',
    })
    MessageArray = [];
    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {

        var imgSrc = res.tempFilePaths;

        pics = pics.concat(imgSrc);
        if (pics.length >= 9) {
          _this.setData({
            isShow: (!_this.data.isShow)
          })
        } else {
          _this.setData({
            isShow: (_this.data.isShow)
          })
        }
        _this.setData({
          pics: pics
        })
        //要上传的图片路径数组
        var tempFilePaths = res.tempFilePaths;

        _this.setData({
          path: tempFilePaths
        })

        //获取图片宽高
        for (var i = 0; i < tempFilePaths.length; i++) {
          _this.getimgMessage(tempFilePaths[i]).then(asd => {
            _this.setData({
              mmp: asd
            })
          });
        }

      },
    })
  },
  getimgMessage: function(src) {
    return new Promise((resolve, reject) => {
      var that = this;

      wx.getImageInfo({
        src: src,
        success(data) {
          var temp = {};
          temp.width = data.width;
          temp.height = data.height;
          temp.url = data.path;
          MessageArray.push(temp);
          resolve(MessageArray)
        }
      })
    })
  },
  //发布按钮点击
  gotofindDetail: function() {

    var that = this;

    // 判断用户是否授权
    if (app.globalData.authCode) { //已经授权

      this.setData({
        nickName: app.globalData.nickName,
        nickImages: app.globalData.avatarUrl
      })

      // 提交保存数据  
      that.saveimg();
    } else {

      //判断用户是否授权
      this.getSetting();
    }
  },
  getSetting: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function() {
      wx.hideLoading();
      isdisable = false;
    }, 10000)
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
                nickImages: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              })
              //提交保存数据
              that.saveimg();
              //更新用户信息
              Model.updateUserinfo(res.encryptedData, res.iv, app.globalData.session_key, data => {
                if (data.status == 200) {
                  app.getToken();
                  app.globalData.authCode = true;
                }
              }, fail => {});

            }
          })
        } else { //用户未授权   
          // 隐藏加载框
          wx.hideLoading();
          //跳转授权页面
          wx.navigateTo({
            url: '../userAuth/userAuth?tag=add',
          })
        }
      }
    })
  },
  //文本框失去焦点或者confirm事件
  gettalkContent: function(e) {
    this.setData({
      talkContent: e.detail.value
    })

    if (e.detail.value) {
      console.log(e.detail.value);
      this.msgSecCheck(e.detail.value).then(data => {
        if (data == 500) {
          wx.showToast({
            title: '您输入的内容含有敏感信息，请重新输入！',
            icon: 'none'
          })
        }
      })
    }

  },
  //提交发布
  saveimg: function() {

    var that = this;
    if (isdisable) return;
    isdisable = true;
    that.setData({
      imgCheck: true
    })
    if (this.data.talkContent.trim() == '') {
      wx.showToast({
        title: '请您输入要发布的内容!',
        icon: 'none'
      })
      isdisable = false;
      return;
    } else {

      this.msgSecCheck(this.data.talkContent).then(data => {
        if (data == 200) {

          if (this.data.topicData.length == 0) {
            wx.showToast({
              title: '请您先添加话题!',
              icon: 'none'
            })
            isdisable = false;
            return;
          }
          // 上传图片
          imageStr = "";
          var temp = [];
          for (let i = 0; i < this.data.mmp.length; i++) {
            temp.push(this.data.mmp[i].url);
          }
          // var pics = this.data.path;
          var pics = temp;
          if (pics == '' || pics == null) { //没有图片

            wx.showToast({
              title: '请您先上传图片!',
              icon: 'none'
            })
            isdisable = false;
            return;
          } else {
            // 显示加载图标
            wx.showLoading({
              title: '正在检测图片',
            })
            setTimeout(function() {
              wx.hideLoading();
              isdisable = false;
            }, 10000)
            this.imgSecCheck({
              url: getApp().globalData.Serverurl + "/wxapi/upload/uploadMulti", //这里是你图片上传的接口
              path: pics //这里是选取的图片的地址数组
            });
          }
        } else {
          wx.showToast({
            title: '您输入的内容含有敏感信息，请重新输入！',
            icon: 'none'
          })
          isdisable = false;
        }
      });
    }


  },

  // 发布内容
  addSave: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var topicid = that.data.topicData[0].id;


    that.getimgstr().then(res => {

      if (JSON.parse(res)[0].url == '') {
        wx.showToast({
          title: '图片上传失败,请重新上传',
          icon: 'none'
        })
      } else {
        Model.addSave(that.data.topicData[0].id, that.data.nickImages, that.data.nickName, app.globalData.openId, that.data.talkContent, res, data => {
          // 隐藏加载框
          wx.hideLoading();
          isdisable = false;

          if (data.status == 200) {
            wx.showToast({
              title: '发布成功！',
            })
            this.setData({
              pics: [],
              textvalue: '',
              path: '',
              mmp: [],
              topicData: [],
              hastopic: false,
              talkContent: '',

            });
            MessageArray = [];
            app.globalData.topicContent = [];

            wx.navigateTo({
              url: '../findDetail/findDetail?id=' + data.data + '&categoryId=' + topicid,
            })
          } else {
            wx.showToast({
              title: '发布失败！',
              icon: 'none'
            })
          }

        }, res => {});
      }

    })

  },
  //获取上传的图片路径
  getimgstr: function() {
    return new Promise((resolve, reject) => {
      var that = this;
      var imgArray = that.data.mmp;
      var temp = imageStr.substring(0, imageStr.length - 1).split(',');
      for (let i = 0; i < imgArray.length; i++) {
        imgArray[i].url = temp[i];
      }
      var strify = JSON.stringify(imgArray);
      resolve(strify)
      return;
    })
  },
  //检测图片
  imgSecCheck: function (data) {
    

      var that = this,
        i = data.i ? data.i : 0, //当前上传的哪张图片
        success = data.success ? data.success : 0, //上传成功的个数
        fail = data.fail ? data.fail : 0; //上传失败的个数

      wx.uploadFile({
        url: 'https://www.huazuoban.com/wxapi/talkContent/imgSecCheck',
        filePath: data.path[i],
        name: 'multipartFile', //这里根据自己的实际情况改
        formData: null, //这里是上传图片时一起上传的数据
        success: (resp) => {
          success++; //图片上传成功，图片上传成功的变量+1
          //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1

          var result = JSON.parse(resp.data);
          console.log(result);
          if (result.data != 200) {
            wx.hideLoading();
            that.setData({
              imgCheck: false
            })
            wx.showToast({
              title: '您上传的图片包含敏感信息！',
              icon: 'none'
            })

          }
        },
        fail: (res) => {
          fail++; //图片上传失败，图片上传失败的变量+1
        },
        complete: () => {

          i++; //这个图片执行完上传后，开始上传下一张
          if (i == data.path.length) { //当图片传完时，停止调用     
            console.log('执行完毕');
            console.log('成功：' + success + " 失败：" + fail);
            console.log(that.data.imgCheck);
            wx.hideLoading();
            if (that.data.imgCheck){
              that.setData({
                flag:true
              })
              that.uploadimg(data)
            }
            
          } else { //若图片还没有传完，则继续调用函数
            data.i = i;
            data.success = success;
            data.fail = fail;
            that.imgSecCheck(data);
          }
        }
      });
   
  },
  //多张图片上传
  uploadimg: function(data) {
    wx.showLoading({
      title: '正在上传图片',
    })
    var that = this,
      i = data.i ? data.i : 0, //当前上传的哪张图片
      success = data.success ? data.success : 0, //上传成功的个数
      fail = data.fail ? data.fail : 0; //上传失败的个数
      if(that.data.flag){
        i=0;
        success=0;
        fail=0;
      }
      that.setData({
        flag:false
      })
 
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file', //这里根据自己的实际情况改
      formData: null, //这里是上传图片时一起上传的数据
      success: (resp) => {
        success++; //图片上传成功，图片上传成功的变量+1
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
        console.log(resp.data);
        imageStr += resp.data + ",";
      },
      fail: (res) => {
        fail++; //图片上传失败，图片上传失败的变量+1
      },
      complete: () => {

        i++; //这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) { //当图片传完时，停止调用     
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          wx.hideLoading();
          that.addSave();
        } else { //若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },

  //关闭话题选项
  closetopicimg: function(e) {

    var text = e.currentTarget.dataset.text;
    if (app.globalData.topicContent.length > 0) {

      for (let i = 0; i < app.globalData.topicContent.length; i++) {
        if (app.globalData.topicContent[i].text == text) {

          app.globalData.topicContent.splice(i, 1);
          break;
        }
      }
      this.setData({
        hastopic: true,
        topicData: app.globalData.topicContent
      })
      if (app.globalData.topicContent.length == 0) {
        this.setData({
          hastopic: false
        })

      }
    }

  },
  //删除图片
  subImg: function(e) {
    var index = e.currentTarget.dataset.numbers;
    // var temp = this.data.pics;
    // var temp = this.data.path;
    var temp = this.data.mmp;
    temp.splice(index, 1);
    this.setData({
      // pics: temp,
      // path: temp,
      mmp: temp,
    });
    if (this.data.path.length < 9) {
      this.setData({
        isShow: true,
      })
    }
    if (this.data.path.length == 0) {
      this.setData({
        showText: true,
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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