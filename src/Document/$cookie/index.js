import $assign from "../../Object/$assign/util";
import isNumber from "../../shared/util/isNumber";
import stringify from "../../shared/global/JSON/stringify";
import String from "../../shared/global/String/index";
import document from "../../shared/global/Document/index";
import parse from "../../shared/global/JSON/parse";
import defineValue from "../../shared/util/defineValue";
import inBrowser from "../../shared/const/inBrowser";


/**
 * Transplant from JavaScript Cookie
 * Version: 2.2.0
 * Homepage: https://github.com/js-cookie/js-cookie
 */


const rDecode = /(%[0-9A-Z]{2})+/g;

function decode( s ){
  return s.replace( rDecode, decodeURIComponent );
}


const rObject = /^[\{\[]/;
const rDecodeValue = /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g;
const rDecodeKey = /%(23|24|26|2B|5E|60|7C)/g;
const rBrackets = /[\(\)]/g;

function set( key, value, attributes ){

  attributes = $assign( true, { path: '/' }, attributes );

  if( isNumber( attributes.expires ) ){
    attributes.expires = new Date( new Date() * 1 + attributes.expires * 864e+5 );
  }

  // We're using "expires" because "max-age" is not supported by IE
  attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

  try {
    const result = stringify( value );

    if( rObject.test( result ) ){
      value = result;
    }
  }catch( error ){}

  value = encodeURIComponent( String( value ) )
            .replace( rDecodeValue, decodeURIComponent );

  key = encodeURIComponent( String( key ) )
            .replace( rDecodeKey, decodeURIComponent )
            .replace( rBrackets, escape );

  let stringifiedAttributes = '';
  let attributeName;

  for( attributeName in attributes ){

    if( !attributes[ attributeName ] ){
      continue;
    }

    stringifiedAttributes += '; ' + attributeName;

    if( attributes[attributeName] === true ){
      continue;
    }

    stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
  }

  return (
    document.cookie = key + '=' + value + stringifiedAttributes
  );
}


function get( key, json ){

  const jar = {};
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  const length = cookies.length;
  let i = 0,
      parts, cookie, name;

  for( ; i < length; i++ ){
    parts = cookies[i].split('=');
    cookie = parts.slice( 1 ).join('=');

    if( !json && cookie.charAt(0) === '"' ){
      cookie = cookie.slice( 1, -1 );
    }

    try {
      name = decode( parts[ 0 ] );
      cookie = decode( cookie );

      if( json ){
        try {
          cookie = parse( cookie );
        }catch( error ){}
      }

      jar[ name ] = cookie;

      if( key === name ){
        break;
      }
    }catch( error ){}
  }

  // key is String or undefined
  return key !== undefined ? jar[ key ] : jar;
}

if( inBrowser ){
  defineValue( document, {

    $cookie( key, value, attributes ){
      const length = arguments.length;
  
      // getter JSON
      if( !length ){
        return get( key, true );
      }
      // getter one
      if( length === 1 ){
        return get( key || key + '', false );
      }
      // setter
      return set( key, value, attributes );
    },
  
    '$deleteCookie $removeCookie': function( key, attributes ){
      set(
        key, '',
        $assign( true, attributes, { expires: -1 } )
      );
    }
  
  });
}