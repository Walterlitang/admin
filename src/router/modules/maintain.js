import Layout from '@/layout'
export default {
  path: '/maintain',
  component: Layout,
  redirect: '/maintain/',
  name: 'maintain',
  meta: {
    title: '维护',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/maintain/user'),
      meta: {
        title: '个人中心',
        icon: 'clipboard'
      },
      hidden: true
    },
    {
      path: 'picture',
      name: 'picture',
      component: () => import('@/views/maintain/picture'),
      meta: {
        title: '文件库',
        icon: 'clipboard'
      },
      hidden: false
    },
  ]
}
