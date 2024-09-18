<script setup>
import {RouterView} from "vue-router";
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const locale = zhCN
</script>

<template>
  <a-config-provider :locale="locale">
    <RouterView name="header"/>
    <div class="app_main_content">
      <RouterView name="sidebar"/>
      <div class="com_layout_content">
        <RouterView/>
      </div>
    </div>
  </a-config-provider>
</template>

<style lang="less" scoped>

</style>
