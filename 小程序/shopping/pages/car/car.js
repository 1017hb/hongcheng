//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    is_goshopping: true,
    goodsid: [],
    carts: [],
    allselect: true,
    allprice: 0,
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: false, //文本框焦点

  },
  onShow: function () {
    var that = this;
    that.check_shopping();
    that.getshoppping();
  },
  onLoad: function () {
    new app.ToastPannel;
    var that = this;
    that.check_shopping();
    that.getshoppping();
    
    var goodsid = [];
    wx.setStorageSync('cart_id', goodsid) || [];  
    console.log(this.is_goshopping);
  },
  //跳转到商品页
  toLook:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 取消/隐藏支付密码输入层
  hidePayLayer: function () {
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: '',
    })
    this.show('取消支付');
  },
  //输入密码监听
  inputPwd: function (e) {
    var that = this;
    this.setData({ pwdVal: e.detail.value });
    if (e.detail.value.length >= 6) {
      //调用支付接口

      //支付成功后
      this.setData({
        showPayPwdInput: false,
        payFocus: false,
        pwdVal: '',
      })
      this.show('支付成功');
      //清空缓存
      var newcart = [];
      wx.setStorageSync('cart_ids', newcart) || [];
      that.setData({
        is_goshopping: false,
        allselect: false,
        allprice: 0,
      });
      that.getshoppping();
    }
  },
  //获取焦点
  getFocus: function () {
    this.setData({ payFocus: true });
  },
  //结账
  check_out: function () {
    var that = this;
    var allprice = that.data.allprice;
    if (allprice == 0) {
      this.show('亲,请先选择商品');
    } else {
      //显示密码输入层
      that.setData({
        showPayPwdInput: true,
        payFocus: true
      })
    }
  },
  //单选
  selectListThing: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    var goodsid = wx.getStorageSync('cart_id') || [];
    var newcart = [];
    console.log(id);

    //单选:改变是否要购买的样式
    var carts = that.data.carts;
    for (var i in carts) {
      if (carts[i].id == id) {
        if (carts[i].isSelect) {
          carts[i].isSelect = false;
        } else {
          carts[i].isSelect = true;
        }
      }
    }
    that.setData({
      carts: carts
    });
    that.is_all_selected();
    that.check();

    //将准备要购买的商品id缓存起来
    if (!goodsid.includes(id)) {
      goodsid.unshift(id);
      wx.setStorageSync('cart_id', goodsid) || [];
    } else {
      var m = 0;
      var j = 0;
      for (j in goodsid) {
        if (goodsid[j] != id) {
          newcart[m] = goodsid[j];
          m++;
          j++;
        }
      }
      wx.setStorageSync('cart_id', newcart) || [];
    }

  },
  //移除指定id的商品
  remove_id: function (e) {
    var that = this;
    var carts = that.data.carts;
    var id = e.currentTarget.dataset.id;
    var newcarts = [];
    var m = 0;
    var j = 0;
    for (j in carts) {
      if (carts[j].id != id) {
        newcarts[m] = carts[j];
        m++;
        j++;
      }
    }
    that.setData({
      carts: newcarts
    });
    wx.setStorageSync('cart_ids', newcarts);
    that.is_all_selected();
    that.check();
  },
  //全选
  all_selected: function () {
    var that = this;
    var carts = that.data.carts;
    if (that.data.allselect) {//已全选
      for (let i in carts) {
        carts[i].isSelct = false;
      }
      that.setData({
        carts: carts,
        allselect: false
      });
    } else {//未全选
      for (let i in carts) {
        carts[i].isSelect = true;
      }
      that.setData({
        carts: carts,
        allselect: true
      });
    }
    that.check();
  },
  //某商品数量添加
  add: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var carts = that.data.carts;
    for (let i in carts) {
      if (carts[i].id == id) {
        //if (carts[i].isSelect) {
        carts[i].count++;
        // }
        break;
      }
    }
    that.setData({
      carts: carts
    });
    wx.setStorageSync('cart_ids', carts);
    that.check();
  },
  //某商品数量减少
  remove: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var carts = that.data.carts;
    console.log('remoce');
    console.log(id);
    for (let i in carts) {
      if (carts[i].id == id) {
        //if (carts[i].isSelect) {
        if (carts[i].count > 1) {
          carts[i].count--;
        }
        // } else {
        //   this.show('选择购买该商品');
        // }
        break;
      }
    }
    that.setData({
      carts: carts
    });
    wx.setStorageSync('cart_ids', carts);
    that.check();
  },
  //是否全选
  is_all_selected: function () {
    var that = this;
    var carts = that.data.carts;
    var flage = true;
    for (let i in carts) {
      if (!carts[i].isSelect) {//没有全选
        flage = false;
        break;
      }
    }
    that.setData({
      allselect: flage
    });
  },
  //计算总价格
  check: function () {
    var that = this;
    var carts = that.data.carts;
    var all_price = 0;
    for (let i in carts) {
      if (carts[i].isSelect) {
        var price = carts[i].price;
        var count = carts[i].count;
        all_price = all_price + price * count;
      }
    }
    all_price = all_price.toFixed(2);//3位、4位什么的，toFixed(2)的参数可以动态传
    that.setData({
      allprice: all_price
    });
  },
  shopping_page: function () {
    wx.navigateTo({
      url: '../gift/gift',
    })
  },
  //获取缓存购物车
  getshoppping: function () {
    var that = this;
    var gift_item = wx.getStorageSync('cart_ids') || [];
    console.log(gift_item);
    that.setData({
      carts: gift_item
    });
  },
  //检验购物车是否有商品,仅仅显示购物车（样式）作用
  check_shopping: function () {
    var that = this;
    wx.getStorage({
      key: 'cart_ids',
      success: function (res) {
        console.log(res)
        if (res.data == null || res.data == "") {
          that.setData({
            is_goshopping: false
          });
        }
      },
    })
    that.check();
  },
})
