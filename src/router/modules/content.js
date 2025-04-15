import Layout from '@/layout'
export default {
    path: '/content',
    component: Layout,
    redirect: '/content',
    name: 'Content',
    meta: {
        title: '内容管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'classification',
            name: 'ContentClassification',
            component: () => import('@/views/content/classification/index'),
            meta: {
                title: '分类管理',
                icon: 'clipboard',
            }
        },
        {
            path: 'index',
            name: 'ContentIndex',
            component: () => import('@/views/content/index'),
            meta: {
                title: '内容列表',
                icon: 'clipboard',
            }
        }

    ]
}
