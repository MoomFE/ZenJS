import Object from '../../shared/global/Object/index';
import toString from '../../shared/global/Object/prototype/toString';
import getPrototypeOf from '../../shared/global/Object/getPrototypeOf';
import hasOwnProperty from '../../shared/global/Object/hasOwnProperty';
import isFunction from '../../shared/util/isFunction';


const
  fnToString = hasOwnProperty.toString,
  ObjectFunctionString = fnToString.call( Object );


export default function $isPlainObject( obj ){

  if( !obj || toString.call( obj ) !== '[object Object]' ){
    return false;
  }

  let proto = getPrototypeOf( obj );

  if( !proto ){
    return true;
  }

  let Ctor = hasOwnProperty.call( proto, 'constructor' ) && proto.constructor;

  return isFunction( Ctor ) &&
         fnToString.call( Ctor ) === ObjectFunctionString;

}