import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import {getXtoken, setXtoken} from "@/store/user"
import {ElMessage} from "element-plus"
import useUserStore, {isLogin} from "@/store/user"

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/'
})

service.interceptors.request.use(
  (config): any => {
    const headers = {
        ...config.headers,
        'Content-Type': "application/json",
    }

    const xtoken = getXtoken()
    if (xtoken) {
        headers["X-Token"] = xtoken
    } else if (headers["X-Token"]) {
        delete headers["X-Token"]
    }

    return {
        ...config,
        headers: headers
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      if (response.data.code !== 0) {
          if (response.data.code === 1) {
              const userStore = useUserStore()
              const router = useRouter()
              const route = useRoute()

              if (isLogin()) {
                  ElMessageBox.alert('您的登录已经过期，请重新登录。', '提示', {
                      confirmButtonText: '好的',
                      callback: () => {
                          userStore.logout().then(() => {
                              ElMessage({
                                  type: 'success',
                                  message: '账号退出成功',
                              })
                              router.push({
                                  "path": "/login",
                                  "query": {
                                      "redirect": encodeURIComponent(route.fullPath),
                                  },
                              })
                          })
                      },
                  })
              } else {
                  ElMessageBox.alert('请登陆后再新建操作。', '提示', {
                      confirmButtonText: '好的',
                      callback: () => {},
                  })
              }
          }
          return Promise.reject(response)
      }

      const newToken = response.headers["X-Token"]
      if (newToken && getXtoken()) {
          setXtoken(newToken)
      }

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