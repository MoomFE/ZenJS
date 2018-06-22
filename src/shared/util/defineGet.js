import define from './define';
import { defineGetPropertyOptions } from '../const/definePropertyOptions';
import isObject from './isObject';


export default function defineGet( obj, name, get, options ){
  let key;

  if( isObject( name ) ){
    for( key in name ){
      defineGet( obj, key, name[ key ], options );
    }
    return name;
  }

  return define(
    obj, name, { get },
    options || defineGetPropertyOptions
  ),
         get;
} 