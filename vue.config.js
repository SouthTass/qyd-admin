module.exports = {
  baseUrl: './',
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: function(config) {
    config.resolve.alias.set('@', path.resolve('src'));
  },
}