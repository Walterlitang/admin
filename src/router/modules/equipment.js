import Layout from '@/layout'
export default {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/index',
    name: 'Equipment',
    meta: {
        title: '设备管理',
        icon: 'clipboard',
    },
    children: [
        {
            path: 'index',
            name: 'EquipmentIndex',
            component: () => import('@/views/equipment/index'),
            meta: {
                title: '设备管理',
                icon: 'clipboard',
            }
        }
    ]
}
