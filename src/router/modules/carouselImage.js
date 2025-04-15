import Layout from '@/layout'
export default {
    path: '/carousel-image',
    component: Layout,
    redirect: '/carousel-image/index',
    name: 'Carousel-image',
    meta: {
        title: '轮播图管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'Carousel-imageIndex',
            component: () => import('@/views/carousel-image/index'),
            meta: {
                title: '轮播图管理',
                icon: 'clipboard',
            }
        }
    ]
}
