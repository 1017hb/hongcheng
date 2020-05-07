import { getOrderDetail, userLevelPurchasevip} from '../../api/order.js';
import { openOrderSubscribe } from '../../utils/SubscribeMessage.js'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '支付成功'
    },
    orderId:'',
    order_pay_info: { paid :1 }
  },
  onLoadFun:function(){
    this.getOrderPayInfo();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   


    if (!options.order_id) return app.Tips({title:'缺少参数无法查看订单支付状态'},{tab:3,url:1});
    this.setData({ orderId: options.order_id, status: options.status || 0, msg: options.msg || ''});
  },
  /**
   * 
   * 支付完成查询支付状态
   * 
  */
  getOrderPayInfo:function(){
    var that=this;
    wx.showLoading({title: '正在加载中'});
    console.log(this.data.orderId)
    getOrderDetail(this.data.orderId).then(res=>{
      wx.hideLoading();
      console.log(res);
      let vip = res.data;
      let vip_type = 0;
      let u_id = res.data.uid;
      console.log("1111111111")
      console.log(vip.cartInfo)
      for (let i = 0; i < vip.cartInfo.length;i++){
        if(vip.cartInfo[i].product_id === 301){
          vip_type = 2;//钻石
          break;
        } 
      }
      for (let i = 0; i < vip.cartInfo.length; i++) {
        if (vip.cartInfo[i].product_id === 302) {
          vip_type = 1;//黄金
          break;
        }
      }
      for (let i = 0; i < vip.cartInfo.length; i++) {
        if (vip.cartInfo[i].product_id === 656) {
          vip_type = 3;//高级合伙人
          break;
        }
      } 
      if (res.data.paid){
        userLevelPurchasevip(vip_type).then(res => {
          console.log(res)
          console.log('=====调用接口======12566156' + u_id)
        })
      }
      console.log(vip_type);
      console.log(res.data.paid )
      that.setData({ order_pay_info: res.data, 'parameter.title': res.data.paid ? '支付成功' : '支付失败' });
    }).catch(err=>{
      wx.hideLoading();
    });
  },
  /**
   * 去首页关闭当前所有页面
  */
  goIndex:function(e){
    wx.switchTab({url:'/pages/index/index'});
  },

  /**
   * 
   * 去订单详情页面
  */
  goOrderDetails:function(e)
  {
    let that = this;
    wx.showLoading({
      title: '正在加载',
    })
    openOrderSubscribe().then(res => {
      wx.hideLoading();
      wx.navigateTo({
        url: '/pages/order_details/index?order_id=' + that.data.orderId
      });
    }).catch(() => {
      wx.hideLoading();
    });
  }


})