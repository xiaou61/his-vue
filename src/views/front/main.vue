<template>
<!--  避免路由引入页面的时候浏览器不刷新内容-->
  <router-view :key="router.currentRoute.value.query.random"
</template>

<script lang="ts" setup>
import router from "../../router";
</script>

<style lang="less" scoped>
  @import url('main.less');
</style>
