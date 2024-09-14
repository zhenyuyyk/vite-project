<script setup>
import {useRoute} from 'vue-router';
import {useUserInfoStore} from "@/stores/userInfoStore.js";
import {onMounted, ref} from "vue"
import {storeToRefs} from "pinia"
import {getTimes} from "@/api/product/detail.js"

const route = useRoute();
const store = useUserInfoStore()
const {userInfoName} = storeToRefs(store)
const id = route.query.id
const resData = ref([])
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]
const setUser = () => {
  let randomNum = Math.round(Math.random() * (10 - 1)) + 10
  store.setUserInfo({
    name: '张三' + randomNum,
    age: 10 + randomNum
  })
}
const getUser = () => {
  console.log(userInfoName.value)
}

const getTimesFun = async () => {
  let {data} = await getTimes()
  console.log("请求", data)
  resData.value = data
}

onMounted(() => {
  getTimesFun()
})
</script>

<template>
  <p>商品详情:商品{{ id }}</p>
  <p>获取请求接口示例：</p>
  <p>请求数据：{{resData}}</p>
  <p>简单的状态管理示例：</p>
  <a-button @click="setUser">点击设置userInfo</a-button>
  <a-button @click="getUser">点击获取userInfo</a-button>
  <p>userInfoName:{{ userInfoName }}</p>
  <a-table style="width: 500px" :dataSource="dataSource" :columns="columns" :pagination="false"/>
</template>

<style scoped>
p {
  margin-bottom: 10px;
}
</style>
