var gulp = require('gulp');
var concat = require('gulp-concat');
var processLog = require('./util/log');

/**
 * DEFAULT Task
 */
gulp.task('sass', function() {
  // Run immediately
  concatenate();

  // Watch for future changes
  gulp.watch(['./src/assets/scss/**/*.scss'], concatenate)
});

function concatenate(){
  processLog.start('SCSS', 'Concatenating');

  /**
   * Source the files you need in the
   * order they need to be in, example:
   *
   *  gulp.src([
   *    './src/assets/scss/base/variables.scss',
   *    './src/assets/scss/components/counter.scss',
   *    './src/assets/scss/modules/slideshow.scss'
   *  ])
   *
   * etc
   */
  gulp.src([
    './src/assets/scss/components/counter.scss',
    './src/assets/scss/modules/slideshow.scss'
  ])
    .pipe(concat('style.scss.liquid', {newLine: '\n'}))
    .pipe(gulp.dest('./dist/assets/'));

  processLog.end();
}
