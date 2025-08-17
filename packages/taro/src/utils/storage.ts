import Taro from '@tarojs/taro'

// 存储工具类，兼容不同环境
export const storage = {
  // 设置存储
  set(key: string, value: any) {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value)
      
      if (Taro.setStorageSync) {
        Taro.setStorageSync(key, data)
      } else if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, data)
      }
    } catch (error) {
      console.warn(`存储 ${key} 失败:`, error)
    }
  },

  // 获取存储
  get(key: string) {
    try {
      let data = ''
      
      if (Taro.getStorageSync) {
        data = Taro.getStorageSync(key)
      } else if (typeof window !== 'undefined' && window.localStorage) {
        data = window.localStorage.getItem(key) || ''
      }
      
      // 尝试解析 JSON
      try {
        return JSON.parse(data)
      } catch {
        return data
      }
    } catch (error) {
      console.warn(`获取 ${key} 失败:`, error)
      return ''
    }
  },

  // 删除存储
  remove(key: string) {
    try {
      if (Taro.removeStorageSync) {
        Taro.removeStorageSync(key)
      } else if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`删除 ${key} 失败:`, error)
    }
  },

  // 清空所有存储
  clear() {
    try {
      if (Taro.clearStorageSync) {
        Taro.clearStorageSync()
      } else if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear()
      }
    } catch (error) {
      console.warn('清空存储失败:', error)
    }
  }
}