import request from "@/utils/request";

/**
 * @description 获取图形验证码
 * @returns {*}
 */
export function captcha(){
    return request({
        url:'/adminUser/captcha',
        method:'GET',
    })
}

/**
 * @description 注册
 * @param data
 * @returns {*}
 */
export function register(data){
    return request({
        url:'/adminUser/register',
        method:'POST',
        data
    })
}

/**
 * @description 获取单位列表
 * @returns {*}
 */
export function getUnitList(){
    return request({
        url:'/adminUser/getUnitList',
        method:'GET'
    })
}



