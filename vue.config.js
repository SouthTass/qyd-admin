const path = require('path');
module.exports = {
  baseUrl: './',
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: function(config) {
    config.resolve.alias.set('@', path.resolve('src'));
  },
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://47.93.185.110:7008',
        changeOrigin: true, // needed for virtual hosted sites
      }
    } 
  },
}