const path = require('path');

module.exports = {
  entry: "./client/App.jsx",
  output: {
    path: path.join(__dirname, 'public'),
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
