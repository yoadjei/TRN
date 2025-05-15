const path = require('path');

module.exports = function override(config, env) {
  // Add the modules resolution for our monorepo structure
  config.resolve.alias = {
    ...config.resolve.alias,
    '@host-app': path.resolve(__dirname, 'apps/host-app'),
    '@auth': path.resolve(__dirname, 'apps/auth'),
    '@dashboard': path.resolve(__dirname, 'apps/dashboard'),
    '@wallet': path.resolve(__dirname, 'apps/wallet'),
    '@market-spot': path.resolve(__dirname, 'apps/market-spot'),
    '@news': path.resolve(__dirname, 'apps/news'),
    '@settings': path.resolve(__dirname, 'apps/settings'),
    '@ui': path.resolve(__dirname, 'packages/ui'),
    '@theme': path.resolve(__dirname, 'packages/theme'),
    '@utils': path.resolve(__dirname, 'packages/utils'),
  };

  return config;
};