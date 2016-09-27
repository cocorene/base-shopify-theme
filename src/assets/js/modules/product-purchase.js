export default( el ) => {
    const productSelect = document.getElementById( 'productSelect' );
    const variantSelects = el.querySelectorAll( '.js-variant' );
    const getData = ( element, attribute ) => {
        return element.getAttribute( attribute );
    };

    for( let select of variantSelects ) {
        select.addEventListener( 'change', ( e ) => {
            let variants = [];
            let option = null;
            let product = new Map();

            for( let select of variantSelects ) {
                variants.push( select.options[ select.selectedIndex ].value );
            }

            variants = variants.join( '-' );

            option = productSelect.querySelector( `[data-variant="${variants}"]` );
            option.selected = true;

            product.set( 'id', getData( option, 'value' ) );
            product.set( 'price', getData( option, 'data-price' ) );
            product.set( 'variants', variants );

            console.log( product.get( 'id' ) );
            console.log( product.get( 'price' ) );
            console.log( product.get( 'variants' ) );
        } );
    }
}
