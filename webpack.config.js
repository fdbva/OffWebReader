module.exports = {
  entry: './dist/scripts/app.js',
  output: {
    filename: './dist/scripts/main.min.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
