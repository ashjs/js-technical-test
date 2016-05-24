'use strict';

const gulp        = require('gulp');
const config      = require('./config/gulp');
const runSequence = require('run-sequence').use(gulp);


gulp.task('markup', require('./tasks/markup')(config.markup));
gulp.task('scripts', require('./tasks/scripts')(config.scripts));
gulp.task('styles', require('./tasks/styles')(config.styles));
gulp.task('server', require('./tasks/server')(config.server));

gulp.task('watch', function() {
  gulp.watch(config.styles.watchPath, ['styles']);
  gulp.watch(config.markup.watchPath, ['markup']);
  gulp.watch(config.scripts.watchPath, ['scripts']);
});

gulp.task('build', function() {
  runSequence(
    'markup',
    'scripts',
    'styles'
  );
});

gulp.task('default', function() {
  runSequence(
    'markup',
    'scripts',
    'styles',
    'server',
    'watch'
  );
});
