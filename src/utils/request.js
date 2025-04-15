import axios from 'axios'
import store from '@/store'
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API + '/api',
    withCredentials: true,
    timeout: 120000,
})

service.interceptors.request.use(
    config => {
        // 发送请求之前做的
        const token = !store.getters.token ? getToken() : store.getters.token
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const contentType = response.headers['content-type']
        // 如果是文件流类型，直接触发文件下载
        if (contentType && contentType.includes('application/vnd.ms-excel')) {
            const disposition = response.headers['content-disposition']
            const match = disposition && disposition.match(/filename="(.+)"/)
            const filename = match ? match[1] : Date.now() + '.xlsx' // 使用后端返回的文件名，如果没有则默认为 'filename.xlsx'

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename) // 使用后端返回的文件名
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(url)
            return Promise.resolve()
        }

        const res = response.data
        if (res.code === 405) {
            Message.error('无效的会话，或者登录已过期，请重新登录。')
            location.href = '/login'
        } else if (res.code === 403) {
            Message.error('没有权限访问。')
        }
        if (res.code !== 200 && res.code !== 405) {
            Message({
                message: res.message || '错误',
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
