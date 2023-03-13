const path = require('path');
const nodeExternals = require('webpack-node-externals');
const PORT = process.env.PORT || 5001;
const WebpackShellPluginNext = require('webpack-shell-plugin-next');


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