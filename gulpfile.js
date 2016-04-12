var gulp = require('gulp');
var shell = require('gulp-shell');

require('./tasks/sass');
require('./tasks/files');
require('./tasks/browserify');
require('./tasks/jscs');
require('./tasks/jshint');

gulp.task('shopify', shell.task(['if [ -d dist/ ]; then cp config.yml dist/ && cd dist/ && theme watch; else mkdir dist/ && cp config.yml dist/ && cd dist/ && theme watch; fi']));

gulp.task('dev', ['sass:dev', 'js:dev', 'files:watch', 'shopify']);

gulp.task('default', ['sass', 'js', 'files:copy']);
