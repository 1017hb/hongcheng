<template>
	<div class="ico-goods" 
	v-if="benefit.length > 0" 
	 >
		<router-link
			class="ico-item"
			:to="{ path: '/detail/' + item.id }"  
			v-for="(item, index) in benefit"
			:key="index"
			>
			<div class="ico-item-img">
				<img :src="item.image"/>
			</div>
			<div class="ico-item-bottom">
				<div class="ico-item-bottom-name">{{ item.store_name }}</div>
				<div class="ico-item-bottom-info">
					<div class="ico-item-bottom-price">
						<div class="ico-item-bottom-vip">会员价</div>
						<div class="ico-item-bottom-price-new">
							<div>￥</div>
							<div class="ico-item-bottom-price-text">{{item.price}}</div>
						</div>
				</div>
			</div>
			<div class="ico-price-old">吊牌价:￥{{item.ot_price}}</div>
			</div>
		</router-link>
	</div>
<!--
	
  <div class="promotionGood" v-if="benefit.length > 0">
    <router-link
      :to="{ path: '/detail/' + item.id }"
      class="item acea-row row-between-wrapper"
      v-for="(item, index) in benefit"
      :key="index"
    >
      <div class="pictrue">
        <img :src="item.image" class="image" />
      </div>
      <div class="text">
        <div class="name line1">{{ item.store_name }}</div>
        <div class="sp-money acea-row">
          <div class="moneyCon">
            促销价: ￥<span class="num">{{ item.price }}</span>
          </div>
        </div>
        <div class="acea-row row-between-wrapper">
          <div class="money">日常价：￥{{ item.ot_price }}</div>
          <div>仅剩：{{ item.stock }}{{ item.unit_name }}</div>
        </div>
      </div>
    </router-link>
  </div>
  -->
</template>
<script>
export default {
  name: "PromotionGood",
  props: {
    benefit: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {};
  }
};
</script>
