'use strict';
const fs = require('fs')
const path = require("path")

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const connect = require('gulp-connect')

const jade = require('gulp-jade')


const notifyMessage = {
  title: 'TASK ERROR',
  message: 'Template jade build FAIL',
  wait: false,
  time: 3000,
};

module.exports = function(config) {
  return function() {
    let templateData = JSON.parse(fs.readFileSync(config.dataPath, 'utf-8'))
    return gulp.src(config.inputPath)
      .pipe(plumber({
        errorHandler(err) {
          console.log(err);
          notifier.notify(notifyMessage);
          this.emit('end');
        }
      }))
      .pipe(jade({
        basedir : path.resolve(__dirname, "src"), data:templateData
      }))
      .pipe(gulp.dest(config.outputPath))
      .pipe(notify('Template task done'))
      .pipe(connect.reload());
  }
}
