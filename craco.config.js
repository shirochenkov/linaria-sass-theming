const { loaderByName, getLoader } = require("@craco/craco");
const transformBabelLoader = require("./transformBabelLoader");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const lm = getLoader(webpackConfig, loaderByName("babel-loader"));
      const loader = lm.match.loader;
      webpackConfig.module.rules[1].oneOf[1] = transformBabelLoader(loader);
      return webpackConfig;
    },
  },
};
