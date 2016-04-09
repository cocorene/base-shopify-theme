var gulp = require('gulp');
var sass = require('gulp-sass');
var processLog = require('./util/log');

/**
 * DEV Task
 */
gulp.task('sass:dev', ['sass'], function() {
  gulp.watch(['./src/assets/scss/**/*.scss'], compile);
});

/**
 * DEFAULT Task
 */
gulp.task('sass', function() {
  var opts = {
    outputStyle: 'compressed'
  };

  compile(opts);
});

/**
 * MAIN Compile Function
 */
function compile(){
  var opts = opts || {};

  processLog.start('styles', 'Compiling')

  gulp.src('./src/assets/scss/main.scss')
    .pipe(sass(opts).on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets'));

  processLog.end('styles', 'Compiling');
}
