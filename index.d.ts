interface ArrayConstructor {
  /**
   * 快捷创建数组
   * @param length 需要创建的数组的长度
   * @param insert 需要填充到数组中的内容, 若传入方法, 将会向方法内传入当前 index
   */
  $create( length: number, insert: any ): any[];
}

interface Array<T> {
  /**
   * 在数组指定位置添加对象
   * @param index 添加在数组中的位置
   * @param args 需要添加的对象, 可以是多个
   */
  $add( index: number, ...args: any[] ): this;
  /**
   * 在数组指定位置删除若干对象
   * @param index 需要删除的下标
   * @param num 需要从该下标开始删除几个对象 - default: 1
   */
  $delete( index: number, num?: number = 1 ): this;
  /**
   * 从数组中删除与传入对象相同的对象
   * @param value 需要从数组中删除的对象
   * @param congruence 是否使用全等进行判断 - default: true
   */
  $deleteValue( value: any, congruence?: boolean = true ): this;
  /**
   * 查找数组内是否有此传入值
   * -- 弱检测
   * -- 强检测使用 Array.prototype.includes
   * 
   * @param obj 需要检测的值
   */
  $inArray( obj: any ): boolean;
  /**
   * 遍历数组, 并调用传入方法
   * @param callback 遍历数组时调用的方法, 方法返回 false 时, 退出遍历
   */
  $each( callback: ( index: number, value: any, arr: any[] ) => boolean ): this;
  /**
   * 获取指定下标的对象
   * @param index 需要获取的对象的下标 - default: 1
   */
  $get( index?: number = 1 ): any;
  /**
   * 获取指定下标开始的若干个对象
   * @param index 需要获取的对象的下标
   * @param num 需要从该下标开始获取几个对象
   */
  $get( index: number = 1, num: number ): any[];
  /**
   * 修改数组内指定下标的值
   * @param index 需要修改的下标
   * @param value 值
   */
  $set( index: number, value: any ): this;
  /**
   * 修改数组内指定下标的值
   * @param obj 批量修改数组内指定下标的值
   */
  $set( obj: { index: number, value: any } ): this;
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
   * 在 0 和 9 之间随机一个数字
   */
  $random(): number;
  /**
   * 在 0 和最大值之间随机一个数字
   * @param to 指定一个最大值, 必须大于-1 - default: 9
   */
  $random( to?: number = 9 ): number;
  /**
   * 在最小数和最大数之间随机一个数字
   * @param from 指定一个最小数, 必须大于-1 - default: 0
   * @param to 指定一个最大数, 必须大于最小数 - default: 9
   */
  $random( from?: number = 0, to?: number = 9 ): number;
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
  $create( isNoProto?: boolean, ...args?: any[] ): any;
  /**
   * 遍历对象, 并调用传入方法
   * @param obj 需要遍历的对象
   * @param callback 遍历对象时调用的方法, 方法返回 false 时, 退出遍历
   */
  $each( obj: any, callback: ( key: string, value: any, obj: any ) => boolean ): obj;
  /**
   * 判断传入对象是否是空对象
   * @param obj 需要判断的对象
   */
  $isEmptyObject( obj: any ): boolean;
  /**
   * 判断传入对象是否是纯粹的对象
   * @param obj 需要判断的对象
   */
  $isPlainObject( obj: any ): boolean;
}

interface String {
  /**
   * 将字符串首字母大写
   */
  $toCapitalize(): string;
}

interface Window {
  /**
   * 页面及页面资源载入完成后传入代码
   * -- 方法可以用 Function[ call / apply ] 的方式使用, 可传入其他 window, 比如 iframe 的 window
   * 
   * @param func 页面及页面资源载入完成后执行的方法
   * @param data 需要传入方法的数据
   */
  $ready( func: () => void, data?: any ): void;
  /**
   * 判断传入参数的类型
   * @param obj 需要判断类型的参数
   */
  $typeof( obj: any ): String;
}

declare const Zen: Zen;
interface Zen {
  readonly guid: number;
}