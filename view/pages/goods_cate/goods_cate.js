import { getCategoryList, brand, brand_list, brand_productTwo } from '../../api/store.js';
import { getUserInfo } from '../../api/user.js';
const app = getApp();
let catePage = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navlist: [],
    productList: [],
    navActive: 1,
    parameter: {
      'navbar': '1',
      'return': '0',
      'title': '产品分类'
    },
    navH: "",
    number: "",
    loadend: false,
    loading: false,
    loadTitle: '加载更多',
    cateData: [
      {
        id:1,
        brand_name:'春季',
        sea:1,
        seacss:11
      }
    ],
    seas:[],
    //cateData: [],
    goodsData: [],
    vip_name: '会员',
    vip_grade: 0
  },

  getdata: function (catePage) {
    let that = this;
    let navActive = that.data.navActive;
    let id = that.data.cateData[navActive].id;
    that.setData({ loading: true, loadTitle: '' });
    brand_productTwo(id, catePage).then(res => {
      let list = res.data;
      let goodsData = app.SplitArray(list, that.data.goodsData);
      let loadend = list.length < 15;
      that.setData({
        loadend: loadend,
        loading: false,
        loadTitle: loadend ? '已全部加载' : '加载更多',
        goodsData: goodsData
      });
    }).catch(err => {
      that.setData({ loading: false, loadTitle: '加载更多' });
    });
  },
  loadMore: function () {
    let that = this;
    catePage += 1;
    that.getdata(catePage);
  },
  /*
  * 获取用户信息
  */
  getUserInfoData: function () {
    var that = this;
    getUserInfo().then(res => {
      console.log('个人信息数据')
      console.log(res)
      let userInfo = res.data;
      that.setData({
        vip_name: userInfo.vip_name,
        vip_grade: userInfo.vip_grade
      });
    });
  },
  onPageScroll: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    let that = this;
    //商品品牌分类
    brand_list().then(res => {
      console.log('ssssss')
      console.log(res)
      let list = res.data;
      /*
      let chun = { id: 1, brand_name: "春季", sea: 1,seacss:11}
      let xia = { id: 2, brand_name: "夏季", sea: 2, seacss: 12 }
      let qiu = { id: 3, brand_name: "秋季", sea: 3, seacss: 13 }
      let dong = { id: 4, brand_name: "冬季", sea: 4, seacss: 14 }
      let seas = [];
      for (let i = 0; i < data.length;i++){
        if (data[i].sea == 1){
          seas.splice(0,0,i);
          data.splice(i, 0, chun);
          break;
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].sea == 2) {
          seas.splice(1, 0, i);
          data.splice(i, 0, xia);
          break;
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].sea == 3) {
          seas.splice(2, 0, i);
          data.splice(i, 0, qiu);
          break;
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].sea == 4) {
          seas.splice(3, 0, i);
          data.splice(i, 0, dong);
          break;
        }
      }
      */
      let cateData = app.SplitArray(list, that.data.cateData);
      that.setData({
        //seas:seas,
        cateData: cateData
      });
    })
    setTimeout(function () {
      brand_productTwo(that.data.cateData[0].id, catePage).then(res => {
        that.setData({
          goodsData: res.data
        });
      })
    }, 1000)
    that.infoScroll();
  },
  onReachBottom: function () {
  },
  infoScroll: function () {
    let that = this;
    //let len = that.data.productList.length;
    let len = that.data.cateData.length;
    that.setData({
      navH: app.globalData.navHeight,
      //number: that.data.productList[len - 1].goodList.length
    })
    //设置商品列表高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: (res.windowHeight) * (750 / res.windowWidth) - 98 - app.globalData.navHeight
          //res.windowHeight:获取整个窗口高度为px，*2为rpx；98为头部占据的高度；
        })
      },
    });
    var height = 0;
    var hightArr = [];

  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    //var sea = e.currentTarget.dataset.sea;
    let that = this;
    let seas = that.data.seas;
    for (let i = 0; i < seas.length;i++){
      if (index == seas[i]) {
        index += 1;
      }
    }
    
    this.setData({
      toView: id,
      navActive: index,
      goodsData: []
    });
    catePage = 1;
    this.getdata(catePage);
  },
  getAllCategory: function () {
    var that = this;
    brand().then(res => {
      console.log(res)
      that.setData({
        productList: res.data
      });
      that.infoScroll();
    })
  },

  scroll: function (e) {
    /*
    var scrollTop = e.detail.scrollTop;
    var scrollArr = this.data.hightArr;
    for (var i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0]) {
        this.setData({
          navActive: 0,
          lastActive: 0
        })
      } else if (scrollTop >= scrollArr[i] - scrollArr[0] && scrollTop < scrollArr[i + 1] - scrollArr[0]) {
        this.setData({
          navActive: i
        })
      } else if (scrollTop >= scrollArr[scrollArr.length - 1] - scrollArr[0]) {
        this.setData({
          navActive: scrollArr.length - 1
        })
      }
    }
    */
  },

  searchSubmitValue: function (e) {
    console.log('----')
    console.log(e)
    if (e.detail.value.length > 0)
      wx.navigateTo({ url: '/pages/goods_list/goods_list?searchValue=' + e.detail.value })
    else
      return app.Tips({ title: '请填写要搜索的产品信息' });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    if (app.globalData.isLog) {
      this.getUserInfoData();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})