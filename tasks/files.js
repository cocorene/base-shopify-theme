var gulp = require( 'gulp' ),
    path = require( 'path' ),
    del = require( 'delete' ),
    flatten = require( 'gulp-flatten' ),
    processLog = require( './util/log' ),
    concat = require( 'gulp-concat' ),
    wrap = require( 'gulp-wrapper' );

/**
 * DEFAULT
 * Source globs and dest paths
 *
 * TODO
 * [Assets] will need to be expanded on to
 * accommodate more file types
 */
var files = {
    layout: {
        src: './src/layout/*.liquid',
        dest: './dist/layout/'
    },
    templates: {
        src: './src/templates/**/*.liquid',
        dest: './dist/templates/'
    },
    snippets: {
        src: ['./src/snippets/modules/*.liquid', './src/snippets/partials/*.liquid'],
        dest: './dist/snippets/'
    },
    assets: {
        src: [
            './src/assets/*.png',
            './src/assets/*.jpg',
            './src/assets/*.svg'
        ],
        dest: './dist/assets/'
    },
    config: {
        src: [
            './src/config/lib/general-info.json',
            './src/config/lib/global.json'
        ],
        dest: './dist/config/'
    },
    locales: {
        src: './src/locales/*.json',
        dest: './dist/locales/'
    }
}

/**
 * DEFAULT Copy Task
 * Copies all files from /src to /dist
 */
gulp.task( 'files:copy', function() {
    processLog.start( 'all files', 'Copying' ); // start log
    copy( files.layout.src, files.layout.dest, processLog.end.bind( null, 'layout' ) )
    copy( files.templates.src, files.templates.dest, processLog.end.bind( null, 'templates' ) )
    copy( files.snippets.src, files.snippets.dest, { flatten: true }, processLog.end.bind( null, 'snippets' ) )
    copy( files.assets.src, files.assets.dest, processLog.end.bind( null, 'assets' ) )
    copy( files.locales.src, files.locales.dest, processLog.end.bind( null, 'locales' ) )
} );
gulp.task( 'config:concat', function() {
    gulp.src( files.config.src )
        .pipe( concat( 'settings_schema.json', { newLine: ',' } ) )
        .pipe( wrap( {
            header: '[',
            footer: ']'
        } ) )
        .pipe( gulp.dest( files.config.dest ) );
} );

/**
 * DEV Copy Task
 * Watches filepaths for changes and 
 * copies changed files.
 */
gulp.task( 'files:watch', [ 'files:copy', 'config:concat' ], function() {
    gulp.watch( files.layout.src, function( event ) {
        processFiles( event, 'layout' )
    } );
    gulp.watch( files.templates.src, function( event ) {
        processFiles( event, 'templates' )
    } );
    gulp.watch( files.snippets.src, function( event ) {
        processFiles( event, 'snippets' )
    } );
    gulp.watch( files.assets.src, function( event ) {
        processFiles( event, 'assets' )
    } );
    gulp.watch( files.locales.src, function( event ) {
        processFiles( event, 'locales' )
    } );
    gulp.watch( files.config.src, [ 'config:concat' ] );
} );

/**
 * Watch Handler
 * Scrubs event type (change|unlink) and
 * either copies or deletes file
 *
 * @param {stream} event The object returned from gulp.watch()
 * @param {string} type The type of file being processed
 * @param {object} opts Options to pass to copy() task (optional)
 */
function processFiles( event, type, opts ) {
    var filename = path.basename( event.path );

    opts = opts || {};

    if ( event.event === 'deleted' ) {
        processLog.start( type + '/' + filename, 'Deleting' ); // start log
        del( __dirname + '/../dist/' + type + '/' + filename, { force: true }, function( err ) {
            if ( err ) throw err;
            processLog.end();
        } );
    } else {
        processLog.start( type + '/' + filename, 'Copying' ); // start log
        copy( files[ type ].src, files[ type ].dest, opts, processLog.end )
    }
}

/**
 * MAIN Copy Function
 * A wrapper for gulp.(src|dest)
 *
 * @param {string|array} files The default glob patterns in the files object
 * @param {string} dest The default dist path in the files object
 * @param {object} opts Options (optional)
 * @param {function} cb The processLog callback function
 */
function copy( files, dest, opts, cb ) {
    if ( typeof opts === 'function' ) {
        cb = opts;
    }

    if ( opts.flatten ) {
        gulp.src( files )
            .pipe( flatten() )
            .pipe( gulp.dest( dest ) );
    } else {
        gulp.src( files )
            .pipe( gulp.dest( dest ) );
    }

    cb();
}
