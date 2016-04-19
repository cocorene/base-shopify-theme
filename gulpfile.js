var gulp = require( 'gulp' );
var shell = require( 'gulp-shell' );

// require('./tasks/init'); // no in use
require( './tasks/sass' );
require( './tasks/files' );
require( './tasks/browserify' );
require( './tasks/jscs' );
require( './tasks/jshint' );

// gulp.task('shopify', shell.task(['cd dist/ && theme watch']));

gulp.task( 'dev', [ 'sass', 'js:dev', 'files:watch' ] );

gulp.task( 'default', [ 'sass', 'js', 'files:copy' ] );
