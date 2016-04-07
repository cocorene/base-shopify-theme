var path = require('path');
var del = require('delete');
var gulp = require('gulp');
var copy = require('copy');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');

var assets = [
  './src/assets/*.png',
  './src/assets/*.jpg',
  './src/assets/*.svg'
]

gulp.task('files:copy', function(){
  copy('./src/layouts/*.liquid', './dist/layout', log)
  copy('./src/templates/**/*.liquid', './dist/templates', log)
  copy('./src/snippets/**/*.liquid', './dist/snippets', log)
  copy(assets, './dist/assets', log)
});

gulp.task('files:watch', ['files:copy'], function(){
  watch('./src/layout/*.liquid', function(vinyl){
    copy('./src/layouts/*.liquid', './dist/layout', log)
  });
  watch('./src/templates/**/*.liquid', function(){
    copy('./src/templates/**/*.liquid', './dist/templates', log)
  });
  watch('./src/snippets/**/*.liquid', function(){
    copy('./src/snippets/**/*.liquid', './dist/snippets', log)
  });
  watch(assets, function(vinyl){
    if (vinyl.event === 'unlink'){
      del('../dist/assets/'+path.basename(vinyl.path), log);
    } else {
      copy(assets, './dist/assets', log)
    }
  });
});

function log(err, file){
  var taskTime = process.hrtime(startTime);
  var prettyTime = prettyHrtime(taskTime);

  if (err) {
    gutil.log('Error: ', gutil.colors.red(err));
  }

  gutil.log('Copied', gutil.colors.green('files'), 'in', gutil.colors.magenta(prettyTime));
}
