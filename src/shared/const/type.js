import StringProto from "../global/String/prototype/index";
import NumberProto from "../global/Number/prototype/index";
import BooleanProto from "../global/Boolean/prototype/index";
import ArrayProto from "../global/Array/prototype/index";
import FunctionProto from "../global/Function/prototype/index";
import defineProperty from "../global/Object/defineProperty";


[
  [ 'String', StringProto ],
  [ 'Number', NumberProto ],
  [ 'Boolean', BooleanProto ],
  [ 'Array', ArrayProto ],
  [ 'Function', FunctionProto ]
].forEach( obj => {
  defineProperty( obj[ 1 ], `__is${ obj[ 0 ] }__`, {
    value: true,
    configurable: false,// 删除/定义
    enumerable: false,// 枚举
    writable: false// 写入
  });
});


export const isString = '__isString__';
export const isNumber = '__isNumber__';
export const isBoolean = '__isBoolean__';
export const isArray = '__isArray__';
export const isFunction = '__isFunction__';