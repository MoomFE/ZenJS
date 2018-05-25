interface ArrayConstructor {
  /**
   * 快捷创建数组
   * @param length 需要创建的数组的长度
   * @param insert 需要填充到数组中的内容, 若传入方法, 将会向方法内传入当前 index
   */
  $create( length: Number, insert: any ): any[];
}

interface Array<T> {
  /**
   * 在数组指定位置添加对象
   * @param index 添加在数组中的位置
   * @param args 需要添加的对象, 可以是多个
   */
  $add( index: Number, ...args: any[] ): this;
  /**
   * 在数组指定位置删除若干对象
   * @param index 需要删除的下标
   * @param num 需要从该下标开始删除几个对象 - default: 1
   */
  $delete( index: Number, num?: Number = 1 ): this;
  /**
   * 从数组中删除与传入值相同的对象
   * @param value 需要从数组中删除的对象
   * @param congruence 是否使用全等进行判断 - default: true
   */
  $deleteValue( value: any, congruence?: Boolean = true ): this;
  /**
   * 查找数组内是否有此传入值
   * -- 弱检测
   * -- 强检测使用 Array.prototype.includes
   * 
   * @param obj 需要检测的值
   */
  $inArray( obj: any ): Boolean;
  /**
   * 遍历数组, 并调用传入方法
   * @param callback 遍历数组时调用的方法, 方法返回 false 时, 退出遍历
   */
  $each( callback: ( value: any, index: Number, arr: any[] ) => Boolean ): this;
  /**
   * 获取指定下标的对象
   * @param index 需要获取的对象的下标 - default: 0
   */
  $get( index?: Number = 0 ): any;
  /**
   * 获取指定下标开始的若干个对象
   * @param index 需要获取的对象的下标 - default: 0
   * @param num 需要从该下标开始获取几个对象
   */
  $get( index: Number = 0, num: Number ): any[];
  /**
   * 修改数组内指定下标的值
   * @param index 需要修改的下标
   * @param value 值
   */
  $set( index: Number, value: any ): this;
  /**
   * 修改数组内指定下标的值
   * @param obj 批量修改数组内指定下标的值
   */
  $set( obj: { index: Number, value: any } ): this;
  /**
   * 调用原生 push 方法, 返回 this
   * @param items 需要插入到数组末尾的对象
   */
  $push( ...items: T[] ): this;
  /**
   * 调用原生 unshift 方法, 返回 this
   * @param items 需要插入到数组开头的对象
   */
  $unshift( ...items: T[] ): this;
  /**
   * 调用原生 pop 方法, 返回 this
   */
  $pop(): this;
  /**
   * 调用原生 shift 方法, 返回 this
   */
  $shift(): this;
}


interface Document {
  /**
   * 页面加载完成后执行传入代码
   * -- 方法可以用 function[ call / apply ] 的方式使用, 可传入其他 document, 比如 iframe 的 document
   * 
   * @param func DOM 载入完成后执行的方法
   * @param data 需要传入方法的数据
   */
  $ready( func: () => void, data?: any ): void;
}

interface Math {
  /**
   * 传入多个数字, 求出传入参数的平均值
   * @param args 任意个数数字
   */
  $mean( ...args?: Number[] ): Number;
  /**
   * 在 0 和 9 之间随机一个数字
   */
  $random(): Number;
  /**
   * 在 0 和最大值之间随机一个数字
   * @param to 指定一个最大值, 必须大于-1 - default: 9
   */
  $random( to?: Number = 9 ): Number;
  /**
   * 在最小数和最大数之间随机一个数字
   * @param from 指定一个最小数, 必须大于-1 - default: 0
   * @param to 指定一个最大数, 必须大于-1 - default: 9
   */
  $random( from?: Number = 0, to?: Number = 9 ): Number;
  /**
   * 在 0 和 9 之间随机一个数字
   */
  $randomPlus(): Number;
  /**
   * 在 0 和指定值之间随机一个数字
   * @param to 指定一个值, 可为负数 - default: 9
   */
  $randomPlus( to?: Number = 9 ): Number;
  /**
   * 在最小数和最大数之间随机一个数字
   * @param from 指定一个最小数, 可为负数 - default: 0
   * @param to 指定一个最大数, 可为负数 - default: 9
   */
  $randomPlus( from?: Number = 0, to?: Number = 9 ): Number;
}

interface NumberConstructor {
  /**
   * 判断一个对象是否是数字或是否可转为数字
   * @param obj 需要判断的对象
   */
  $isNumber( obj: any ): Boolean;
}

interface Object {
  /**
   * 删除对象中指定值
   * @param keys 可传入多个
   */
  $delete( ...keys: any[] ): this;
  /**
   * 从对象中删除与传入值相同的对象
   * @param value 需要删除的对象
   * @param congruence 是否使用全等进行判断 - default: true
   */
  $deleteValue( value: any, congruence?: Boolean = true ): this;
  /**
   * 获取对象的某个值
   * @param key 需要获取的 key
   */
  $get( key: String ): String;
  /**
   * 设置对象的某个值
   * @param key 需要设置的 key
   * @param value 需要设置的 value
   */
  $set( key: String, value: any ): this;
  /**
   * 批量给对象设置值
   * @param obj 批量修改对象内的值
   */
  $set( obj: any ): this;
  /**
   * 返回当前对象
   */
  $self(): this;
  /**
   * 返回当前对象
   */
  readonly __self__: this;
}

