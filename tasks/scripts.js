const __DEV__     = process.argv.indexOf('--dev') > -1;
const __MIN__     = process.argv.indexOf("--min") > -1;

const gulp        = require('gulp');
const replace     = require('gulp-replace');
const rename      = require('gulp-rename');
const notify      = require('gulp-notify');
const plumber     = require('gulp-plumber');

const glob        = require('glob');
const transform   = require('vinyl-transform');
const through     = require('through2');
const browserify  = require('browserify');
const babelify    = require('babelify');
const watchify    = require('watchify');
const minify      = require('gulp-minify');
const browserSync = require('browser-sync');

module.exports = function(config, prefix) {
  return function() {

    glob(config.inputPath, function(err, files) {
      if(err) done(err);

      files.map(function(entry) {

        compile(entry);

        function compile(inputFilename) {

          var b = browserify({
            entries: inputFilename,
            cache: {},
            basedir: process.cwd(),
            packageCache: {},
          });

          if (__DEV__) {
            b = watchify(b);
            b.on('update', function() {
              bundle(inputFilename);
            });
          }

          b.transform('babelify', {presets: ['es2015']})

          function bundle(file) {
            var stream = gulp.src(file)
              .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
              .pipe(through.obj(function(file, enc, callback) {
                b.bundle(function(err, res) {
                  if (err)
                    return callback(err);

                  file.contents = res;
                  callback(null, file);
                })
              }));


            stream.pipe(rename({
                extname: '.bundle.js',
              }))
              //pour ie8
              .pipe(replace(/\.default(?=\.|\;|\)|\,|\(|\s)/g,"['default']"))
              .pipe(replace(/\{ default: obj }/g,"{'default':obj}"))

              //fin pour ie8
              .pipe(gulp.dest(config.outputPath));

            if(__MIN__) {
              stream
                .pipe(minify())
                .pipe(gulp.dest(config.outputPath));
            }

            stream.pipe(notify(entry + ' build end'));
            return stream;
          }

          return bundle(inputFilename);
        }
      });
    });
  };
}
