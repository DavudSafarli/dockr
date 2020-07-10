const fs = require('fs');
const path = require('path');

let folder = path.join('src', 'preload')
let preloadFiles = fs.readdirSync(folder).reduce((acc, filename) => {
  // first capturing group
  let key = filename.match(/(.*)\.(js|ts)$/)[1]
  acc[key] = `${folder}\\${filename}`
  return acc
}, {})

module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: preloadFiles,
      // Or, for multiple preload files:
      // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
      builderOptions: {
          // options placed here will be merged with default configuration and passed to electron-builder
      },
      chainWebpackRendererProcess: (config) => {
        const svgRule = config.module.rule('svg');
    
        svgRule.uses.clear();
    
        svgRule
          .use('babel-loader')
          .loader('babel-loader')
          .end()
          .use('vue-svg-loader')
          .loader('vue-svg-loader');
      },
    }
  },
  configureWebpack: {
      devtool: 'source-map'
  }
}