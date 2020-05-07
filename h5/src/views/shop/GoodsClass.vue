<template>
  <div class="productSort">
    <form @submit.prevent="submitForm">
      <div class="header acea-row row-center-wrapper" ref="header">
        <div class="acea-row row-between-wrapper input">
          <span class="iconfont icon-sousuo"></span>
          <input type="text" placeholder="搜索商品信息" v-model="search" />
        </div>
      </div>
    </form>
    <div class="aside">
      <div
        class="item acea-row row-center-wrapper"
        :class="index === navActive ? 'on' : ''"
        v-for="(item, index) in category"
        :key="index"
        @click="asideTap(index)"
      >
        <span>{{ item.cate_name }}</span>
      </div>
    </div>
    <div class="conter" @scroll.native="onScroll">
      <div class="listw" v-for="(item, index) in category" :key="index">
        <div class="title acea-row row-center-wrapper" ref="title">
          <div class="line"></div>
          <div class="name">{{ item.cate_name }}</div>
          <div class="line"></div>
        </div>
		
		
		<!--
		<div class="ico-goods" v-if="goodscate.length > 0" >
			<router-link
				class="ico-item"
				:to="{ path: '/detail/' + item.id }"  
				v-for="(item, index) in goodscate"
				:key="index"
				>
				<div class="ico-item-img">
					<img :src="item.image"/>
				</div>
				<div class="ico-item-bottom">
					<div class="ico-item-bottom-name">{{ item.store_name }}</div>
					<div class="ico-item-bottom-info">
						<div class="ico-item-bottom-price">
							<div class="ico-item-bottom-vip">会员价</div>
							<div class="ico-item-bottom-price-new"><div>￥</div><div class="ico-item-bottom-price-text">{{item.price}}</div></div>
					</div>
				</div>
				<div class="ico-price-old">吊牌价:￥{{item.ot_price}}</div>
				</div>
			</router-link>
		</div>
		-->
		
		
        <div class="list acea-row">
          <router-link
            class="item acea-row row-column row-middle"
            v-for="(child, index) in item.children"
            :key="index"
            :to="{
              path: '/goods_list',
              query: { id: child.id, title: child.cate_name }
            }"
          >
            <div class="picture"><img :src="child.pic" /></div>
            <div class="name line1">{{ child.cate_name }}</div>
          </router-link>
        </div>
		
      </div>
    </div>
    <div style="height:1.2rem;"></div>
  </div>
</template>
<script>
import debounce from "lodash.debounce";
import { getCategory } from "@api/store";
import { trim } from "../../utils";

