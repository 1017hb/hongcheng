<template>
	<div class="nav-top">
		<div class="nav-cate">
			<div class="cate-item" 
				v-for="(item,index) in cateDataTop" 
				:key="index"
				@click="setCateItem(index)"
				:class="[{active:index == currendIndex},{on:cateDataLen == (index+1) }]"
				>
				<div>{{item.brand_name}}</div>
				<div class="item-line"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { brand_list} from '@api/store.js'
	export default {
		name:'NavTop',
		props:{
					
		},
		data(){
			return{
				currendIndex:0,
				cateDataTop:[{id:0,brand_name:'首页'}],
				cateDataLen:0
			}
		},
		mounted() {
			let that = this;
			brand_list().then(res => {
				that.cateDataTop.push.apply(that.cateDataTop,res.data);
				that.cateDataLen = that.cateDataTop.length;
			})
		},
		methods:{
			setCateItem:function(e){
				let that = this;
				that.currendIndex = e;
				that.$emit('setTopItem',[that.cateDataTop[e].id,that.cateDataTop[e].brand_name]);
			}	
		}
	}
</script>

<style scoped>
	.nav-top{
		width: 100%;
		overflow: hidden;
		text-align: center;
		flex-shrink: 0;
		height: 0.7rem;
		position: fixed;
		top: 0.98rem;
		left: 0;
		background-color: #fff;
		z-index: 9999;
		border-bottom: 0.01rem solid #ebeaea;
	}
	.nav-top .nav-cate{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: middle;
		-ms-flex-align: middle;
		align-items: middle;
		overflow: auto;
	}
	
	.nav-top .cate-item{
		text-align: center;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		margin: 0 0.25rem;
		padding-top: 0.1rem;	
	}
	
	.nav-top .cate-item.on{
		padding-right: 0.25rem;
	}
	.nav-top .cate-item.active{
		font-size: 0.35rem;
		font-weight: bold;
		padding-top: 0rem;
	}
	.nav-top .cate-item.active .item-line{
		width: 0.6rem;
		height: 0.07rem;
		background-color: orange;
		margin: 0 auto;
		margin-top: 0.1rem;
	}
</style>
