import Layout from '@/layout'
export default {
    path: '/complaints',
    component: Layout,
    redirect: '/complaints/index',
    name: 'Complaints',
    meta: {
        title: '投诉建议管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'ComplaintsIndex',
            component: () => import('@/views/complaints/index'),
            meta: {
                title: '投诉建议管理列表',
                icon: 'clipboard',
            }
        }
    ]
}
