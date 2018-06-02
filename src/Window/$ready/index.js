import defineValue from '../../shared/util/defineValue';
import { addEventListener } from '../../shared/const/event';


defineValue( window, '$ready', function( func, data ){
  if( this.document.readyState === 'complete' ) return func.apply( this, data );
  this[ addEventListener ]( 'load', function callback( event ){
    this.removeEventListener( event.type, callback );
    func.apply( this, data );
  });
});