import defineValue from '../../shared/util/defineValue';


export default function $ready( func, data ){
  if( this.document.readyState === 'complete' ) return func.apply( this, data );
  this.addEventListener( 'load', function callback( event ){
    this.removeEventListener( event.type, callback );
    func.apply( this, data );
  });
}

defineValue( window, '$ready', $ready );