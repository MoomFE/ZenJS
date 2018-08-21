import defineValue from "../../../shared/util/defineValue";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import entries from "../../../shared/global/Object/entries";
import { autoGetPredicate } from "../../../shared/util/getPredicate";


defineValue( ObjectProto, '$deleteValue $removeValue', function( _value ){
  const args = autoGetPredicate( arguments, _value, 1 );
  const value = args[ 0 ];
  const predicate = args[ 1 ];

  entries( this ).forEach( obj => {
    if( predicate( obj[ 1 ], value ) ){
      delete this[ obj[ 0 ] ];
    }
  });

  return this;
});