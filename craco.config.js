const path = require('path');

// craco.config.js
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    configure: (webpackConfig) => {
      // 确保 JSON 文件被正确处理
      webpackConfig.module.rules.push({
        test: /\.json$/,
        type: 'json',
        parser: {
          parse: JSON.parse
        }
      });
      return webpackConfig;
    }
  }
}
