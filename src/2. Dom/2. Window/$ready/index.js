import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import { addEventListener, load, removeEventListener } from "../../../shared/const/event";


if( inBrowser ){
  defineValue( window, '$ready', function( func, data ){
    if( document.readyState === 'complete' ){
      func.apply( window, data );
    }else{
      window[ addEventListener ]( load, function callback(){
        window[ removeEventListener ]( load, callback );
        func.apply( window, data );
      });
    }
  });
}