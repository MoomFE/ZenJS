import Array from '../global/Array/index';
import isArray from '../global/Array/isArray';
import defineProperty from '../global/Object/defineProperty';
import isObject from './isObject';
import $assign from '../../Object/$assign/util';

export default function define( obj, name, options, options2 ){
  let key;

  if( obj == null ){
    return;
  }

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

  name.split(' ').forEach( name => {
    defineProperty(
      obj, name, $assign(
        true, {}, options, options2
      )
    );
  });
}