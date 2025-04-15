import request from "@/utils/request";

/**
 * @description 新增/编辑友情链接分类
 * @param data
 * @returns {*}
 */
export function save(data){
    return request({
        url:'/sysCategory/saveFriendshipLink',
        method:'POST',
        data
    })
}

/**
 * @description 删除
 * @param id
 * @returns {*}
 */
export function deleteRow(id){
    return request({
        url:'/sysCategory/deleteCategory',
        method:'GET',
        params:{id}
    })
}

/**
 * 获取友情链接的分类树形列表
 * @returns {*}
 * @param params
 */
export function getTree(params){
    return request({
        url:'/sysCategory/getFriendshipLinkTree',
        method:'GET',
        params
    })
}
/**
 * @description 更新状态
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
 * 获取所有友情链接列表
 * @returns {*}
 * @param params
 */
export function list(params){
    return request({
        url:'/friendshipLink/list',
        method:'GET',
        params
    })
}
/**
 * @description 新增或编辑友情链接
 * @param data
 * @returns {*}
 */
export function saveOrUpdate(data){
    return request({
        url:'/friendshipLink/saveOrUpdate',
        method:'POST',
        data
    })
}
/**
 * @description 更新状态
 * @param id
 * @param status
 * @returns {*}
 */
export function updateFriendshipLinkStatus(id,status){
    return request({
        url:'/friendshipLink/status',
        method:'GET',
        params:{id,status}
    })
}

/**
 * 删除友情链接
 * @returns {*}
 * @param params
 */
export function deleteFriendshipLink(params){
    return request({
        url:'/friendshipLink/delete',
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

