<template>
	<div class="cate-list" ref="promote">
		<div class="slider-banner boutique" v-if="promoteImg.length > 0">
				<swiper :options="swiperOption" class="swiper-wrapper" >
					<swiper-slide
						class="swiper-slide"
						v-for="(item, index) in promoteImg"
						:key="index"
					>
						<img :src="item.img" />
					</swiper-slide>
				</swiper>
			<div class="swiper-pagination paginationBanner"></div>
		</div>
		<div class='title acea-row row-center-wrapper'>
		          <div class='line'></div>
		          <div class='name'><span class='iconfont icon-remen'></span>{{title}}</div>
		          <div class='line'></div>
		</div>
		<Promotion-good :benefit="promoteList" class="pro-goods"></Promotion-good>
		<Loading :loaded="loadend" :loading="loading" :loadTitle="loadTitle"></Loading>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from "vue-awesome-swiper";
	import "@assets/css/swiper.min.css";
	import PromotionGood from "@components/PromotionGood";
	import {brand_rotation,brand_product} from "@api/store.js"
	
	import debounce from "lodash.debounce";
	import Loading from "@components/Loading";
	
	export default {
		name:'CateList',
		components:{
			swiper,
			swiperSlide,
			PromotionGood,
			Loading
		},
		props:{
			id:{
				type:Number,
				value:0
			},
			title:{
				type:String,
				value:''
			}
		},
		data(){
			return{
				loadTitle: "",
				loading: false,
				loadend: false,
				page:1,
				promoteImg: [],
				promoteList: [],
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
				}
			}
		},
		methods:{
			getPromoteImg(id){
				let that = this;
				that.promoteImg = [];
				brand_rotation(id).then(res => {
					that.promoteImg = res.data.image;
				}).catch(err => {
					console.log(err)
				})
			},
			getPromoteData:debounce(function(id,page){
				let that = this;
				if (that.loading) return; //阻止下次请求（false可以进行请求）；
				if (that.loadend) return; //阻止结束当前请求（false可以进行请求）；
				that.loading = true;
				brand_product(id,page).then(res => {
					let list = res.data;
					that.loading = false;
					that.promoteList.push.apply(that.promoteList,list);
					that.loadend = list.length < 10;
					that.loadTitle = that.loadend ? '已全部加载':'加载更多'
					that.page += 1;
				})	
			},300),	
		},
		mounted() {
			let that = this;
			that.page = 1;
			that.getPromoteImg(that.id);
			that.getPromoteData(that.id,1)
			this.$scroll(this.$refs.promote, () => {
			  !this.loading && this.getPromoteData(that.id,that.page);
			});
			console.log('00...2112')
			console.log(that.id)
			console.log(that.page)
		},
		watch:{
			id:function(newVal,oldVal){
				this.promoteList = [];
				this.id = newVal;
				this.page = 1;
				this.loadTitle = "";
				this.loadend = false;
				this.loading = false;
				console.log('发的说法是')
				console.log(this.id)
				console.log(this.page);
				this.getPromoteImg(this.id);
				this.getPromoteData(this.id,1);
			}
		}
	}
</script>

<style scoped="scoped">
	.pro-goods{
		margin-top: -0.3rem;
	}
	.cate-list{
		margin-top: 1.68rem;
		background-color:#e2e1e1;
	}
	.cate-list .title{
		height: 1rem;
		font-size: 0.36rem;
		color: #282828;
	}
	.cate-list .title .line{
		width: 1.3rem;
		background-color: #f3f1f1;
		height: 0.04rem;
	}
	.cate-list .title .name{
		margin: 0 0.1rem;
	}
</style>
