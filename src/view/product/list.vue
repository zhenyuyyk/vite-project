<script setup>
import {productTypeList} from "@/utils/enum/product.js"
import {Form, message} from 'ant-design-vue';
import {useRouter} from 'vue-router';
import {useListForm} from "./hook/useListForm.jsx"
import {ref} from "vue";

const router = useRouter();
const {
  formBind,
  formState,
  validateInfos,
  rules,
  columns,
} = useListForm()
// 造100条数据
const list = []
for (let i = 0; i < 100; i++) {
  list.push({
    id: i,
    name: '商品' + (i + 1)
  })
}
const goDetail = (item) => {
  console.log('点击了商品')
  router.push({
    path: '/product/detail',
    query: {
      id: item.id
    }
  });
}
console.log("枚举", productTypeList)

</script>

<template>
  <p>商品列表</p>
  <p>枚举示例：{{ productTypeList._arr }}</p>
  <a-button type="primary" @click="message.info('点击了按钮')">点击消息提示</a-button>
  <zForm
        v-bind="formBind"
        v-model:formState="formState"
        :validateInfos="validateInfos"
        :rules="rules"
        :columns="columns"
    ></zForm>
  <ul>
    <li v-for="item in list" :key="item.id" @click="goDetail(item)">{{ item.name }}</li>
  </ul>
</template>

<style scoped>

</style>
