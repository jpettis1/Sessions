const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client')
  },
  optimization: {
    usedExports: true
  },
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './client'),
      publicPath: '/'
    },
    port: 8080,
    hot: true,
    proxy: {
      '/workouts': 'http://localhost:3000',
      '/login/*': 'http://localhost:3000',
      '/logout': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            [
              'babel-plugin-direct-import',
              {
                modules: ['@mui/system', '@mui/material', '@mui/icons-material']
              }
            ]
          ]
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './client/index.html'
    })
  ]
};
