<script setup>
import {RouterView} from "vue-router";
</script>

<template>
  <RouterView name="header"/>
  <div class="app_main_content">
    <RouterView name="sidebar"/>
    <div class="com_layout_content">
      <RouterView/>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
