import inBrowser from "../../../shared/const/inBrowser";
import rSearch from "../../../shared/const/rSearch";
import isString from "../../../shared/util/isString";
import isObject from "../../../shared/util/isObject";
import each from "../../../1. Core/3. Object/$each/index";


if( inBrowser ){

  function SetSearch( oSearch, name, value ){
    // remove
    if( value == null ) delete oSearch[ name ];
    // setter
    else oSearch[ name ] = value;
  }

  function Search( search, isSet, isObj, name, value ){
    const oSearch = $querystring.parse( search );

    // setter
    if( isSet ){
      if( isObj ){
        each( name, ( name, value ) => {
          SetSearch( oSearch, name, value );
        });
      }else{
        SetSearch( oSearch, name, value );
      }

      return $querystring.stringify( oSearch );
    }
    // getter
    return oSearch[ name ];
  }

  location.$search = function( name, value ){
    let isObj = false;
    const isSet = arguments.length > 1 || (
      isObj = isObject( name )
    );
    const newSearch = Search( location.search.substr(1), isSet, isObj, name, value );

    if( isSet ) location.search = newSearch;
    else return newSearch;
  };

  location.$urlSearch = function( url, name, value ){

    if( isString( url ) ){
      let isObj = false;
      const search = ( ( url.match( rSearch ) || [] )[0] || '' ).substr(1);
      const isSet = arguments.length > 2 || (
        isObj = isObject( name )
      );

      if( !isSet ){
        return search ? Search( search, isSet, isObj, name, value ) : '';
      }

      let newSearch = '?' + Search( search, isSet, isObj, name, value );

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