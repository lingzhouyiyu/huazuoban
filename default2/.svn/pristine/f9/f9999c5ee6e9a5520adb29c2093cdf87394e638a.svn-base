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
  updateUserinfo(encryptedData, iv, session_key,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.decodeUserInfo,
      data: { encryptedData: encryptedData, iv: iv, session_key: session_key  },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  //关注
  articleFollow(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.articleFollow,
      data: { articleId: articleId, openId: openId },
      success: success,
      complete: complete
    }
    console.log(params.data);
    this.request(params);
  };
  //取消关注
  cancleFollow(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.cancleFollow,
      data: { articleId: articleId, openId: openId },
      success: success,
      complete: complete
    }
    console.log(params.data);
    this.request(params);
  };
  //获取订单列表
  orderMainList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.orderMainList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //获取子订单列表
  orderDetailList(limit, page, openId, orderId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.orderDetailList,
      data: { limit: limit, page: page, openId: openId, orderId: orderId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //支付
  prePay(body, out_trade_no, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.prePay,
      data: { out_trade_no: out_trade_no, body: body },
      success: success,
      complete: complete
    }
    // console.log(params.data)
    this.request(params);
  };
  //浏览足迹列表
  getLookHistoryList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getLookHistoryList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //个人主页---足迹商品列表
  getgoodsLookList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getgoodsLookList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //个人主页--笔记列表
  myTalkList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.myTalkList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //个人中心信息
  getUserCenter( openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getUserCenter,
      data: { openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //个人主页信息
  getMyInfo(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getMyInfo,
      data: { openId: openId },
      success: success,
      complete: complete
    }
    console.log(params.data);
    this.request(params);
  };
  //查看未读数量
  getNoLookCount(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getNoLookCount,
      data: { openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //个人通知列表
  personalMessageList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.personalMessageList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //系统通知列表
  systemMessageList(limit, page, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.systemMessageList,
      data: { limit: limit, page: page},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //变为已读
  updateLookType(openId, messageId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.updateLookType,
      data: { openId: openId, messageId: messageId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //签到
  addSaveSign(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.addSaveSign,
      data: { openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //查询签到
  getSignList(keytime,openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getSignList,
      data: { keytime: keytime, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //个人优惠券
  getUserCenterCoupon(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getUserCenterCoupon,
      data: { openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //生成微信公众号二维码
  genWechatQRcode(openId, unionId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.genWechatQRcode,
      data: { openId: openId, unionId: unionId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //保存企业采集
  addSavecompany(context, name, phone, email, city, company, job, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.addSavecompany,
      data: { context: context, name: name, phone: phone, email: email, city: city, company: company, job: job},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //保存建议反馈
  addSavesuggest(context, email, phone, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.addSavesuggest,
      data: { context: context, email: email,  phone: phone },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //文章收藏列表
  getCollectionList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getCollectionList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //商品收藏列表
  getGoodsCollectionList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsCollectionList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //积分商城根据商品id查询商品
  pointgetGoodsById(goodsId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.pointgetGoodsById,
      data: { goodsId: goodsId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //积分商城商品列表
  getPointsGoodsList(limit, page,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getPointsGoodsList,
      data: { limit: limit, page: page,},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //关注列表
  getUserFollowList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getUserFollowList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //粉丝列表
  getLikeMeList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getLikeMeList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //取消订单
  cancelOrder(orderNum, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.cancelOrder,
      data: {orderNum: orderNum, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //订单详情
  orderDetailByOrderNum(orderNum, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.orderDetailByOrderNum,
      data: { orderNum: orderNum, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //申请退款
  applyRefund(orderNum, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.applyRefund,
      data: { orderNum: orderNum, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //订单修改地址（子单）
  modifyAddress(openId, orderNum, userAddress, userName, userPhone, userPrivence, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.modifyAddress,
      data: { openId: openId, orderNum: orderNum, userAddress: userAddress, userName: userName, userPhone: userPhone, userPrivence: userPrivence },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //订单修改地址（主单）
  modifyMainOrderAddress(openId, orderNum, userAddress, userName, userPhone, userPrivence, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.modifyMainOrderAddress,
      data: { openId: openId, orderNum: orderNum, userAddress: userAddress, userName: userName, userPhone: userPhone, userPrivence: userPrivence },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //确认收货
  confirmReceipt(orderNum, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.confirmReceipt,
      data: { orderNum: orderNum, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //挑战列表
  myChallengeHis(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.myChallengeHis,
      data: {openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //查询团队成员
  myTeam(teamId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.myTeam,
      data: { teamId: teamId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //查询我推广的成员(单人、多人团的分享的下级)
  myShareMember(activityId,openId,teamId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.myShareMember,
      data: { activityId: activityId, openId: openId, teamId: teamId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //参加组团活动，成为团员(针对多人团)
  jionChallengeTeam(activityId, isLeader, ncImage, ncName, openId, teamId , success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.jionChallengeTeam,
      data: { activityId: activityId, isLeader: isLeader, ncImage: ncImage, ncName: ncName, openId: openId, teamId: teamId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //延迟收花
  delayReceipt(openId, orderId, delayWeek, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.delayReceipt,
      data: { openId: openId, orderId: orderId, delayWeek: delayWeek},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //根据主单id查询子单订单号
  getChildOrderNum(orderId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getChildOrderNum,
      data: {orderId: orderId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //子单详情
  getChildOrderDetail(orderNum, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getChildOrderDetail,
      data: { orderNum: orderNum},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //获取物流信息
  search(expCode, expNum, orderNum, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.search,
      data: { expCode: expCode, expNum: expNum, orderNum: orderNum },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //查询签到天数
  getSignCount(openId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getSignCount,
      data: { openId: openId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //关注数量提示
  talkFlowCount(openId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.talkFlowCount,
      data: { openId: openId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //关注数量提示取消
  talkFlowCountCancle(openId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.talkFlowCountCancle,
      data: { openId: openId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //删除文章
  articleDelete(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.articleDelete,
      data: {articleId: articleId, openId: openId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //订单数量提示
  waitOrderCount(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.waitOrderCount,
      data: {openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
}
export {
  Class
}