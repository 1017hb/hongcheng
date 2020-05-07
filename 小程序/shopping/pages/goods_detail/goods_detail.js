//index.js
//获取应用实例
const app = getApp()
var goods = null;
var goodsId = null;
Page({
  data: {
    isLike: false,
    showDialog: false,
    swipt_background:[
      '/images/b1.jpg',
      '/images/b2.jpg',
      '/images/b3.jpg'
    ],
    topNavArray: ['宝贝', '评论', '详情'],
    hiddenTopNav: true,//是否隐藏顶部宝贝、评论、详情标签导航
    navActive: 0,//活动的标签
    goods:null,
    discuessData:null
  },
  /* 减数 */
  delCount: function (e) {
    console.log("刚刚您点击了减1");
    var count = this.data.goods.count;
    // 商品总数量-1
    if (count > 1) {
      this.data.goods.count--;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  /* 加数 */
  addCount: function (e) {
    console.log("刚刚您点击了加1");
    var count = this.data.goods.count;
    // 商品总数量-1  
    if (count < 10) {
      this.data.goods.count++;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  //价格计算
  priceCount: function (e) {
    this.data.goods.totalMoney = this.data.goods.price * this.data.goods.count;
    this.setData({
      goods: this.data.goods
    })
  },
  /**
   * 加入购物车
   */
  addCar: function (e) {
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
  },
  /**
   * sku 弹出
   */
  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
   * sku 关闭
   */
  closeDialog: function () {
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({ url: '../car/car' })
  },
  onLoad: function (options) {
    goodsId = options.goodsId;
    console.log(goodsId);
    var swipt_background = [
      '/images/b1.jpg',
      '/images/b2.jpg',
      '/images/b3.jpg'
    ]
    var detailImg = [
      '/images/c5.jpg',
      '/images/c5.jpg',
      '/images/c5.jpg'
    ],
     goods= {
      imgUrls: swipt_background,
       title: '雅诗兰黛（ESTEELAUDER）红石榴鲜养焕亮女士护肤化妆品套装 正装水+洁面+日霜+眼霜+精华+粉底 ',
      price: 12.36,
       discuessNumber:12,
      privilegePrice: 23.36,
      detailImg: detailImg,
      img: '/images/c2.jpg',
      buyRate: 11,
       goodsId: 1,
      count: 1,
      totalMoney: 12.36,
       location:'江苏 苏州',
       sales:13425
    };
    var discuessData = [
      {
        userId:1,
        userImg:'/images/c2.png',
        userName:'sjldkfj12',
        userTime:'2010-10-10 12:12',
        userInfo:'laskf拉开几个人了所谓刚是问过我；莪刚看完就哦开了个老师如果；我可如果；另外开末日V跟我男人女就完了如果你来上网莪给了我看过几'
      },
      {
        userId: 1,
        userImg: '/images/c2.png',
        userName: 'sjldkfj12',
        user_time: '2010-10-10 12:12',
        userInfo: 'laskf拉开几个人了所谓刚是问过我；莪刚看完就哦开了个老师如果；我可如果；另外开末日V跟我男人女就完了如果你来上网莪给了我看过几'
      }
    ];
    let that = this;
    that.setData({
      goods: goods,
      discuessData: discuessData  
    });
    wx.getSystemInfo({
      success: function (res) {
        let width = res.windowWidth
        let ratio = 750 / width
        let height = ratio * res.windowHeight
        that.setData({
          height: height - 100, //此处减100是减去最底部加入购物车和立即购买按钮导航的高度，单位为rpx
          
        })
      }
    })

  },
  onShow: function () {
    let that = this, heightArray = []
    setTimeout(function () {
      let query = wx.createSelectorQuery()//创建节点查询器
      query.selectAll('.childnode').boundingClientRect(function (rect) {
        rect.forEach(function (value) {
          heightArray.push(value.top)
        })
        that.setData({
          heightArray
        })
      }).exec()
    }, 1000) //此处最好用延时，否则获取的结果有可能是null，也有可能值不准确。
  },
  goToFloor: function (e) {
    let that = this
    var floorNum = e.currentTarget.dataset.floor;
    var index = e.currentTarget.dataset.index;
    that.setData({
      floorNum: floorNum,
      navActive: index
    });
  },
  scrollFloor: function (e) {
    let that = this,
      heightArray = that.data.heightArray, //存储各节点距离scroll-view顶部的top值
      hiddenTopNav,//是否隐藏标签导航
      scrollTop = e.detail.scrollTop,//scroll-view滚动条距顶部的距离
      navActive //活动的节点
    //利用三元运算符得出hiddenTopNav的值，如果scrollTop大于100，则显示标签导航，否则隐藏
    hiddenTopNav = scrollTop > 50 ? false : true
    //将scroll-view滚动条距顶部的距离与各节点距离scroll-view顶部的top值比较，得出活动的标签下标
    if (scrollTop >= heightArray[0] && scrollTop < heightArray[1]) {
      navActive = 0
    } else if (scrollTop >= heightArray[1]-60 && scrollTop < heightArray[2]) {  
      navActive = 1
    } else {
      navActive = 2
    }
    that.setData({
      hiddenTopNav,
      navActive
    })
  }
})
