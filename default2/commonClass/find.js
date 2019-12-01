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
  //发现列表
  list(Fkeyworlds,limit,page,openId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.list,
      data: { Fkeyworlds: Fkeyworlds, limit: limit, page: page, openId: openId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //关注列表
  getFollowtList(limit, page, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getFollowtList,
      data: { limit: limit, page: page, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //文章详情
  getArticleById(articleId,openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getArticleById,
      data: { articleId: articleId, openId: openId},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //文章详情列表
  getArticlelistByCategoryId(articleId, openId, categoryId,limit,page, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getArticlelistByCategoryId,
      data: { articleId: articleId, openId: openId, categoryId: categoryId, limit:limit ,page:page},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //关注
  articleFollow(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.articleFollow,
      data: { articleId: articleId, openId: openId},
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
  //文章收藏
  articleCollection(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.articleCollection,
      data: { articleId: articleId, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //文章取消收藏
  cancleArticleCollection(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.cancleArticleCollection,
      data: { articleId: articleId, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //文章点赞
  praiseClickArticle(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.praiseClickArticle,
      data: { articleId: articleId, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //文章点赞
  canclePraiseClickArticle(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.canclePraiseClickArticle,
      data: { articleId: articleId, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //文章分享
  shareArticle(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.shareArticle,
      data: { articleId: articleId, openId: openId },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //浏览足迹
  articleLookHistory(articleId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.articleLookHistory,
      data: { articleId: articleId, openId: openId },
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
  //文章评论
  addSaveComment(articleId, nickImage, nickName, openId, replyContent, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.addSaveComment,
      data: { articleId: articleId, nickImage: nickImage, nickName: nickName, openId: openId, replyContent: replyContent },
      success: success,
      complete: complete
    }
    console.log(params.data);
    this.request(params);
  };
  //回复
  addSaveReplay(articleId, commentId, replyContent, replyUserId, replyUserNickImage, replyUserNickName, toUserId, toUserNickImage, toUserNickName, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.addSaveReplay,
      data: { articleId: articleId, commentId: commentId, replyContent: replyContent, replyUserId: replyUserId, replyUserNickImage: replyUserNickImage, replyUserNickName: replyUserNickName, toUserId: toUserId, toUserNickImage: toUserNickImage, toUserNickName: toUserNickName},
      success: success,
      complete: complete
    }
    console.log(params.data);

    this.request(params);
  };
  //评论列表
  getCommentList(articleId, limit, page,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getCommentList,
      data: { articleId: articleId, limit: limit, page: page },
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //1:发现页面搜索提示文字 2：花粉卡页面通知
  getShowText(type,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getShowText,
      data: { type: type},
      success: success,
      complete: complete
    }
    // console.log(params.data);
    this.request(params);
  };
  //删除回复
  replayDelete(replayId, replyUserId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.replayDelete,
      data: { replayId: replayId, replyUserId: replyUserId },
      success: success,
      complete: complete
    }
    console.log(params.data);
    this.request(params);
  };
  //删除评论
  commentDelete(commentId, openId, success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.commentDelete,
      data: { commentId: commentId, openId: openId },
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