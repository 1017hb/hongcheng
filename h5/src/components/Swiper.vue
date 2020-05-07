<template>
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
</template>

<script>
	import { swiper, swiperSlide } from "vue-awesome-swiper";
	import "@assets/css/swiper.min.css";
	
	export default {
		name:'Swiper',
		components:{
			swiper,
			swiperSlide
		},
		props:{
			isShowIndex:{
				type:Boolean,
				value:true
			},
			banner:{
				type:Array,
				value:[]
			},
			swiperOption:{
				type:Object,
				value:{}
			}
		}
	}
</script>

<style>
	
</style>
