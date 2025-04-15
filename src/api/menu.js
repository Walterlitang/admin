import request from "@/utils/request";
/**
 * @description 新增/编辑
 * @param data
 * @returns {*}
 */
export function save(data){
    return request({
        url:'/adminPermission/addAndUpdatePermission',
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
        url:'/adminPermission/delPermission',
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
        url:'/adminPermission/getPermissionById',
        method:'GET',
        params:{id}
    })
}
/**
 * 获取菜单tree
 * @returns {*}
 * @param params
 */
export function getTree(params){
    return request({
        url:'/adminPermission/getMenuTree',
        method:'GET',
        params
    })
}
/**
 * @description 公用数据配置
 * @param id
 * @returns {*}
 */
export function sysCategoryList(params){
    return request({
        url:'/sysCategory/list',
        method:'GET',
        params
    })
}
