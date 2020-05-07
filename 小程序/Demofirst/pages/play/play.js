//me.js
//获取应用实例
const app = getApp();

Page({
  data: {
    service: []
  },
  to_shoot_detail: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.navigateTo({
      url: '../shoot_detail/shoot_detail?id=' + id,
      success: function (e) {
        console.log(e)
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },
  onShow:function(){
    var that = this;
    
  },
  //页面只执行一次
  onLoad: function (options) {
    new app.ToastPannel;
    var that = this;
    var list = [
      {
        'id': 1,
        'title': '古精灵婚纱拍摄',
        'img': '../images/s_2.jpg',
        'price': 220.30,
        'number': 1
      },
      {
        'id': 2,
        'title': '古精灵婚纱拍摄',
        'img': '../images/s_5.jpg',
        'price': 220.30,
        'number': 1
      },

      {
        'id': 3,
        'title': '古精灵婚纱拍摄',
        'img': '../images/s_8.jpg',
        'price': 220.30,
        'number': 1
      },
      {
        'id': 4,
        'title': '古精灵婚纱拍摄',
        'img': '../images/s_9.jpg',
        'price': 220.30,
        'number': 1
      }
    ];
    that.setData({
      service: list
    });
  }
})
