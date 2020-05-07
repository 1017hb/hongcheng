//me.js
//获取应用实例
const app = getApp();

Page({
  data: {
    date:'2010-10-10',
    time:'12:01',
    array: ['套餐一', '套餐二', '套餐三', '套餐四'],
    index:0,
    time:['9','14','16','20'],
    index_time:0,
    modal:false
  },
  show_sure:function(){
    this.setData({
      modal: false
    });
    //后台接口
  },
  sure_data:function(){
   this.setData({
     modal:true
   });
  },
  change_time:function(e){
    var that = this;
    that.setData({
      index_time: e.detail.value
    })
  },
  change_price:function(e){
    var that = this;
    that.setData({
      index: e.detail.value
    })
  },
  bindTimeChange:function(e){
    var that = this;
    that.setData({
      time: e.detail.value
    })
  },
  change_day:function(e){
    var that = this;
    that.setData({
      date: e.detail.value
    })
  },
  onShow:function(){
    var that = this;
    
  },
  //页面只执行一次
  onLoad: function (options) {
    new app.ToastPannel;
    var that = this;
   
  }
})
