var gulp = require('gulp');

require('./tasks/init');
require('./tasks/sass');
require('./tasks/files');
require('./tasks/browserify');
require('./tasks/jscs');
require('./tasks/jshint');

gulp.task('dev', ['sass:dev', 'js:dev', 'files:watch', 'shopify']);

gulp.task('default', ['sass', 'js', 'files:copy']);
