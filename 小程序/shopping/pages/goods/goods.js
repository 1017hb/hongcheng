//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swipt_background: [
      '/images/b1.jpg',
      '/images/b2.jpg',
      '/images/b3.jpg'
    ],
    goodsData: [
      {
        id: 1,
        order_code: '516df5sldfk',
        name: '化妆品0',
        newPrice: 12.33,
        oldPrice: 25,
        img: '/images/c2.jpg'
      },
      {
        id: 1,
        order_code: '516df5sldfk',
        name: '化妆品0',
        newPrice: 12.33,
        oldPrice: 25,
        img: '/images/c2.jpg'
      },
      {
        id: 1,
        order_code: '516df5sldfk',
        name: '化妆品0',
        newPrice: 12.33,
        oldPrice: 25,
        img: '/images/c2.jpg'
      },
      {
        id: 1,
        order_code: '516df5sldfk',
        name: '化妆品0',
        newPrice: 12.33,
        oldPrice: 25,
        img: '/images/c2.jpg'
      }

    ],
    imgData:[
      '/images/s3.png',
      '/images/s3.png',
      '/images/s3.png'
    ],
  },
  toGoodsdetails: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.detail;
    console.log(type);
    console.log("-------to_details_page");
    wx.navigateTo({
      url: '../goods_detail/goods_detail',
    })
  },
  onLoad: function () {
    
  },

})
