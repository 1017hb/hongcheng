//index.js
//获取应用实例

const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    appid:'',
    serviceid:''
  },
  //登录
  user_login:function(){
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
        console.log("用户的code:" + res.code);
        wx.request({
          url: 'http://192.168.0.148:88/hhb/api/login.ashx?action=getlogin',
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
          },
          success: function (res) {//请求成功之后要做什么\
            console.log(res);
            console.log(res.data.logincode);
           var sessionkey = res.data.logincode;
           wx.setStorage({
             key: 'sessionkey',
             data: sessionkey,
           })
           
            var order = [];
            wx.setStorageSync('orderid', order);

            wx.switchTab({
              url: '../index/index',
            })
          },
          fail: function (err) {//请求失败之后要做什么
            console.log('请求失败')
          }
        });
      }
    });
  },
  //检验登录状态码是否过期
  check_session:function(){
    var that = this;
    var session_key;
    wx.getStorage({
      key: 'sessionkey',
      success: function(res) {
        console.log("-----------sessionkey");
        console.log(res.data);
        session_key = res.data
      },
    })
    if(session_key!=null){
        wx.checkSession({
          success() {
            //session_key 未过期，并且在本生命周期一直有效
            console.log("登录状态码有效");
            
          },
          fail() {
            // session_key 已经失效，需要重新执行登录流程
            console.log("登录状态码过期");
            //that.user_login();
          }
        })
    }
  },
  
  onLoad: function () {
    console.log("-------login");
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              console.log("用户已经授权");
           /*
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo,
              })
            */
            wx.getStorage({
              key: 'userId',
              success: function(res) {
                app.globalData.user_id = res.data;
              },
            })
              app.globalData.userInfo = res.userInfo;
               
              console.log(res.userInfo);
              console.log(app.globalData.userInfo);
              console.log('----  app.globalData.user_id');
              console.log(app.globalData.user_id);
       
              //登录
              that.user_login();
              //检验登录是否过期
             /// that.check_session();
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  //授权
  bindGetUserInfo: function (e) {
    var that= this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户允许授权"); 
      console.log("用户的信息如下：");
      //将用户信息缓存
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo,
      })
      app.globalData.userInfo = e.detail.userInfo;
      console.log('---- app.globalData.getUserInfo');
      console.log(app.globalData.userInfo);
      console.log('---- e.detail.userInfo');
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      wx.request({
        url: 'http://192.168.0.148:88/hhb/api/login.ashx?action=addlogin',
        method: 'POST',
        data: { 
          avatarUrl: e.detail.userInfo.avatarUrl,
          country: e.detail.userInfo.country,
          city: e.detail.userInfo.city,
          gender: e.detail.userInfo.gender,
          nickName: e.detail.userInfo.nickName,
          province: e.detail.userInfo.province,
          language: e.detail.userInfo.language,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
        },
        success: function (res) {//请求成功之后要做什么
          wx.setStorage({
            key: 'userId',
            data: res.data.data[0],
          })
          app.globalData.user_id = res.data.data[0];
          console.log('----  app.globalData.user_id');
          console.log(app.globalData.user_id );
          wx.switchTab({
            url: '../index/index',
          })
          console.log(res.data.message);
        },
        fail: function (err) {//请求失败之后要做什么
          console.log('请求失败')
        }
      });

     
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
})
