const path = require('path');

const config = {
  styles: {
    inputPath: 'src/stylesheets/index.less',
    outputPath: path.join(__dirname, '../dist/assets/stylesheets'),
    watchPath: './src/**/*.less',
    excludeFile: '',
    browserlist: '',
  },
  scripts: {
    inputPath : "./src/scripts/*.js",
    outputPath : path.join(__dirname,"../dist/assets/scripts"),
    watchPath: 'src/scripts/**/*.js',
    distPath: ["./dist/assets/scripts/*.bundle.js"],
    distOutputPath: "./dist/assets/scripts",
  },
  markup: {
    inputPath: 'src/templates/*.jade',
    outputPath: path.join(__dirname, '../dist'),
    inputDataPath : path.join(__dirname, '../src/data/index.json'),
    watchPath: ['src/**/*.jade', 'src/data/index.json'],
  },
  server: {
    root: path.join(__dirname, '../dist'),
  },
};

module.exports = config;
