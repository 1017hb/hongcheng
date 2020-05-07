<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name:'BScroll',
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			},
			data: {
			  type: Array,
			  default: () => {
			    return []
			  }
			}
		},
		data(){
			return {
				scroll:null
			}
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:true,
				probeType:this.probeType,//监听滑动属性,2:出发时监听，手指离开滑动时不监听，3:实时监听，，
				pullUpLoad:this.pullUpLoad//监听上拉加载更多
			})
			//监听滚动的位置
			if(this.probeType === 2 || this.probeType === 3){
				this.scroll.on('scroll',(position) => {
					this.$emit('scroll',position)
				})
			}
			//监听上拉加载更多
			if(this.pullUpLoad){
				this.scroll.on('pullingUp',() => {
					this.$emit('pullingUp')
				})
			}			
		},
		methods:{
			scrollTo(x, y, time=300){
				//先判断this.scroll是否挂载
				this.scroll && this.scroll.scrollTo(x, y, time);
				//this.scroll.scrollTo(x, y, time);
				console.log('--------')
			},
			finishPullUp(){
				this.scroll && this.scroll.finishPullUp();
			},
			refresh(){
				//console.log('===========')
				this.scroll && this.scroll.refresh()
				//this.scroll.refresh()
			},
			getScrollY(){
				return this.scroll ? this.scroll.y : 0
			}
		},
		watch:{
			data() {
			  setTimeout(this.refresh, 20)
			}
		}
	}
</script>

<style>
</style>
