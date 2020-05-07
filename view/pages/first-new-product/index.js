import { getGroomList } from '../../api/store.js';
import { getUserInfo } from '../../api/user.js';

const app = getApp();
let type_page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '首发新品'
    },
    imgUrls: [],
    bastList:[],
    name:'',
    icon:'',
    type:0,
    status:0,
    loadend: false,
    loading: false,
    loadTitle: '加载更多',
    vip_grade:0
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
        //vip_name: userInfo.vip_name,
        vip_grade: userInfo.vip_grade
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    this.setData({ type: options.type });
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
    var type = this.data.type;
    if (type == 1){
      this.setData({ 'parameter.title': '精品推荐', name: '精品推荐', icon: 'icon-jingpintuijian'});
    } else if (type == 2) {
      this.setData({ 'parameter.title': '热门榜单', name: '热门榜单', icon: 'icon-remen', status: 1});
    } else if (type == 3) {
      this.setData({ 'parameter.title': '首发新品', name: '首发新品', icon: 'icon-xinpin' });
    } else if (type == 4) {
      this.setData({ 'parameter.title': '促销单品', name: '促销单品', icon: 'icon-cuxiaoguanli' });
    }else{
      this.setData({ 'parameter.title': '首发新品', name: '首发新品', icon: 'icon-xinpin' });
    }
    if (app.globalData.isLog){
      this.getUserInfoData();
    }
    this.getIndexGroomList();
  },
  getIndexGroomList: function () {
    var that = this;
    that.setData({ loading: true, loadTitle: '' });
    getGroomList(that.data.type, type_page).then(res=>{
      let list = res.data;
  
      let bastList = app.SplitArray(list.list, that.data.bastList);
      let loadend = list.length < 12;
      console.log(loadend)
      that.setData({ 
        imgUrls: list.banner, 
        bastList: bastList,
        loadend: loadend,
        loading: false,
        loadTitle: loadend ? '已全部加载' : '加载更多'
        })
    }).catch(err => {
      that.setData({ loading: false, loadTitle: '加载更多' });
    });
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
    type_page += 1;
    this.getIndexGroomList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})