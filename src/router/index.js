// 导入router所需的方法
import {createRouter, createWebHistory} from 'vue-router'
// 导入路由页面的配置
import home from '@/router//home.js';
import login from "@/router//login.js"
import product from "@/router/product.js";

let routes = [
    ...home,
    ...login,
    ...product,
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import("@/view/others/notFound.vue")
    }
]

// 路由参数配置
const router = createRouter({
    // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {top: 0};
    }
})

// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to, from, next) => {
    // 继续前进 next()
    // 返回 false 以取消导航
    next()
})

// // 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to, from) => {
    const _title = to.meta.title
    if (_title) {
        window.document.title = _title
    }
})

// 导出默认值
export default router

