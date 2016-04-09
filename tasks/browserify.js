var watchify = require('watchify');
var browserify = require('browserify');
var shim = require('browserify-shim');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var glob = require('glob');
var processLog = require('./util/log');

/**
 * DEV Bundle Task
 * Will not minify the output
 */
gulp.task('js:dev', bundle.bind(null, true));
/**
 * DEFAULT Bundle Task
 * Will minify the output
 */
gulp.task('js', bundle);

/**
 * INIT Browserify
 */
var b = browserify({
  entries: ['./src/assets/js/main.js'],
  transform: [ [shim, { global: true }] ],
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify]
});
b.plugin(bundle, {
  delay: 0 // reset from 100, compile immediately
});

/**
 * Watchify emitted 'update' event 
 */
b.on('update', bundle); // on any dep update, runs the bundler

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
 * DEFAULT Bundler Function
 *
 * @param {boolean} dev If false, output will be minified
 */
function bundle(dev) {
  processLog.start('main.min.js', 'Bundling'); // start processLog

  if (!dev){
    b.plugin('minifyify', {
     map: false
    });
  }

  b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js.liquid'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/'))

  processLog.end('main.min.js', 'Bundling')
}
