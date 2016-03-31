var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

// add custom browserify options here
var customOpts = {
  entries: './src/js/main.js',
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

// add transformations here

gulp.task('js', bundle); // so you can run `gulp js` to build the file
gulp.task('js:build', function(){bundle(true)}); // so you can run `gulp js` to build the file

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle(dev) {
  var dev = dev || false;

  if (!dev){
    b.plugin('minifyify', {
      map: outputFile+'.map',
      output: bundleOpts.output+'.map',
      compressPath: function(p) {
        // Start relative paths from root
        return path.join('../../', p);
      }
    });
  }

  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/assets'));
}
