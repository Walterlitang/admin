import request from "@/utils/request";

/**
 * @description 列表
 * @param params
 * @returns {*}
 */
export function list(params){
    return request({
        url:'/adminComplaint/list',
        method:'GET',
        params
    })
}


/**
 *
 * @param data
 * @returns {*}
 */
export function reply(data){
    return request({
        url:'/animalRescue/addAndUpdateAnimalRescue',
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
        url:'/adminComplaint/deleteById',
        method:'GET',
        params:{id}
    })
}

