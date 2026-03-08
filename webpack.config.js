const path = require('path');

const babelPlugins = process.env.COVERAGE === "true"
  ? [['istanbul', { esModules: true }]]
  : [];

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: __dirname,
  entry: './frontend/index.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['@babel/preset-react', { targets: "defaults" }]
            ],
            plugins: babelPlugins
          }
        }
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
};

// TO USE: generate JS coverage with:
// export COVERAGE="true" && npm install
// export COVERAGE="true" && bundle exec rspec

// export WATCH="true" && npm install
if (process.env.WATCH === "true") {
  module.exports = { ...module.exports, watch: true };
}
