import request from "@/utils/request";

/**
 * @description 列表
 * @param params
 * @returns {*}
 */
export function list(params){
    return request({
        url:'/sysLogs/page',
        method:'GET',
        params
    })
}
