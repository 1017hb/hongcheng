//me.js
//获取应用实例
const app = getApp();

Page({
  data: {
    avatarUrl:'',
    user_name: '',
    user_sex:'',
    is_change_name:false,
    sex_array:['女','男'],
    sex_index:0,
    user_phone:'',
    date: '2016-09-01',
  },
  sure_info: function (e) {
    var that = this;
    var avatarUrl = that.data.avatarUrl;
    var user_name = that.data.user_name;
    var user_sex = that.data.user_sex;
    var user_phone = that.data.user_phone;
    var date = that.data.date;

    var user_id = app.globalData.user_id;

    if (avatarUrl != '' && avatarUrl!=null&&
      user_name != '' && user_name != null &&
      user_sex != '' && user_sex != null &&
      user_phone != '' && user_phone != null &&
      date != '' && date != null){
      wx.request({
        url: 'http://192.168.0.148:88/hhb/api/login.ashx?action=user_info',
        method: 'POST',
        data: {
          avatarUrl: avatarUrl,
          user_name: user_name,
          user_sex: user_sex,
          user_phone: user_phone,
          date: date,
          user_id: user_id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded" 
        },
        success: function (res) {//请求成功之后要做什么
          console.log(res.data.message);
   
        },
        fail: function (err) {//请求失败之后要做什么
          console.log('请求失败')
        }
      });
    }else{
      console.log(user_phone + "----" + user_sex + "-----" + user_name + "----" + avatarUrl);
      this.show('请确认信息是否填写完整');
    }

  },
  change_avatarUrl:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        //console.log(tempFilePaths)
        that.setData({ avatarUrl: tempFilePaths[0] })//
        //console.log(tempFilePaths[0]);
      },
    })
  },
  change_name:function(){
    var that = this;
    that.setData({
      is_change_name:true
    })
  },
  change_sex:function(e){
    var that = this;
    var sex = e.detail.value;
    console.log(sex);
    that.setData({
      sex_index:sex,
    });
    that.setData({
      user_sex: that.data.sex_array[that.data.sex_index],
    });
  },
  get_phone:function(){
    wx.navigateTo({
      url: '../check/check?user_phone=' +  this.data.user_phone,
    })
    console.log('phone');
  },
  get_name:function(e){
    var value = e.detail.value;//获取输入框中的值
    var that = this;
    that.setData({
      user_name: value
    })
    console.log("------昵称"+value);
  },
  set_name:function(e){
    var value = e.detail.value;//获取评论框中的值
    console.log("-----失去焦点" + value);
    var that = this;
    that.setData({
      user_name: value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
 
  onLoad: function (options) {
    new app.ToastPannel;
    var that = this;
    console.log('---persona,l' + that.data.user_phone + "-------" + app.globalData.user_phone);
    var user_id = app.globalData.user_id;
    wx.request({
      url: 'http://192.168.0.148:88/hhb/api/login.ashx?action=get_user_info',
      method: 'POST',
      data: {
        user_id: user_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
      },
      success: function (res) {//请求成功之后要做什么
       
        if (res.data.code == 10001){
          console.log(res.data.message);
          console.log(res.data.data);
          var r_data = res.data.data;
        that.setData({
          avatarUrl: r_data[0],
          user_name: r_data[1],
          sex_index: r_data[2],
          user_phone: r_data[3],
          date: r_data[4],
        });
    
        }else{
          console.log("------原始");
          console.log(app.globalData.userInfo);
          that.setData({
            user_phone: app.globalData.user_phone
            //user_phone: '',
          })
          if (app.globalData.userInfo.gender == 1) {
            that.setData({
              sex_index: 0,
            });
            that.setData({
              user_sex: that.data.sex_array[that.data.sex_index],
            })
          } else {
            that.setData({
              sex_index: 1
            });
            that.setData({
              user_sex: that.data.sex_array[that.data.sex_index],
            })
          }
          that.setData({
            avatarUrl: app.globalData.userInfo.avatarUrl,
            user_name: app.globalData.userInfo.nickName,
          });
        }
      },
      fail: function (err) {//请求失败之后要做什么
        console.log('请求失败')
      }
    });
  }
})
