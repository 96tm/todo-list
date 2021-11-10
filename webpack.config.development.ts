import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.config.common';

const config: webpack.Configuration = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
});

export default config;
