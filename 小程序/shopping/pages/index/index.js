//index.js
//获取应用实例
const app = getApp()

import { getJSON, postJSON } from '../../utils/server.js';

var sectionData = [];
var ifLoadMore = null;
var page = 1;//默认第一页

Page({
  data: {
    swipt_background: [
      {
        id:1,
        img:'/images/b1.jpg'
      },
      {
        id: 1,
        img: '/images/b2.jpg'
      },
      {
        id: 1,
        img: '/images/b3.jpg'
      },
    ],
    recommend:[],
    titles:['流行','精选','新款'],
    num:0,
    goods_class:[
      { id:1,
        name:'亚斯兰专卖特场',
        intro:'安静的陆放翁房间',
        img:'/images/b1.jpg'
      },
      {
        id: 2,
        name: '亚斯兰专卖特场',
        intro: '安静的陆放翁房间',
        img: '/images/b1.jpg'
      },
      {
        id: 3,
        name: '亚斯兰专卖特场',
        intro: '安静的陆放翁房间',
        img: '/images/b1.jpg'
      },
    ],
    hidden: false,
    num:0,
    newGoods:[],
    scrolldata: ['儿童1', '儿童2', '儿童3','儿童4']
  },
  

  tabControll:function(e){
      this.setData({
        num: parseInt(e.currentTarget.dataset.tab)
      });
      
  },
  addCar: function (e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log(goodsId);
    /*
    var goods = this.data.goods;
    goods.isSelect = true;
    var count = this.data.goods.count;

    var title = this.data.goods.title;
    if (title.length > 13) {
      goods.title = title.substring(0, 13) + '...';
    }

    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart_ids') || [];
    console.log("arr,{}", arr);
    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        console.log(arr[j].goodsId);
        console.log(goodsId);
        if (arr[j].goodsId == goodsId) {
          console.log(arr[j].goodsId);
          // 相等的话，给count+1（即再次添加入购物车，数量+1）  
          arr[j].count = arr[j].count + 1;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {
            wx.setStorageSync('cart_ids', arr)
          } catch (e) {
            console.log(e)
          }
          //关闭窗口
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          this.closeDialog();
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('cart_ids', arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      this.closeDialog();
      return;
    } catch (e) {
      console.log(e)
    }
    */
  },
  show: function (e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log('goodsId:' + goodsId);
    //新增商品用户点击数量
    //that.goodsClickShow(goodsId);
    //跳转商品详情
    wx.navigateTo({ url: '../goods_detail/goods_detail?goodsId=' + goodsId })
  },
  toGoodsdetails: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.detail;
    console.log(type);
    console.log("-------to_details_page");
    wx.navigateTo({
      url: '../goods_detail/goods_detail?goodsId='+type,
    })
  },
  toNav:function(e){
    var that = this;
    var type = e.currentTarget.dataset.idnav;
    console.log(type);
    console.log("-------to_nav_page");
    wx.navigateTo({
      url: '../goods/goods',
    })
  },
  newGoodsShow: function (success) {
    var that = this;
    /*
    ajax.request({
      method: 'GET',
      url: 'goods/getHotGoodsList?key=' + utils.key + '&page=' + page + '&size=10',
      success: data => {
        var newGoodsData = data.result.list;
        page += 1;
        if (ifLoadMore) {
          //加载更多
          if (newGoodsData.length > 0) {
            console.log(newGoodsData)
            //日期以及title长度处理
            for (var i in newGoodsData) {
              //商品名称长度处理
              var name = newGoodsData[i].name;
              if (name.length > 26) {
                newGoodsData[i].name = name.substring(0, 23) + '...';
              }
            }
            sectionData['newGoods'] = sectionData['newGoods'].concat(newGoodsData);
          } else {
            ifLoadMore = false;
            this.setData({
              hidden: true
            })
            wx.showToast({
              title: '暂无更多内容！',
              icon: 'loading',
              duration: 2000
            })
          }

        } else {
          if (ifLoadMore == null) {
            ifLoadMore = true;

            //日期以及title长度处理
            for (var i in newGoodsData) {
              //商品名称长度处理
              var name = newGoodsData[i].name;
              if (name.length > 26) {
                newGoodsData[i].name = name.substring(0, 23) + '...';
              }
            }
            sectionData['newGoods'] = newGoodsData;//刷新
          }

        }
        that.setData({
          newGoods: sectionData['newGoods'],
          // isHideLoadMore: true
        });
        wx.stopPullDownRefresh();//结束动画
      }
    })
    */
   var  goodsData= [
      {
        name: '雅诗兰黛（ESTEELAUDER）红石榴鲜养焕亮女士护肤化妆品套装 正装水+洁面+日霜+眼霜+精华+粉底 ',
        price: 12.36,
        privilegePrice: 23.36,
        img: '/images/c2.jpg',
        goodsId: 1,
        count: 1
      },
      {
        name: '雅诗兰黛（ESTEELAUDER）红石榴鲜养焕亮女士护肤化妆品套装 正装水+洁面+日霜+眼霜+精华+粉底 ',
        price: 12.36,
        privilegePrice: 23.36,
        img: '/images/c2.jpg',
        goodsId: 1,
        count: 1
      },
      {
        name: '雅诗兰黛红石榴鲜养焕亮女士护肤化妆品套装 正装水+洁面+日霜+眼霜+精华+粉底 ',
        price: 12.36,
        privilegePrice: 23.36,
        img: '/images/c2.jpg',
        goodsId: 1,
        count: 1
      },
      {
        name: '雅诗兰黛（ESTEELAUDER） 正装水+洁面+日霜+眼霜+精华+粉底 ',
        price: 12.36,
        privilegePrice: 23.36,
        img: '/images/c2.jpg',
        goodsId: 1,
        count: 1
      }
    ];
    let type = "pop";
    const page = 1;
    var newGoodsData = [];
    getJSON('/home/data', {type,page}, res => {
     
      if (res.statusCode === 200 && res.data.success) {
        const data = res.data;
       /* this.setData({
          swipt_background: data.data.banner.list,
          recommend: data.data.recommend.list
        })*/

        console.log('---------------=====')
        console.log(res);
        newGoodsData = res.data.data.list;
        console.log('---------------=+++++++=====')
        console.log(newGoodsData.length)
        console.log(newGoodsData)
        that.setData({
          newGoods: newGoodsData,
          // isHideLoadMore: true
        });
        /*
        //日期以及title长度处理
        for (var i in newGoodsData) {
          //商品名称长度处理
          var name = newGoodsData[i].title;
          if (name.length > 26) {
            newGoodsData[i].title = name.substring(0, 23) + '...';
          }
        }
        //sectionData['newGoods'] = sectionData['newGoods'].concat(newGoodsData);

        if (ifLoadMore) {
          //加载更多
          /*
          if (newGoodsData.length > 0) {
            
          } else {
            ifLoadMore = false;
            this.setData({
              hidden: true
            })
            wx.showToast({
              title: '暂无更多内容！',
              icon: 'loading',
              duration: 2000
            })
          }
        
        } else {
          if (ifLoadMore == null) {
            ifLoadMore = true;

            //日期以及title长度处理
            for (var i in newGoodsData) {
              //商品名称长度处理
              var name = newGoodsData[i].name;
              if (name.length > 26) {
                newGoodsData[i].name = name.substring(0, 23) + '...';
              }
            }
            console.log(newGoodsData);
            sectionData['newGoods'] = newGoodsData;//刷新
            console.log(sectionData['newGoods']);
          }

        }
          */
      }
    
    })
   
    console.log(newGoodsData)
     
      console.log(this.newGoods)
    wx.stopPullDownRefresh();//结束动画
  
  },
  onLoad: function () {
   
    //wx.setStorageSync('cart_ids', carts) || [];

    getJSON('/home/multidata', { }, res => {
      /*if (res.data.code == 0) {
        let data = res.data.result
        this.setData({
          recordList: data
        })
      }*/
      if(res.statusCode === 200 && res.data.success){
        const data = res.data;
        this.setData({
          swipt_background : data.data.banner.list,
          recommend : data.data.recommend.list
        })
        
        console.log('---------------')
        console.log(res);
      }
      console.log('---------------')
      console.log(res);
    })
  
    this.newGoodsShow();
  },
  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    console.log("上拉");
    var that = this;
    console.log('加载更多');
    if (ifLoadMore != null) {
      that.newGoodsShow();
    }
  },
  goodsClickShow(goodsId) {
    console.log('增加商品用户点击数量');
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'goods/addGoodsClickRate?key=' + utils.key + '&goodsId=' + goodsId,
      success: data => {
        console.log("用户点击统计返回结果：" + data.message)
      }
    })
  },
})
