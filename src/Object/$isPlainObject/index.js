import toString from '../../shared/global/Object/prototype/toString';
import Object from '../../shared/global/Object/index';
import defineValue from '../../shared/util/defineValue';

export default function $isPlainObject( obj ){
  return toString.call( obj ) === '[object Object]';
}

defineValue( Object, '$isPlainObject', $isPlainObject );