//index.js
//获取应用实例

const app = getApp();
Page({
  data: {
    swipt_background: [],
    vertical:false,
    server: [],
    cameraman:[]
  },
  to_server_page:function(e){
    var that = this;
    var type = e.currentTarget.dataset.type;
    console.log("-------to_server_page");
    switch(type){
      case "1":
        wx.navigateTo({
          url: '../shoot/shoot',
        })
        break;
      case "2":
        wx.navigateTo({
          url: '../play/play',
        })
        break;
      case "3":
        wx.navigateTo({
          url: '../gift/gift',
        })
        console.log("333");

        break;
      case "4":
        break;
      case "5":
        break;
      case "6":
        break;
      case "7":
        break;
      case "8":
        break;
    }
    console.log(type);
  },
  camdetail:function(e){
    var id = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../cameraman_detail/cameraman_detail?id='+id,
    })
    console.log(id);
  },
  loadData: function () {
    var that = this;
    /*wx.request({
      url: 'http://192.168.0.148:88/hhb/api/index.ashx?action=postswipt',
      method: 'POST',
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
      },
      success: function (res) {//请求成功之后要做什么
        console.log(res);
        console.log(res.data.message);
        that.setData({
          swipt_background: res.data.data
        });
      },
      fail: function (err) {//请求失败之后要做什么
        console.log('请求失败')
      }
    });
    wx.request({
      url: 'http://192.168.0.148:88/hhb/api/index.ashx?action=postserver',
      method: 'POST',
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
      },
      success: function (res) {//请求成功之后要做什么
        console.log(res);
        console.log(res.data.message);
        that.setData({
          server: res.data.data
        });
      },
      fail: function (err) {//请求失败之后要做什么
        console.log('请求失败')
      }
    });
    wx.request({
      url: 'http://192.168.0.148:88/hhb/api/index.ashx?action=postcammeramen',
      method: 'POST',
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
      },
      success: function (res) {//请求成功之后要做什么
        //console.log(res);
        console.log(res.data.data);
        that.setData({
          cameraman: res.data.data
        });
      },
      fail: function (err) {//请求失败之后要做什么
        console.log('请求失败')
      }
    });
    */
  },
  onLoad: function (options) {
    console.log("---------index");
    console.log(app.globalData.user_id);
   var that = this;
    that.loadData();
    console.log("page ---onLoad---监听页面加载");
  },
  onReady: function () {
    console.log("page ---onReady---监听页面初次加载完成");
  },
  onShow: function () {
    console.log("page ---onShow---监听页面显示");
  },
  onHide: function () {
    console.log("page ---onHide---监听页面隐藏");
  },
  onUnload: function () {
    console.log("page ---onUnload---监听页面卸载");
  }
  
})
