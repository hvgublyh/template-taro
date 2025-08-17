import Taro, { request as TaroRequest } from '@tarojs/taro-h5'

import { storage } from './storage'

// 请求配置
const config = {
  baseURL: process.env.TARO_APP_API_URL || 'http://localhost:3000',
  timeout: 10000,
}

// 处理响应
const handleResponse = (res: any) => {
  console.log('Response:', res)
  
  // 处理HTTP状态码
  if (res.statusCode >= 200 && res.statusCode < 300) {
    // 检查业务状态码
    if (res.data && typeof res.data === 'object') {
      if (res.data.code && res.data.code !== 200 && res.data.code !== 0) {
        // 显示错误信息
        // Taro.showToast({
        //   title: res.data.message || '请求失败',
        //   icon: 'none',
        //   duration: 2000
        // })
        throw new Error(res.data.message || '请求失败')
      }
    }
    return res.data
  } else {
    // HTTP错误处理
    let errorMessage = '网络请求失败'
    switch (res.statusCode) {
      case 401:
        errorMessage = '未授权，请重新登录'
        storage.remove('accessToken')
        break
      case 403:
        errorMessage = '拒绝访问'
        break
      case 404:
        errorMessage = '请求地址不存在'
        break
      case 500:
        errorMessage = '服务器内部错误'
        break
      default:
        errorMessage = `请求失败 ${res.statusCode}`
    }
    
    // Taro.showToast({
    //   title: errorMessage,
    //   icon: 'none',
    //   duration: 2000
    // })
    
    throw new Error(errorMessage)
  }
}

// 获取请求头
const getHeaders = () => {
  const token = storage.get('accessToken')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

// 封装请求方法
export const request = {
  get(url: string, data?: any): Promise<any> {
    const params = {
      url: config.baseURL + url,
      method: 'GET' as any,
      data,
      timeout: config.timeout,
      header: getHeaders()
    }
    
    console.log('Request:', params)
    console.log(Taro)
    console.log(TaroRequest)
    return TaroRequest(params).then(handleResponse).catch(error => {
      console.error('Request failed:', error)
      throw error
    })
  },
  
  post(url: string, data?: any): Promise<any> {
    const params = {
      url: config.baseURL + url,
      method: 'POST' as any,
      data,
      timeout: config.timeout,
      header: getHeaders()
    }
    
    console.log('Request:', params)
    
    return TaroRequest(params).then(handleResponse).catch(error => {
      console.error('Request failed:', error)
      throw error
    })
  },
  
  put(url: string, data?: any): Promise<any> {
    const params = {
      url: config.baseURL + url,
      method: 'PUT' as any,
      data,
      timeout: config.timeout,
      header: getHeaders()
    }
    
    console.log('Request:', params)
    
    return TaroRequest(params).then(handleResponse).catch(error => {
      console.error('Request failed:', error)
      throw error
    })
  },
  
  delete(url: string, data?: any): Promise<any> {
    const params = {
      url: config.baseURL + url,
      method: 'DELETE' as any,
      data,
      timeout: config.timeout,
      header: getHeaders()
    }
    
    console.log('Request:', params)
    
    return TaroRequest(params).then(handleResponse).catch(error => {
      console.error('Request failed:', error)
      throw error
    })
  }
}

// 导出配置供外部使用
export { config }