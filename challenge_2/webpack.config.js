module.exports = {
  entry: "./client/App.jsx",
  output: {
    path: './public/bundle.js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.jsx?/, use: 'babel-loader' },
    ],
  },
}
