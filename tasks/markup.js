'use strict';
const fs = require('fs')
const path = require("path")

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const connect = require('gulp-connect')

const jade = require('gulp-jade')

module.exports = function(config) {
  return function() {
    const templateData = JSON.parse(fs.readFileSync(config.inputDataPath, 'utf-8'))
    return gulp.src(config.inputPath)
      .pipe(plumber())
      .pipe(jade({
        basedir : path.resolve(__dirname, "src"), data:templateData
      }))
      .pipe(gulp.dest(config.outputPath))
      .pipe(notify('Markup task done'))
      .pipe(connect.reload());
  }
}
