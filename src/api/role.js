import request from "@/utils/request";

/**
 * @description 列表
 * @param params
 * @returns {*}
 */
export function list(params){
    return request({
        url:'/adminRole/getRoleList',
        method:'GET',
        params
    })
}
/**
 * @description 角色选择
 * @param params
 * @returns {*}
 */
export function getRoleByStatus(params){
    return request({
        url:'/adminRole/getRoleByStatus',
        method:'GET',
        params
    })
}
/**
 * @description 新增/编辑
 * @param data
 * @returns {*}
 */
export function save(data){
    return request({
        url:'/adminRole/addAndUpdateRole',
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
        url:'/adminRole/delRole',
        method:'GET',
        params:{id}
    })
}

/**
 * @description 详情
 * @param id
 * @returns {*}
 */
export function detail(id){
    return request({
        url:'/adminRole/getRoleById',
        method:'GET',
        params:{id}
    })
}

/**
 * @description 更新状态
 * @param id
 * @param status
 * @returns {*}
 */
export function updateStatus(id,status){
    return request({
        url:'/adminRole/updateRoleStatus',
        method:'GET',
        params:{id,status}
    })
}
