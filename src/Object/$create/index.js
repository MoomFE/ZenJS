import Object from '../../shared/global/Object/index';
import $assign from '../$assign/index';
import create from '../../shared/global/Object/create';

import define from '../../shared/util/defineValue';
import isBoolean from '../../shared/util/isBoolean';

/**
 * 创建一个全新的对象
 * 可传入多个参数, 会对参数进行继承
 * @param {Boolean} isNoProto 是否创建一个无 prototype 的对象
 * @returns {Object}
 */
export default function $create( isNoProto, ...arg ){

  const options = [].concat( arg );

  if( isBoolean( isNoProto ) || !isNoProto ){
    options.unshift( isNoProto ? create( null ) : {} );
  }else{
    options.unshift( {}, isNoProto );
  }

  return $assign.apply( null, options );
};

define( Object, '$create', $create );