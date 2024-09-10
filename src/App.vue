<script setup>
import {RouterView} from "vue-router";
</script>

<template>
  <RouterView name="header"/>
  <div class="app_main_content">
    <RouterView name="sidebar"/>
    <RouterView/>
  </div>
</template>

<style lang="less" scoped>

</style>
