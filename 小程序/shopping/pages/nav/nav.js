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
    types: [
      { "id": 'list1', "name": "经典饮品" },
      { "id": 'list2', "name": "健康饮食" },
      { "id": 'list3', "name": "卡布奇诺" },
      { "id": 'list4', "name": "瑞纳冰" },
    ],
   
    scrollTop: 1200,
    currType:'list1',
    nav_data:[
      {
        'id':'list1',
        'name_type':'奶茶系列',
        'data':[
          {
            'id':1,
            'name':'奶茶1',
            'img':'/images/c2.png'
          },
          {
            'id': 2,
            'name': '奶茶2',
            'img': '/images/c2.png'
          },
          {
            'id': 3,
            'name': '奶茶3',
            'img': '/images/c2.png'
          },
          {
            'id': 4,
            'name': '奶茶4',
            'img': '/images/c2.png'
          },
          
        ],
      },
      {
        'id': 'list2',
        'name_type': '咖啡系列',
        'data': [
          {
            'id': 1,
            'name': '咖啡1',
            'img': '/images/c2.png'
          },
          {
            'id': 2,
            'name': '奶茶2',
            'img': '/images/c2.png'
          },
          {
            'id': 3,
            'name': '奶茶2',
            'img': '/images/c2.png'
          },
          {
            'id': 4,
            'name': '奶茶2',
            'img': '/images/c2.png'
          },
         
        ],
      },
      {
        'id': 'list3',
        'name_type': '水果系列',
        'data': [
          {
            'id': 1,
            'name': '奶茶2',
            'img': '/images/c2.png'
          },
          {
            'id': 2,
            'name': '水果2'
          },
          {
            'id': 3,
            'name': '奶茶2',
            'img': '/images/c2.png'
          },
          {
            'id': 4,
            'name': '奶茶2',
            'img': '/images/c2.png'
          },
          
        ],
      },

    ],
    toView:'',
    setitem:0
  },
 
  onLoad: function () {
    var that = this;
   
  },
  tapType: function (e) {
    var that = this; 
    const currType = e.currentTarget.dataset.typeId;
    that.setData({
      currType: currType,
      toView: currType
    });
    console.log(currType);
  },
  scroll:function(e){
    console.log(e.detail.scrollTop);
    const top = e.detail.scrollTop;
    if (top>333){

    }
  }
})
