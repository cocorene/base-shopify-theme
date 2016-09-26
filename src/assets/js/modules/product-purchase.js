export default( el ) => {
    const productSelect = document.getElementById( 'productSelect' );
    const variantSelects = el.querySelectorAll( '.js-variant' );

    for( let select of variantSelects ) {
        select.addEventListener( 'change', ( e ) => {
            let variants = [];

            for( let select of variantSelects ) {
                variants.push( select.options[ select.selectedIndex ].value );
            }

            variants = variants.join( '-' );
        } );
    }
}
