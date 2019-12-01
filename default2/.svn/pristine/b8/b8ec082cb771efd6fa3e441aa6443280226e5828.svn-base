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
    this.request(params);
  };
  //1:发现页面搜索提示文字 2：花粉卡页面通知
  getShowText(type, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getShowText,
      data: { type: type },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //获取顶部分类
  getTopCategory(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getTopCategory,
      data: {},
      success: success,
      complete: complete
    }
   
    this.request(params);
  };
  //获取中间三个分类
  getCenterCategory(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getCenterCategory,
      data: {},
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 新品专区
  getGoodsNewList(success, complete){
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsNewList,
      data: {},
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 热卖专区
  getGoodsHOTList(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsHOTList,
      data: {},
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 发现专区
  getGoodsFindList(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsFindList,
      data: {},
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 限时团购列表
  getLimitTeamGoodsList(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getLimitTeamGoodsList,
      data: {},
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 根据分类id查询商品列表
  getGoodsListByCategoryId(categoryId ,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsListByCategoryId,
      data: { categoryId: categoryId},
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 根据商品id查询商品
  getGoodsById(goodsId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsById_goods,
      data: { goodsId: goodsId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  // 积分商城根据商品id查询商品
  getGoodsById_points(goodsId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsById_points,
      data: { goodsId: goodsId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  // 查询个人拥有的积分
  myIntegral(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.myIntegral,
      data: { openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  // 根据商品id查询活动商品详情（限时团购）
  getActivityGoodsById(activityId,goodsId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getActivityGoodsById,
      data: { activityId: activityId, goodsId: goodsId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  // 根据商品id查询优惠券
  getCouponList(goodsId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getCouponList,
      data: { goodsId: goodsId },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 添加地址
  addSaveAddress(address, openId, phone, userName, userPrivence, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.addSaveAddress,
      data: { address: address, openId: openId, phone: phone, userName: userName, userPrivence: userPrivence },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 删除地址
  deleteAddress(id, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.deleteAddress,
      data: { id: id },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 地址详情
  getByIdAddress(id, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getByIdAddress,
      data: { id: id },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 地址列表
  listAddress(openId , success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.listAddress,
      data: {openId: openId },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 设为默认地址
  setDefaultAddress(openId, id, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.setDefaultAddress,
      data: { id: id, openId: openId },
      success: success,
      complete: complete
    }
    
    this.request(params);
  };
  // 编辑地址
  updateSaveAddress(id,address, openId, phone, userName, userPrivence, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.updateSaveAddress,
      data: {id:id, address: address, openId: openId, phone: phone, userName: userName, userPrivence: userPrivence },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 根据商品id查加够列表
  getAddBuyList(goodsId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getAddBuyList,
      data: { goodsId: goodsId },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 根据商品id查赠品列表
  getGoodsGiftList(goodsId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsGiftList,
      data: { goodsId: goodsId },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 套餐下单
  downOrderPackage(addBuyCount, giftCount,couponId,addBuyId, addBuyTitle, buyCount, getTimeTitle, getTimeValue, giftId, giftTitle, goodsId, monthId, openId, sendWeekTypeTitle, sendWeekTypeValue, userAddress, userName, userPhone, userPrivence, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.downOrderPackage,
      data: { addBuyCount: addBuyCount, giftCount: giftCount, couponId: couponId, addBuyId: addBuyId, addBuyTitle: addBuyTitle, buyCount: buyCount, getTimeTitle: getTimeTitle, getTimeValue: getTimeValue, giftId: giftId, giftTitle: giftTitle, goodsId: goodsId, monthId: monthId, openId: openId, sendWeekTypeTitle: sendWeekTypeTitle, sendWeekTypeValue: sendWeekTypeValue, userAddress: userAddress, userName: userName, userPhone: userPhone, userPrivence: userPrivence},
      success: success,
      complete: complete
    }
    console.log(params.data);
    
    this.request(params);
  };
  // 单品下单
  downOrderSameSeries(getTimeTitle, getTimeValue,addBuyCount, giftCount, addBuyTitle, giftTitle,addBuyId, giftId,buyCount, chosedAttrId, couponId, goodsId, openId, userAddress, userName, userPhone, userPrivence, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.downOrderSameSeries,
      data: { getTimeTitle: getTimeTitle, getTimeValue: getTimeValue, addBuyCount: addBuyCount, giftCount: giftCount, addBuyTitle: addBuyTitle, giftTitle: giftTitle, addBuyId: addBuyId, giftId: giftId, buyCount: buyCount, chosedAttrId: chosedAttrId, couponId: couponId, goodsId: goodsId, openId: openId, userAddress: userAddress, userName: userName, userPhone: userPhone, userPrivence: userPrivence },
      success: success,
      complete: complete
    }
    console.log(params.data);
    this.request(params);
  };
  // 积分商品单品下单
  downOrderIntegral(usePoints,buyCount, chosedAttrId, getTimeTitle, getTimeValue, goodsId, openId, userAddress, userName, userPhone, userPrivence, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.downOrderIntegral,
      data: { usePoints: usePoints, buyCount: buyCount, chosedAttrId: chosedAttrId, getTimeTitle: getTimeTitle, getTimeValue: getTimeValue, goodsId: goodsId, openId: openId, userAddress: userAddress, userName: userName, userPhone: userPhone, userPrivence: userPrivence },
      success: success,
      complete: complete
    }
    console.log(params.data);
    // return;
    this.request(params);
  };
  // 团购套餐下单
  downOrderPackageGroup(getTimeTitle, getTimeValue,addBuyCount, giftCount,activityId, addBuyId, addBuyTitle, buyCount, giftId, giftTitle, goodsId, openId, orderType, userAddress, userName, userPhone, userPrivence, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.downOrderPackageGroup,
      data: { getTimeTitle: getTimeTitle, getTimeValue: getTimeValue, addBuyCount: addBuyCount, giftCount: giftCount, activityId: activityId, addBuyId: addBuyId, addBuyTitle: addBuyTitle, buyCount: buyCount, giftId: giftId, giftTitle: giftTitle, goodsId: goodsId, openId: openId, orderType: orderType, userAddress: userAddress, userName: userName, userPhone: userPhone, userPrivence: userPrivence },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 团购单品下单
  downOrderSameSeriesGroup(getTimeTitle, getTimeValue,addBuyCount, giftCount, addBuyTitle, giftTitle,activityId, addBuyId, buyCount, chosedAttrId, giftId, goodsId, openId, orderType, userAddress, userName, userPhone, userPrivence, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.downOrderSameSeriesGroup,
      data: { getTimeTitle: getTimeTitle, getTimeValue: getTimeValue,addBuyCount: addBuyCount, giftCount: giftCount, addBuyTitle: addBuyTitle, giftTitle: giftTitle, activityId: activityId, addBuyId: addBuyId, buyCount: buyCount, chosedAttrId: chosedAttrId, giftId: giftId, goodsId: goodsId, openId: openId, orderType: orderType, userAddress: userAddress, userName: userName, userPhone: userPhone, userPrivence: userPrivence },
      success: success,
      complete: complete
    }
    console.log(params.data);
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
  //会员卡支付
  freeprePay(body, out_trade_no, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.freeprePay,
      data: { out_trade_no: out_trade_no, body: body },
      success: success,
      complete: complete
    }
    // console.log(params.data)
    this.request(params);
  };
  //首页轮播图
  getActivityList( success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getActivityList,
      data: {},
      success: success,
      complete: complete
    }
    // console.log(params.data)
    this.request(params);
  };
  //首页轮播图详情
  getActivityById(id,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getActivityById,
      data: {Id:id},
      success: success,
      complete: complete
    }
    // console.log(params.data)
    this.request(params);
  };
  //限时团购详情
  getLimitTimeById(id, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getLimitTimeById,
      data: { Id: id },
      success: success,
      complete: complete
    }
    // console.log(params.data)
    this.request(params);
  };
  // 绑定团队上下级关系
  bindChallengeTeamMember(activityId, openId, parentId, teamId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.bindChallengeTeamMember,
      data: { activityId: activityId, openId: openId, parentId: parentId, teamId: teamId},
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 创建团（针对单人、多人）
  createChallengeTeam(effectiveSize,activityId, effectiveDay, hasCount, isFull, leaderNcname, leaderOpenId, ncImage, teamSize, teamType,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.createChallengeTeam,
      data: { effectiveSize: effectiveSize, activityId: activityId, effectiveDay: effectiveDay, hasCount: hasCount, isFull: isFull, leaderNcname: leaderNcname, leaderOpenId: leaderOpenId, ncImage: ncImage, teamSize: teamSize, teamType: teamType },
      success: success,
      complete: complete
    }
    console.log(params.data);
    this.request(params);
  };
  // 参加组团活动，成为团员(针对多人团)
  jionChallengeTeam(activityId,isLeader, ncImage, ncName, openId, teamId,  success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.jionChallengeTeam,
      data: { activityId: activityId, isLeader: isLeader, ncImage: ncImage, ncName: ncName, openId: openId, teamId: teamId },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  //查询我推广的成员(单人、多人团的分享的下级)
  myShareMember(activityId, openId, teamId, success, complete) {
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
  // 查询我的团队成员(多人团的团员)
  myTeam(id, address, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.myTeam,
      data: { activityId: activityId, openId: openId },
      success: success,
      complete: complete
    }
    this.request(params);
  };
  // 商品收藏
  goodsCollection(goodsId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.goodsCollection,
      data: { goodsId: goodsId, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  // 商品取消收藏
  cancleGoodsCollection(goodsId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.cancleGoodsCollection,
      data: { goodsId: goodsId, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  // 商品是否收藏
  hasGoodsCollection(goodsId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.hasGoodsCollection,
      data: { goodsId: goodsId, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  // 商品浏览足迹
  goodsLookHistory(goodsId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.goodsLookHistory,
      data: { goodsId: goodsId, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  // 查询所有正在活跃的团
  activeTeams(activityId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.activeTeams,
      data: { activityId: activityId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  // 邀请购买规则
  list_yaoqing(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.list_yaoqing,
      data: {},
      success: success,
      complete: complete
    }
    // console.log(params.data);
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
  //关注数量提示
  talkFlowCount(openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.talkFlowCount,
      data: { openId: openId },
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
      data: { openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //自由拼花商品
  getGoodsListfree(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsListfree,
      data: {},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //限制价格
  limitPrice(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.limitPrice,
      data: {},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //自由购banner
  freeBanner(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.freeBanner,
      data: {},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //会员卡列表
  userCardList(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.userCardList,
      data: {},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //顶部大图会员卡
  userTopCardList(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.userTopCardList,
      data: {},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //会员卡订单[ 408表示已经购买了会员，且并未过期 ]
  memberOrder(cardId,openId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.memberOrder,
      data: { cardId: cardId, openId: openId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //购花须知(1)会员卡须知(2)
  getById_xuzhi(type, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getById_xuzhi,
      data: {type: type },
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