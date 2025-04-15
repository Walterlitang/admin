import request from "@/utils/request";

/**
 * @description 新增/编辑
 * @param data
 * @returns {*}
 */
export function upload(data){
    return request({
        url:'/upload',
        method:'POST',
        data
    })
}

