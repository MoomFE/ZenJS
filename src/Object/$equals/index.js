import stringify from "../../shared/global/JSON/stringify";
import defineValue from "../../shared/util/defineValue";
import Object from "../../shared/global/Object/index";
import toString from "../../shared/global/Object/prototype/toString";

export default function $equals( obj, obj2 ){
  return toString.call( obj ) === toString.call( obj2 ) &&
    stringify( obj ) === stringify( obj2 );
}

defineValue( Object, '$equals', $equals );