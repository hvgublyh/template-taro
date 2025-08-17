import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import devConfig from './dev'
import prodConfig from './prod'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    plugins: ['@tarojs/plugin-http'],
    projectName: 'demo2',
    date: '2025-4-12',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 375,
      750: 1,
      828: 2.34 / 414
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    defineConstants: {
      'process.env.TARO_APP_API_URL': JSON.stringify(process.env.TARO_APP_API_URL),
      'process.env.TARO_APP_ENV': JSON.stringify(process.env.TARO_APP_ENV)
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            onePxTransform: true,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
      }
    },
    h5: {     
      publicPath: '/',
      devServer: {
        proxy: {
          '/api': {
            target: process.env.TARO_APP_API_URL,
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
          }
        },
        client: {
          overlay: false, // 关闭警告弹框
        },
      },
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      esnextModules: ['@tarojs/runtime', '@tarojs/shared', '@tarojs/taro'],
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true

          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        },
        pxtransform: {
          enable: true,
          config: {
            onePxTransform: true,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            baseFontSize: 20,
            maxRootSize: 40,
            minRootSize: 20
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        // 关闭警告弹框
        chain.stats({
          warnings: false // 关闭警告日志
        });
      }
    },
    // 微信小程序配置
    weapp: {
      outputRoot: 'wechat',
    },
    rn: {
      appName: 'demo2',
      entry: 'app',
      output: {
        ios: './ios/main.jsbundle',
        iosAssetsDest: './ios',
        android: './android/app/src/main/assets/index.android.bundle',
        androidAssetsDest: './android/app/src/main/res',
        // iosSourceMapUrl: '',
        iosSourcemapOutput: './ios/main.map',
        // iosSourcemapSourcesRoot: '',
        // androidSourceMapUrl: '',
        androidSourcemapOutput: './android/app/src/main/assets/index.android.map',
        // androidSourcemapSourcesRoot: '',
      },
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
