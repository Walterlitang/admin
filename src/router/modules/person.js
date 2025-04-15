import Layout from '@/layout'
export default {
    path: '/person',
    component: Layout,
    redirect: '/person/index',
    name: 'Person',
    meta: {
        title: '心理咨询师管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'Person',
            component: () => import('@/views/person/index'),
            meta: {
                title: '心理咨询师管理',
                icon: 'clipboard',
            }
        }
    ]
}
