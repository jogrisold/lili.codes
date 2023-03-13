const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

// import path from 'path';
// import nodeExternals from 'webpack-node-externals';
// import WebpackShellPluginNext from 'webpack-shell-plugin-next';

const PORT = process.env.PORT || 5000;


module.exports = {
  mode: 'development',
  target: 'node',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  externals: [nodeExternals()],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: PORT,
    // other devServer configurations...
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['echo "Pluginsplug"', 'echo Plugins 2']
      }
    })
  ]
};