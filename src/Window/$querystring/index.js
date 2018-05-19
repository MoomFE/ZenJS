import defineValue from "../../shared/util/defineValue";
import parametersDefault from "../../shared/util/parametersDefault";
import isObject from "../../shared/util/isObject";
import isString from "../../shared/util/isString";

const rBackSlant = /\+/g;

function toString( obj ){
  switch( typeof obj ){
    case 'string': return obj;
    case 'boolean': return obj ? 'true' : 'false';// 使用 toString 性能慢三倍
    case 'number': return isFinite( obj ) ? obj : '';
    default: return '';
  }
}

export function stringify( obj ){
  const
    sep = parametersDefault( arguments, 1, '&' ),
    eq = parametersDefault( arguments, 2, '=' );

  if( isObject( obj ) ){
    return Object
      .keys( obj )
      .map( key => {
        return encodeURIComponent( toString( key ) ) +
               eq +
               encodeURIComponent( toString( obj[ key ] ) );
      })
      .join( sep );
  }

  return '';
}

export function parse( str ){
  const
    sep = parametersDefault( arguments, 1, '&' ),
    eq = parametersDefault( arguments, 2, '=' ),
    result = {};

  if( !isString( str ) ){
    return result;
  }

  let i = 0,
      key, value,
      cache, index = '';
  const
    queryList = str.split( sep ),
    queryLength = queryList.length;

  for( ; i < queryLength; i++ ){
    cache = queryList[ i ].replace( rBackSlant, '%20' );
    index = cache.indexOf( eq );

    if( index > -1 ){
      key = cache.substr( 0, index );
      value = cache.substr( index + 1 );
    }else{
      key = cache;
    }

    key = decodeURIComponent( key );
    value = decodeURIComponent( value );

    result[ key ] = value;
  }
  
  return result;
}

defineValue( window, '$querystring', {
  stringify,
  parse
});