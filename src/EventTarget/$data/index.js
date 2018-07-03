import defineValue from '../../shared/util/defineValue';
import isEmptyObject from'../../Object/$isEmptyObject/index';
import isObject from '../../shared/util/isObject';
import EventTarget from '../../shared/global/EventTarget/index';
import inBrowser from '../../shared/const/inBrowser';


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

if( inBrowser ){

  defineValue( EventTarget, '$data', function $data( name, value, weakRead ){
    const self = this || window;
    const Data = $_GetDatas( self );
  
    // $data( {} )
    // $data( {}, weakRead )
    if( isObject( name ) ){
      for( let _name in name ){
        $data.call( self, _name, name[ _name ], value );
      }
      return self;
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
    return self;
  });
  
  defineValue( EventTarget, '$hasData', function( name ){
    const Data = $_GetDatas( this || window );
  
    if( isEmptyObject( Data ) ){
      return false;
    }
  
    if( name == null ){
      return true;
    }
  
    return name in Data;
  });
  
  defineValue( EventTarget, '$deleteData $removeData', function( names ){
    const self = this || window;
  
    if( names == null ){
      self[ DATA ] = {};
      return self;
    }
  
    const Data = $_GetDatas( self );
  
    names.split(' ').forEach( name => {
      delete Data[ name ];
    });
  
    return self;
  });

}

