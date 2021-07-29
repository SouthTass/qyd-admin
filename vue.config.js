const path = require('path');
module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: function(config) {
    config.resolve.alias.set('@', path.resolve('src'));
  },
  devServer: {
    open: true,
    proxy: {
      '/api/': {
        target: 'http://47.93.185.110:7008',
        changeOrigin: true,
      }
    } 
  },
}