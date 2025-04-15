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
 * @description 登录
 * @param data
 * @returns {*}
 */
export function login(data){
    return request({
        url:'/adminUser/login',
        method:'POST',
        data
    })
}

/**
 * @description 退出登录
 * @returns {*}
 */
export function logout(){
    return request({
        url:'/logout',
        method:'GET',
    })
}

/**
 * @description 获取管理员信息
 * @returns {*}
 */
export function getAdminUser(){
    return request({
        url:'/adminRole/getAdminRole',
        method:'GET',
    })
}

/**
 * 获取菜单列表
 * @returns {*}
 */
export function getMenuList(params){
    return request({
        url:'/adminPermission/getMenuList',
        method:'GET',
        params
    })
}
