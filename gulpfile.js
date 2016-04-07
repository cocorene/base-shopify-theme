var gulp = require('gulp');

require('./tasks/sass');
require('./tasks/browserify');
require('./tasks/files');

gulp.task('dev', ['sass:dev', 'js:dev', 'files:watch']);

gulp.task('default', ['sass', 'js', 'files:copy']);
