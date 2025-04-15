import request from "@/utils/request";
/**
 * @description 列表导航
 * @returns {*}
 */
export function getCategoryTreeById(params) {
    return request({
        url: '/sysCategory/getCategoryTreeById',
        method: 'get',
        params
    })
}
/**
 * @description 文章详情
 * @returns {*}
 */
export function getArticleById(params) {
    return request({
        url: '/article/info',
        method: 'get',
        params
    })
}
/**
 * @description 新增评论
 * @returns {*}
 */
export function addCommentApi(data) {
    return request({
        url: '/articleComment/add',
        method: 'POST',
        data
    })
}
/**
 * @description 评论列表
 * @returns {*}
 */
export function getWebByArticleId(params) {
    return request({
        url: '/articleComment/webByArticleId',
        method: 'get',
        params
    })
}
/**
 * @description 强军视频
 * @returns {*}
 */
export function getVideoListApi(params) {
    return request({
        url: '/video/webList',
        method: 'get',
        params
    })
}

/**
 * @description 查询人员信息详情
 * @returns {*}
 */
export function getPersonInfoApi(params) {
    return request({
        url: '/person/info',
        method: 'get',
        params
    })
}
