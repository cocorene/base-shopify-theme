document.addEventListener( 'DOMContentLoaded', function() {

    // Each type needs to match a singular data- attribute suffix and plural equivalient of folder name 
    var types = [ 'module', 'component' ]; 

    // Find the instances of each type
    for ( var i = 0; i < types.length; i++ ) {
        prepare( document.querySelectorAll( '[data-'+types[i]+']' ), types[i] );
    }

    function init( el, file, type, params ) {
        var File;

        try {
            File = require( type + '/' + file );
        } catch ( e ) {
            console.log( e.toString() );
            File = false;
        }

        // Initialize the module with the calling element.
        if ( typeof File === 'function' ) {
            var snippet = new File( el, params );

            if ( typeof jQuery !== 'undefined' ) {
                jQuery( el ).data( type, snippet );
            }
        }

        return snippet;
    }

    function prepare( type, type_name ) {
        for ( var i = 0; i < type.length; i++ ) {
            var type_data = type[ i ].getAttribute( 'data-'+type_name );
            var type_methods = type_data.split('|');
            var type_params = type_methods[0];
            if( type_methods.length > 1 ) {
                type_methods.splice(0, 1);
            }
            for( var m = 0; m < type_methods.length; m++ ){
                var return_params = init( type[ i ], type_methods[ m ].trim(), type_name+'s', type_params );
                type_params = typeof return_params.return !== 'undefined' && return_params.return ? return_params.return() : type_params;
            }
        }
    }
} );
