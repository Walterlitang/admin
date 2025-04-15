import Layout from '@/layout'
export default {
    path: '/friendship-link',
    component: Layout,
    redirect: '/friendship-link/index',
    name: 'FriendshipLink',
    meta: {
        title: '友情链接管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'classification',
            name: 'FriendshipLinkClassification',
            component: () => import('@/views/friendship-link/classification/index'),
            meta: {
                title: '分类管理',
                icon: 'clipboard',
            }
        },
        {
            path: 'index',
            name: 'FriendshipLinkIndex',
            component: () => import('@/views/friendship-link/index'),
            meta: {
                title: '友情链接列表',
                icon: 'clipboard',
            }
        }

    ]
}
