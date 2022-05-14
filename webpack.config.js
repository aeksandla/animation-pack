const path = require('path');
const fs = require('fs');

const promisify = (func) => {
  return (...arg) => {
    return new Promise((resolve, reject) => {
      func(...arg, (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      });
    });
  };
};

const getFiles = () => {
  return promisify(fs.readdir)(path.resolve(__dirname, 'src', 'animations'))
    .then(res => res.reduce((prev, file) => {
      prev[file.split('.')[0]] = `./src/animations/${file}`;
      return prev;
    }, {}))
};

module.exports = {
  mode: 'production',
  entry: getFiles,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // если написать someName.[name] содержимое библиотеки окажется в одном объекте someName
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
