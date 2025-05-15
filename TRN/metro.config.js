/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('metro-config');
const path = require('path');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: {
        '@host-app': path.resolve(__dirname, 'apps/host-app'),
        '@auth': path.resolve(__dirname, 'apps/auth'),
        '@dashboard': path.resolve(__dirname, 'apps/dashboard'),
        '@wallet': path.resolve(__dirname, 'apps/wallet'),
        '@market-spot': path.resolve(__dirname, 'apps/market-spot'),
        '@market-derivatives': path.resolve(__dirname, 'apps/market-derivatives'),
        '@p2p': path.resolve(__dirname, 'apps/p2p'),
        '@earn': path.resolve(__dirname, 'apps/earn'),
        '@nft': path.resolve(__dirname, 'apps/nft'),
        '@news': path.resolve(__dirname, 'apps/news'),
        '@settings': path.resolve(__dirname, 'apps/settings'),
        '@kyc': path.resolve(__dirname, 'apps/kyc'),
        '@ui': path.resolve(__dirname, 'packages/ui'),
        '@theme': path.resolve(__dirname, 'packages/theme'),
        '@utils': path.resolve(__dirname, 'packages/utils'),
      },
    },
    watchFolders: [
      path.resolve(__dirname, 'apps'),
      path.resolve(__dirname, 'packages'),
    ],
  };
})();
