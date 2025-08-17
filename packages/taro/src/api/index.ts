import { request } from '../utils/request'

// 用户相关接口
export const userAPI = {
  // 获取demo
  getDemo() {
    return request.get('/getMenus/test')
  },
}

// 示例业务接口
export const businessAPI = {
  // 获取列表
  getList(params?: any) {
    return request.get('/business/list', params)
  },
}