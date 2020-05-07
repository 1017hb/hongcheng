const app = getApp();
import { getIndexData, getCoupons, getTemlIds, getNewData} from '../../api/api.js';
import { CACHE_SUBSCRIBE_MESSAGE } from '../../config.js';
import { getOrderDetail, userLevelPurchasevip } from '../../api/order.js';
import { getCategoryList, getGroomList, brand_list, fashionData, fashionGoods} from '../../api/store.js';
import { getUserInfo } from '../../api/user.js';
import Util from '../../utils/util.js';

let fashionDataPage = 1;
let fashionGoodsPage = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '商品分类'
    },
    sid:36,
    goodsId:1,
    isFashionData:false,
    navH: "",
    cateFataList: [],
    cateBenefitList: [],
    status: 0,
    loadend: false,
    loading: false,
    loadTitle: '加载更多',
    vip_name: '会员',
    vip_grade: 0
  },
  /**
   * 获取个人信息
   */
  getUserInfoData:function(){
    let that = this;
    getUserInfo().then(res => {
      console.log(res)
      let userInfo = res.data;
      that.setData({
        vip_grade:userInfo.vip_grade,
        vip_name:userInfo.vip_name
      })
    })
  },
  /**
   * 商品分类数据
   */
  getFashionData: function (type_id, page) {
    let that = this;
    that.setData({ loading: true, loadTitle: '' });
    fashionData(type_id, page).then(res => {
      console.log('asdfasdf0000')
      console.log(res)
      let list = res.data.product;
      let cateBenefitList = app.SplitArray(list, that.data.cateBenefitList);
      let loadend = list.length < 10;
      that.setData({
        loadend: loadend,
        loading: false,
        loadTitle: loadend ? '已全部加载' : '加载更多',
        cateFataList: res.data.type,
        cateBenefitList: cateBenefitList
      });
    }).catch(err => {
      that.setData({ loading: false, loadTitle: '加载更多' });
    });
  },
  /**
   * 商品分类详细
   */
  getFashionGoods:function(type_id,page){
    let that = this;
    that.setData({ loading: true, loadTitle: '' });
    fashionGoods(type_id,page).then(res => {
      
      let list = res.data.product;
      let cateBenefitList = app.SplitArray(list, that.data.cateBenefitList);
      let loadend = list.length < 10;
      if (page === 1) {
        that.setData({
          loadend: loadend,
          loading: false,
          loadTitle: loadend ? '已全部加载' : '加载更多',
          cateBenefitList: list
        });
      } else {
        that.setData({
          loadend: loadend,
          loading: false,
          loadTitle: loadend ? '已全部加载' : '加载更多',
          cateBenefitList: cateBenefitList
        });
      }
    })
    
  },
  
  /**
   * 商品分类详情key值
   */
  setFashionItem:function(e){
    let that = this;
    let id = e.currentTarget.dataset.fashion;
    that.setData({
      isFashionData: true,
      goodsId:id,
      loadend: false,
      loading: false,
      loadTitle: '加载更多',
    })
    fashionGoodsPage = 1;
    that.getFashionGoods(id, fashionGoodsPage)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    let that = this;
    that.setData({
      navH: app.globalData.navHeight
    })
    if (options.title){
      that.setData({
        ['parameter.title']: options.title
      })
    } 
    if (options.sid){
      that.setData({
        sid:options.sid
      })
      that.getFashionData(options.sid, fashionDataPage);
    }
    if (app.globalData.isLog && app.globalData.token) {
      this.getUserInfoData();
    }
    this.getTemlIds();
  },
  getTemlIds(){
    let messageTmplIds = wx.getStorageSync(CACHE_SUBSCRIBE_MESSAGE);
    if (!messageTmplIds){
      getTemlIds().then(res=>{
        if (res.data) 
          wx.setStorageSync(CACHE_SUBSCRIBE_MESSAGE, JSON.stringify(res.data));
      })
    }
  },
  catchTouchMove: function (res) {
    return false
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
    if (app.globalData.isLog && app.globalData.token) {
      this.getUserInfoData();
    }
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
    if (app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
    wx.stopPullDownRefresh();
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let topKey = that.data.currentIndex;
    if (!that.data.isFashionData){
      fashionDataPage += 1;
      that.getFashionData(that.data.sid, fashionDataPage)
    }else{
      fashionGoodsPage += 1;
      that.getFashionGoods(that.data.goodsId, fashionGoodsPage)
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})