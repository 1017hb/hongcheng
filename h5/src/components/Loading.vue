<template>
  <div
    class="Loads acea-row row-center-wrapper"
    style="margin-top: .2rem;"
  >
    <template v-if="loading">
      <div
        class="iconfont icon-jiazai loading acea-row row-center-wrapper"
      ></div>
      {{loadTitle}}
    </template>
    <template v-else>
        {{loadTitle}}
    </template>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loaded: Boolean,
    loading: Boolean,
	loadTitle:""
  }
};
</script>
