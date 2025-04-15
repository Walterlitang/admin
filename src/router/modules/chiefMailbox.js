import Layout from '@/layout'
export default {
    path: '/chief-mailbox',
    component: Layout,
    redirect: '/chief-mailbox/index',
    name: 'Chief-mailbox',
    meta: {
        title: '首长信箱管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'ChiefMailboxIndex',
            component: () => import('@/views/chief-mailbox/index'),
            meta: {
                title: '首长信箱管理',
                icon: 'clipboard',
            }
        },
    ]
}
