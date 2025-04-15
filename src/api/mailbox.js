import request from "@/utils/request";

/**
 * 管理后台查询信件列表
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
 * @description 删除信件
 * @param id
 * @returns {*}
 */
export function deleteRow(id){
    return request({
        url:'/mailbox/delete',
        method:'GET',
        params:{id}
    })
}


/**
 * @description 回复信件并修改状态
 * @param data
 * @returns {*}
 */
export function updateStatus(data){
    return request({
        url:'/mailbox/reply',
        method:'POST',
        params:data
    })
}

/**
 * 查询信件详情
 * @returns {*}
 * @param params
 */
export function getInfo(params){
    return request({
        url:'/mailbox/info',
        method:'GET',
        params
    })
}
