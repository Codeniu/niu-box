import request from '../utils/request'

export const login = data => {
  return request({
    url: '/user/login',
    method: 'POST',
    data,
  })
}

export const register = data => {
  return request({
    url: '/user/register',
    method: 'POST',
    data,
  })
}

export const userInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET',
  })
}

export const userList = () => {
  return request({
    url: '/user/list',
    method: 'GET',
  })
}

export const deleteUser = id => {
  return request({
    url: '/user/delete?id=' + id,
    method: 'GET',
  })
}
