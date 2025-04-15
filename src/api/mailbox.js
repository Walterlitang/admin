import request from "@/utils/request";
/**
 * @description 首长列表
 * @returns {*}
 */
export function getChiefListApi() {
    return request({
        url: '/adminUser/getChiefList',
        method: 'get'
    })
}
/**
 * @description 留言说明/网站配置
 * @returns {*}
 */
export function getWebsiteDetailApi(params) {
    return request({
        url: '/websiteConfig/detail',
        method: 'get',
        params
    })
}
/**
 * @description 留言列表
 * @returns {*}
 */
export function getWebiteListApi(params) {
    return request({
        url: '/mailbox/webList',
        method: 'get',
        params
    })
}
/**
 * @description 新增留言
 * @returns {*}
 */
export function saveOrUpdateApi(data) {
    return request({
        url: '/mailbox/saveOrUpdate',
        method: 'Post',
        data
    })
}
/**
 * @description 信箱详情
 * @returns {*}
 */
export function getWebiteDetailsApi(params) {
    return request({
        url: '/sysCategory/details',
        method: 'get',
        params
    })
}
