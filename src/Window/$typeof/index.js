import isArray from '../../shared/global/Array/isArray';
import defineValue from '../../shared/util/defineValue';
import root from '../../shared/const/root';
import ArrayProto from '../../shared/global/Array/prototype/index';
import defineGet from '../../shared/util/defineGet';
import StringProto from '../../shared/global/String/prototype/index';
import NumberProto from '../../shared/global/Number/prototype/index';
import BooleanProto from '../../shared/global/Boolean/prototype/index';
import FunctionProto from '../../shared/global/Function/prototype/index';
import returnTrue from '../../shared/util/returnTrue';


export default function $typeof( obj ){
  let type;

  if( obj == null ) return obj + '';
  if( ( type = typeof obj ) === 'object' ){
    if( isArray( obj ) )
      return 'array'
  }
  return type;
}

defineValue( root, '$typeof', $typeof );


// defineGet( ArrayProto, '__isArray__', returnTrue );
// defineGet( StringProto, '__isString__', returnTrue );
// defineGet( NumberProto, '__isNumber__', returnTrue );
// defineGet( BooleanProto, '__isBoolean__', returnTrue );
// defineGet( FunctionProto, '__isFunction__', returnTrue );