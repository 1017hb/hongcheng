import { getProductslist, getProductHot } from '../../api/store.js';
import {  getUserInfo } from '../../api/user.js';

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '会员列表',
      'color': true,
      'class': '0'
    },
    navH: "",
    is_switch:true,
    where: {
      sid: 0,
      keyword: '',
      priceOrder: '',
      salesOrder: '',
      news: 0,
      page: 1,
      limit: 10,
      cid: 0,
    },
    price:0,
    stock:0,
    nows:false,
    loadend:false,
    loading:false,
    loadTitle:'加载更多',
    userInfo:{},
    searchWhere:'',
    vip_id:[],
    vip_grade:0,
    vip:false
  },
  
  /**
  * 设置参数
  */
  Changswitch: function () {
    var that = this;
    that.setData({
      is_switch: !this.data.is_switch
    })
  },
  //点击事件处理
  set_where: function (e) {
    var dataset = e.target.dataset;
    switch (dataset.type) {
      case '1':
        return wx.navigateBack({
          delta: 1,
        })
        break;
      case '2':
        if (this.data.price == 0)
          this.data.price = 1;
        else if (this.data.price == 1)
          this.data.price = 2;
        else if (this.data.price == 2)
          this.data.price = 0;
        this.setData({ price: this.data.price, stock: 0 });
        break;
      case '3':
        if (this.data.stock == 0)
          this.data.stock = 1;
        else if (this.data.stock == 1)
          this.data.stock = 2;
        else if (this.data.stock == 2)
          this.data.stock = 0;
        this.setData({ stock: this.data.stock, price: 0 });
        break;
      case '4':
        this.setData({ nows: !this.data.nows });
        break;
    }
    this.setData({ loadend: false, ['where.page']: 1 });
    this.get_product_list(true);
  },
  //设置where条件
  setWhere: function () {
    if (this.data.price == 0)
      this.data.where.priceOrder = '';
    else if (this.data.price == 1)
      this.data.where.priceOrder = 'desc';
    else if (this.data.price == 2)
      this.data.where.priceOrder = 'asc';
    if (this.data.stock == 0)
      this.data.where.salesOrder = '';
    else if (this.data.stock == 1)
      this.data.where.salesOrder = 'desc';
    else if (this.data.stock == 2)
      this.data.where.salesOrder = 'asc';
    this.data.where.news = this.data.nows ? 1 : 0;
    this.setData({ where: this.data.where });
  },
  //查找产品
  get_product_list: function (isPage) {
    let that = this;
    this.setWhere();
    let sid = that.data.where.sid;
    console.log(sid)
    if (sid == 42) {
      that.setData({
        ['where.page']: 1
      });
    }
    

    //if (that.data.loadend) return;
    //if (that.data.loading) return;
    if (isPage === true){
      that.setData({ productList: [] });
    } 
    that.setData({ loading: true, loadTitle: '' });
    getProductslist(that.data.where).then(res => {
      console.log('推销')
      console.log(res)
      console.log(that.data.vip_id)
      let list = res.data;
      console.log("000000")
      console.log(list);
      if (that.data.vip_id.length > 0){  
        for (let i = 0; i < that.data.vip_id.length;i++){
          for (let j = 0; j < list.length;j++){
            if (list[j].id === that.data.vip_id[i]){
              list.splice(j,1);
            }
          }  
        }
      }
      let productList = [];
      if (sid == 42){
        productList = list;
      }else{
        productList = app.SplitArray(list, that.data.productList);
      }
      let loadend = list.length < that.data.where.limit;
      that.setData({
        loadend: loadend,
        loading: false,
        loadTitle: loadend? '已全部加载':'加载更多',
        productList: productList,
        ['where.page']: that.data.where.page + 1,
      });
    }).catch(err => {
      that.setData({ loading: false, loadTitle: '加载更多' });
    });
  },
  /**
  * 获取我的推荐
  */
  get_host_product: function () {
    var that = this;
    getProductHot().then(res => {
      that.setData({ host_product: res.data });
    });
  },
  /**
   * 正在加载/已加载完成
   */
  searchSubmit: function (e) {
    var that = this;
    this.setData({['where.keyword']: e.detail.value, loadend: false, ['where.page']: 1 })
    this.get_product_list(true);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
      searchWhere: options.searchValue
    }) 
   
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
    let sid = 42, title = "会员礼包";
    console.log('onShow')
    if (app.globalData.isLog) {
      wx.showLoading({
        title: '数据加载中',
      })
      //获取个人用户信息
      getUserInfo().then(res => {
        let infoData = res.data
        that.setData({
          userInfo: infoData,
          vip: infoData.vip,
          vip_grade: infoData.vip_grade,
          ['where.page']: 1,
          productList:[]
        });
        let vip = infoData.vip;
        let vip_grade = infoData.vip_grade;//身份等级
        let vip_ids = [];
        if (vip && vip_grade === 1) {//黄金       
          vip_ids.push(302)
          app.Tips({ title: '您已是黄金会员,购买钻石会员或高级合伙人礼包可享受更多优惠！' });
        } else if (vip && vip_grade === 2) {
          vip_ids.push(302);
          vip_ids.push(301);
          app.Tips({ title: '您已是钻石会员,购买高级合伙人会员可享受更多优惠！' });
        } else if (vip && vip_grade === 3) {
          vip_ids.push(302);
          vip_ids.push(301);
          vip_ids.push(656);
          sid = 0;
          title = '默认';
          app.Tips({ title: '您已是最高级会员,为您推荐会员商品！' });
        }
        that.setData({
          vip_id: vip_ids
        })
        setTimeout(function () {
          that.setData({
            ['where.sid']: sid,
            title: title || '',
            ['where.keyword']: that.data.searchWhere || '',
          });
          that.get_product_list();
          that.get_host_product();
          wx.hideLoading();
        }, 1500)
      });
    } else {
      that.setData({
        ['where.sid']: sid,
        title: title || ''
      });
      that.get_product_list();
      that.get_host_product();
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
    this.setData({['where.page']:1,loadend:false,productList:[]});
    this.get_product_list();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.get_product_list();
  },
})