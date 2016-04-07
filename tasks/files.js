var path = require('path');
var del = require('delete');
var gulp = require('gulp');
var copy = require('copy');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime, filePath;

var assets = [
  './src/assets/*.png',
  './src/assets/*.jpg',
  './src/assets/*.svg'
]

gulp.task('files:copy', function(){
  copy('./src/layouts/*.liquid', './dist/layout', log.end)
  copy('./src/templates/**/*.liquid', './dist/templates', log.end)
  copy('./src/snippets/**/*.liquid', './dist/snippets', log.end)
  copy(assets, './dist/assets', log.end)
});

gulp.task('files:watch', ['files:copy'], function(){
  watch('./src/layout/*.liquid', function(vinyl){
    log.filepath = 'layouts/'+path.basename(vinyl.path);
    log.start();
    copy('./src/layouts/*.liquid', './dist/layout', log.end)
  });
  watch('./src/templates/**/*.liquid', function(){
    copy('./src/templates/**/*.liquid', './dist/templates', log.end)
  });
  watch('./src/snippets/**/*.liquid', function(){
    copy('./src/snippets/**/*.liquid', './dist/snippets', log.end)
  });
  watch(assets, function(vinyl){
    if (vinyl.event === 'unlink'){
      del('../dist/assets/'+path.basename(vinyl.path), log.end);
    } else {
      copy(assets, './dist/assets', log.end)
    }
  });
});

// function log(err, file){
//   var taskTime = process.hrtime(startTime);
//   var prettyTime = prettyHrtime(taskTime);

//   if (err) {
//     gutil.log('Error: ', gutil.colors.red(err));
//   }

//   gutil.log('Copied', gutil.colors.green('files'), 'in', gutil.colors.magenta(prettyTime));
// }

var log = {
  filepath: '',
  start: function(filepath) {
    startTime = process.hrtime();
    gutil.log('Copying', gutil.colors.green(this.filepath));
  },
  end: function(filepath) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Copied', gutil.colors.green(log.filepath), 'in', gutil.colors.magenta(prettyTime));
  }
};
