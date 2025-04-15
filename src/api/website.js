import request from "@/utils/request";

/**
 * @description 网站配置列表
 * @param params
 * @returns {*}
 */
export function list(params){
    return request({
        url:'/websiteConfig/list',
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
        url:'/websiteConfig/add',
        method:'POST',
        data
    })
}

/**
 * @description 详情
 * @param id
 * @returns {*}
 */
export function detail(id){
    return request({
        url:'/websiteConfig/detail',
        method:'GET',
        params:{id}
    })
}

