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
  //养护 --> 中间分类
  getCenterCategory(categoryId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getCenterCategory_grow,
      data: { categoryId: categoryId},
      success: success,
      complete: complete
    }

    this.request(params);
  };
  
  // 养护 --> 顶部分类
  getTopCategory(success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getTopCategory_grow,
      data: {},
      success: success,
      complete: complete
    }

    this.request(params);
  };
  // 鲜花养护列表
  getCuringGoodsList(categoryId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getCuringGoodsList,
      data: { categoryId: categoryId},
      success: success,
      complete: complete
    }

    this.request(params);
  };
  // 养护详情
  getGoodsById(goodsId,success, complete) {
    let params = {
      method: 'POST',
      url: app.wxApi.getGoodsById,
      data: { goodsId: goodsId},
      success: success,
      complete: complete
    }

    this.request(params);
  };

  

}
export {
  Class
}