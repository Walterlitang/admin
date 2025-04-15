import Layout from '@/layout'
export default {
    path: '/units',
    component: Layout,
    redirect: '/units/index',
    name: 'Units',
    meta: {
        title: '单位管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'UnitsIndex',
            component: () => import('@/views/units/index'),
            meta: {
                title: '单位管理',
                icon: 'clipboard',
            }
        }
    ]
}
