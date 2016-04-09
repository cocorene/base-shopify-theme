var watchify = require('watchify');
var browserify = require('browserify');
var shim = require('browserify-shim');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var path = require('path');
var glob = require('glob');
var logger = require('./util/log');

/**
 * Tasks
 */
gulp.task('js:dev', bundle);
gulp.task('js', bundle);

/**
 * Custom options
 */
var customOpts = {
  entries: './src/assets/js/main.js',
  transform: [ [shim, { global: true }] ],
  debug: true
};

/**
 * Combine with default options
 * Create Browserify instance
 */
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

/**
 * Manually import modules/components
 */
b.require(function(){
  var Files = glob.sync('./src/assets/js/+(components|modules)/*.js');
  var files = [];

  for(var i = 0; i < Files.length; i++) {
    var name = path.basename(Files[i], '.js'),
        dirname = path.dirname(Files[i]).split('/'),
        dir = dirname[dirname.length - 1];

    files.push({
      file: Files[i],
      expose: dir+'/'+name
    });
  }

  return files;
}());

/**
 * Utilities
 */
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

/**
 * Package
 */
function bundle(minify) {
  logger.start('main.min.js', 'Bundling');

  // b.plugin('minifyify', {
  //   map: './main.min.js.map',
  //   output: './main.min.js.map',
  //   compressPath: function(p) {
  //     // Start relative paths from root
  //     return path.relative('./', p);
  //   }
  // });

  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .on('end', logger.end.bind(null, 'main.min.js', 'Bundling'))
    .pipe(source('main.js'))
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/assets'));
}
