import { getProductDetail, getProductCode, collectAdd, collectDel, postCartAdd} from '../../api/store.js';
import { getUserInfo, userShare } from '../../api/user.js';
import { getCoupons } from '../../api/api.js';
import { getCartCounts, getCartList } from '../../api/order.js';
import WxParse from '../../wxParse/wxParse.js';
import util from '../../utils/util.js';
import wxh from '../../utils/wxh.js';

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '商品详情'
    },
    attribute:{'cartAttr':false},//属性是否打开
    coupon: {
      'coupon': false,
      list:[],
    },
    attr:'请选择',//属性页面提示
    attrValue:'',//已选属性
    animated: false,//购物车动画
    id:0,//商品id
    replyCount: 0,//总评论数量
    reply: [],//评论列表
    storeInfo: {},//商品详情
    productAttr: [],//组件展示属性
    productValue: [],//系统属性
    couponList: [],   //优惠券
    productSelect: {}, //属性选中规格
    cart_num: 5,//购买数量
    isAuto: false,//没有授权的不会自动授权
    iShidden:true,//是否隐藏授权
    isOpen:false,//是否打开属性组件
    isLog:app.globalData.isLog,//是否登录
    actionSheetHidden:true,
    posterImageStatus:false,
    storeImage: '',//海报产品图
    PromotionCode: '',//二维码图片
    canvasStatus: false,//海报绘图标签
    posterImage: '',//海报路径
    posterbackgd:'/images/posterbackgd.png',
    sharePacket:{
      isState:true,//默认不显示
    },//分销商详细
    uid:0,//用户uid
    circular: false,
    autoplay: false,
    interval: 3000,
    duration: 500,
    clientHeight:"",
    systemStore:{},//门店信息
    good_list:[],
    isDown:true,
    storeSelfMention:true,
    currentIndex: 0,
    vip_list: [],
    vip:false,
    vip_price:0,
    vip_name:'白银',
    level:0

  },
  /**
   * 
   */
  setVip_Price:function(){
    if (this.data.vip) {
      this.vip_price = storeInfo.vip_price;
    } else {
      this.vip_price = productSelect.price;
    }
  },
  /**
   * 跳转会员
   */
  open_vip:function(){
    wx.switchTab({
      url: '/pages/vip/vip',
    })
  },
  /**
   * 登录后加载
   * 
  */
  onLoadFun:function(e){
    this.setData({ isLog:true});
    this.getCouponList();
    this.getCartCount();
    this.downloadFilePromotionCode();
    this.getUserInfo();
    this.get_product_collect();
  },
 
  ChangCouponsClone:function(){
    this.setData({'coupon.coupon':false});
  },
  /*
  * 获取用户信息
  */
  getUserInfo: function(){
    var that=this;
    getUserInfo().then(res=>{
      console.log('kadhsfajds')
      console.log(res)
      that.setData({ 
        'sharePacket.isState': res.data.is_promoter && this.data.sharePacket.priceName > 0 ? false : true, 
        uid: res.data.uid,
        //修改名称，价格
        vip:res.data.vip,
        vip_name:res.data.vip_name,
        level: res.data.vip_grade
        //level:1
      });
    });
  },
  /**
   * 购物车数量加和数量减
   * 
  */
  ChangeCartNum:function(e){
    //是否 加|减
    var changeValue = e.detail;
    //获取当前变动属性
    var productSelect = this.data.productValue[this.data.attrValue];
    //如果没有属性,赋值给商品默认库存
    if (productSelect === undefined && !this.data.productAttr.length) productSelect = this.data.productSelect;
    //不存在不加数量
    if (productSelect===undefined) return;
    //提取库存
    var stock = productSelect.stock || 0;
    //设置默认数据
    if (productSelect.cart_num == undefined) productSelect.cart_num = this.data.storeInfo.batch;
    //设置id
    if (productSelect.id == undefined) productSelect.id = this.data.storeInfo.id;
    //数量+
    if (changeValue){
      console.log(this.data.storeInfo.batch);
      if (productSelect.id === 301 || productSelect.id === 302 || productSelect.id === 656){
        productSelect.cart_num = this.data.storeInfo.batch;
      }else{
        productSelect.cart_num += this.data.storeInfo.batch;
        //大于库存时,等于库存
        if (productSelect.cart_num > stock) productSelect.cart_num = stock;
      }
      this.setData({
        ['productSelect.cart_num']: productSelect.cart_num,
        cart_num: productSelect.cart_num
      });
    }else{
      //数量减
      productSelect.cart_num -= this.data.storeInfo.batch;
      //小于1时,等于1
      if (productSelect.cart_num < 1) productSelect.cart_num = this.data.storeInfo.batch;
      this.setData({
        ['productSelect.cart_num']: productSelect.cart_num,
        cart_num: productSelect.cart_num
      });
    }
  },
  /**
   * 属性变动赋值
   * 
  */
  ChangeAttr:function(e){
    var values = e.detail;
    var productSelect = this.data.productValue[values];
    var storeInfo = this.data.storeInfo;
    if (productSelect){
      this.setData({
        ["productSelect.id"]: storeInfo.id,
        ["productSelect.image"]: productSelect.image,
        ["productSelect.price"]: productSelect.price,
        ["productSelect.stock"]: productSelect.stock,
        ['productSelect.unique']: productSelect.unique,
        ['productSelect.cart_num']: storeInfo.batch,
        attrValue: values,
        attr:'已选择'
      });
    }else{
      this.setData({
        ["productSelect.id"]: storeInfo.id,
        ["productSelect.image"]: storeInfo.image,
        ["productSelect.price"]: storeInfo.price,
        ["productSelect.stock"]: 0,
        ['productSelect.unique']:'',
        ['productSelect.cart_num']: 0,
        attrValue:'',
        attr:'请选择'
      });
    }
  },
  /**
   * 领取完毕移除当前页面领取过的优惠券展示
  */
  ChangCoupons:function(e){
    var coupon = e.detail;
    var couponList = util.ArrayRemove(this.data.couponList, 'id', coupon.id);
    this.setData({ couponList: couponList});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //扫码携带参数处理
    if (options.scene){
      var value =util.getUrlParams(decodeURIComponent(options.scene));
      if (value.id) options.id = value.id;
      //记录推广人uid
      if (value.pid) app.globalData.spid = value.pid;
    }
    if (!options.id) return app.Tips({ title: '缺少参数无法查看商品' }, { tab: 3, url: 1 });
    this.setData({ id: options.id});
    //记录推广人uid
    if (options.spid) app.globalData.spid=options.spid;
    this.getGoodsDetails();
    
  },

  setClientHeight:function(){
    if (!this.data.good_list.length) return ;
    var query = wx.createSelectorQuery().in(this);
    query.select("#list").boundingClientRect();
    var that = this;
    query.exec(function (res) {
      that.setData({
        clientHeight: res[0].height + 20
      });
    });
  },
  /**
   * 获取产品详情
   * 
  */
  getGoodsDetails:function(){
    var that = this;
    wx.showLoading({
      title: '数据获取中',
    })
    getProductDetail(that.data.id).then(res=>{
      console.log('商品详情')
      console.log(res)
      var data = res.data;
      var storeInfo = data.storeInfo;  
      var good_list = data.good_list || [];
      var count = Math.ceil(good_list.length / 6);
      var goodArray= new Array();
      for (var i = 0; i < count;i++){
        var list = good_list.slice(i * 6, i * 6 + 6);
        if (list.length) goodArray.push({list:list});
      }
      that.setData({
        vip_list: data.vip_list,
        storeInfo: storeInfo,
        reply: data.reply ? [data.reply] : [],
        replyCount: data.replyCount,
        description: storeInfo.description,
        replyChance: data.replyChance,
        productAttr: data.productAttr,
        productValue: data.productValue,
        ["sharePacket.priceName"]: data.priceName,
        ['parameter.title']: storeInfo.store_name,
        systemStore: data.system_store,
        storeSelfMention: data.store_self_mention,
        good_list: goodArray
      });
      that.downloadFilestoreImage();
      that.DefaultSelect();
      that.setClientHeight();
      //html转wxml
      WxParse.wxParse('description', 'html', that.data.description, that, 0);
      if (Object.keys(storeInfo).length > 0) {
        wx.hideLoading();
      }
    }).catch(err=>{
      //状态异常返回上级页面
      return app.Tips({ title: err.toString() }, { tab: 3, url: 1 });
    })
   
  },
  goPages:function(e){
    wx.navigateTo({ url: 'pages/goods_details/index?id='+e.currentTarget.dataset.id});
  },
  /**
   * 拨打电话
  */
  makePhone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.systemStore.phone
    })
  },
  /**
   * 打开地图
   * 
  */
  showMaoLocation:function(){
    if (!this.data.systemStore.latitude || !this.data.systemStore.longitude) return app.Tips({title:'缺少经纬度信息无法查看地图！'});
    wx.openLocation({
      latitude: parseFloat(this.data.systemStore.latitude),
      longitude: parseFloat(this.data.systemStore.longitude),
      scale:8,
      name: this.data.systemStore.name,
      address: this.data.systemStore.address + this.data.systemStore.detailed_address,
      success:function(){
      },
    });
  },
  /**
   * 默认选中属性
   * 
  */
  DefaultSelect:function(){
    var productAttr = this.data.productAttr, storeInfo = this.data.storeInfo;
    for (var i = 0, len = productAttr.length;i < len; i++){
      if (productAttr[i].attr_value[0]) productAttr[i].checked = productAttr[i].attr_value[0]['attr'];
    }
    var value=this.data.productAttr.map(function (attr) {
      return attr.checked;
    });
    var productSelect = this.data.productValue[value.sort().join(',')];
    if (productSelect){
      this.setData({
        ["productSelect.id"]: storeInfo.id,
        ["productSelect.store_name"]: storeInfo.store_name,
        ["productSelect.image"]: productSelect.image,
        ["productSelect.price"]: productSelect.price,
        //["productSelect.price"]: this.vip_price,
        ["productSelect.stock"]: productSelect.stock,
        ['productSelect.unique']: productSelect.unique,
        ['productSelect.cart_num']: storeInfo.batch,
        attrValue: value,
        attr: '已选择'
      });
    }else{
      this.setData({
        ["productSelect.id"]: storeInfo.id,
        ["productSelect.store_name"]:storeInfo.store_name,
        ["productSelect.image"]: storeInfo.image,
        ["productSelect.price"]: storeInfo.price,
        //["productSelect.price"]: this.vip_price,
        ["productSelect.stock"]: this.data.productAttr.length ? 0 : storeInfo.stock ,
        ['productSelect.unique']:  '',
        ['productSelect.cart_num']: this.data.productAttr.length ? 0 : 1,
        attrValue: '',
        attr: '请选择'
      });
    }
    this.setData({ productAttr: productAttr});
  },
  /**
   * 获取是否收藏
  */
  get_product_collect:function(){
    var that=this;
    getProductDetail(that.data.id).then(res=>{
      that.setData({ 'storeInfo.userCollect': res.data.storeInfo.userCollect });
    });
  },
  /**
   * 获取优惠券
   * 
  */
  getCouponList(){
    var that=this;
    getCoupons({page:1,limit:10}).then(res=>{
      var couponList = [];
      for (var i = 0; i < res.data.length; i++) {
        if (!res.data[i].is_use && couponList.length < 2) couponList.push(res.data[i]);
      }
      that.setData({
        ['coupon.list']: res.data,
        couponList: couponList
      });
    });
  },
  /** 
   * 
   * 
  * 收藏商品
  */
  setCollect:function(){
    if (app.globalData.isLog === false) {
      this.setData({
        isAuto: true,
        iShidden: false,
      });
    } else {
      var that=this;
      if (this.data.storeInfo.userCollect){
        collectDel(this.data.storeInfo.id).then(res=>{
          that.setData({
            ['storeInfo.userCollect']: !that.data.storeInfo.userCollect
          })
        })
      }else{
        collectAdd(this.data.storeInfo.id).then(res=>{
          that.setData({
            ['storeInfo.userCollect']: !that.data.storeInfo.userCollect
          })
        })
      }
    }
  },
  /**
   * 打开属性插件
  */
  selecAttr:function(){
    if (app.globalData.isLog===false)
      this.setData({ isAuto: true,iShidden:false})
    else
      this.setData({ 'attribute.cartAttr': true,isOpen:true})
  },
  /**
   * 打开优惠券插件
  */
  coupon:function(){
    if (app.globalData.isLog === false)
      this.setData({isAuto: true,iShidden: false})
    else{
      this.getCouponList();
      this.setData({ 'coupon.coupon': true })
    }
  },
  onMyEvent: function (e) {
    this.setData({ 'attribute.cartAttr': e.detail.window, isOpen:false})
  },
  /**
   * 打开属性加入购物车
   * 
  */
  joinCart:function(e){
    //是否登录
    //this.goCat();
    
    if (app.globalData.isLog === false)
      this.setData({isAuto: true,iShidden: false,});
    else{
      this.goCat();
    }
    
  },
  /*
  * 加入购物车
  */
  goCat: function (isPay){
    var that=this;
    let isTrue = true;
    let ed = 0;
    //获取购物车数据
    getCartList().then(res => {
      console.log('购物车数据')
      console.log(res)
      let data = res.data.valid;
      if (data.length > 0) {
        ed = 1;
        for (let i = 0; i < data.length; i++) {
          if ((data[i].product_id === 302 || data[i].product_id === 301 || data[i].product_id === 656) && (that.data.id === "302" || that.data.id === "301" || that.data.id === "656" )){
            isTrue = false;
            return app.Tips({ title: '只能购买一个会员礼包，购物车已有会员礼包' });
          }
        }
      } 
    })
    /*
    if (that.data.id === '301' || that.data.id === '302' || that.data.id === '656') {
      that.setData({
        cart_num: 1
      })
    }
    */
    var productSelect = this.data.productValue[this.data.attrValue];
    //打开属性
    if (this.data.attrValue){
      //默认选中了属性，但是没有打开过属性弹窗还是自动打开让用户查看默认选中的属性
      this.setData({ 'attribute.cartAttr': !this.data.isOpen ? true : false }) 
    }else{
      if (this.data.isOpen) 
        this.setData({ 'attribute.cartAttr': true }) 
      else 
        this.setData({ 'attribute.cartAttr': !this.data.attribute.cartAttr});
    }
    //只有关闭属性弹窗时进行加入购物车
    if (this.data.attribute.cartAttr === true && this.data.isOpen == false) return this.setData({ isOpen: true }); 
    //如果有属性,没有选择,提示用户选择
    if (this.data.productAttr.length && productSelect === undefined && this.data.isOpen==true) return app.Tips({title:'请选择属性'});
    if (ed = 1){
      wx.showLoading({
        title: '数据处理中',
      })
      setTimeout(function () {
        console.log('shuliang')
        console.log(that.data.productSelect.cart_num)
        console.log(that.data.cart_num)
        if (isTrue) {
          postCartAdd({
            batch: that.data.storeInfo.batch,
            productId: that.data.id,
            //cartNum: that.data.storeInfo.batch,
            cartNum: that.data.productSelect.cart_num,
            uniqueId: productSelect !== undefined ? productSelect.unique : '',
            'new': isPay === undefined ? 0 : 1,
          }).then(res => {
            that.setData({ isOpen: false, 'attribute.cartAttr': false });
            if (isPay)
              wx.navigateTo({ url: '/pages/order_confirm/index?cartId=' + res.data.cartId });
            else
              app.Tips({ title: '添加购物车成功', icon: 'success' }, function () {
                that.getCartCount(true);
              });
          }).catch(err => {
            return app.Tips({ title: err });
          });
        }
        wx.hideLoading()
      }, 2500)  
    }else{
      setTimeout(function () {
        console.log(isTrue)
        if (isTrue) {
          console.log(isTrue)
          postCartAdd({
            productId: that.data.id,
            //cartNum: that.data.storeInfo.batch,
            cartNum: that.data.cart_num,
            uniqueId: productSelect !== undefined ? productSelect.unique : '',
            'new': isPay === undefined ? 0 : 1,
          }).then(res => {
            that.setData({ isOpen: false, 'attribute.cartAttr': false });
            if (isPay)
              wx.navigateTo({ url: '/pages/order_confirm/index?cartId=' + res.data.cartId });
            else
              app.Tips({ title: '添加购物车成功', icon: 'success' }, function () {
                that.getCartCount(true);
              });
          }).catch(err => {
            return app.Tips({ title: err });
          });
        }
      }, 1500)
    }
  
   
  },
  /**
   * 获取购物车数量
   * @param boolean 是否展示购物车动画和重置属性
  */
  getCartCount: function (isAnima) {
    var that = this;
    getCartCounts().then(res=>{
      that.setData({ CartCount: res.data.count });
      //加入购物车后重置属性
      if (isAnima) {
        that.setData({
          animated: true,
          attrValue: '',
          attr: '请选择',
          ["productSelect.id"]: that.data.storeInfo.id,
          ["productSelect.image"]: that.data.storeInfo.image,
          ["productSelect.price"]: that.data.storeInfo.price,
          ["productSelect.stock"]: that.data.storeInfo.stock,
          ['productSelect.unique']: '',
          ['productSelect.cart_num']: that.data.storeInfo.batch,
        });
        that.selectComponent('#product-window').ResetAttr();
        setTimeout(function () {
          that.setData({
            animated: false
          });
        }, 500);
      }
    });
  },
  /**
   * 立即购买
  */
  goBuy:function(e){
    if (app.globalData.isLog === false)
      this.setData({ isAuto: true, iShidden: false });
    else
      this.goCat(true);
  },
  /**
   * 分享打开和关闭
   * 
  */
  listenerActionSheet: function () {
    if (app.globalData.isLog === false)
      this.setData({ isAuto: true, iShidden: false });
    else
      this.setData({ actionSheetHidden: !this.data.actionSheetHidden })
  },
  //隐藏海报
  posterImageClose: function () {
    this.setData({posterImageStatus: false,})
  },
  //替换安全域名
  setDomain: function (url) {
    url = url ? url.toString() : '';
    //本地调试打开,生产请注销
    // return url;
    if (url.indexOf("https://") > -1) return url;
    else return url.replace('http://', 'https://');
  },
  //获取海报产品图
  downloadFilestoreImage: function () {
    var that = this;
    wx.downloadFile({
      url: that.setDomain(that.data.storeInfo.image),
      success: function (res) {
        that.setData({
          storeImage: res.tempFilePath
        })
      },
      fail:function(){
        return app.Tips({title:''});
        that.setData({
          storeImage: '',
        })
      },
    });
  },
  /**
   * 获取产品分销二维码
   * @param function successFn 下载完成回调
   * 
  */
  downloadFilePromotionCode: function (successFn) {
    var that = this;
    getProductCode(this.data.id).then(res=>{
      wx.downloadFile({
        url: that.setDomain(res.data.code),
        success: function (res) {
          that.setData({ isDown:false});
          if (typeof successFn == 'function')
            successFn && successFn(res.tempFilePath);
          else
            that.setData({ PromotionCode: res.tempFilePath });
        },
        fail: function () {
          that.setData({ isDown: false });
          that.setData({ PromotionCode: '' });
        },
      });
    }).catch(err=>{
      that.setData({ isDown: false });
      that.setData({ PromotionCode: '' });
    });
  },
  /**
   * 生成海报
  */
  goPoster:function(){
    var that = this;
    that.setData({ canvasStatus: true });
    var arr2 = [that.data.posterbackgd, that.data.storeImage, that.data.PromotionCode];
    if(that.data.isDown) return app.Tips({title:'正在下载海报,请稍后再试！'});
    wx.getImageInfo({
      src: that.data.PromotionCode,
      fail: function (res) {
        return app.Tips({ 'title': '小程序二维码需要发布正式版后才能获取到' });
      },
      success(){
        if (arr2[2] == '') {
          //海报二维码不存在则从新下载
          that.downloadFilePromotionCode(function (msgPromotionCode) {
            arr2[2] = msgPromotionCode;
            if (arr2[2] == '') return app.Tips({ title: '海报二维码生成失败！' });
            util.PosterCanvas(arr2, that.data.storeInfo.store_name, that.data.storeInfo.price, function (tempFilePath) {
              that.setData({
                posterImage: tempFilePath,
                posterImageStatus: true,
                canvasStatus: false,
                actionSheetHidden: !that.data.actionSheetHidden
              })
            });
          });
        } else {
          //生成推广海报
          util.PosterCanvas(arr2, that.data.storeInfo.store_name, that.data.storeInfo.price, function (tempFilePath) {
            that.setData({
              posterImage: tempFilePath,
              posterImageStatus: true,
              canvasStatus: false,
              actionSheetHidden: !that.data.actionSheetHidden
            })
          });
        }
      },
    });
  },
  /*
  * 保存到手机相册
  */
  savePosterPath: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: that.data.posterImage,
                success: function (res) {
                  that.posterImageClose();
                  app.Tips({ title: '保存成功', icon:'success'});
                },
                fail: function (res) {
                  app.Tips({ title: '保存失败' });
                }
              })
            }
          })
        } else {
          wx.saveImageToPhotosAlbum({
            filePath: that.data.posterImage,
            success: function (res) {
              that.posterImageClose();
              app.Tips({ title: '保存成功', icon: 'success' });
            },
            fail: function (res) {
              app.Tips({ title: '保存失败' });
            },
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    that.setData({actionSheetHidden: !that.data.actionSheetHidden});
    userShare();
    return {
      title: that.data.storeInfo.store_name || '',
      imageUrl: that.data.storeInfo.image || '',
      path: '/pages/goods_details/index?id=' + that.data.id + '&spid='+that.data.uid,
    }
  }
})