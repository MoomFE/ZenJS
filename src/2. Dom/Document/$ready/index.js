import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import { addEventListener, DOMContentLoaded, removeEventListener } from "../../../shared/const/event";


if( inBrowser ){
  defineValue( document, '$ready', function( func, data ){
    if( document.readyState === 'complete' || ( document.readyState !== 'loading' && !document.documentElement.doScroll ) ){
      func.apply( window, data );
    }else{
      document[ addEventListener ]( DOMContentLoaded, function callback( event ){
        document[ removeEventListener ]( DOMContentLoaded, callback );
        func.apply( window, data );
      });
    }
  });
}