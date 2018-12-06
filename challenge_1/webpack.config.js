const path = require('path');

module.exports = {
  entry: './client/App.jsx',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
};
