const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  experimental: { optimizeFonts: true },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV === 'development',
        __PROD__: process.env.NODE_ENV === 'production',
      })
    );

    return config;
  },
};
