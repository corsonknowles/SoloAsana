const path = require('path');

let webpack = require("webpack");

let plugins = []; // if using any plugins for both dev and production
let devPlugins = []; // if using any plugins for development

let prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
];

plugins = plugins.concat(
  process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
)

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './frontend/index.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['@babel/preset-react', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  watch: true,
};
