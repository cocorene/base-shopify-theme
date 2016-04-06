var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var path = require('path');
var glob = require('glob');

/**
 * Custom options
 */
var customOpts = {
  entries: './src/js/main.js',
  debug: true
};

/**
 * Combine with default options
 * Create Browserify instance
 */
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

/**
 * Tasks
 */
gulp.task('js', bundle);

/**
 * Manually import modules/components
 */
b.require(function(){
  var Files = glob.sync('./src/js/+(components|modules)/*.js');
  var files = [];

  for(var i = 0; i < Files.length; i++) {
    var name = path.basename(Files[i], '.js'),
        dirname = path.dirname(Files[i]).split('/'),
        dir = dirname[dirname.length - 1];

    // Expose module files as "modules/[name]".
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
  // b.plugin('minifyify', {
  //   map: './main.min.js.map',
  //   output: './main.min.js.map',
  //   compressPath: function(p) {
  //     // Start relative paths from root
  //     return path.relative('./', p);
  //   }
  // });

  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/assets'));
}
