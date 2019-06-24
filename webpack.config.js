const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'index.[hash].js'
      },
    devServer: {
      contentBase: "/dist",
      hot:true,
      host: "0.0.0.0",
      compress: true,
      port: 9000
    },
    plugins: [ 
      new HtmlWebpackPlugin({
        filename:'index.html',
        template : './src/index.html',
        minify:{
          removeComments:true,   //删除注释
          collapseWhitespace: true      //删除空格，压缩
        }
      })
    ]
};