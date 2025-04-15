import request from "@/utils/request";
/**
 * @description 新增/编辑
 * @param data
 * @returns {*}
 */
export function save(data){
    return request({
        url:'/video/list',
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
 * 获取配置tree
 * @returns {*}
 * @param params
 */
export function getTree(params){
    return request({
        url:'/sysCategory/getPerTree',
        method:'GET',
        params
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
        url:'/sysCategory/updateCategoryStatus',
        method:'GET',
        params:{id,status}
    })
}

/**
 * 获取单个配置
 * @param params
 * @returns {*}
 */
export function category(params){
    return request({
        url:'/getCategory',
        method:'GET',
        params
    })
}

/**
 * 获取单个配置
 * @param params
 * @returns {*}
 */
export function getCategoryById(params){
    return request({
        url:'/sysCategory/getCategoryById',
        method:'GET',
        params
    })
}

/**
 * 获取多个配置
 * @param data
 * @returns {*}
 */
export function categoryMultiple(data){
    return request({
        url:'/getCategoryMultiple',
        method:'POST',
        data
    })
}
