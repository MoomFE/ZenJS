import $toArray from "../../1. Core/1. Array/$toArray/index";


/**
 * 传入一个键值对的列表, 并返回一个带有这些键值对的新对象 ( 是 Object.entries 的反转 )
 * Object.fromEntries polyfill
 */
export default function( iterable ){

  const result = {};
  const newIterable = $toArray( iterable );

  let item;
  let index = newIterable.length;

  while( index-- ){
    item = newIterable[ index ];

    if( item && item.length ){
      result[ item[ 0 ] ] = item[ 1 ];
    }
  }

  return result;
}