<script setup>
const envName = import.meta.env.VITE_NAME
const envUrl = import.meta.env.VITE_BASE_URL
</script>

<template>
  <h2>首页</h2>
  <p>环境name：{{envName}}</p>
  <p>环境baseUrl：{{envUrl}}</p>
</template>

<style lang="less" scoped>

</style>
