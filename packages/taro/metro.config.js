const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const { getMetroConfig } = require('@tarojs/rn-supporter')

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  stats: {
    warnings: false // 关闭警告日志
  }
}

module.exports = (async function (){
  return mergeConfig(getDefaultConfig(__dirname), await getMetroConfig(), config)
})()