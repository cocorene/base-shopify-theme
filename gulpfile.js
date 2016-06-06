var gulp = require( 'gulp' );

require( './tasks/files' );
require( './tasks/jscs' );
require( './tasks/jshint' );

gulp.task( 'dev', ['files:watch' ] );

gulp.task( 'default', [ 'files:copy' ] );
