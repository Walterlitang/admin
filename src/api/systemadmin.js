

import request from '@/utils/request'

export function adminList(params) {
  return request({
    url: '/getAdminUserList',
    method: 'GET',
    params
  })
}

export function adminDel(pram) {
  const data = {
    id: pram.id
  }
  return request({
    url: '/deleteUserById',
    method: 'GET',
    params: data
  })
}

export function adminAdd(data) {
  return request({
    url: '/saveAdminUser',
    method: 'POST',
    data
  })
}

export function adminChangePwd(data) {
  return request({
    url: '/adminUser/updatePassWord',
    method: 'POST',
    data
  })
}

/**
 * 修改状态
 * @param pram
 */
export function updateStatusApi(params) {
  return request({
    url: `/updateUserStatus`,
    method: 'get',
    params
  })
}
