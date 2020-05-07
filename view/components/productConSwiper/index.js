var app = getApp();
Component({
  properties: {
    imgUrls:{
      type:Object,
      value:[]
    }
  },
  data: {
    indicatorDots: false,
    circular: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    currents: "1"
  },
  attached:function(){
  },
  methods: {
    previewImg:function(e){
      console.log('你好');
      console.log(e)
      let currentUrl = e.currentTarget.dataset.currenturl;
      let previewUrls = e.currentTarget.dataset.previewurl;
      console.log(currentUrl)
      console.log(previewUrls)
      wx.previewImage({
        current: currentUrl,
        urls: previewUrls
      })
    },
    change: function (e) {
      this.setData({
        currents: e.detail.current + 1
      })
    }
  }
})