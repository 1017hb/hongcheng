var app = getApp();
Component({
  properties: {
    benefit: {
      type: Object,
      value: [],
    },
    height:{
      type:Number,
      value:0
    },
    fonts:{
      type: Number,
      value: 30
    },
    vip_grade:{
      type:Number,
      value:0
    },
    vip_name:{
      type:String,
      value:''
    }
  },
  data: {

  },
  watch:{
    vip_grade:{
      handler(newValue){
        console.log('162.3256120')
        console.log(newValue)
      }
    }
  },
  ready: function () {
    let that = this;

    console.log(that.data.vip_grade)
  },
  attached: function () {

  },
  methods: {

  }
})