<script setup>
import routers from "@/router/index.js"
const options = routers.options.routes
import { useRouter } from 'vue-router'
const router = useRouter()
console.log(options)
const skip = (url) => {
  router.push({
    path:url,
  })
}
</script>

<template>
<ul class="com_layout_sidebar">
  <li v-for="item in options" :key="item.path" @click="skip(item.path)">{{ item.name }}</li>
</ul>
</template>

<style lang="less" scoped>

</style>
