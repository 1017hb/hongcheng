<template>
		<div class="title acea-row row-center-wrapper title-bg">
		  <img src="@assets/images/ling.png" />
		  <div class="titleTxt">{{title}}</div>
		  <img src="@assets/images/ling.png" />
		</div>	
</template>

<script>
	export default {
		name:'TitleWrapper',
		props:{
			title:{
				type:String,
				value:'默认'
			}
		},
		data(){
			return{
				
			}
		}
		
	}
</script>

<style scoped>
	.title-bg img{
		width: 0.35rem;
		height: 0.35rem;
		border-radius: 0.2rem;
	}
	.title-bg .titleTxt{
		margin: 0 0.2rem;
		background-image: linear-gradient(to right, #f57a37 0%, #f21b07 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
