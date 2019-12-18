// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var apiPath = '';

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'public',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8020,
    proxyTable: {
        [apiPath]: {
            target: 'http://localhost:3210/',
            changeOrigin: true,
            pathRewrite: {
                ['^'+apiPath+'/'] : '/'
            }
        }
    }
  }
};
