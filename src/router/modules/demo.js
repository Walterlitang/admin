import Layout from '@/layout'
export default {
    path: '/demo',
    component: Layout,
    redirect: '/demo/index',
    name: 'Demo',
    meta: {
        title: 'demo',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'DemoIndex',
            component: () => import('@/views/demo/index'),
            meta: {
                title: 'demo',
                icon: 'clipboard',
            }
        }
    ]
}
