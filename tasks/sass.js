var gulp = require('gulp');
var sass = require('gulp-sass');

/** Defines the "sass" task for Gulp. */
gulp.task('sass:dev', function() {
  gulp.watch(['./src/assets/scss/**/*.scss'], compile);
});
gulp.task('sass', function() {
  var opts = {
    outputStyle: 'compressed'
  };

  compile(opts);
});

function compile(){
  var opts = opts || {};

  return gulp.src('./src/assets/scss/main.scss')
    .pipe(sass(opts).on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets'));
}
