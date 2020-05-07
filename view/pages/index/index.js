const app = getApp();
import { getIndexData, getCoupons, getTemlIds, getNewData} from '../../api/api.js';
import { CACHE_SUBSCRIBE_MESSAGE } from '../../config.js';
import { getOrderDetail, userLevelPurchasevip } from '../../api/order.js';
import { brand_list, fashion_list,  brand_product, brand_rotation, today_product, promotion, logo_banner} from '../../api/store.js';
import { getUserInfo } from '../../api/user.js';
import Util from '../../utils/util.js';
let proPage = 1;
let catePage = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    bastList: [],
    fastList: [],
    salesInfo: '',
    likeInfo: [],  
    benefit:[],
    indicatorDots: false,
    newGoodsBananr: '',
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    parameter:{
      'navbar':'0',
      'return':'0'
    },
    window: false,
    iShidden:true,
    navH: "",
    productList: [
      { id: 0, brand_name: '首页' },
      //{ id: 1, brand_name: '春装' }, 
      //{ id: 2, brand_name: '夏装' }, 
      //{ id: 3, brand_name: '秋装' },
      //{ id: 4, brand_name: '冬装' }
      ],
    currentIndex:0,
    isShowCate:true,
    proGoods:[],
    hotImgUrls: [],
    hotList: [],
    cateFataList: [],
    name: '',
    icon: '',
    type: 0,
    status: 0,
    cateData:{},
    loadend: false,
    loading: false,
    loadTitle: '加载更多',
    cateImage:[],
    bcolor:'#fff',
    vip_name:'会员',
    vip_grade:0,
    cateFataList:[
      
    ]
  },
  /**
  * 品牌分类
  */
  getBrandList: function () {
    let that = this;
    brand_list().then(res => {
      console.log(res)
      let list = res.data;
      let productList = app.SplitArray(list, that.data.productList);
      that.setData({
        productList: productList
      });
    }).catch(err => {
      
    })
  },
  /**
   * 品牌轮播图片
   */
  getLogoBanner:function(){
    let that = this;
    logo_banner().then(res => {
      that.setData({
        cateImage:res.data
      })
    })
  },
  /**
   * 今日上新
   */
  getTodayData:function(){
    let that = this;
    today_product().then(res => {
      that.setData({
        bastList:res.data
      })
    })
  },
  /**
  * 促销商品
  */
  getProGoods: function (page) {
    let that = this;
    that.setData({ loading: true, loadTitle: ''});
    promotion(page).then(res => {
      let list = res.data;
      let proGoods = app.SplitArray(list, that.data.proGoods);
      let loadend = list.length < 10;
      that.setData({
        loadend: loadend,
        loading: false,
        loadTitle: loadend ? '已全部加载' : '加载更多',
        proGoods: proGoods
      });
    }).catch(err => {
      that.setData({ loading: false, loadTitle: '加载更多' });
    });
  },
  /**
   * 品牌分类商品
   */
  getCateGoods:function(type_id,page,cateName){
    let that = this;
    if (that.data.loading) return;
    if (page === 1){
      that.setData({
        hotImgUrls: [],
        hotList: []
      })
      let cateFataList = [
        {
          id:1,
          seaid: 1,
          pic: "http://www.gzggtp.com/uploads/attach/2020/03/20200331/a4cb384d637506858a393ae31e2bb561.png",
          cate_name: "一件套"
        },
        {
          id:2,
          seaid: 1,
          pic: "http://www.gzggtp.com/uploads/attach/2020/03/20200331/a4cb384d637506858a393ae31e2bb561.png",
          cate_name: "二件套"
        },
        {
          id:3,
          seaid: 1,
          pic: "http://www.gzggtp.com/uploads/attach/2020/03/20200331/a4cb384d637506858a393ae31e2bb561.png",
          cate_name: "三件套"
        }
      ];
      brand_rotation(type_id).then(res => {
        that.setData({
          hotImgUrls: res.data.image
          //cateFataList: cateFataList
        })
      }).catch(err => {
        that.setData({
          hotImgUrls: []
        })
      })
    } 
    that.setData({ loading: true, loadTitle: '', name: cateName, icon: 'icon-remen'});

    brand_product(type_id, page).then(res => {
      let list = res.data;
      let hotList = app.SplitArray(list, that.data.hotList);
      let loadend = list.length < 10;
      that.setData({
        loadend: loadend,
        loading: false,
        loadTitle: loadend ? '已全部加载' : '加载更多',
        hotList: hotList
      });
    }).catch(err => {
      that.setData({ loading: false, loadTitle: '加载更多' });
    });
  },
  /**
   * 顶部导航key值
   */
  setScrollItem:function(e){
    let that = this;
    let topKey = e.currentTarget.dataset.scrollindex;
    that.setData({
      currentIndex: topKey,
    })
    if (topKey === 0){
      that.setData({
        isShowCate:true,
        status:0,
        bcolor: '#ffffff'
      })
    } else{
      let cate_id = that.data.productList[topKey].id;
      let brand_name = that.data.productList[topKey].brand_name;
      catePage = 1;
      that.setData({
        bcolor:'#e2e2e1',
        isShowCate: false,
        status: 1 
      })
      that.getCateGoods(cate_id, catePage, brand_name)
    }
  },
  /**
   * 品牌轮播key
   */
  setCate: function (e) {
    let that = this;
    let topKey = e.currentTarget.dataset.cateid;
    for (let i = 0; i < that.data.productList.length;i++){
      if (that.data.productList[i].id === topKey){
        that.setData({
          currentIndex: i,
          isShowCate: false,
          status: 1
        })
        that.getCateGoods(topKey, 1, that.data.productList[i].brand_name)
        break;
      }
    }
  },
  closeTip:function(){
    wx.setStorageSync('msg_key',true);
    this.setData({
      iShidden:true
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    
  

    this.setData({
      navH: app.globalData.navHeight
    });
    if (options.spid) app.globalData.spid = options.spid;
    if (options.scene) app.globalData.code = decodeURIComponent(options.scene);
    if (wx.getStorageSync('msg_key')) this.setData({ iShidden:true});
    this.getTemlIds();
    this.getBrandList();
    this.getProGoods(proPage);
  },
  getTemlIds(){
    let messageTmplIds = wx.getStorageSync(CACHE_SUBSCRIBE_MESSAGE);
    if (!messageTmplIds){
      getTemlIds().then(res=>{
        if (res.data) 
          wx.setStorageSync(CACHE_SUBSCRIBE_MESSAGE, JSON.stringify(res.data));
      }).catch(err => {
        return app.Tips({ title: err });
      })
    }
  },
  catchTouchMove: function (res) {
    return false
  },
  onColse:function(){
    this.setData({ window: false});
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
    this.getIndexConfig();
    this.getLogoBanner();
    this.getTodayData();
    if(app.globalData.isLog && app.globalData.token) {
      this.getUserInfoData();
      this.get_issue_coupon_list();
    }
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
  get_issue_coupon_list:function(){
    var that = this;
    getCoupons({page:1,limit:3}).then(res=>{
      that.setData({ couponList: res.data });
      if (!res.data.length) that.setData({ window: false });
    });
  },
 
  /**
   * 首页数据
   */
  getIndexConfig:function(){
    var that = this;
    getIndexData().then(res=>{
      console.log('首页数据')
      console.log(res)
      that.setData({
        imgUrls: res.data.banner,
        likeInfo: res.data.likeInfo,
        benefit: res.data.benefit,
        logoUrl: res.data.logoUrl,
        couponList: res.data.couponList,
        newGoodsBananr: res.data.newGoodsBananr
      });
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            that.setData({ window: that.data.couponList.length ? true : false });
          } else {
            that.setData({ window: false, iShidden: true});
          }
        }
      });
    })
    //商品分类数据
    fashion_list().then(res => {
      that.setData({
        fastList: res.data
      })
    })
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ window:false});
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
    this.getIndexConfig();
    if (app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
    wx.stopPullDownRefresh();
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let topKey = that.data.currentIndex;
    if (topKey === 0) {
      proPage += 1;
      that.getProGoods(proPage)
    } else {
      let cate_id = that.data.productList[topKey].id;
      let brand_name = that.data.productList[topKey].brand_name;
      catePage += 1;
      that.getCateGoods(cate_id, catePage, brand_name)
    }  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})