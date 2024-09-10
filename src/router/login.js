const Header = () => import('@/components/layout/header.vue')
// 导出 routes
const routes = [
    {
        path: '/login',
        name: "login",
        component: () => import("@/view/login/login.vue")
    }
]
export default routes
