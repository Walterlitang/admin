import request from "@/utils/request";

/**
 * @description 新增/编辑分类
 * @param data
 * @returns {*}
 */
export function save(data){
    return request({
        url:'/sysCategory/saveContentManagement',
        method:'POST',
        data
    })
}

/**
 * 获取配置tree
 * @returns {*}
 * @param params
 */
export function getTree(params){
    return request({
        url:'/sysCategory/getAdminArticleTree',
        method:'GET',
        params
    })
}

/**
 * @description 更新内容分类状态
 * @param data
 * @returns {*}
 */
export function updateStatus(data){
    return request({
        url:'/sysCategory/toggleCategoryStatus',
        method:'POST',
        params:data
    })
}
/**
 * 获取分类列表
 * @returns {*}
 * @param params
 */
export function getClassification(params){
    return request({
        url:'/sysCategory/getArticleTree',
        method:'GET',
        params
    })
}
/**
 * 获取内容列表
 * @returns {*}
 * @param params
 */
export function list(params){
    return request({
        url:'/article/adminPage',
        method:'GET',
        params
    })
}
/**
 * @description 新增/编辑分类
 * @param data
 * @returns {*}
 */
export function saveContent(data){
    return request({
        url:'/article',
        method:'POST',
        data
    })
}

/**
 * @description 删除
 * @param params
 * @returns {*}
 */
export function deleteRow(params){
    return request({
        url:'/article/delete',
        method:'GET',
        params
    })
}

/**
 * @description 详情
 * @param id
 * @returns {*}
 */
export function detail(id){
    return request({
        url:'/sysCategory/details',
        method:'GET',
        params:{id}
    })
}

/**
 * 根据文章ID获取评论
 * @returns {*}
 * @param params
 */
export function byArticleId(params){
    return request({
        url:'/articleComment/byArticleId',
        method:'GET',
        params
    })
}
/**
 * @description 修改文章评论状态
 * @param data
 * @returns {*}
 */
export function updateCommentStatus(data){
    return request({
        url:'/articleComment/status',
        method:'GET',
        params:data
    })
}
/**
 * @description 删除评论
 * @param params
 * @returns {*}
 */
export function deleteComment(params){
    return request({
        url:'/articleComment/delete',
        method:'GET',
        params
    })
}
/**
 * @description 审核文章
 * @param params
 * @returns {*}
 */
export function examine(params){
    return request({
        url:'/article/audit',
        method:'GET',
        params
    })
}
/**
 * @description 审核文章
 * @param params
 * @returns {*}
 */
export function updateArticleStatus(params){
    return request({
        url:'/article/status',
        method:'GET',
        params
    })
}
