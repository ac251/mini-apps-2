const path = require('path');

module.exports = {
  entry: './client/App.jsx',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  }
};
