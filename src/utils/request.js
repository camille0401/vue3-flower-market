import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { showFullScreenLoading, tryHideFullScreenLoading } from './axiosLoading'

const baseURL =
  import.meta.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_APP_PROXY_TARGET
    : import.meta.env.VITE_APP_PROXY_TARGET + import.meta.env.VITE_APP_BASE_API

// 创建axios实例
const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
  showLoading: true,
})

// axios请求拦截器
request.interceptors.request.use(
  (config) => {
    // 1. 从pinia获取token数据
    const userStore = useUserStore()
    // 2. 按照后端的要求拼接token数据
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.showLoading && showFullScreenLoading()
    return config
  },
  (e) => Promise.reject(e),
)

// axios响应式拦截器
request.interceptors.response.use(
  (res) => {
    //关闭全局loading
    res.config.showLoading && tryHideFullScreenLoading()
    return Promise.resolve(res.data)
  },
  (error) => {
    console.log(error)
    if (error.config.showLoading) {
      tryHideFullScreenLoading()
    }
    // 统一错误提示
    ElMessage({
      type: 'warning',
      message: error.response.data.message,
    })
    // 401 token timeout
    const userStore = useUserStore()
    console.log(router)
    if (error.response.status === 401) {
      userStore.clearUserInfo()
      console.log('======')
      router.replace('/login')
    }
    return Promise.reject(error)
  },
)

export default request
