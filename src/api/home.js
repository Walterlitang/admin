import request from "@/utils/request";
/**
 * @description 焦点关注和时政资讯
 * @returns {*}
 */
export function getFocusListApi(params) {
    return request({
        url: '/article/FocusAndCurrentPolitics',
        method: 'get',
        params
    })
}
/**
 * @description 时政资讯轮播图
 * @returns {*}
 */
export function getHeadlineListApi() {
    return request({
        url: '/article/currentPoliticsHeadline',
        method: 'get'
    })
}
/**
 * @description 强军资讯、祁连讲习所、祁连论剑阁、工作指导、强军服务
 * @returns {*}
 */
export function getStrongMilitaryApi(params) {
    return request({
        url: '/article/StrongMilitaryInformation',
        method: 'get',
        params
    })
}
/**
 * @description 祁连新动态菜单
 * @returns {*}
 */
export function getNewDevelopmentsApi() {
    return request({
        url: '/article/NewDevelopments',
        method: 'get'
    })
}
/**
 * @description 祁连新动态列表
 * @returns {*}
 */
export function getArticleListApi(params) {
    return request({
        url: '/article/page',
        method: 'get',
        params
    })
}
/**
 * @description 稿件统计
 * @returns {*}
 */
export function getCountsApi(params) {
    return request({
        url: '/article/categoryCounts',
        method: 'get',
        params
    })
}
/**
 * @description 祁连艺苑
 * @returns {*}
 */
export function getWebArtListApi(params) {
    return request({
        url: '/friendshipLink/webArtList',
        method: 'get',
        params
    })
}
/**
 * @description 信箱列表
 * @returns {*}
 */
export function getMailboxTreeApi(params) {
    return request({
        url: '/sysCategory/getWebMailboxTree',
        method: 'get',
        params
    })
}
/**
 * @description 查询心理咨询师
 * @returns {*}
 */
export function getPersonApi(params) {
    return request({
        url: '/person/webPage',
        method: 'get',
        params
    })
}
/**
 * @description 获取网站配置列表(背景色及其背景图)
 * @returns {*}
 */
export function getWebsiteConfigApi(params) {
    return request({
        url: '/websiteConfig/list',
        method: 'get',
        params
    })
}
/**
 * @description 获取文章的分类树形列表(天天读报)
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
 * @description 获取文章的分类树形列表(天天读报)
 * @returns {*}
 */
export function getDetailsIconApi(params) {
    return request({
        url: '/sysCategory/details',
        method: 'get',
        params
    })
}
