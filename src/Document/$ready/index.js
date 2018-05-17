import defineValue from '../../shared/util/defineValue';
import document from '../../shared/global/Document/index';


export default function $ready( func, data ){
  if( this.readyState === 'complete' || ( this.readyState !== 'loading' && !this.documentElement.doScroll ) ) return func.apply( window, data );
  this.addEventListener( 'DOMContentLoaded', function callback( event ){
    this.removeEventListener( event.type, callback );
    func.apply( window, data );
  });
}

defineValue( document, '$ready', $ready );