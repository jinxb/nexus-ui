import axios from 'axios'
import { ElLoading } from 'element-plus'

import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import type { InterceptorHooks, NxData, NxRequestConfig } from './type'

class NxRequest {
  config: AxiosRequestConfig
  interceptorHooks?: InterceptorHooks
  showLoading: boolean
  loading?: ILoadingInstance
  instance: AxiosInstance

  constructor(options: NxRequestConfig) {
    this.config = options
    this.interceptorHooks = options.interceptorHooks
    this.showLoading = options.showLoading ?? true
    this.instance = axios.create(options)

    this.setupInterceptor()
  }

  setupInterceptor(): void {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use((config) => {
      if (this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      return config
    })

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  request<T = any>(config: NxRequestConfig): Promise<T> {
    if (!config.showLoading) {
      this.showLoading = false
    }
    if (config.interceptorHooks?.requestInterceptor) {
      config = config.interceptorHooks.requestInterceptor(config)
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, NxData<T>>(config)
        .then((res) => {
          if (config.interceptorHooks?.responseInterceptor) {
            res = config.interceptorHooks.responseInterceptor(res)
          }
          resolve(res.data)
          this.showLoading = true
        })
        .catch((err) => {
          reject(err)
          this.showLoading = true
        })
    })
  }

  get<T = any>(config: NxRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: NxRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: NxRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: NxRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default NxRequest
