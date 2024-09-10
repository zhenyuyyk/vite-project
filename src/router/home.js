const Header = () => import('@/components/layout/header.vue')
const Sidebar = () => import('@/components/layout/sidebar.vue')

// 导出 routes
const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: '/home',
        name: "home",
        components: {
            header: Header,
            sidebar:Sidebar,
            default: () => import("@/view/home/index.vue")
        }
    }
]
export default routes
