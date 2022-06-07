import request from '@/utils/request'

/**
 *
 * @param {type} String 不传值或者值为全部时查询全部
 * @param {tags} Array
 *
 */
export const getBoxData = data => {
  return request({
    url: '/box/boxData',
    method: 'POST',
    data,
  })
}

export const getBoxDataById = id => {
  return request({
    url: '/box/find?id=' + id,
    method: 'GET',
  })
}

export const addBox = data => {
  return request({
    url: '/box/addBox',
    method: 'POST',
    data,
  })
}

export const batchCreate = data => {
  return request({
    url: '/box/batchCreate',
    method: 'POST',
    data,
  })
}

export const updateBox = data => {
  return request({
    url: '/box/update',
    method: 'POST',
    data,
  })
}

export const deleteBox = id => {
  return request({
    url: '/box/delete?id=' + id,
    method: 'GET',
  })
}
