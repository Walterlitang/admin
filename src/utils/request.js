import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { setToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API+'/api',
    withCredentials: true,
    timeout: 120000,
})
service.interceptors.request.use(
    // config：请求报文信息
    config => {
        // 发送请求之前做的
        // 如果有token,就在请求头中添加token
        let info = process.env.VUE_APP_BASE_ENV
        let token=''
        if(info === 'development'){
            token = '689aa89d-c552-4d6e-bcd1-46b07e80be3a'
            setToken(token)
        }else{
            token = localStorage.getItem('jwtToken')
            if(token){
                setToken(token)
            }
        }
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 401) {
            Message.error('无效的会话，或者登录已过期，请重新登录。')
            // location.href = '/login'
            window.open(process.env.VUE_APP_BASE_API+'/admin/#/login')
        } else if (res.code === 403) {
            Message.error('没有权限访问。')
        }
        if (res.code !== 200 && res.code !== 405) {
            Message({
                message: res.msg || '错误',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject()
        } else {
            return res.data
        }
    },
    error => {
        Message({
            message: '请求失败',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service
