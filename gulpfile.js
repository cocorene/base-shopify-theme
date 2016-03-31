var gulp = require('gulp');

require('./tasks/sass');
require('./tasks/jscs');
require('./tasks/jshint');
require('./tasks/browserify');

/** Defines the "build" task for Gulp. */
gulp.task('build', ['sass', 'jscs', 'jshint', 'browserify']);

/** Defines the "dev" task for Gulp. */
gulp.task('dev', ['sass', 'watchify'], function() {
  livereload.listen();

  // Watch stylesheets
  gulp.watch(['./**/*.scss'], ['sass']);

  // Watchify handles the scripts

  // When compile tasks finish, trigger livereload
  gulp.watch(['./assets/**/*.css', './assets/**/*.js'], function(event) {
    livereload.changed(event.path);
  });
});

/** Default is "dev". */
gulp.task('default', ['dev']);
