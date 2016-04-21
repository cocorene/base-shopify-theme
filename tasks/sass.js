var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var processLog = require( './util/log' );

/**
 * DEFAULT Task
 */
gulp.task( 'sass', function() {
    // Run immediately
    concatenate();

    // Watch for future changes
    gulp.watch( [ './src/assets/scss/**/*.scss' ], concatenate )
} );

function concatenate() {
    processLog.start( 'SCSS', 'Concatenating' );

    /**
     * Source the files you need in the
     * order they need to be in, example:
     *
     *  gulp.src([
     *    './src/assets/scss/base/variables.scss',
     *    './src/assets/scss/components/counter.scss',
     *    './src/assets/scss/modules/slideshow.scss'
     *  ])
     *
     * etc
     */
    gulp.src( [
            './src/assets/scss/base/var.scss',
            './src/assets/scss/base/mixins.scss',
            './src/assets/scss/base/transitions.scss',
            './src/assets/scss/base/animations.scss',
            './src/assets/scss/base/normalize.scss',
            './src/assets/scss/base/layout.scss',
            './src/assets/scss/base/typography.scss',
            './src/assets/scss/components/buttons.scss',
            './src/assets/scss/components/form.scss',
            './src/assets/scss/modules/search-bar.scss',
            './src/assets/scss/partials/header.scss',
            './src/assets/scss/partials/footer.scss',
            './src/assets/scss/partials/drawer.scss',
            './src/assets/scss/templates/index.scss',
            './src/assets/scss/templates/login.scss',
            './src/assets/scss/templates/register.scss',
            './src/assets/scss/templates/reset.scss'
        ] )
        .pipe( concat( 'style.scss.liquid', { newLine: '\n' } ) )
        .pipe( gulp.dest( './dist/assets/' ) );

    processLog.end();
}
