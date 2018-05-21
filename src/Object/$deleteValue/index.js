import parametersDefault from "../../shared/util/parametersDefault";
import congruence from "../../shared/util/congruence";
import equal from "../../shared/util/equal";
import defineValue from "../../shared/util/defineValue";
import ObjectProto from "../../shared/global/Object/prototype/index";

export default function $deleteValue( value ){
  const
    isEqual = parametersDefault( arguments, 1, true )
      ? congruence
      : equal;
  let name;
  
  for( name in this ){
    if( isEqual( this[ name ], value ) ){
      delete this[ name ];
    }
  }

  return this;
}

defineValue( ObjectProto, '$deleteValue', $deleteValue );