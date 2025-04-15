import request from "@/utils/request";

/**
 * @description 获取视频列表
 * @param params
 * @returns {Promise}
 */
export function list(params) {
  return request({
    url: '/video/list',
    method: 'GET',
    params
  })
}
/**
 * @description 获取通知公告详情
 * @param params
 * @returns {Promise}
 */
export function getDetail(params) {
  return request({
    url: '/civilNotice/getNoticeInfoById',
    method: 'GET',
    params
  })
}
/**
 * @description 更新状态
 * @param data
 * @returns {Promise}
 */
export function changeStatus(data){
  return request({
    url: '/civilFundDisbursement/saveDisbursement',
    method:'POST',
    data
  })
}
/**
 * @description 删除视频
 * @param params
 * @returns {Promise}
 */
export function deleteRow(params) {
  return request({
    url: '/video/delete',
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
    url: '/video/saveOrUpdate',
    method: 'POST',
    data
  })
}


