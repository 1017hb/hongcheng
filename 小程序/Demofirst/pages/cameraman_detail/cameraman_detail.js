//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    id:'',
    title:'',
    age:'',
    work_age:'',
    ctime:'',
    info:'',
    readnumber:'',
    upos:[],
    discuss: [],
    isdiscuss:"没更多了!",
    iszan:0,
    isfocus:false,
    t_value:'',
    iskey:false,

  },
  
  onCollectionTap:function(e){
    var id = e.currentTarget.dataset.coll;
    var data = e.currentTarget.dataset;
    var cookie_mid = wx.getStorageSync('zan') || [];//获取全部点赞的mid 
    var that = this;
    console.log("原有数据"+cookie_mid);
    var iszanitem = wx.getStorageSync('zzan') || [];//获取临时
    var newmessage = []; 
  
    if (!iszanitem.includes(id)) //说明已经点过赞,取消赞 
    {
      iszanitem.unshift(id);
      wx.setStorageSync('zzan', iszanitem) || [];
    } else {
      var m = 0;
      var j = 0;
      for (j in iszanitem) {
        if (iszanitem[j] != id) {
          newmessage[m] = iszanitem[j];
          m++;
          j++;
        }
      }
      wx.setStorageSync('zzan', newmessage) || [];
    } 

    console.log("操作的id" + wx.getStorageSync('zzan', iszanitem) || []);
  
    var discuss = that.data.discuss; 
    var iszan = that.data.iszan;
    for (var i  in discuss) {
      if (discuss[i].id == id) {
        if (discuss[i].zan){
          discuss[i].likes = discuss[i].likes - 1
          discuss[i].zan = false;
        }else{
          discuss[i].likes = discuss[i].likes + 1;
          discuss[i].zan = true;
        }
      }
    }
    that.setData({
      discuss: discuss
    });
  },

  input_b:function(e){
    console.log("---------评论");
    var that = this;
    that.setData({
      iskey:true
    });
  },
  t_blur: function (e) {
    console.log("失去焦点");
    var value = e.detail.value;//获取评论框中的值
    var that = this;
   
  },
  t_focus: function (e) {
    console.log("触发焦点");
  },
  t_input:function(e){
    console.log("键盘输入时,触发input事件");
    var value = e.detail.value;//获取评论框中的值
    var that = this;
    that.setData({
      t_value:value
    });
    console.log("------ddd"+value);
  },
  t_send:function(e){
    console.log("---------发表");
    var that = this;
    var value = that.data.t_value;
    console.log("-----value----"+value);
    that.setData({
      iskey: false
    });
    var discuess = that.data.discuss; 
    var cam_id = that.data.id;
  
    var user_id = app.globalData.user_id;
    var ctime = util.formatTime(new Date());
    //var rest = { "id": 34, ""};
    console.log("----数据" + ctime + "-----" + value + "------" + user_id + "----" + cam_id)

    wx.request({
      url: 'http://192.168.0.148:88/hhb/api/index.ashx?action=adddiscuss',
      method: 'POST',
      data: {
        ctime: ctime,
        value: value, 
        user_id: user_id,
        cam_id: cam_id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
      },
      success: function (res) {//请求成功之后要做什么
        console.log(res);
        console.log(res.data.message);
        that.getdiscuss();
        that.setData({
          isdiscuss:'没更多了!'
        });
      },
      fail: function (err) {//请求失败之后要做什么
        console.log('请求失败')
      }
    });

  },
  t_cacel: function (e) {
    console.log("---------取消");
    var that = this;
    that.setData({
      iskey: false
    });
  },
  getdiscuss:function(){
    var that = this;
    var id = that.data.id;
    wx.request({
      url: 'http://192.168.0.148:88/hhb/api/index.ashx?action=getcammeramendiscuss',
      method: 'POST',
      data: {
        id: id,
        user_id: app.globalData.user_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
      },
      success: function (res) {//请求成功之后要做什么
        console.log(res);
        console.log(res.data.message);
        console.log(res.data.data);
        if (res.data.isdiscuss == "0") {
          that.setData({
            isdiscuss: "还无用户评论,快来评论吧!"
          });
        } else {
          that.setData({
            discuss: res.data.data
          });
          console.log(res.data.data[0].zan)
          wx.setStorageSync('zan', res.data.data_id) || [];
          var newzan = [];//临时
          wx.setStorageSync('zzan', newzan) || [];
        }

      },
      fail: function (err) {//请求失败之后要做什么
        console.log('请求失败')
      }
    });
  },
  
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    console.log("----" + app.globalData.user_id);
    that.setData({
      id:id
    });
    console.log(id);
    wx.request({
      url: 'http://192.168.0.148:88/hhb/api/index.ashx?action=postcammeramendetail',
      method: 'POST',
      data: {id:id},
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
      },
      success: function (res) {//请求成功之后要做什么
        console.log(res);
        console.log(res.data.message);
        that.setData({
          title: res.data.data[0].title,
          age: res.data.data[0].age,
          work_age: res.data.data[0].work_age,
          ctime: res.data.data[0].date_t,
          info: res.data.data[0].info,
          readnumber: res.data.data[0].readnumber+1,
          upos: res.data.dataimg
        });
      },
      fail: function (err) {//请求失败之后要做什么
        console.log('请求失败')
      }
    });
    that.getdiscuss();
  }
  ,
  onUnload: function (options){
    var that = this;
    console.log("----------------22222222222");
    var isdata = wx.getStorageSync('zzan') || [];
    console.log("----------------22222222222" + isdata[0]);
    var likes;
    
    var discuss = that.data.discuss; 
    likes = "";
    if (isdata.length > 0) { 
      for (var n in isdata) {
        var item = isdata[n];
        console.log(item);
        for (var m in discuss) { 
          if (discuss[m].id == item) {
            likes += discuss[m].likes;
            if (n == (isdata.length - 1)) {
              likes += "";
            } else {
              likes += ",";
            }
          }
     
        }
      }
    }
    likes += "";
 
     //wx.setStorageSync('zandata', JSON.parse(md)) || [];

    var dis_id = wx.getStorageSync('zzan');
    var id = that.data.id;
    //var likes = JSON.stringify(likes);
    if (likes!=""){
      wx.request({
        url: 'http://192.168.0.148:88/hhb/api/index.ashx?action=editdiscuss',
        method: 'POST',
        data: { id: id, userid: app.globalData.user_id, likes: likes, dis_id: dis_id },
        header: {
          "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
        },
        success: function (res) {//请求成功之后要做什么
          console.log(res);
          console.log(res.data.message);
        },
        fail: function (err) {//请求失败之后要做什么
          console.log('请求失败')
        }
      });

    }
   
    console.log("unonload------卸载")
    console.log(wx.getStorageSync('zandata', likes) || []);
    //wx.removeStorageSync('zandata');
  }
})
