import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '../router'

const service = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// axios 请求拦截器处理请求数据
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.common['Authorization'] = 'Bearer ' + token
  return config
})

// axios 响应拦截器处理响应数据
service.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    console.log(err)
    if (err.response.status === 401) {
      message.error(err.response.data.msg || '请重新登录')
      setTimeout(() => {
        router.push('./login')
      }, 1500)
    }
    return Promise.reject(err)
  }
)

export default service
