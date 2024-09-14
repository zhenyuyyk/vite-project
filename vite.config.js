import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import {
    createStyleImportPlugin,
    AndDesignVueResolve,
    VantResolve,
    ElementPlusResolve,
    NutuiResolve,
    AntdResolve,
} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [AntDesignVueResolver({importStyle: false, resolveIcons: true})]
        }),
        createStyleImportPlugin({
            resolves: [
                AndDesignVueResolve(),
                VantResolve(),
                ElementPlusResolve(),
                NutuiResolve(),
                AntdResolve()
            ],
            // libs: [
            //     // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
            //     {
            //         libraryName: 'ant-design-vue',
            //         esModule: true,
            //         resolveStyle: (name) => {
            //             return `ant-design-vue/es/${name}/style/index`
            //         },
            //     },
            // ],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // 设置@指向项目src目录
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
            scss: {},
            style: {}
        },
    },
    server: {
        open: false, // 是否自动在浏览器打开
        port: 8899, // 端口号
        host: "0.0.0.0",
        //这里的ip和端口是前端项目的;下面为需要跨域访问后端项目
        proxy: {
            '/api': {
                target: 'http://10.191.116.163:8000',//这里填入你要请求的接口的前缀
                ws: false,//代理websocked
                changeOrigin: true,  //是否跨域
                secure: true,  //是否https接口
            }
        }
    }
})
