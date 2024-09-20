# Vue 3 + Vite 初始化项目模板

使用到的插件：

## vue-router
路由

## axios
请求

## pinia
状态管理

## pinia-plugin-persist
pinpa的持久化存储插件

## vueuse
常用的vuehook

## ant-design-vue
UI插件

## unplugin-vue-components

按需引入组件，不再需要手动import { Button } from 'ant-design-vue'。会自动引入

针对ant-design-vue和自定义组件

地址：https://github.com/unplugin/unplugin-vue-components

## vite-plugin-style-import

按需导入组件库样式，针对外部组件库，比如antd

举例：

```

import { Button } from 'ant-design-vue';

        ↓ ↓ ↓ ↓ ↓ ↓

import { Button } from 'ant-design-vue';
import 'ant-design-vue/lib/button/style/index.js';
```


地址：https://github.com/vbenjs/vite-plugin-style-import

## 打包优化

1. vite-plugin-compression：gzip静态资源压缩
2. vite-plugin-imagemin：图片压缩
3. rollup-plugin-visualizer：打包体积分析
