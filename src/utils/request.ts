import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/'
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response
    }
    return Promise.reject()
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export type Result<T = unknown> = Promise<AxiosResponse<result<T>>> | any

export interface result<T = unknown> {
  message: string
  code: number
  data: T
  [key: string]: any // 任意额外数学
}

export default service