<template>
	<!--商品分类info.fastInfo-->
	<div class="wrapper" v-if="fashionList.length > 0 && isShowIndex">
	  <div class="title acea-row row-between-wrapper" style="display: none;">
		<div class="text">
		  <div class="name line1">快速选择</div>
		  <div class="line1">{{  }}</div>
		</div>
		<router-link :to="'/category'" class="more"
		  >更多<span class="iconfont icon-jiantou"></span
		></router-link>
	  </div>
		<div class="goods-class">
			<div class="item" v-for="(item, index) in fashionList"
			:key="index">
				<router-link
				  :to="{
					path: '/goods_cate',
					query: { id: item.id, title: item.cate_name }
				  }"
				>
					<div class="img-box">
					  <img :src="item.pic" />
					</div>
					<div class="pro-info line1">{{item.cate_name}}</div>
				</router-link>	
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'IndexGoodsCate',
		props:{
			fashionList:{
				type:Array,
				value:[]
			},
			isShowIndex:{
				type:Boolean,
				value:true
			}
		},
		data(){
			return{
				
			}
		},
		mounted:function(){
			let that = this;
			console.log(that.fashionList)
		}
		
	}
</script>

<style>
</style>
