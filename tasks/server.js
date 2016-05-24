'use strict';

var connect = require('gulp-connect');

module.exports = function(config) {
  return function() {
    connect.server({
      root: config.root,
      port: 4242,
      livereload: true
    });
  };
};
