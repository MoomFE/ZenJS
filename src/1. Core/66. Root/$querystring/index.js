import parametersDefault from "../../../shared/util/parametersDefault";
import isObject from "../../../shared/util/isObject";
import keys from "../../../shared/global/Object/keys";
import isString from "../../../shared/util/isString";
import defineValue from "../../../shared/util/defineValue";
import root from "../../../shared/const/root";
import assign from "../../../shared/util/assign";


const rBackSlant = /\+/g;

function toString( obj ){
  switch( typeof obj ){
    case 'string': return obj;
    case 'boolean': return obj ? 'true' : 'false';
    case 'number': return isFinite( obj ) ? obj : '';
    default: return '';
  }
}

function stringify( obj ){
  const args = arguments;
  const sep = parametersDefault( args, 1, '&' );
  const eq = parametersDefault( args, 2, '=' );

  if( isObject( obj ) ){
    return keys( obj ).map( key => {
      return encodeURIComponent( toString( key ) ) + eq + encodeURIComponent( toString( obj[ key ] ) );
    })
    .join( sep );
  }

  return '';
}

function parse( str ){
  const args = arguments;
  const sep = parametersDefault( args, 1, '&' );
  const eq = parametersDefault( args, 2, '=' );
  const result = {};

  if( isString( str ) === false ){
    return result;
  }

  str.split( sep ).forEach( _value => {
    const cache = _value.replace( rBackSlant, '%20' );
    const index = cache.indexOf( eq );
    let key, value;

    if( index > -1 ){
      key = cache.substr( 0, index );
      value = cache.substr( index + 1 );
    }else{
      key = cache;
    }

    result[ decodeURIComponent( key ) ] = decodeURIComponent( value );
  });

  return result;
}

defineValue( root, '$querystring',
  assign( false, [ null, { stringify, parse } ])
);