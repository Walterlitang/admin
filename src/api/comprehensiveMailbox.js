import request from "@/utils/request";

/**
 * @description 新增/编辑分类
 * @param data
 * @returns {*}
 */
export function save(data){
    return request({
        url:'/sysCategory/saveMailbox',
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
        url:'/sysCategory/getMailboxTree',
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
 * @description 删除配置
 * @param params
 * @returns {*}
 */
export function deleteCategory(params){
    return request({
        url:'/sysCategory/deleteCategory',
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
 * 获取综合信箱列表
 * @returns {*}
 * @param params
 */
export function list(params){
    return request({
        url:'/mailbox/list',
        method:'GET',
        params
    })
}
/**
 * @description 回复信件并修改状态
 * @param data
 * @returns {*}
 */
export function replyMail(data){
    return request({
        url:'/mailbox/reply',
        method:'POST',
        params:data
    })
}

/**
 * @description 删除
 * @param params
 * @returns {*}
 */
export function deleteRow(params){
    return request({
        url:'/mailbox/delete',
        method:'GET',
        params
    })
}



