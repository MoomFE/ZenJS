import Array from '../global/Array/index';
import isArray from '../global/Array/isArray';
import defineProperty from '../global/Object/defineProperty';

export default function define( obj, name, options, options2 ){
  if( isArray( obj ) && obj instanceof Array ){
    obj.forEach( obj => {
      define( obj, name, options, options2 );
    });
    return;
  }
  defineProperty(
    obj, name, Object.assign(
      {}, options, options2
    )
  );
}