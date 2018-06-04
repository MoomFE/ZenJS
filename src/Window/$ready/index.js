import defineValue from '../../shared/util/defineValue';
import { addEventListener } from '../../shared/const/event';


defineValue( window, '$ready', function( func, data ){
  const self = this || window;

  if( self.document.readyState === 'complete' ) return func.apply( self, data );
  self[ addEventListener ]( 'load', function callback( event ){
    self.removeEventListener( event.type, callback );
    func.apply( self, data );
  });
});