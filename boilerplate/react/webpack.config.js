const path = require('path')
const os = require('os')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const srcPath = path.join(__dirname, './src')
const buildPath = path.join(__dirname, './build')

module.exports = {
  context: __dirname,
  entry: {
    app: ['./demo/index.jsx']
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    pathinfo: false,
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      common: path.join(srcPath, 'common'),
      components: path.join(srcPath, 'components'),
      utils: path.join(srcPath, 'utils')
    }
  },
  resolveLoader: {
    modules: [path.join(__dirname, '/node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
        options: {
          id: 'js'
        }
      },
      {
        test: /\.tpl$/,
        loader: 'dot-tpl-loader'
      },
      {
        oneOf: [
          {
            test: /\.html$/,
            resourceQuery: /\?.*/,
            use: ['extract-loader', 'html-loader']
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          }
        ]
      },
      {
        oneOf: [
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            resourceQuery: /\?.*/,
            loader: 'url-loader'
          },
          {
            test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunks: 'all'
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory=true'],
      verbose: false,
      verboseWhenProfiling: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'demo/index.html',
      chunksSortMode: 'none'
    })
  ]
}
