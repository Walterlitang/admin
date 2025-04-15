import Layout from '@/layout'
export default {
    path: '/discipline-inspection-mailbox',
    component: Layout,
    redirect: '/discipline-inspection-mailbox/index',
    name: 'Chief-mailbox',
    meta: {
        title: '纪委信箱管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'DisciplineInspectionMailboxIndex',
            component: () => import('@/views/discipline-inspection-mailbox/index'),
            meta: {
                title: '纪委信箱管理',
                icon: 'clipboard',
            }
        },
    ]
}
