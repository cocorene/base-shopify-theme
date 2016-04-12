var gulp = require('gulp'),
    path = require('path'),
    watch = require('gulp-watch'),
    del = require('delete'),
    flatten = require('gulp-flatten'),
    processLog = require('./util/log');

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
  },
  config: {
    src: './src/config/*.json',
    dest: './dist/config/'
  },
  locales: {
    src: './src/locales/*.json',
    dest: './dist/locales/'
  }
}

/**
 * DEFAULT Copy Task
 * Copies all files from /src to /dist
 */
gulp.task('files:copy', function(){
  processLog.start('all files', 'Copying'); // start log
  copy(files.layout.src, files.layout.dest, processLog.end.bind(null,'layouts'))
  copy(files.templates.src, files.templates.dest, processLog.end.bind(null, 'templates'))
  copy(files.snippets.src, files.snippets.dest, {flatten: true}, processLog.end.bind(null, 'snippets'))
  copy(files.assets.src, files.assets.dest, processLog.end.bind(null, 'assets'))
  copy(files.config.src, files.config.dest, processLog.end.bind(null, 'config'))
  copy(files.locales.src, files.locales.dest, processLog.end.bind(null, 'locales'))
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
  watch(files.config.src, function(vinyl){
    processFiles(vinyl, 'config')
  });
  watch(files.locales.src, function(vinyl){
    processFiles(vinyl, 'locales')
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
    processLog.start(type+'/'+filename, 'Deleting'); // start log
    del(__dirname+'/../dist/'+type+'/'+filename, {force: true}, function(err){
      if (err) throw err;
      processLog.end();
    });
  } else {
    processLog.start(type+'/'+filename, 'Copying'); // start log
    copy(files[type].src, files[type].dest, opts, processLog.end)
  }
}

/**
 * MAIN Copy Function
 * A wrapper for gulp.(src|dest)
 *
 * @param {string|array} files The default glob patterns in the files object
 * @param {string} dest The default dist path in the files object
 * @param {object} opts Options (optional)
 * @param {function} cb The processLog callback function
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
