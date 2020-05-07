<template>
  <div class="index" v-cloak  ref="proShow">
    <div class="follow acea-row row-between-wrapper" v-if="followHid && followUrl && !subscribe && isWeixin">
      <div>点击“立即关注”即可关注公众号</div>
      <div class="acea-row row-middle">
        <div class="bnt" @click="followTap">立即关注</div>
        <span class="iconfont icon-guanbi" @click="closeFollow"></span>
      </div>
    </div>
    <div class="followCode" v-if="followCode">
      <div class="pictrue"><img :src="followUrl" /></div>
      <div class="mask" @click="closeFollowCode"></div>
    </div>
	<!--搜索-->
    <search-goods :logoUrl="logoUrl"></search-goods>
	<!--顶部品牌分类-->
	<top-nav @setTopItem="setTopItem"></top-nav>
		<!--轮播图-->
		<div class="slider-banner banner" v-if="isShowIndex">
		  <swiper :options="swiperOption" v-if="banner.length > 0">
			<swiper-slide v-for="(item, index) in banner" :key="index">
			  <router-link
				:to="item.wap_url ? item.wap_url : ''"
				class="search acea-row row-middle"
			  >
				<img :src="item.pic" />
			  </router-link>
			</swiper-slide>
			<div class="swiper-pagination paginationBanner" slot="pagination"></div>
		  </swiper>
		</div>
		<!--商品分类-->
		<index-goods-cate :fashionList="fashionList" :isShowIndex="isShowIndex"></index-goods-cate>
		<!--品牌推荐-->
		<div class="wrapper" v-if="info.bastBanner.length > 0 && isShowIndex">
		  <div class="title acea-row row-between-wrapper" style="display: none;">
			<div class="text">
			  <div class="name line1">精品推荐</div>
			  <div class="line1">{{ info.bastInfo }}</div>
			</div>
			<router-link :to="{ path: '/hot_new_goods/' + 1 }" class="more"
			  >更多<span class="iconfont icon-jiantou"></span
			></router-link>
		  </div>
		  <title-wrapper title='品牌推荐'></title-wrapper>
		  <div class="slider-banner boutique">
			<swiper class="swiper-wrapper" :options="swiperBoutique">
			  <swiper-slide
				class="swiper-slide"
				v-for="(item, index) in cate_banner"
				:key="index"
			  >
				<img :src="item.logo_banner" @click="setCateItem(index)"/>
			  </swiper-slide>
			</swiper>
			<div class="swiper-pagination paginationBoutique"></div>
		  </div>
		</div>
		<!--公司简介与签到-->
		<div class="wrapper" v-if="isShowIndex">
			<div class="serve acea-row row-between-wrapper">
				<router-link to="/pages/news_list/index" class="serve-url">
					<img src="http://www.gzggtp.com/uploads/attach/2020/03/20200330/78a5122a7aefb0d2167516a5a83378bc.jpg"/>
				</router-link>
				<router-link to="/pages/user_sgin/index" class="serve-url">
					<img src="http://www.gzggtp.com/uploads/attach/2020/03/20200330/2567d1a1a75039eaeeb6db33782a578b.jpg"/>
				</router-link>
			</div>
		</div>
		<!--热门榜单-->
		<div class="hotList" v-if="likeInfo.length > 0 && isShowIndex">
		  <div class="hot-bg">
			<div class="title acea-row row-between-wrapper">
			  <div class="text line1">
				<span class="label">热门榜单</span>根据销量、搜索、好评等综合得出
			  </div>
			  <router-link :to="{ path: '/hot_new_goods/' + 2 }" class="more">
				更多<span class="iconfont icon-jiantou"></span>
			  </router-link>
			</div>
		  </div>
		  <div class="list acea-row row-middle">
			<router-link
			  :to="{ path: '/detail/' + item.id }"
			  class="item"
			  v-for="(item, index) in likeInfo"
			  :key="index"
			>
			  <div class="pictrue">
				<img :src="item.image" />
				<img
				  src="@assets/images/one.png"
				  class="numPic"
				  v-if="index === 0"
				/>
				<img
				  src="@assets/images/two.png"
				  class="numPic"
				  v-else-if="index === 1"
				/>
				<img
				  src="@assets/images/three.png"
				  class="numPic"
				  v-else-if="index === 2"
				/>
			  </div>
			  <div class="name line1">{{ item.store_name }}</div>
			  <div class="money font-color-red">
				￥<span class="num">{{ item.price }}</span>
			  </div>
			</router-link>
		  </div>
		</div>
		<div v-if="newGoodsBananr">
		  <div class="adver">
			<img :src="newGoodsBananr" />
		  </div>
		</div>
		<!--今日上新-->
		<div class="wrapper" v-if="info.bastList.length > 0 && isShowIndex">
			<title-wrapper title="今日上新"></title-wrapper>
			<Good-list :good-list="info.bastList" :is-sort="false"></Good-list>
		</div>
		<!--新品首发-->
		<div class="wrapper" v-if="info.firstList.length > 0" style="display: none;">
		  <div class="title acea-row row-between-wrapper">
			<div class="text">
			  <div class="name line1">
				首发新品<span class="new font-color-red">NEW~</span>
			  </div>
			  <div class="line1">{{ info.firstInfo }}</div>
			</div>
			<router-link :to="{ path: '/hot_new_goods/' + 3 }" class="more"
			  >更多<span class="iconfont icon-jiantou"></span
			></router-link>
		  </div>
		  <div class="newProducts">
			<swiper class="swiper-wrapper" :options="swiperProducts">
			  <swiper-slide
				class="swiper-slide"
				v-for="(item, index) in info.firstList"
				:key="index"
			  >
				<router-link :to="{ path: '/detail/' + item.id }">
				  <div class="img-box">
					<img :src="item.image" />
				  </div>
				  <div class="pro-info line1">{{ item.store_name }}</div>
				  <div class="money font-color-red">￥{{ item.price }}</div>
				</router-link>
			  </swiper-slide>
			</swiper>
		  </div>
		</div>
		<!--促销单品-->
		<div class="wrapper" v-if="promote_list.length > 0 && isShowIndex" >
		  <div class="title acea-row row-between-wrapper" style="display:none;">
			<div class="text">
			  <div class="name line1">促销单品</div>
			  <div class="line1">{{ info.salesInfo }}</div>
			</div>
			<router-link :to="'/promotion'" class="more"
			  >更多<span class="iconfont icon-jiantou"></span
			></router-link>
		  </div>
		  <title-wrapper title="促销商品"></title-wrapper>
		  <Promotion-good :benefit="promote_list" ></Promotion-good>
		  <Loading :loaded="loadend" :loading="loading"></Loading>
		</div>
		<!--品牌分类数据-->
		<cate-list v-if="!isShowIndex" :id="cateId" :title="cateTitle"></cate-list>
		<Coupon-window
		  :coupon-list="couponList"
		  v-if="showCoupon"
		  @checked="couponClose"
		  @close="couponClose"
		></Coupon-window>
    <div style="height:1.2rem;"></div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import debounce from "lodash.debounce";
