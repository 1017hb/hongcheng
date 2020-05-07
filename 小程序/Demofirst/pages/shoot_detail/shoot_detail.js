//me.js
//获取应用实例
const app = getApp();

Page({
  data: {
    swipt_background:[
      '../images/s_2.jpg',
      '../images/s_4.jpg',
      '../images/s_5.jpg',
      '../images/s_6.jpg',
      '../images/s_7.jpg',
      '../images/s_8.jpg',
      '../images/s_9.jpg',
      '../images/s_10.jpg',
      'http://www.agacsr.com/css/index_one.jpg'
 
    ],
    src:'../images/s_4.jpg',
    title:'古精灵主题婚纱拍摄',
    price:500.00,
    time_array: [2,4,6,],
    work_time:'00:00-23:00',
    appoint_year:'全年'
  },
  to_appoint:function(){
    wx.navigateTo({
      url: '../appoint/appoint',
    })
  },
  to_index:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  to_orders:function(){
    wx.navigateTo({
      url: '../orders/orders',
    })
  },
  onLoad: function (options) {
    new app.ToastPannel;
    var that =this;
    console.log(options.id);
    //后台接口

  },
  previewImage:function(e){
    var src = e.currentTarget.dataset.src;
    console.log(e);
    console.log(src);
    wx.previewImage({
      current:src,
      urls: this.data.swipt_background,
    })
  },
  to_call:function(){
  
    wx.makePhoneCall({
      //填写客服电话
      phoneNumber: '13531986883',
    })
  },
  //只能分享给好友,不能分享到朋友圈
   onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: '转发',
      path: '/pages/shoot_detail/shoot_detail',
      success: function (res) {
        console.log('成功', res)
      }
    }
   }
})
