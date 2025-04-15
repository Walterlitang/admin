import Layout from '@/layout'
export default {
    path: '/strong-military-video',
    component: Layout,
    redirect: '/strong-military-video/index',
    name: 'Strong-military-video',
    meta: {
        title: '强军视频管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'Strong-military-videoIndex',
            component: () => import('@/views/strong-military-video/index'),
            meta: {
                title: '强军视频管理',
                icon: 'clipboard',
            }
        }
    ]
}
