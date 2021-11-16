import path from 'path';
import webpack from 'webpack';
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { merge } from 'webpack-merge';
import common from './webpack.config.common';

const config: webpack.Configuration = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
  },
  optimization: {
    minimizer: [new CSSMinimizerPlugin(), '...'],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
});

export default config;