export default {
  name: "GoodsClass",
  components: {},
  props: {},
  data: function() {
    return {
      category: [],
	  goodscate:[
	        {
	          id: 1,
	          image: 'http://www.gzggtp.com/uploads/attach/2020/03/20200307/db6cc213c41ff82d5c40765605a1c161.jpg',
	          store_name: '儿童1',
	          price:12.36,
	          sales: 100000,
	          unit_name: '件'
	        },
	        {
	          id: 1,
	          image: 'http://www.gzggtp.com/uploads/attach/2020/03/20200307/db6cc213c41ff82d5c40765605a1c161.jpg',
	          store_name: '儿童2',
	          price: 12.36,
	         
	          sales: 100000,
	          unit_name: '件'
	        },
	        {
	          id: 1,
	          image: 'http://www.gzggtp.com/uploads/attach/2020/03/20200307/db6cc213c41ff82d5c40765605a1c161.jpg',
	          store_name: '儿童3',
	          price: 12.36, 
	          sales: 100000,
	          unit_name: '件'
	        },
	      ],
      navActive: 0,
      search: "",
      lock: false
    };
  },
  watch: {
    "$route.params.pid": function(n) {
      console.log(n);
      if (n) {
        this.activeCateId(n);
      }
    }
  },
  mounted: function() {
    document.addEventListener("scroll", this.onScroll, false);
    this.loadCategoryData();
  },
  methods: {
    activeCateId(n) {
      let index = 0;
      n = parseInt(n);
      if (!n) return;
      this.category.forEach((cate, i) => {
        if (cate.id === n) index = i;
      });

      if (index !== this.navActive) {
        this.asideTap(index);
      }
    },
    loadCategoryData() {
      getCategory().then(res => {
        this.category = res.data;
        this.$nextTick(() => {
          if (this.$route.params.pid) this.activeCateId(this.$route.params.pid);
          else this.onScroll();
        });
      });
    },
    submitForm: function() {
      var val = trim(this.search);
      if (val) {
        this.$router.push({
          path: "/goods_list",
          query: { s: val }
        });
        setTimeout(() => (this.search = ""), 500);
      }
    },
    asideTap(index) {
        const top =
        this.$refs.title[index].offsetTop -
        this.$refs.header.offsetHeight -
        window.scrollY;
        this.lock = true;
		window.scrollBy({ top, left: 0, behavior: "smooth" });
		this.navActive = index;
    },
    onScroll: debounce(function() {
      if (this.lock) {
        this.lock = false;
        return;
      }
      const headerHeight = this.$refs.header.offsetHeight,
        { scrollY } = window,
        titles = this.$refs.title;
      titles.reduce((initial, title, index) => {
        if (initial) return initial;
        const parent = title.parentNode || title.parentElement;
        if (
          scrollY + headerHeight + 15 <
          title.offsetTop + parent.offsetHeight
        ) {
          initial = true;
          this.navActive = index;
        }
        // else if (innerHeight + scrollY + 15 > offsetHeight) {
        //   this.navActive = titles.length - 1;
        //   initial = true;
        // }
        return initial;
      }, false);
    }, 500)
  },
  beforeDestroy: function() {
    document.removeEventListener("scroll", this.onScroll, false);
  }
};
</script>

<style scoped>
	.ico-goods{
	  display: flex;
	  flex-wrap: wrap;
	  -webkit-flex-wrap: wrap;
	}
	.ico-item{
	  width: 46%;
	  background-color: #fff;
	  margin: 0.5rem 0;
	  border-radius: 0.12rem;
	  border: 0.02rem solid #f4f4f4; 
	}
	.ico-item:nth-of-type(2n+1){
	  margin-left: 2%;
	  margin-right: 2%;
	}
	.ico-item:nth-of-type(2n){
	  margin-right: 2%;
	}
	.ico-item-img{
	  width: 100%;
	  height: 2.6rem;
	}
	.ico-item-img img{
	  border-radius: 0.15rem 0.15rem 0 0;
	}
	.ico-item-bottom{
	  display: flex;
	  flex-direction: column;
	  font-size: 0.24rem;
	  padding: 0 0 0.12rem 0.12rem;
	}
	.ico-item-bottom-name{
	  line-height: 0.6rem;
	  margin: 0 0.12rem;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
	.ico-item-bottom-price{
	  display: flex;
	  width: 99%;
	}
	.ico-item-bottom-vip{
	  font-size: 0.25rem;
	  background-color: red;
	  color: #fff;
	  border-radius: 0.1rem;
	  padding: 0 0.12rem;
	  text-align: center;
	  
	}
	
	.ico-item-bottom-price-new{
	  color: red;
	  margin-left: 0.12rem;
	  display: flex;
	}
	.ico-item-bottom-price-new .ico-item-bottom-price-text{
	  font-weight: 600;
	  font-size: 0.26rem
	}
	.ico-item-bottom-info{
	  display: flex;
	  line-height: 0.55rem;
	  margin-bottom: 0.05rem;
	  align-items: center;
	}
	.ico-item-bottom-add-car{
	  width: 0.25rem;
	  height: 0.25rem;
	}
	.ico-item-bottom-number{
	  line-height: 1rem;
	  margin-bottom: 0.01rem;
	  color: #888;
	}
	.ico-price-old{
	  color: #888;
	  text-decoration: line-through;
	}
</style>