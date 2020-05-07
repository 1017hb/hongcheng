<template>
	<!--搜索-->
	<div class="header acea-row row-center-wrapper">
	  <div class="logo"><img :src="logoUrl" /></div>
	  <router-link :to="'/search'" class="search acea-row row-middle">
	    <span class="iconfont icon-xiazai5"></span>搜索商品
	  </router-link>
	</div>
</template>

<script>
	export default {
		name:'SearchGoods',
		props:{
			logoUrl:{
				type:String,
				value:''
			}
			
		}
	}
</script>

<style scoped>
</style>
