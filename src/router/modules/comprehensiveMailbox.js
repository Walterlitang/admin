import Layout from '@/layout'
export default {
    path: '/comprehensive-mailbox',
    component: Layout,
    redirect: '/comprehensive-mailbox/index',
    name: 'ComprehensiveMailbox',
    meta: {
        title: '综合信箱',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'classification',
            name: 'MailboxClassification',
            component: () => import('@/views/comprehensive-mailbox/classification/index'),
            meta: {
                title: '分类管理',
                icon: 'clipboard',
            }
        },
        {
            path: 'index',
            name: 'MailboxIndex',
            component: () => import('@/views/comprehensive-mailbox/index'),
            meta: {
                title: '信箱列表',
                icon: 'clipboard',
            }
        }

    ]
}
