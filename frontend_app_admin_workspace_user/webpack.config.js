const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

const PnpWebpackPlugin = require('pnp-webpack-plugin')

module.exports = {
  stats: process.env.VERBOSE === 'false' ? 'errors-warnings' : undefined,
  mode: isProduction ? 'production' : 'development',
  entry: isProduction
    ? './src/index.js' // only one instance of babel-polyfill is allowed
    : ['./src/index.dev.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'admin_workspace_user.app.js' : 'admin_workspace_user.app.dev.js',
    pathinfo: !isProduction,
    library: isProduction ? 'appAdminWorkspaceUser' : undefined,
    libraryTarget: isProduction ? 'var' : undefined
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    host: '0.0.0.0',
    port: 8073,
    hot: true,
    noInfo: true,
    overlay: {
      warnings: false,
      errors: true
    },
    historyApiFallback: true
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // }
  },
  devtool: isProduction ? false : 'cheap-module-source-map',
  performance: {
    hints: false
  },
  module: {
    rules: [ process.env.LINTING !== "false" ? {} : {
      test: /\.jsx?$/,
      enforce: 'pre',
      use: 'standard-loader',
      exclude: [/node_modules/, /frontend_lib/]
    }, {
      test: [/\.js$/, /\.jsx$/],
      exclude: [/node_modules/],
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-transform-object-assign'
        ]
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.styl$/,
      use: ['style-loader', 'css-loader', 'stylus-native-loader']
    }, {
      test: /\.(jpg|png|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 25000
      }
    }]
  },
  resolve: {
    plugins: [
      PnpWebpackPlugin
    ],
    alias: {
      // Make ~tracim_frontend_lib work in stylus files
      '~tracim_frontend_lib': path.dirname(path.dirname(require.resolve('tracim_frontend_lib')))
    },
    extensions: ['.js', '.jsx']
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module)
    ]
  },
  plugins: [
    ...[], // generic plugins always present
    ...(isProduction
      ? [] // production specific plugins
      : [] // development specific plugins
    )
  ]
}
