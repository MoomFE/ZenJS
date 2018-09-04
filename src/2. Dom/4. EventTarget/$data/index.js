import defineValue from "../../../shared/util/defineValue";
import inBrowser from "../../../shared/const/inBrowser";
import DomEventTarget from "../../../shared/global/DomEventTarget/index";
import isObject from "../../../shared/util/isObject";
import isEmptyObject from "../../../shared/util/isEmptyObject";
import rnothtmlwhite from "../../../shared/const/rnothtmlwhite";


const DATA = '__ZENJS_DATA__';


/**
 * 获取存储在元素上的整个数据集, 如数据集不存在则创建
 * @param {Element} elem
 * @returns {Object}
 */
function getDatas( elem ){
  return elem[ DATA ] || (
    defineValue( elem, DATA, {} ), elem[ DATA ]
  );
}

if( inBrowser ){

  defineValue( DomEventTarget, '$data', function $data( name, value, weakRead ){
    const self = this || window;
    const Data = getDatas( self );

    // $data( {} )
    // $data( {}, weakRead )
    if( isObject( name ) ){
      for( let key in name ){
        $data.call( self, key, name[ key ], value );
      }
      return self;
    }

    // 读取
    // $data( name )
    // $data( name, value, true )
    if( weakRead || arguments.length < 2 ){
      if( name == null ) return Data;
      if( weakRead && !( name in Data ) ) return Data[ name ] = value;
      return Data[ name ];
    }

    // $data( name, value )
    Data[ name ] = value;
    return slef;
  });

  defineValue( DomEventTarget, '$hasData', function( name ){
    const Data = getDatas( this || window );

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

    const Data = getDatas( self );

    ( names.match( rnothtmlwhite ) || [] ).forEach( name => {
      delete Data[ name ];
    });

    return self;
  });

}