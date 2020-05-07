//me.js
//获取应用实例
const app = getApp();

Page({
  data: {
    user_img: '',
    user_name: '',
  },
  shopping_cat:function(){
    console.log('222222');
    wx.navigateTo({
      url: '../shoppingcat/shoppingcat',
      success: function (res) {
        console.log("-------success");
      },
      fail: function (res) {
        console.log(res);
        console.log("-------faile");
      }
    })
  },
  to_personal:function(e){
    wx.navigateTo({
      url: '../personal/personal',
      success: function (res) {
        console.log("-------success");
      },
      fail: function (res) {
        console.log("-------faile");
      },
      complete: function (res) {
        console.log("-------");
      },
    })
  },
  onLoad: function (options) {
    var that =this;
    console.log('-------me');
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res);
        that.setData({
          user_img: res.data.avatarUrl,
          user_name: res.data.nickName
        });
      },
    })
   
   

  }
})
