var gulp = require('gulp'),
    path = require('path'),
    watch = require('gulp-watch'),
    del = require('delete'),
    flatten = require('gulp-flatten'),
    logger = require('./util/log');

/**
 * DEFAULT
 * Source globs and dest paths
 *
 * TODO
 * [Assets] will need to be expanded on to
 * accommodate more file types
 */
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

/**
 * DEFAULT Copy Task
 * Copies all files from /src to /dist
 */
gulp.task('files:copy', function(){
  logger.start('all files', 'Copying'); // start log
  copy(files.layout.src, files.layout.dest, logger.end.bind(null,'layouts'))
  copy(files.templates.src, files.templates.dest, logger.end.bind(null, 'templates'))
  copy(files.snippets.src, files.snippets.dest, {flatten: true}, logger.end.bind(null, 'snippets'))
  copy(files.assets.src, files.assets.dest, logger.end.bind(null, 'assets'))
});

/**
 * DEV Copy Task
 * Watches filepaths for changes and 
 * copies changed files.
 */
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

/**
 * Watch Handler
 * Scrubs event type (change|unlink) and
 * either copies or deletes file
 *
 * @param {stream} vinyl The Vinyl stream returned from watch()
 * @param {string} type The type of file being processed
 * @param {object} opts Options to pass to copy() task (optional)
 */
function processFiles(vinyl, type, opts){
  var filename = path.basename(vinyl.path);

  opts = opts || {};

  if (vinyl.event === 'unlink'){
    logger.start(type+'/'+filename, 'Deleting'); // start log
    del(__dirname+'/../dist/'+type+'/'+filename, {force: true}, function(err){
      if (err) throw err;
      logger.end();
    });
  } else {
    logger.start(type+'/'+filename, 'Copying'); // start log
    copy(files[type].src, files[type].dest, opts, logger.end)
  }
}

/**
 * MAIN Copy Function
 * A wrapper for gulp.(src|dest)
 *
 * @param {string|array} files The default glob patterns in the files object
 * @param {string} dest The default dist path in the files object
 * @param {object} opts Options (optional)
 * @param {function} cb The logger callback function
 */
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
