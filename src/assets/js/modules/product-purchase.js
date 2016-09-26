export default( el ) => {
    const productSelect = document.getElementById( 'productSelect' );
    const variantSelects = el.querySelectorAll( '.js-variant' );
    const getVariants = selects => {
        let variants = new Set();

        for( let select of selects ) {
            variants.add( select.options[ select.selectedIndex ].value );
        }

        return variants;
    }

    for( let variantSelect of variantSelects ) {
        variantSelect.addEventListener( 'change', ( e ) => {
            let variants = getVariants( variantSelects );

            for( let i = 0; i < productSelect.length; i++ ) {
                console.log( productSelect.options );
                // for( let variant of variants ) {
                //     variantFound += ( option.value.contains( variant ) ) ? 1 : 0;
                // }

                // if( variantFound == variants.size() ) {
                //     console.log( option.value );
                // }
            }
        } );
    }
}
