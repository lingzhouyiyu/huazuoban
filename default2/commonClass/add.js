//获取应用实例
const app = getApp()
//首页model
import {
  HTTP
} from '../utils/http.js'
class Class extends HTTP {
  constructor() {
    super()
  }
  //更新用户信息
  updateUserinfo(encryptedData, iv, session_key, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.decodeUserInfo,
      data: { encryptedData: encryptedData, iv: iv, session_key: session_key },
      success: success,
      complete: complete
    }
    console.log(params.data);
    this.request(params);
  };
  //话题分类
  getTalkCategory(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getTalkCategory,
      data: {},
      success: success,
      complete: complete
    }

    this.request(params);
  };
  //发布文章
  addSave(categoryId, nickImages, nickName, openId, talkContent,talkImages,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.addSave,
      data: { categoryId: categoryId, nickImages: nickImages, nickName: nickName, openId: openId, talkContent: talkContent, talkImages: talkImages},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    // return;
    this.request(params);
  };
  //获取小程序access_token
  authAppletsAccessToken(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.authAppletsAccessToken,
      data: {},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    // return;
    this.request(params);
  };
  //检查一段文本是否含有违法违规内容
  msgSecCheck(text,success, complete) {
    let params = {
      method: 'GET',
      url: app.wxApi.msgSecCheck,
      data: {text: text},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    // return;
    this.request(params);
  };
  //校验一张图片是否含有违法违规内容
  imgSecCheck(multipartFile, success, complete) {
    let params = {
      method: 'GET',
      url: app.wxApi.imgSecCheck,
      data: { multipartFile: multipartFile },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    // return;
    this.request(params);
  };
  //用户是否同意发贴协议
  getAgree(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getAgree,
      data: { openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    // return;
    this.request(params);
  };
  //更新用户发贴协议
  updateAgree(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.updateAgree,
      data: { openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    // return;
    this.request(params);
  };

}
export {
  Class
}