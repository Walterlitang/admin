import request from "@/utils/request";

/**
 * @description 获取轮播图列表
 * @param params
 * @returns {Promise}
 */
export function list(params) {
  return request({
    url: '/person/list',
    method: 'GET',
    params
  })
}
/**
 * @description 删除通知公告
 * @param params
 * @returns {Promise}
 */
export function deleteRow(params) {
  return request({
    url: '/person/delete',
    method: 'GET',
    params
  })
}

/**
 * @description 更新状态
 * @param params
 * @returns {Promise}
 */
export function status(params) {
  return request({
    url: '/person/status',
    method: 'GET',
    params
  })
}

/**
 * @description 新增/编辑
 * @param data
 * @returns {Promise}
 */
export function saveRow(data) {
  return request({
    url: '/person/saveOrUpdate',
    method: 'POST',
    data
  })
}

/**
 * @description 查询人员类型列表
 * @returns {*}
 */
export function personTypeList() {
  return request({
    url: '/person/personTypeList',
    method: 'GET'
  })
}
