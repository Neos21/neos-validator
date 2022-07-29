const path = require('path');

// For UMD
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './umd'),
    filename: 'index.js',
    library: 'NeosValidator',  // Global Variable Name
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: (/\.tsx?$/),
        exclude: (/node_modules/),
        use: {
          loader: 'ts-loader',  // require
          options: {
            configFile: 'tsconfig.umd.json'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
