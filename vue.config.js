module.exports = {
    pluginOptions: {
      electronBuilder: {
        preload: 'src/preload/api.js',
        // Or, for multiple preload files:
        // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
        builderOptions: {
            // options placed here will be merged with default configuration and passed to electron-builder
        }
      }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
  }