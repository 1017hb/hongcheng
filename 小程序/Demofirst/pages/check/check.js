//me.js
var Mcaptcha = require('../../utils/mcaptcha.js');
//获取应用实例
const app = getApp();
var interval = null //倒计时函数
Page({
  data: {
    user_phone:'',
    is_keyboard_phone:false,
    is_keyboard_tucode: false,
    is_keyboard_code: false,
    img_code:'',//输入框的图形验证码
    check_code:'',
  
    time:'获取验证码',
    currentTime:60,
    isClick:false,
    code_id:'',//最新验证码的id
    istime:false
  },
  get_keyboard:function(e){
    var that = this;
    var v = e.currentTarget.dataset.keyboard;
    switch (v) {
      case 'phone':
        that.setData({
          is_keyboard_phone: true,
        })
        break;
      case 'tucode':
        that.setData({
          is_keyboard_tucode: true,
        })
        break;
      case 'code':
        that.setData({
          is_keyboard_code: true,
        })
        break;
    }
    console.log(e)
    console.log(v);
    
   
  },
  blur_keyboard: function (e) {
    var value = e.detail.value;//获取评论框中的值
    //var value = e.detail.code;
    var v = e.currentTarget.dataset.keyboard;
    console.log("-----失去手机号焦点" + value+"----"+v);
    var that = this;
    switch (v) {
      case 'phone':
        if(value==""||value==null){
          this.show('请填写手机号码');
          that.setData({
            isClick: false
          })
          return;
        }else{
          if (!(/^1[3456789]\d{9}$/.test(value))) {
            this.show('手机号码有误，请重填');
            that.setData({
              isClick: false
            })
            return;
          }else{
            that.setData({
              is_keyboard_phone: false,
              user_phone: value,
              isClick:true
            })
          }
        }
        break;
      case 'tucode':
        
        that.setData({
          is_keyboard_tucode: false,
        })
        break;
      case 'code':
        var check_code = that.data.check_code;

        if (check_code == '' || check_code == null) {
          this.show('请输入验证码');//自定义组件(toastPannel构造对象的,this)
          return;
        }
        that.setData({
          is_keyboard_code: false,
        })
        break;
    }
  
  },

  //手机号
  input_phone: function (e) {
    var value = e.detail.value;//获取输入框中的值
    console.log("------手机号码" + value);
    var that = this;
    that.setData({
      user_phone: value
    })
  },
  
  //图形码
  input_tu_code: function (e) {
    var value = e.detail.value;//获取输入框中的值
    var that = this;
    that.setData({
      img_code: value
    })
    console.log("------图形码" + value);
  },
 //验证码
  input_code:function(e){
    var that = this;
    var value = e.detail.value;//获取评论框中的值
    console.log("------验证码" + value);
    that.setData({
      check_code: value
    });
  },
  setctime:function(){
    var that =this;
   
    var img_code = this.data.img_code;
    if (img_code == '' || img_code == null) {
      this.show('请输入图形码');//自定义组件(toastPannel构造对象的,this)
      return;
    }
    var res = this.mcaptcha.validate(that.data.img_code);
    console.log("-----jian"+that.data.img_code);
    if (!res) {
      this.show('图形验证码错误');
      return;
    }
  
    //检验用户是否在验证码发来时,重复点击获取验证码
    var istime = that.data.istime;
    if (istime) {
      this.show('短信验证码正在发送过来,请耐心等待');
      return;
    }

    var isClick = this.data.isClick;
    var currentTime = this.data.currentTime;
    if(isClick){
      var mobile = that.data.user_phone;
      var user_id = app.globalData.user_id;
      wx.request({
        url: 'http://192.168.0.148:88/hhb/api/login.ashx?action=add_code',
        method: 'POST',
        data: {
          mobile:mobile,
          user_id:user_id
          },
        header: {
          "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
        },
        success: function (res) {//请求成功之后要做什么
          console.log(res.data.data[0]);
          console.log(res.data.message);
          that.setData({
            code_id: res.data.data[0]
          });
        },
        fail: function (err) {//请求失败之后要做什么
          console.log('请求失败')
        }
      });

      interval = setInterval(function () {
        currentTime--;//减
        that.setData({
          time: currentTime + '秒后获取',
          istime:true
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            time: '请重新获取验证码',
            currentTime: 60,
            isClick: true,
            istime:false
          })
        } 
      }, 1000);
    }else{
      this.show('请正确填写手机号码或图形验证码填写正确');
    }
  },
  check_info: function () {
    var that = this;
    wx.request({
      url: 'http://192.168.0.148:88/hhb/api/login.ashx?action=check_code',
      method: 'POST',
      data: {
        check_code: that.data.check_code,
        code_id: that.data.code_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
      },
      success: function (res) {//请求成功之后要做什么
        console.log("-------" + res.data.message);
        wx.showToast({
          title: res.data.message,
          icon:'none'
        })
        //this.show(res.data.message);返回值不能用this,this不相同
        app.globalData.user_phone = that.data.user_phone;
        console.log("=----app" + app.globalData.user_phone);
        wx.navigateTo({
          url: '../personal/personal',
        })

      },
      fail: function (err) {//请求失败之后要做什么
        console.log('请求失败')
      }
    });
  },
  onLoad: function (options) {
    var that = this;
    new app.ToastPannel;
    this.mcaptcha = new Mcaptcha({
      el: 'canvas',
      width: 80,
      height: 35,
      createCodeImg: ""
    });
    that.setData({
      user_phone: options.user_phone
    });

  },
  onReady: function () {
    /*
    var that = this;
    var code= that.getRamNum();
    this.mcaptcha = new Mcaptcha({
      el: 'canvas',
      width: 80,
      height: 35,
      createCodeImg: code
    });
    that.setData({
      creat_img_code: code
    });
    //var sss = this.mcaptcha.createCodeImg;
    console.log('------------图形码' + code);
    */
  },
  //刷新图形码
  onTap() {
    this.mcaptcha.refresh(); 
  },
 
 
  
})
