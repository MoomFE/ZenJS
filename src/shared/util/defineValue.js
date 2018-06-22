import define from './define';
import { definePropertyOptions } from '../const/definePropertyOptions';
import isObject from './isObject';


export default function defineValue( obj, name, value, options ){
  let key;

  if( isObject( name ) ){
    for( key in name ){
      defineValue( obj, key, name[ key ], options );
    }
    return name;
  }

  return define(
    obj, name, { value },
    options || definePropertyOptions
  ),
         value;
}