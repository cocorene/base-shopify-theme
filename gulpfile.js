var gulp = require('gulp');
var shell = require('gulp-shell');

require('./tasks/init');
require('./tasks/sass');
require('./tasks/files');
require('./tasks/browserify');
require('./tasks/jscs');
require('./tasks/jshint');

gulp.task('shopify', shell.task(['cd dist/ && theme watch']));

gulp.task('dev', ['sass:dev', 'js:dev', 'files:watch']);

gulp.task('default', ['sass', 'js', 'files:copy']);
