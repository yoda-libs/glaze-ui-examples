const { setupWebpackReact } = require('glaze-ui-webpack-utils');
const projectName = require('./package.json').name;

module.exports = setupWebpackReact(projectName, (config, isDev) => {
  return {
    ...config,

    // add custom webpack config here
    
    
    // add to extenals libraries specified in bootstrap sharedLibs
    // refer to https://www.npmjs.com/package/glaze-ui#bootstrap
    externals: [ 'react', 'react-dom' ],

    // example on how to disable hot reloading
    // devServer: {
    //   ...config.devServer,
    //   hot: false
    // },

    devServer: {
      ...config.devServer,
      port: 8084,
    }
  }
});
