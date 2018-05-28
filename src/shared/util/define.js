import Array from '../global/Array/index';
import isArray from '../global/Array/isArray';
import defineProperty from '../global/Object/defineProperty';
import isObject from './isObject';

export default function define( obj, name, options, options2 ){
  let key;

  // define( [ window, document ], name, options )
  if( isArray( obj ) && obj instanceof Array ){
    obj.forEach( obj => define( obj, name, options, options2 ) );
    return;
  }

  // define( window, { key: value }, options )
  if( isObject( name ) ){
    for( key in name ){
      define( obj, key, name[ key ], options );
    }
    return;
  }

  defineProperty(
    obj, name, Object.assign(
      {}, options, options2
    )
  );
}