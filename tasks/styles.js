const gulp = require("gulp")
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const connect = require("gulp-connect")

const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')


module.exports = function(config) {
  return function() {
    return gulp.src(config.inputPath)
      .pipe(plumber())
      .pipe(less())
      .pipe(autoprefixer({ browsers: [config.browserlist] }))
      .pipe(gulp.dest(config.outputPath))
      .pipe(notify('Styles task done'))
      .pipe(connect.reload());
  };
};
