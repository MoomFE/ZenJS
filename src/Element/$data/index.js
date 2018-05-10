import winDocEle from '../../shared/const/winDocEle';

import defineValue from '../../shared/util/defineValue';
import isEmptyObject from'../../Object/$isEmptyObject/index';
import isObject from '../../shared/util/isObject';

/**
 * 获取存储在元素上的整个数据集, 如数据集不存在则创建
 * @param {Element} elem 
 * @returns {Object}
 */
function $_GetDatas( elem ){
  const Datas = elem[ elem ] || (
    elem[ elem ] = {}
  );
  return Datas;
}


/**
 * 将数据读取或存储
 * @param {String} name 需要读取或存储的数据名称, 如果未传入 name, 则返回整个数据集
 * @param {Object} value 存储的数据
 * @param {Boolean} weakRead 当前值为 true 时, 同样视为读取, 当前名称下有数据返回数据, 如无数据, 将 value 赋值并返回
 * @returns {Object}
 */
defineValue( winDocEle, '$data', function $data( name, value, weakRead ){
  const Data = $_GetDatas( this );

  // $data( {} )
  // $data( {}, weakRead )
  if( isObject( name ) ){
    for( let _name in name ){
      $data.call( this, _name, name[ _name ], value );
    }
    return this;
  }

  // 读取
  // $data( name )
  // $data( name, value, true )
  if( arguments.length < 2 || weakRead ){
    if( name == null ) return Data;
    if( weakRead && !( name in Data ) ) return Data[ name ] = value;
    return Data[ name ];
  }

  // $data( name, value )
  Data[ name ] = value;
  return this;
});

/**
 * 传入数据名称, 判断当前对象下是否存储了这个数据
 * @param {String} name 需要判断的数据名称, 如果未传入 name, 则是判断是否存有数据
 * @returns {Boolean}
 */
defineValue( winDocEle, '$hasData', function( name ){
  const Data = $_GetDatas( this );

  if( isEmptyObject( Data ) ){
    return false;
  }

  if( name == null ){
    return true;
  }

  return name in Data;
});

/**
 * 传入数据名称, 删除当前对象下存储的相应名称的数据
 * @param {String} name 需要删除的数据名称, 多个可使用空格分隔, 如果未传入 names, 则视为删除全部数据
 * @returns {Object}
 */
defineValue( winDocEle, '$deleteData', function( names ){

  if( names == null ){
    this[ this ] = {};
    return this;
  }

  const Data = $_GetDatas( this );

  names.split(' ').forEach( name => {
    delete Data[ name ];
  });

  return this;
});