interface ObjectConstructor {
  /**
   * Object.assign 的深拷贝版本
   */
  $assign( ...args?: any[] ): any;
  /**
   * 创建一个新的对象
   * 可传入多个参数, 参数会使用深拷贝进行继承
   * @param isNoProto 是否创建一个无 prototype 的对象
   * @param args 继承到新对象中的对象
   */
  $create( isNoProto?: Boolean, ...args?: any[] ): any;
  /**
   * 遍历对象, 并调用传入方法
   * @param obj 需要遍历的对象
   * @param callback 遍历对象时调用的方法, 方法返回 false 时, 退出遍历
   */
  $each( obj: any, callback: ( key: String, value: any, obj: any ) => Boolean ): obj;
  /**
   * 判断传入对象是否是空对象
   * @param obj 需要判断的对象
   */
  $isEmptyObject( obj: any ): Boolean;
  /**
   * 判断传入对象是否是纯粹的对象
   * @param obj 需要判断的对象
   */
  $isPlainObject( obj: any ): Boolean;
}

interface String {
  /**
   * 将字符串首字母大写
   */
  $toCapitalize(): String;
  /**
   * 对当前字符串进行全局替换
   * @param searchValue 匹配字符串中被替换的部分
   * @param replaceValue 进行替换的字符串
   */
  $replaceAll( searchValue: RegExp | String, replaceValue: String ): String;
}

interface StringConstructor {
  /**
   * 随机26个字母中的一个
   * @param uppercase 是否大写 - default: false
   */
  $random( uppercase?: Boolean = false ): String;
  /**
   * 随机指定长度的字符串
   * @param length 字符串长度 - default: 12
   * @param hasUppercase 是否随机大写字母 - default: false
   * @param hasNumber 是否随机数字( 不会随机到首位 ) - default: false
   */
  $someRandom( length?: Number, hasUppercase?: Boolean = false, hasNumber?: Boolean = false ): String;
}

declare const Zen: ZenJS;
declare const ZenJS: ZenJS;
declare const $querystring: $querystring;
declare const $ready: $ready;
declare const $typeof: $typeof;


interface Window {
  Zen: ZenJS,
  ZenJS: ZenJS,
  $querystring: $querystring,
  $ready: $ready,
  $typeof: $typeof
};


interface ZenJS {
  readonly guid: Number;
  /**
   * ZenJS 工具包
   */
  util: {
    is: {
      /**
       * 判断两个参数是否相等
       */
      equals( one: any, two: any ): Boolean;
      /**
       * 判断两个参数是否全等
       */
      congruence( one: any, two: any ): Boolean;
    },
    types: {
      /**
       * 判断传入参数是否是数组
       * @param obj 需要判断的对象
       */
      isArray( obj: any ): Boolean;
      /**
       * 判断传入对象是否是逻辑值
       * @param obj 需要判断的对象
       */
      isBoolean( obj: any ): Boolean;
      /**
       * 判断传入对象是否是方法
       * @param obj 需要判断的对象
       */
      isFunction( obj: any ): Boolean;
      /**
       * 判断传入对象是否是数字
       * @param obj 需要判断的对象
       */
      isNumber( obj: any ): Boolean;
      /**
       * 判断传入对象是否是对象且不为null
       * @param obj 需要判断的对象
       */
      isObject( obj: any ): Boolean;
      /**
       * 判断传入对象是否是正则
       * @param obj 需要判断的对象
       */
      isRegExp( obj: any ): Boolean;
      /**
       * 判断传入对象是否是字符串
       * @param obj 需要判断的对象
       */
      isString( obj: any ): Boolean;
    },
    parameters: {
      /**
       * 获取方法指定位参数, 若未传入参数, 则取默认值
       * @param args arguments
       * @param index 需要在 argument 中取得默认值的下标
       * @param defaultValue 若未传入值时取得默认值
       */
      default( args: IArguments, index: Number, defaultValue: any ): any;
      /**
       * 获取方法从指定位开始的剩余参数
       * @param args arguments
       * @param index 需要在 arguments 中开始取参数的下标 - default: 0
       */
      rest( args: IArguments, index?: Number = 0 ): any[];
    },
    fn: {
      returnTrue(): true;
      returnFalse(): false;
    }
  }
}

interface $querystring {
  /**
   * 将对象进行序列化成 URL 查询字符串
   * @param obj 需要序列化的对象
   * @param sep 在字符串中分隔不同键值对的字符串 -default: '&'
   * @param eq 在字符串中分隔键和值的字符串 -default: '='
   */
  stringify( obj, sep?: String = '&', eq?: String = '=' ): String;
  /**
   * 将 URL 查询字符串反序列化为对象
   * @param str 需要反序列化的字符串
   * @param sep 在字符串中分隔不同键值对的字符串 -default: '&'
   * @param eq 在字符串中分隔键和值的字符串 -default: '='
   */
  parse( str, sep?: String = '&', eq?: String = '=' ): any;
}

/**
 * 页面及页面资源载入完成后传入代码
 * -- 方法可以用 Function[ call / apply ] 的方式使用, 可传入其他 window, 比如 iframe 的 window
 * 
 * @param func 页面及页面资源载入完成后执行的方法
 * @param data 需要传入方法的数据
 */
declare function $ready( func: () => void, data?: any ): void;
/**
 * 判断传入参数的类型
 * @param obj 需要判断类型的参数
 */
declare function $typeof( obj: any ): String;