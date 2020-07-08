module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload/api.ts',
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