import defineValue from '../../shared/util/defineValue';
import isEmptyObject from'../../Object/$isEmptyObject/index';
import isObject from '../../shared/util/isObject';
import EventTarget from '../../shared/global/EventTarget/index';
import defineProperty from '../../shared/global/Object/defineProperty';

const DATA = '__ZENJS_DATA__';

/**
 * 获取存储在元素上的整个数据集, 如数据集不存在则创建
 * @param {Element} elem 
 * @returns {Object}
 */
function $_GetDatas( elem ){
  return elem[ DATA ] || (
    defineValue( elem, DATA, {} ),
    elem[ DATA ]
  );
}


defineValue( EventTarget, '$data', function $data( name, value, weakRead ){
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


defineValue( EventTarget, '$hasData', function( name ){
  const Data = $_GetDatas( this );

  if( isEmptyObject( Data ) ){
    return false;
  }

  if( name == null ){
    return true;
  }

  return name in Data;
});


defineValue( EventTarget, '$deleteData', function( names ){

  if( names == null ){
    this[ DATA ] = {};
    return this;
  }

  const Data = $_GetDatas( this );

  names.split(' ').forEach( name => {
    delete Data[ name ];
  });

  return this;
});