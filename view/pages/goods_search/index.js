// pages/searchGood/index.js
import { getSearchKeyword, getProductslist, getProductHot} from '../../api/store.js';
import { getUserInfo } from '../../api/user.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '搜索商品',
      'color': false
    },
    host_product:[],
    searchValue:'',
    focus:true,
    bastList:[],
    //hotSearchList:[],
    first: 0,
    limit: 8,
    page:1,
    loading:false,
    loadend:false,
    userInfo: {},
    vip_id:0
  },
  /**
     * 获取个人用户信息
    */
  getUserInfoData: function () {
    var that = this;
    getUserInfo().then(res => {
      that.setData({
        userInfo: res.data
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getRoutineHotSearch: function () {
    var that = this;
    getSearchKeyword().then(res=>{
      that.setData({ 
        //hotSearchList: res.data 
      });
    });
  },
  getProductList:function(){
    var that = this;
    if(this.data.loading) return;
    if(this.data.loadend) return;
    this.setData({loading:true,loadTitle:'正在搜索'});

    if (app.globalData.token){
      that.getUserInfoData();
      setTimeout(function(){
        let vip = that.data.userInfo.vip;
        let vip_grade = that.data.userInfo.vip_grade;//身份等级

        if(vip && vip_grade === 1){
          that.setData({
            vip_id:302
          })
        } else if (vip && vip_grade === 2){
          that.setData({
            vip_id: 301
          })
          
        }

      },1000)
    }



    getProductslist({
      keyword: that.data.searchValue,
      page: this.data.page,
      limit: this.data.limit
    }).then(res=>{
      wx.hideLoading();
      var list = res.data, loadend = list.length < that.data.limit;
      that.data.bastList = app.SplitArray(list, that.data.bastList);
      that.setData({
        bastList: that.data.bastList,
        loading: false,
        loadend: loadend,
        page: that.data.page + 1,
        loadTitle: loadend ? '已全部加载' : '加载更多',
      });
    }).catch(err=>{
      wx.hideLoading();
      that.setData({ loading: false, loadTitle: "加载更多" });
    });
  },
  getHostProduct: function () {
    var that = this;
    getProductHot().then(res=>{
      that.setData({ host_product: res.data });
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }, 
  /*
  setHotSearchValue: function (event) {
    this.setData({ searchValue: event.currentTarget.dataset.item });
    this.getProductList();
  },
  */
  setValue: function (event){
    this.setData({ searchValue: event.detail.value});
  },
  searchBut:function(){
    var that = this;
    this.setData({ focus: false });
    if (that.data.searchValue.length > 0){
      that.setData({ page: 1, loadend: false, bastList:[]});
      wx.showLoading({ title:'正在搜索中'});
      that.getProductList();
    }else{
      return app.Tips({
        title: '请输入要搜索的商品',
        icon: 'none',
        duration: 1000,
        mask: true,
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getRoutineHotSearch();
    this.getHostProduct();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getProductList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})