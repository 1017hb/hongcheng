<template>
  <div id="footer" class="acea-row row-middle">
    <router-link
      :to="item.url"
      class="item"
      :class="{ on: item.url === $route.path }"
      v-for="(item, index) in footerList"
      :key="index"
    >
		
	<div class="iconfont" >
		<img :src="item.url === $route.path ? item.icon2 : item.icon1"/>
	</div>
	<div>{{ item.name }}</div>
	
    </router-link>
  </div>
</template>
<script>
export default {
  name: "Footer",
  props: {},
  data: function() {
    return {
      footerList: [
        {
          name: "首页",
          icon1: require('@assets/images/1-001.png'),
          icon2: require('@assets/images/1-002.png'),
          url: "/"
        },
        {
          name: "分类",
          icon1: require('@assets/images/2-001.png'),
          icon2: require('@assets/images/2-002.png'),
          url: "/category"
        },
		{
		  name: "会员中心",
		  icon1: require('@assets/images/5-001.png'),
		  icon2: require('@assets/images/5-002.png'),
		  url: "/vip"
		},
        {
          name: "购物车",
          icon1: require('@assets/images/3-001.png'),
          icon2: require('@assets/images/3-002.png'),
          url: "/cart"
        },
        {
          name: "我的",
          icon1: require('@assets/images/4-001.png'),
          icon2: require('@assets/images/4-002.png'),
          url: "/user"
        }
      ]
    };
  },

  methods: {}
};
</script>
