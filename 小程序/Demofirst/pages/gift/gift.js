//me.js
//获取应用实例
const app = getApp();

Page({
  data: {
   gift_item:[
     {
       'id':1,
       'img':'http://www.agacsr.com/css/index_one.jpg',
        'name':'糖果礼盒',
        'price':500.11,
        'number':1,
       'isselcted': false,
     },
     {
       'id': 2,
       'img': 'http://www.agacsr.com/css/index_one.jpg',
       'name': '甜品蛋糕',
       'price': 500.03,
       'number': 1,
       'isselcted': false,
     },
     {
       'id': 3,
       'img': 'http://www.agacsr.com/css/index_one.jpg',
       'name': '糖果礼盒',
       'price': 500.10,
       'number': 1,
       'isselcted': false,
     }

     ],
    orders:[]
  },
  add_cat:function(e){
    var that = this;
    
    var id = e.currentTarget.dataset.id;
    var carts = that.data.gift_item;
    var flage=true;
    var gift_item = wx.getStorageSync('cart_ids') || [];

   
    for (let i in gift_item) {
      if (gift_item[i].id == id) {
        flage = false;
      }
    }
    if (flage){
      for (let j in carts) {
        if (carts[j].id == id) {
          gift_item.push(carts[j]);
          wx.setStorageSync('cart_ids', gift_item) || [];
          this.show('成功加入购物车');
        }
      }
    } 
  },
  onLoad: function (options) {
    var that= this;
    new app.ToastPannel;
    wx.setStorageSync('cart_ids', that.data.orders)||[];
  }
})
