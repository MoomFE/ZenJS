import { isArray } from "../const/type";
import entries from "../global/Object/entries";
import isPlainObject from "./isPlainObject";
import hasOwnProperty from "../global/Object/hasOwnProperty";


/**
 * 将多个源对象的可枚举属性合并到第一个对象中
 * @param {Boolean} shallow 是否使用浅拷贝模式, 类似于使用 Object.assign
 */
export default function assign( shallow, args, parent ){

  const length = args.length;

  /** 首个源对象下标 */
  let index = 1;
  /** 目标对象 */
  let target = args[ 0 ] || {};

  /** 当前源对象 */
  let options;
  /** 当前源对象所有可枚举属性名及属性 */
  let ownEntries;
  let ownLength, ownIndex, ownEntrie, ownEntrieName;
  let ownValue, targetValue, cloneValue;

  // 遍历参数
  for( ; index < length; index++ ){

    // 无用参数
    if( ( options = args[ index ] ) == null ) continue;

    // 所有可枚举属性
    // [ [ key, value ], [ key, value ], [ key, value ] ]
    ownEntries = entries( options );
    ownLength = ownEntries.length;
    ownIndex = 0;

    for( ; ownIndex < ownLength; ownIndex++ ){
      // [ key, value ]
      ownEntrie = ownEntries[ ownIndex ];
      ownEntrieName = ownEntrie[ 0 ];
      ownValue = ownEntrie[ 1 ]

      // 非浅拷贝模式下, 当前值是原生对象或数组, 则进行深拷贝
      if( !shallow && ownValue && ( isPlainObject( ownValue ) || ownValue[ isArray ] ) ){

        // 防御下面这种无限引用
        // var target = {};
        // var source = { infiniteLoop: target };
        // 
        // Object.$assign( target, source );
        if( ownValue === target ) continue;
        // 防御下面这种无限引用
        // var target = {};
        // var source = {};
        // target.source = source;
        // source.target = target;
        // 
        // Object.$assign( {}, target )
        else if( parent && parent === ownValue ){
          if( ownLength === 1 ) return undefined;
          continue;
        }

        targetValue = target[ ownEntrieName ];

        if( ownValue[ isArray ] ){
          cloneValue = targetValue && targetValue[ isArray ] ? targetValue : [];
        }else{
          cloneValue = targetValue && isPlainObject( targetValue ) ? targetValue : {};
        }

        if( assign( false, [ cloneValue, ownValue ], options ) !== undefined ){
          target[ ownEntrieName ] = cloneValue;
        }

      }else if( ownValue !== undefined || hasOwnProperty.call( target, ownEntrieName ) === false ){
        target[ ownEntrieName ] = ownValue;
      }
    }
  }

  return target;
}