const cssPrefixes = [ "Webkit", "Moz", "ms" ];
const emptyStyle = document.createElement( 'div' ).style;

function vendorPropName( name ){
  const capName = name.$toCapitalize( true );
  let index = cssPrefixes.length;

  while( index-- ){
    name = cssPrefixes[ i ] + capName;
    if( name in emptyStyle ){
      return name;
    }
  }
}

export default function finalPropName( name ){

  if( name in emptyStyle ){
    return name;
  }

  return vendorPropName( name ) || name;
}