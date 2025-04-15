import request from "@/utils/request";
/**
 * @description 导航的分类
 * @returns {*}
 */
export function getNavigationTree(params) {
    return request({
        url: '/sysCategory/getNavigationTree',
        method: 'get',
        params
    })
}
/**
 * @description 轮播图列表
 * @returns {*}
 */
export function getBannerListApi(params) {
    return request({
        url: '/banner/webPage',
        method: 'get',
        params
    })
}
/**
 * @description 查询所有友情链接
 * @returns {*}
 */
export function getwebListApi(params) {
    return request({
        url: '/friendshipLink/webList',
        method: 'get',
        params
    })
}
/**
 * @description 获取登录信息
 * @returns {*}
 */
export function getAdminInfoByToken(params) {
    return request({
        url: '/adminUser/getAdminInfoByToken',
        method: 'get',
        params
    })
}
/**
 * @description 退出登录
 * @returns {*}
 */
export function loginOnApi(params) {
    return request({
        url: '/adminUser/loginOn',
        method: 'get',
        params
    })
}
/**
 * @description 获取所有文章分类
 * @returns {*}
 */
export function getArticleTreeApi(params) {
    return request({
        url: '/sysCategory/getArticleTree',
        method: 'get',
        params
    })
}
/**
 * @description 获取导航栏图标
 * @returns {*}
 */
export function getIconApi(params) {
    return request({
        url: '/friendshipLink/webList',
        method: 'get',
        params
    })
}
