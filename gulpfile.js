var gulp = require('gulp');

require('./tasks/sass');
require('./tasks/browserify');

gulp.task('default', ['sass', 'js'], function() {
  // Watch stylesheets
  gulp.watch(['./**/*.scss'], ['sass']);

  // Watchify handles the JS 
});
