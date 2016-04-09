var path = require('path');
var del = require('delete');
var gulp = require('gulp');
var watch = require('gulp-watch');
var flatten = require('gulp-flatten');
var logger = require('./util/log');

var files = {
  layout: {
    src: './src/layout/*.liquid',
    dest: './dist/layout/'
  },
  templates: {
    src: './src/templates/**/*.liquid',
    dest: './dist/templates/'
  },
  snippets: {
    src: './src/snippets/**/*.liquid',
    dest: './dist/snippets/'
  },
  assets: {
    src: [
      './src/assets/*.png',
      './src/assets/*.jpg',
      './src/assets/*.svg'
    ],
    dest: './dist/assets/'
  }
}

gulp.task('files:copy', function(){
  logger.start('all files', 'Copying');
  copy(files.layout.src, files.layout.dest, logger.end)
  copy(files.templates.src, files.templates.dest, logger.end)
  copy(files.snippets.src, files.snippets.dest, {flatten: true}, logger.end)
  copy(files.assets.src, files.assets.dest, logger.end)
});

gulp.task('files:watch', ['files:copy'], function(){
  watch(files.layout.src, function(vinyl){
    processFiles(vinyl, 'layouts')
  });
  watch(files.templates.src, function(vinyl){
    processFiles(vinyl, 'templates')
  });
  watch(files.snippets.src, function(vinyl){
    processFiles(vinyl, 'snippets', { flatten:true })
  });
  watch(files.assets.src, function(vinyl){
    processFiles(vinyl, 'assets')
  });
});

function copy(files, dest, opts, cb){
  if (typeof opts === 'function'){
    cb = opts; 
  }

  if (opts.flatten) {
    gulp.src(files)
      .pipe(flatten())
      .pipe(gulp.dest(dest));
  } else {
    gulp.src(files)
      .pipe(gulp.dest(dest));
  }

  cb();
}

function processFiles(vinyl, type, opts){
  var filename = path.basename(vinyl.path);

  opts = opts || {};

  if (vinyl.event === 'unlink'){
    logger.start(type+'/'+filename, 'Deleting');
    del(__dirname+'/../dist/'+type+'/'+filename, {force: true}, function(err){
      if (err) throw err;
      logger.end();
    });
  } 
  
  else {
    logger.start(type+'/'+filename, 'Copying');
    copy(files[type].src, files[type].dest, opts, logger.end)
  }
}
