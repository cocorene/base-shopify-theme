var gulp = require( 'gulp' );

require( './tasks/files' );

gulp.task( 'dev', ['files:watch' ] );

gulp.task( 'default', [ 'files:copy' ] );
