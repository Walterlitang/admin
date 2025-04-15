import request from "@/utils/request";

/**
 * @description 列表
 * @param params
 * @returns {*}
 */
export function list(params){
    return request({
        url:'/animalRescue/getAnimalRescueList',
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
        url:'/animalRescue/delAnimalRescue',
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
        url:'/animalRescue/getAnimalRescueById',
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
        url:'/statusDemo',
        method:'GET',
        params:{id,status}
    })
}
