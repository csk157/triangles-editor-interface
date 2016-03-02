var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/components/run.js'],
  output: {
    filename: 'build/bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/index.html', to: 'build/index.html' }])
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  }
};
