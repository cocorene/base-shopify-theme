const fs = require( 'fs-extra' )

/**
 * Copy config file
 */
fs.copy( `${__dirname}/src/config-sample.yml`, `${__dirname}/dist/config.yml`, ( error ) => {
    if( error ) return console.log( error )

    console.log( 'Copied config.yml to dist/ directory' )
} )

/**
 * Create assets dir
 */
fs.mkdirsSync( 'dist/assets' )
