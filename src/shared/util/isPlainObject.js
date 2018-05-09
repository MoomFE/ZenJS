import toString from '../global/Object/prototype/toString';
import getPrototypeOf from '../global/Object/getPrototypeOf';
import hasOwnProperty from '../global/Object/hasOwnProperty';
import isFunction from '../util/isFunction';
import Object from '../global/Object/index';

var fnToString = hasOwnProperty.toString;

var ObjectFunctionString = fnToString.call( Object );

/**
 * 判断传入对象是否是纯粹的对象
 * @param {Object} obj 需要判断的对象
 */
export default function isPlainObject( obj ){

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