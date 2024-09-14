const Header = () => import('@/components/layout/header.vue')
const Sidebar = () => import('@/components/layout/sidebar.vue')

// 导出 routes
const routes = [
    {
        path: '/product/list',
        name: "productList",
        components: {
            header: Header,
            sidebar: Sidebar,
            default: () => import("@/view/product/list.vue")
        }
    },
    {
        path: '/product/detail',
        name: "productDetail",
        components: {
            header: Header,
            sidebar: Sidebar,
            default: () => import("@/view/product/detail.vue")
        }
    }
]
export default routes
