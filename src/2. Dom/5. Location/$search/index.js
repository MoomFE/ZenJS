import inBrowser from "../../../shared/const/inBrowser";
import rSearch from "../../../shared/const/rSearch";
import isString from "../../../shared/util/isString";
import isObject from "../../../shared/util/isObject";
import each from "../../../1. Core/3. Object/$each/index";
import { parse, stringify } from "../../../1. Core/66. Root/$querystring/index";


if( inBrowser ){

  function SetSearch( oSearch, name, value ){
    // remove
    if( value == null ) delete oSearch[ name ];
    // setter
    else oSearch[ name ] = value;
  }

  function Search( search, name, value, isSet, isObj, isGetAll ){
    const oSearch = parse( search );

    if( isGetAll ) return oSearch;
    // setter
    else if( isSet ){
      if( isObj ){
        each( name, ( name, value ) => {
          SetSearch( oSearch, name, value );
        });
      }else{
        SetSearch( oSearch, name, value );
      }

      return stringify( oSearch );
    }
    // getter
    return oSearch[ name ];
  }

  location.$search = function( name, value ){
    let isObj, isSet, isGetAll;
    
    if( !( isGetAll = arguments.length < 1 ) ){
      isSet = arguments.length > 1 || (
        isObj = isObject( name )
      );
    }

    const newSearch = Search( location.search.substr(1), name, value, isSet, isObj, isGetAll );

    if( isSet ) location.search = newSearch;
    else return newSearch;
  };

  location.$urlSearch = function( url, name, value ){

    if( isString( url ) ){
      let isObj, isSet, isGetAll;
      const search = ( ( url.match( rSearch ) || [] )[0] || '' ).substr(1);

      if( !( isGetAll = arguments.length < 2 ) ){
        isSet = arguments.length > 2 || (
          isObj = isObject( name )
        );
      }

      if( !isSet ){
        return search ? Search( search, name, value, isSet, isObj, isGetAll ) : isGetAll ? {} : '';
      }

      let newSearch = '?' + Search( search, name, value, isSet, isObj );

      // http://www.zenjs.net/?asd=123#xxx
      if( search || url.indexOf('?') > -1 ) url = url.replace( rSearch, newSearch );
      // http://www.zenjs.net/#xxx
      else if( url.indexOf('#') > -1 ) url = url.replace( '#', newSearch + '#' );
      // http://www.zenjs.net/
      else url = url + newSearch; 

      return url;
    }

  };

}