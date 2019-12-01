//app.js


const util = require('utils/util.js')

App({
  globalData: {
    userInfo: null,
    // Serverurl: "http://47.106.237.52:8090/",
    // Serverurl: "http://localhost:8089/",
    Serverurl: "https://www.huazuoban.com",
    token: null,
    openId: null,
    authCode: 0,
    latitude: 25.11624,
    longitude: 102.75205,
    address: null,
    userPhone: null,
    session_key:null,
    unionId:null,
    topicContent:[],
    selectedAddress:null,
    selectedCoupon:null,
    taocanGoodsData:{},//套餐商品下单数据
    aloneGoodsData: {},//单品商品下单数据
    aloneGoodsDatapoint: {}, //积分商城单品商品下单数据
    taocanGoodsDatatuan: {},//团购套餐商品下单数据
    aloneGoodsDatatuan: {},//团购单品商品下单数据
    isBack:false,//购买完成后返回标志，用于回退多个页面
    accessToken:null,
    isFreeMember:'0',
    freeGoodsData:null,
    freeGoods: null,
  },
  wxApi: {
     //登录
    wxLogin: "/wxapi/user/wxLogin",
    //获取unionId
    decodeUserInfo: "/wxapi/user/decodeUserInfo",
    //首页 --> 中间三个分类
    getCenterCategory: "/wxapi/goodsCategory/getCenterCategory",
    //首页 --> 顶部分类
    getTopCategory: "/wxapi/goodsCategory/getTopCategory",
    //新品专区商品
    getGoodsNewList: "/wxapi/goods/getGoodsNewList",
    //热卖专区商品
    getGoodsHOTList: "/wxapi/goods/getGoodsHOTList",
    //发现专区商品
    getGoodsFindList: "/wxapi/goods/getGoodsFindList",
    //根据分类id查询商品列表
    getGoodsListByCategoryId: "/wxapi/goods/getGoodsListByCategoryId",
    //根据商品id查询商品
    getGoodsById_goods: "/wxapi/goods/getGoodsById",
    //积分商城根据商品id查询商品
    getGoodsById_points: "/wxapi/goodsPoints/getGoodsById",
    //养护 --> 中间分类
    getCenterCategory_grow: "/wxapi/curing/getCenterCategory",
    //养护 --> 顶部分类
    getTopCategory_grow: "/wxapi/curing/getTopCategory",
    //鲜花养护列表
    getCuringGoodsList: "/wxapi/curingGoods/getCuringGoodsList",
    //养护详情
    getGoodsById: "/wxapi/curingGoods/getGoodsById",
    //话题分类
    getTalkCategory: "/wxapi/talk_category/getTalkCategory",
    //发布文章
    addSave: "/wxapi/talkContent/addSave",
    //发现页面---发现列表
    list: "/wxapi/talkContent/list",
    //发现页面---关注列表
    getFollowtList: "/wxapi/talkContent/getFollowtList",
    //文章详情
    getArticleById: "/wxapi/talkContent/getArticleById",
    //文章详情列表
    getArticlelistByCategoryId: "/wxapi/talkContent/getArticlelistByCategoryId",
    //关注
    articleFollow: "/wxapi/talkContent/articleFollow",
    //取消关注
    cancleFollow: "/wxapi/talkContent/cancleFollow",
    //文章收藏
    articleCollection: "/wxapi/talkContent/articleCollection",
    //文章取消收藏
    cancleArticleCollection: "/wxapi/talkContent/cancleArticleCollection",
    //文章点赞
    praiseClickArticle: "/wxapi/talkPointsPraise/praiseClickArticle",
    //文章取消点赞
    canclePraiseClickArticle: "/wxapi/talkPointsPraise/canclePraiseClickArticle",
    //评论文章
    addSaveComment: "/wxapi/talkContentComment/addSave",
    //回复
    addSaveReplay: "/wxapi/talkContentCommentReply/addSave",   
    //浏览足迹
    articleLookHistory: "/wxapi/talkContent/articleLookHistory",
    //浏览足迹列表
    getLookHistoryList: "/wxapi/talkContent/getLookHistoryList",
    //文章收藏列表
    getCollectionList: "/wxapi/talkContent/getCollectionList",
    //文章分享
    shareArticle: "/wxapi/talkPointsShare/shareArticle",
    //添加地址
    addSaveAddress: "/wxapi/userAddress/addSave",
    //删除地址
    deleteAddress: "/wxapi/userAddress/delete",
    //地址详情
    getByIdAddress: "/wxapi/userAddress/getById",
    //地址列表
    listAddress: "/wxapi/userAddress/list",
    //设为默认地址
    setDefaultAddress: "/wxapi/userAddress/setDefault",
    //编辑地址
    updateSaveAddress: "/wxapi/userAddress/updateSave",
     //优惠加购
    getAddBuyList: "/wxapi/goods/getAddBuyList",
    //赠送
    getGoodsGiftList: "/wxapi/goods/getGoodsGiftList",
    //根据商品id查询优惠券
    getCouponList: "/wxapi/goods/getCouponList",
    //套餐下单
    downOrderPackage: "/wxapi/order/downOrderPackage",
    //单品下单
    downOrderSameSeries: "/wxapi/order/downOrderSameSeries",
    //团购套餐下单
    downOrderPackageGroup: "/wxapi/order/downOrderPackageGroup",
    //团购单品下单
    downOrderSameSeriesGroup: "/wxapi/order/downOrderSameSeriesGroup",
    //支付
    prePay: "/wxapi/orderPay/prePay",
    //限时团购列表
    getLimitTeamGoodsList: "/wxapi/goods/getLimitTeamGoodsList",
    //限时团购详情
    getLimitTimeById: "/wxapi/goods/getLimitTimeById",
    //首页轮播图
    getActivityList: "/wxapi/goods/getActivityList",
    //轮播图详情
    getActivityById: "/wxapi/goods/getActivityById",
    //根据商品id查询活动商品详情
    getActivityGoodsById: "/wxapi/goods/getActivityGoodsById",
    //订单列表
    orderMainList: "/wxapi/order/orderMainList",
    //子订单列表
    orderDetailList: "/wxapi/order/orderDetailList",
    //绑定团队上下级关系
    bindChallengeTeamMember: "/wxapi/challenge/bindChallengeTeamMember",
    //创建团（针对单人、多人）
    createChallengeTeam: "/wxapi/challenge/createChallengeTeam",
    //参加组团活动，成为团员(针对多人团)
    jionChallengeTeam: "/wxapi/challenge/jionChallengeTeam",
    //查询我推广的成员(单人、多人团的分享的下级)
    myShareMember: "/wxapi/challenge/myShareMember",
    //查询团队成员
    myTeam: "/wxapi/challenge/myTeam",
    //个人主页---足迹商品列表
    getgoodsLookList: "/wxapi/talkLookHistory/getgoodsLookList",
    //个人中心信息
    getUserCenter: "/wxapi/user/getUserCenter",
    //查看未读数量
    getNoLookCount: "/wxapi/systemMessage/getNoLookCount",
    //个人通知列表
    personalMessageList: "/wxapi/systemMessage/personalMessageList",
    //系统通知列表
    systemMessageList: "/wxapi/systemMessage/systemMessageList",
    //变为已读
    updateLookType: "/wxapi/systemMessage/updateLookType",
    //签到
    addSaveSign: "/wxapi/userSign/addSave",
    //查询签到
    getSignList: "/wxapi/userSign/getSignList",
    //个人优惠券
    getUserCenterCoupon: "/wxapi/user/getUserCenterCoupon",
    //生成微信公众号二维码
    genWechatQRcode: "/wxapi/user/genWechatQRcode",
    //保存企业采集
    addSavecompany: "/wxapi/companys/addSave",
    //保存建议反馈
    addSavesuggest: "/wxapi/suggest/addSave",
    //评论列表
    getCommentList: "/wxapi/talkContentComment/getCommentList",
    //商品收藏
    goodsCollection: "/wxapi/talkContent/goodsCollection",
    //商品取消收藏
    cancleGoodsCollection: "/wxapi/talkContent/cancleGoodsCollection",
    //商品是否收藏
    hasGoodsCollection: "/wxapi/talkContent/hasGoodsCollection",
    //商品浏览足迹
    goodsLookHistory: "/wxapi/talkContent/goodsLookHistory",
    //收藏商品列表
    getGoodsCollectionList: "/wxapi/talkContentCollection/getGoodsCollectionList",
    //个人主页信息
    getMyInfo: "/wxapi/user/getMyInfo",
    //个人主页--笔记列表
    myTalkList: "/wxapi/talkContent/myTalkList",
    //积分商城根据商品id查询商品
    pointgetGoodsById: "/wxapi/goodsPoints/getGoodsById",
    //积分商城商品列表
    getPointsGoodsList: "/wxapi/goodsPoints/getPointsGoodsList",
    //关注列表
    getUserFollowList: "/wxapi/user/getUserFollowList",
    //粉丝列表
    getLikeMeList: "/wxapi/user/getLikeMeList",
    //取消订单
    cancelOrder: "/wxapi/order/cancelOrder",
    //订单详情
    orderDetailByOrderNum: "/wxapi/order/orderDetailByOrderNum",
    //申请退款
    applyRefund: "/wxapi/order/applyRefund",
    //订单修改地址（子单）
    modifyAddress: "/wxapi/order/modifyAddress",
    //订单修改地址（主单）
    modifyMainOrderAddress: "/wxapi/order/modifyMainOrderAddress",
    //确认收货
    confirmReceipt: "/wxapi/order/confirmReceipt",
    //发现搜索框提示文字
    getShowText: "/wxapi/talk_show/getShowText",
    //挑战列表
    myChallengeHis: "/wxapi/challenge/myChallengeHis",
    //查询所有正在活跃的团
    activeTeams: "/wxapi/challenge/activeTeams",
    //查询个人拥有的积分
    myIntegral: "/wxapi/order/myIntegral",
    //积分商品下单
    downOrderIntegral: "/wxapi/order/downOrderIntegral",
    //延迟收花
    delayReceipt: "/wxapi/order/delayReceipt",
    //邀请购买规则  
    list_yaoqing: "/wxapi/friends/list",
    //根据主单id查询子单订单号  
    getChildOrderNum: "/wxapi/order/getChildOrderNum",
    //子单详情  
    getChildOrderDetail: "/wxapi/order/getChildOrderDetail",
    //获取物流信息  
    search: "/wxapi/logiscsApi/search",
    //查询签到天数
    getSignCount: "/wxapi/userSign/getSignCount",
     //关注数量提示
    talkFlowCount: "/wxapi/talkContent/talkFlowCount",
    // 关注数量提示取消
    talkFlowCountCancle: "/wxapi/talkContent/talkFlowCountCancle",
    // 删除文章
    articleDelete: "/wxapi/talkContent/articleDelete",
    // 删除回复
    replayDelete: "/wxapi/talkContentCommentReply/replayDelete",
    // 删除评论
    commentDelete: "/wxapi/talkContentComment/commentDelete",
    // 订单数量提示
    waitOrderCount: "/wxapi/order/waitOrderCount",
    // 获取小程序access_token
    authAppletsAccessToken: "/wxapi/talkContent/authAppletsAccessToken",
    //校验一张图片是否含有违法违规内容
    imgSecCheck: "/wxapi/talkContent/imgSecCheck",
    // 检查一段文本是否含有违法违规内容
    msgSecCheck: "/wxapi/talkContent/msgSecCheck",
    // 用户是否同意发贴协议
    getAgree: "/wxapi/user/getAgree",
    // 更新用户发贴协议
    updateAgree: "/wxapi/user/updateAgree",
    //自由拼花商品
    getGoodsListfree: "/wxapi/freeGoods/getGoodsList",
    //限制价格
    limitPrice: "/wxapi/limitPriceApi/limitPrice",
    //自由购banner
    freeBanner: "/wxapi/freeTopImage/addSave",
    //会员卡列表
    userCardList: "/wxapi/userCardApi/userCardList",
    //顶部大图会员卡
    userTopCardList: "/wxapi/userCardApi/userTopCardList",
    //会员卡订单[ 408表示已经购买了会员，且并未过期 ]
    memberOrder: "/wxapi/userMemberOrder/memberOrder",
    //会员卡支付
    freeprePay: "/wxapi/memberOrderPay/prePay",
    //购花须知(1)会员卡须知(2)
    getById_xuzhi: "/wxapi/goodsShopNotice/getById",
  },
  //登录获取openId、token
  getToken: function () {
    return new Promise((resolve, reject) => {
      // 登录
      wx.login({
        success: res => {
          // console.log(res);
          var url = this.wxApi.wxLogin;
          var params = {
            code: res.code
          };        
          util.wxRequest(url, params, data => {
            // console.log(data.data.openId);
            // console.log(data);
            if (data.status == 200) {
              this.globalData.isFreeMember = data.data.isFreeMember;
              this.globalData.openId = data.data.openId;
              this.globalData.token = data.data.token;
              this.globalData.session_key = data.data.session_key;
              this.globalData.authCode = data.data.authCode;
              this.globalData.accessToken = data.data.accessToken;
              if (data.data.unionId){
                this.globalData.unionId = data.data.unionId;
              }   
              if (data.data.avatarUrl) {
                this.globalData.avatarUrl = data.data.avatarUrl;
              } 
              if (data.data.nickName) {
                this.globalData.nickName = data.data.nickName;
              }         
              var respam = {
                openid: data.data.openId,
                token: data.data.token
              }
              resolve(respam)
            } else {
              this.getToken();
            }
          }, data => {
            //  reject();
          }, data => { })
        }
      })
    })
  },


  //版本更新
  update: function () {
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  onLaunch: function () {
   
    // 登录
    // this.getToken();
  
    this.update();

    // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否马上重启小程序？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })

  },
})