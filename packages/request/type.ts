import type { AxiosRequestConfig } from 'axios'

export interface InterceptorHooks {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (response: any) => any
  responseInterceptorCatch?: (error: any) => any
}

export interface NxRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  interceptorHooks?: InterceptorHooks
}

export interface NxData<T> {
  data: T
  returnCode: string
  success: boolean
}
