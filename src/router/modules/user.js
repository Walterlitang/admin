import Layout from '@/layout'
export default {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: {
        title: '用户管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'UserIndex',
            component: () => import('@/views/user/index'),
            meta: {
                title: '用户列表',
                icon: 'clipboard',
            }
        }
    ]
}
