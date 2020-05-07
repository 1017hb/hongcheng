<template>
	<div class="index" ref="goodsCate">
		<!--商品分类info.fastInfo-->
		<div class="wrapper" v-if="fashionList.length > 0">
			<div class="goods-class">
				<div class="item" v-for="(item, index) in fashionList"
				:key="index" @click="setItem(index)">
						<div class="img-box">
						  <img :src="item.pic" />
						</div>
						<div class="pro-info line1">{{item.cate_name}}</div>
				</div>
			</div>
		</div>
		<promotion-good :benefit="benefit"></promotion-good>
		<loading :loaded="loadend" :loading="loading" :loadTitle="loadTitle"></loading>
	</div>
</template>

<script>
	import PromotionGood from "@components/PromotionGood";
	import Loading from "@components/Loading";
	import debounce from "lodash.debounce";
	import {fashionData,fashionGoods} from "@api/store.js";
	export default {
		name:'GoodsCate',
		components:{
			PromotionGood,
			Loading
		},
		props:{
		},
		data(){
			return{
				catePage:1,
				benefit:[],
				fashionList:[],
				loadend:false,
				loading:false,
				loadTitle:"",
				id:0
			}
		},
		methods:{
			getFashData:debounce(function(id,page){
				let that = this;
				if (that.loading) return; //阻止下次请求（false可以进行请求）；
				if (that.loadend) return; //阻止结束当前请求（false可以进行请求）;
				that.loading = true;
				fashionData(that.id,that.catePage).then(res => {
					console.log(res)
					that.fashionList = res.data.type;
					let list = res.data.product;
					that.benefit.push.apply(that.benefit,list);
					that.loading = false;
					that.loadend = list.length < 10;
					that.loadTitle = that.loadend ? "已全部加载完成":"加载更多";	
					that.catePage += 1;
				})
			},300),
			getFashGoods:debounce(function(id,page){
				let that = this
				if(that.loading) return;
				if(that.loadend) return;
				that.loading = true;
				fashionGoods(id,page).then(res => {
					console.log('那你是哪的呢')
					console.log(res);
					let list = res.data.product;
					that.benefit.push.apply(that.benefit,list);
					that.loadend = list.length < 10;
					that.loading = false;
					that.loadTitle = that.loadend ? "已全部加载完成":"加载更多",
					that.catePage += 1;
				})
			},300),
			setItem:function(index){
				let that = this;
				let id = that.fashionList[index].id;
				that.benefit = [];
				console.log('000000000')
				console.log(id)
				that.catePage = 1;
				that.getFashGoods(id,1);
			}
		},
		mounted:function(){
			let that = this;
			that.id = this.$route.query.id;
			that.getFashData(that.id,that.catePage);
			that.$scroll(that.$refs.goodsCate,()=> {
				!this.loading && that.getFashData(that.id,that.catePage)
			});
		},
		watch:{
			$route(to){
				console.log(to)
			}
		}
	}
</script>

<style scoped="scoped">
		
</style>
