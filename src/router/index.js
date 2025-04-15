import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import system from "@/router/modules/system";
import demo from "@/router/modules/demo";
import user from "@/router/modules/user";
import complaints from "@/router/modules/complaints";
import units from "@/router/modules/units";
import content from "@/router/modules/content";
import carouselImage from "@/router/modules/carouselImage";
import chiefMailbox from "@/router/modules/chiefMailbox";
import disciplineInspection from "@/router/modules/disciplineInspection";
import strongMilitaryVideo from "@/router/modules/strongMilitaryVideo";
import friendshipLink from "@/router/modules/friendshipLink";
import comprehensiveMailbox from "@/router/modules/comprehensiveMailbox";
import maintainRouter from "@/router/modules/maintain";
import person from "@/router/modules/person";

export const constantRoutes = [
    demo,
    system,
    user,
    complaints,
    units,
    content,
    carouselImage,
    chiefMailbox,
    disciplineInspection,
    strongMilitaryVideo,
    friendshipLink,
    comprehensiveMailbox,
    maintainRouter,
    person,
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/views/login/register'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: {title: '主页', icon: 'dashboard', affix: true}
            },
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
]

export const asyncRoutes = []

const createRouter = () => new Router({
    // mode: 'history', // require service support
    //mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
