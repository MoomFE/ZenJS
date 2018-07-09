import parametersDefault from "../../shared/util/parametersDefault";
import congruence from "../../shared/util/congruence";
import equals from "../../shared/util/equals";
import defineValue from "../../shared/util/defineValue";
import ObjectProto from "../../shared/global/Object/prototype/index";


defineValue( ObjectProto, '$deleteValue $removeValue', function $deleteValue( value ){
  const
    isEqual = parametersDefault( arguments, 1, true )
      ? congruence
      : equals;
  let name;

  for( name in this ){
    if( isEqual( this[ name ], value ) ){
      delete this[ name ];
    }
  }

  return this;
});