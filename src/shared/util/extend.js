import { isArray } from "../const/type";
import entries from "../global/Object/entries";
import isPlainObject from "./isPlainObject";


/**
 * 
 * @param {Boolean} shallow 是否使用浅拷贝模式, 相当于使用 Object.assign
 */
export default function extend( shallow, args ){

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

      // 防止无限拷贝
      if( ownValue === target ) continue;

      targetValue = target[ ownEntrieName ];

      // 非浅拷贝模式下, 当前值是原生对象或数组, 则进行深拷贝
      if( !shallow && ownValue && ( isPlainObject( ownValue ) || ownValue[ isArray ] ) ){

        if( ownValue[ isArray ] ){
          cloneValue = targetValue && targetValue[ isArray ] ? targetValue : [];
        }else{
          cloneValue = targetValue && isPlainObject( src ) ? src : {};
        }

        target[ ownEntrieName ] = extend( cloneValue, ownValue );

      }else if( ownValue !== undefined ){
        target[ ownEntrieName ] = ownValue;
      }
    }
  }

  return target;
}