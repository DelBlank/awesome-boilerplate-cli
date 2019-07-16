/* eslint-disable no-multi-assign */
/* eslint-disable no-console */
const path = require('path')
const ip = require('dev-ip')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')

const devPort = '8080'
const devIp = ip()[0]

const publicPath = (webpackConfig.output.publicPath = `http://${devIp}:${devPort}/`)

// 添加 webpack-dev-server 热启动入口
webpackConfig.entry.app.unshift(
  `webpack-dev-server/client?http://localhost:${devPort}/`,
  'webpack/hot/dev-server'
)
const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, './build'),
  quiet: true,
  noInfo: true,
  compress: true,
  hot: true, // 启动 webpack-hot-middleware
  inline: true,
  disableHostCheck: true,
  publicPath,
  watchOptions: {
    aggregateTimeout: 300
  },

  // 允许跨域
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'x-requested-with, content-type, Authorization'
  }
})

// 编译 webpack config 中。。。
compiler.plugin('compile', () => {
  console.log('webpack building...')
})

// webpack config 编译完成
compiler.plugin('done', stats => {
  // 编译出错
  if (stats.hasErrors()) {
    console.log('webpack build error')

    return console.log(
      stats.toString({
        colors: true,
        timings: false,
        hash: false,
        version: false,
        assets: false,
        reasons: false,
        chunks: false,
        children: false,
        chunkModules: false,
        modules: false
      })
    )
  }

  const time = (stats.endTime - stats.startTime) / 1000

  console.log(`webpack build success in ${time.toFixed(2)} s`)
})

server.listen(devPort, null, () => {
  console.log(`webpack-dev-server started at localhost:${devPort}`)
})
