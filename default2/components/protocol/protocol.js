import {
  Class
} from '../../commonClass/add.js';

let Model = new Class();
//获取应用实例
const app = getApp();
// components/protocol/protocol.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: { // 属性名
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //用户是否同意发贴协议
    updateAgree: function () {
      Model.updateAgree(app.globalData.openId, data => {
        console.log('更新');
        console.log(data);
      }, res => { })
    },
    //弹框代码
    preventTouchMove: function () {
      return;
    },
    //关闭弹窗
    close_mask: function () {
      console.log(app.globalData.openId);
      this.setData({
        showModal: true
      })
      this.updateAgree();
    },
    
  }
})