import "@assets/css/swiper.min.css";

import GoodList from "@components/GoodList";
import PromotionGood from "@components/PromotionGood";
import CouponWindow from "@components/CouponWindow";
import TopNav from '@components/TopNav';
import TitleWrapper from '@components/TitleWrapper';
import Loading from "@components/Loading";
import IndexGoodsCate from '@components/IndexGoodsCate';

import SearchGoods from './children/SearchGoods';
import CateList from './children/CateList';

import { getHomeData, getShare, follow } from "@api/public";
import cookie from "@utils/store/cookie";
import { openShareAll } from "@libs/wechat";
import { isWeixin } from "@utils/index";
import { brand_list,fashion_list,promotion_list,brand_product,logo_banner} from '@api/store.js'
const HAS_COUPON_WINDOW = "has_coupon_window";

export default {
  name: "Index",
  components: {
    swiper,
    swiperSlide,
    GoodList,
    PromotionGood,
    CouponWindow,
	TopNav,
	TitleWrapper,
	SearchGoods,
	CateList,
	IndexGoodsCate
  },
  props: {},
  data: function() {
    return {
		url_sss:[],
		cate_banner:[],
		promote_page:1,
		promote_list:[],
		fashionList:[],
		loadTitle: "",
		loading: false,
		loadend: false,
		cateId:0,
		cateTitle:'',
		isShowIndex:true,
		fashionData:[],
      newGoodsBananr: "",
      isWeixin: isWeixin(),
      followUrl: "",
      subscribe: false,
      followHid: true,
      followCode: false,
      showCoupon: false,
      logoUrl: "",
      banner: [],
      menus: [],
      roll: [],
      activity: [],
      activityOne: {},
      info: {
        fastList: [],
        bastBanner: [],
        firstList: [],
        bastList: []
      },
      likeInfo: [],
      lovely: [],
      //benefit: [],
      couponList: [],
      swiperOption: {
        pagination: {
          el: ".paginationBanner",
          clickable: true
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true
      },
      swiperRoll: {
        direction: "vertical",
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true
      },
      swiperScroll: {
        freeMode: true,
        freeModeMomentum: false,
        slidesPerView: "auto",
        observer: true,
        observeParents: true
      },
      swiperBoutique: {
        pagination: {
          el: ".paginationBoutique",
          clickable: true
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true
      },
      swiperProducts: {
        freeMode: true,
        freeModeMomentum: false,
        slidesPerView: "auto",
        observer: true,
        observeParents: true
      }
    };
  },
  mounted: function() {
    let that = this;
	this.get_product_list();
	this.getlogo_banner();
	this.$scroll(this.$refs.proShow, () => {
	  !this.loading && this.get_product_list();
	});
	fashion_list().then(res => {
		that.fashionList = res.data;
	})
    getHomeData().then(res => {
		console.log('ressdf')
		console.log(res)
		that.url_sss = res.data.menus;
      that.logoUrl = res.data.logoUrl;
      that.newGoodsBananr = res.data.newGoodsBananr;
      that.$set(that, "banner", res.data.banner);
      that.$set(that, "menus", res.data.menus);
      that.$set(that, "roll", res.data.roll);
      that.$set(that, "activity", res.data.activity);
      if (res.data.activity.length) {
        var activityOne = res.data.activity.shift();
        that.$set(that, "activityOne", activityOne);
      }
      that.$set(that, "info", res.data.info);
      that.$set(that, "likeInfo", res.data.likeInfo);
      that.$set(
        that,
        "lovely",
        res.data.lovely.length ? res.data.lovely[0] : {}
      );
      //that.$set(that, "benefit", res.data.benefit);
      that.$set(that, "couponList", res.data.couponList);
      that.subscribe = res.data.subscribe;
      that.setOpenShare();
      this.showCoupon =
        !cookie.has(HAS_COUPON_WINDOW) &&
        res.data.couponList.some(coupon => coupon.is_use);
    });
    this.getFollow();

  },
  methods: {
	  setCateItem(index){
		  let that = this;
		  that.isShowIndex = false;
		  that.cateId = that.cate_banner[index].id;
		  that.cateTitle = that.cate_banner[index].id;
		  console.log(that.cate_banner);
		  console.log(that.cateId);
	  },
		get_product_list: debounce(function() {
		    var that = this;
		    promotion_list(that.promote_page).then(res => { 
				let list = res.data   
				that.promote_list.push.apply(that.promote_list,list);
				that.promote_page += 1;
		    });   
		}, 300),
		getlogo_banner(){
			let that = this;
			logo_banner().then(res => {
				that.cate_banner = res.data;
			})
		},
	setTopItem(msg){
		let that = this;
		if(msg[0] === 0){
			that.isShowIndex = true;
		}else{
			that.isShowIndex = false;
			that.cateId = msg[0];
			that.cateTitle = msg[1];
		}
	},
    closeFollow() {
      this.followHid = false;
    },
    followTap() {
      this.followCode = true;
      this.followHid = false;
    },
    closeFollowCode() {
      this.followCode = false;
      this.followHid = true;
    },
    couponClose() {
      cookie.set(HAS_COUPON_WINDOW, 1);
    },
    getFollow() {
      follow()
        .then(res => {
          this.followUrl = res.data.path;
        })
        .catch(() => {});
    },
    setOpenShare() {
      if (isWeixin()) {
        getShare().then(res => {
          var data = res.data.data;
          var configAppMessage = {
            desc: data.synopsis,
            title: data.title,
            link: location.href,
            imgUrl: data.img
          };
          openShareAll(configAppMessage);
        });
      }
    }
  }
};
</script>
<style scoped>
.index {
  background-color: #fff;
}
.index .follow {
  z-index: 100000;
}
.serve {
	padding: 0.4rem 0;
	margin: 0 0.3rem;
	margin-top: 0.2rem;
	border-top: 0.02rem solid #eeeeee;
}
.serve .serve-url{
	width: 48%;
	height: 2rem;
	line-height: 2rem;
	text-align: center;
	border-radius: 0.2rem;
	color: #fff;
	font-size: 0.4rem;
	border: 0.02rem solid #d9dddd;
}
.serve .serve-url img{
	border-radius: 0.2rem;
}
</style>
