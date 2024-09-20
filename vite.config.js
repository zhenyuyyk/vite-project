import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
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

import viteCompression from 'vite-plugin-compression'
// 引入图片压缩
import viteImagemin from 'vite-plugin-imagemin'
import {visualizer} from 'rollup-plugin-visualizer'; //打包体积分析

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        visualizer({open: true}),
        Components({
            dirs: ['src/components'], // 目标文件夹
            extensions: ['vue', 'jsx'], // 文件类型
            dts: 'src/components.d.ts', // 输出文件，里面都是一些import的组件键值对
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
        // gzip静态资源压缩
        viteCompression({
            verbose: true,
            disable: false, // 开启压缩
            threshold: 5120, // 压缩前最小文件大小
            algorithm: 'gzip', // 压缩算法
            ext: '.gz', //文件类型
        }),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false
            },
            optipng: {
                optimizationLevel: 7
            },
            mozjpeg: {
                quality: 20
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox'
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false
                    }
                ]
            }
        })
    ],
    resolve: {
        // 配置省略后缀
        extensions: ['.js', '.vue', '.jsx', '.ts', '.tsx', '.json'],
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
                secure: false,  //是否https接口
            }
        }
    },
    build: {
        chunkSizeWarningLimit: 1500,//提高静态资源的容量大小
        rollupOptions: {
            output: {
                // 静态资源打包做处理
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                // 插件打包做处理
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            }
        }
    }
})
