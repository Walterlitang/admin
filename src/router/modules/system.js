import Layout from '@/layout'
export default {
  path: '/system',
  component: Layout,
  redirect: '/system/siteConfig',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'clipboard',
    roles: ['admin']
  },
  children: [
    {
      path: 'sysLogs',
      name: 'SysLogs',
      component: () => import('@/views/system/sysLogs'),
      meta: {title: '操作日志',icon: '',}
    },
    {
      path: 'website',
      component: () => import('@/views/system/website'),
      name: 'Website',
      meta: { title: '网站配置', icon: '' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role'),
      name: 'Role',
      meta: { title: '角色管理', icon: '' }
    },
    {
      path: 'admin',
      component: () => import('@/views/system/admin'),
      name: 'Admin',
      meta: { title: '管理员管理', icon: '' }
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu'),
      name: 'Menu',
      meta: { title: '菜单管理', icon: '' }
    }
  ]
}
