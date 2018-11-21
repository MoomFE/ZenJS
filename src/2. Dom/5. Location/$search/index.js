import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import rSearch from "../../../shared/const/rSearch";
import isString from "../../../shared/util/isString";


if( inBrowser ){

  function Search( search, isSet, name, value ){
    const oSearch = $querystring.parse( search );

    // setter
    if( isSet ){
      // remove
      if( value == null ) delete oSearch[ name ];
      else oSearch[ name ] = value;

      return $querystring.stringify( oSearch );
    }
    // getter
    return oSearch[ name ];
  }

  defineValue( location, '$search', function( name, value ){
    const isSet = arguments.length > 1;
    const newSearch = Search( location.search.substr(1), isSet, name, value );

    if( isSet ) location.search = newSearch;
    else return newSearch;
  });

  defineValue( location, '$urlSearch', function( url, name, value ){

    if( isString( url ) ){
      const search = ( ( url.match( rSearch ) || [] )[0] || '' ).substr(1);
      const isSet = arguments.length > 2;

      if( !isSet ){
        return search ? Search( search, isSet, name, value ) : '';
      }

      let newSearch = '?' + Search( search, isSet, name, value );

      // http://www.zenjs.net/?asd=123#xxx
      if( search || url.indexOf('?') > -1 ) url = url.replace( rSearch, newSearch );
      // http://www.zenjs.net/#xxx
      else if( url.indexOf('#') > -1 ) url = url.replace( '#', newSearch + '#' );
      // http://www.zenjs.net/
      else url = url + newSearch; 

      return url;
    }

  });

}