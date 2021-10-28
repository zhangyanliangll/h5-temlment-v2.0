/**
 * vue.config 配置
 */
const { isDev, notDev, isPro } = require('./src/config/env');
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

//  自定义设置
const customImgLoaderOptions = {
  mozjpeg: {
    progressive: true,
    quality: 50
  },
  optipng: {
    enabled: true
  },
  pngquant: {
    quality: [0.5, 0.65],
    speed: 4
  },
  gifsicle: {
    interlaced: false
  }
}

module.exports = {
  publicPath: './',
  lintOnSave: true, // 关闭eslint
  // vue-loader 配置项
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  css: {
    // extract: true, //是否启用css分离
    loaderOptions: {
      // 这里的选项会传递给对应-loader
      css: {
        // dev环境下开启sourceMap方便查找元素对应文件
        sourceMap: isDev,
      },
      sass: {
        // 全局scss
        // prependData
        data: `@import "@/assets/scss/common.scss";`,
        sourceMap: isDev,
      },
      postcss: {
        sourceMap: isDev,
      },
    },
  },

  chainWebpack: (config) => {
    // 图片压缩(仅非开发环境)
    if (isPro) {
      config.module.rule('images')
        .test(/\.(gif|png|jpe?g|svg)$/i)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options(customImgLoaderOptions)
        .end()
    }

    // 代码分离
    if (notDev) {
      config
        .optimization
        .minimize(true) // js文件最小化处理
        .splitChunks({ chunks: 'all' }) // 分割代码
    }

    // 忽略的模块
    // config.externals({
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   axios: 'axios',
    //   'element-ui': 'Element'
    // })

    // 配置引用路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_com', resolve('src/components'))
      .set('_pageCom', resolve('src/views/components'))
      .set('_ut', resolve('src/utils'))
      .set('_img', resolve('src/assets/images'))

    // 移除 该插件 首屏就不会一次性加载全部路由了
    // 如果需要首屏依赖组件 可以这么写 import (/*webpackPrefetch: true */ './components')
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index');
    config.plugins.delete('prefetch-cooperative');
    // 移除 preload 插件
    config.plugins.delete('preload-index');
    config.plugins.delete('preload-cooperative');
  },

  configureWebpack: (config) => {
    if (isPro) {
      // 生产环境去掉 console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
    }

    if (notDev) {
      return {
        plugins: [
          // 代码压缩
          new UglifyJsPlugin({
            sourceMap: false,
            parallel: true //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1
          }),
          // 开启gzip可以很大程度减少包的大小
          new CompressionPlugin({
            filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
            algorithm: 'gzip', // 算法
            test: new RegExp(
              '\\.(js|css|html)$' // 压缩 js 与 css
            ),
            threshold: 10240, // 只处理比这个值大的资源。按字节计算
            minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
            deleteOriginalAssets: false
          })
        ],
        optimization: {
          splitChunks: {
            minSize: 30,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 5,
            automaticNameDelimiter: '~',
            name: true,
            chunks: 'all', // initial(初始块)、async(按需加载块)、all(默认，全部块)
            cacheGroups: {
              default: false,
              vendor: {
                test (module) {
                  let path = module.resource
                  if (!path) return true
                  path = path.replace(/\\/g, '/')
                  let isNeed = path &&
                    /node_modules/.test(path) &&
                    /node_modules\/(?!vant)/.test(path) &&
                    /node_modules\/(?!@vue)/.test(path)
                  return isNeed
                },
                name: 'chunk-vendors',
                priority: 10, // 优先级配置，优先匹配优先级更高的规则，不设置默认为0
                enforce: true
              },
              vant: {
                test (module) {
                  let path = module.resource
                  if (!path) return false
                  path = path.replace(/\\/g, '/')
                  return path && /node_modules\/vant/.test(path)
                },
                name: 'chunk-vant',
                priority: 9,
                enforce: true
              },
              vue: {
                test (module) {
                  let path = module.resource
                  if (!path) return false
                  path = path.replace(/\\/g, '/')
                  return path && /node_modules\/@vue|vue\./.test(path)
                },
                name: 'chunk-vue',
                priority: 9,
                enforce: true
              },
              common: {
                test (module) {
                  let path = module.resource
                  if (!path) return false
                  path = path.replace(/\\/g, '/')
                  return path && /src/.test(path)
                },
                enforce: true,
                name: 'chunk-common', // 打包后的文件名
                chunks: 'all', //
                minChunks: 2, // 重复2次才能打包到此模块
                maxInitialRequests: 5,
                minSize: 0,
                priority: 1,
                reuseExistingChunk: true
              }
            }
          }
        }
      }
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译

  devServer: {
    // open: true,//设置自动打开
    port: 1880,//设置端口
    stats: {
      // 去掉一些警告
      children: false,
    },
    proxy: {
      //设置代理
      '/api': {
        target: 'http://47.107.51.75:8081',
        changeOrigin: true,
        secure: false, //如果是http接口，需要配置该参数
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
