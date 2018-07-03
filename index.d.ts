interface ArrayConstructor {
  /**
   * 创建一个新的数组, 将传入数组按照指定的长度进行分割, 如果数组不能均分, 则最后的数组中是数组剩余的元素
   * @param array 需要进行分割的数组
   * @param size 分割的长度
   */
  $chunk( array: any[], size: Number ): any[];
  /**
   * 快捷创建数组
   * @param length 需要创建的数组的长度
   * @param insert 需要填充到数组中的内容, 若传入方法, 将会向方法内传入当前 index
   */
  $create( length: Number, insert: any ): any[];
  /**
   * 将传入参数转为数组
   * @param value 需要转为数组的值
   */
  $toArray( value: any ): Array;
  /**
   * 传入一个数组, 返回一个新的数组 ( 浅拷贝 ),
   * @param source 需要复制的数组
   * @param array 复制到这个数组中, 返回的依旧是一个新的数组
   */
  $copy( source: any[], array: any[] ): any[];
  /**
   * 判断传入对象是否是一个类数组对象
   * @param value 需要判断的对象
   */
  $isArrayLike( value: any ): Array;
}

interface Array<T> {
  /**
   * 在数组指定位置插入对象
   * @param index 插入在数组中的位置, 如果为负数, 则从末尾开始逆序计算插入位置
   * @param args 需要插入的对象, 可以是多个
   */
  $add( index: Number, ...args: any[] ): any[];
  /**
   * 行为类似于原生的 concat 方法, 但是不会创建一个新的数组, 而是将所有传入参数放到数组后
   * @param args 需要添加到数组后的数据
   */
  $concat( ...args: any[] ): any[];
  /**
   * 在数组指定位置删除若干对象
   * @param index 需要删除的下标
   * @param num 需要从该下标开始删除几个对象 - default: 1
   */
  $delete( index: Number, num: Number = 1 ): any[];
  /**
   * 从数组中删除与传入值相同的对象
   * @param value 需要从数组中删除的对象
   * @param congruence 是否使用全等进行判断 - default: true
   */
  $deleteValue( value: any, congruence?: true ): any[];
  /**
   * 遍历数组, 并调用传入方法
   * @param callback 遍历数组时调用的方法, 方法返回 false 时, 退出遍历
   */
  $each( callback: ( value: any, index: Number, arr: any[] ) => Boolean ): any[];
  /**
   * 判断传入数组或类数组的内容是否和当前数组相同
   * @param obj 需要检测的值
   * @param congruence 是否使用全等进行判断 - default: true
   */
  $equals( obj: any[], congruence?: true ): Boolean;
  /**
   * 获取指定下标的对象
   * @param index 需要获取的对象的下标 - default: 0
   */
  $get( index: Number = 0 ): any;
  /**
   * 获取指定下标开始的若干个对象
   * @param index 需要获取的对象的下标 - default: 0
   * @param num 需要从该下标开始获取几个对象
   */
  $get( index: Number = 0, num: Number ): any[];
  /**
   * 查找数组内是否有此传入值
   * -- 弱检测
   * -- 强检测使用 Array.prototype.includes
   * 
   * @param obj 需要检测的值
   */
  $inArray( obj: any ): Boolean;
  /**
   * 修改数组内指定下标的值
   * @param index 需要修改的下标
   * @param value 值
   */
  $set( index: Number, value: any ): any[];
  /**
   * 修改数组内指定下标的值
   * @param obj 批量修改数组内指定下标的值
   */
  $set( obj: { index: Number, value: any } ): any[];
  /**
   * 调用原生 push 方法, 返回 this
   * @param args 需要插入到数组末尾的对象
   */
  $push( ...args: T[] ): any[];
  /**
   * 调用原生 unshift 方法, 返回 this
   * @param args 需要插入到数组开头的对象
   */
  $unshift( ...args: T[] ): any[];
  /**
   * 调用原生 pop 方法, 返回 this
   */
  $pop(): any[];
  /**
   * 调用原生 shift 方法, 返回 this
   */
  $shift(): any[];
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
  /**
   * 调用原生 querySelectorAll 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $query( selectors ): NodeListOf<Element>;
  /**
   * 调用原生  querySelector 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $queryFirst( selectors ): Element | null;
}

interface Element {
  /**
   * 读取时获取元素在父元素的下标
   * 写入时将元素的下标设置为写入值 ( 将会移动元素 )
   */
  _index: Number;
  /**
   * 向元素添加一个或多个类
   * @param className 类名
   */
  $addClass( className: Stirng ): Element;
  /**
   * 向元素移除一个或多个类
   * @param className 类名
   */
  $removeClass( className: Stirng ): Element;
  /**
   * 判断元素是否有一个或多个类
   * @param className 类名
   */
  $hasClass( className: Stirng ): Boolean;
  /**
   * 设置或移除元素的一个或多个类进行切换
   * @param className 类名
   * @param toggle 若值为 true, 则规定只添加类, 反之只移除
   */
  $toggleClass( className: Stirng, toggle: Boolean ): Element;
  /**
   * 获取当前节点下的所有匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回所有子节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $child( filter?: String | Function ): Element[];
  /**
   * 获取当前节点下的所有匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回所有子节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $children( filter?: String | Function ): Element[];
  /**
   * 获取当前节点下首个匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回首个子节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $first( filter?: String | Function ): Element | null;
  /**
   * 获取当前节点下首个匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回首个子节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $firstChild( filter?: String | Function ): Element | null;
  /**
   * 获取当前节点下最后一个匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回最后一个子节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $last( filter?: String | Function ): Element | null;
  /**
   * 获取当前节点下最后一个匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回最后一个子节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $lastChild( filter?: String | Function ): Element | null;
  /**
   * 对当前节点进行判断是否符合传入的要求
   * @param selector CSS 选择器或选择器
   */
  $is( selector: Element | String ): Boolean;
  /**
   * 对当前节点进行判断是否不符合传入的要求
   * @param selector CSS 选择器或选择器
   */
  $not( selector: Element | String ): Boolean;
  /**
   * 获取当前节点的下一个匹配过滤条件的节点,
   * 若未传入过滤条件, 则直接返回当前节点的下一个节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $next( filter?: String | Function ): Element | null;
  /**
   * 获取当前节点的上一个匹配过滤条件的节点,
   * 若未传入过滤条件, 则直接返回当前节点的上一个节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $prev( filter?: String | Function ): Element | null;
  /**
   * 获取从当前节点后面的所有匹配过滤条件的兄弟节点,
   * 若未传入过滤条件, 则直接返回当前节点后面的所有兄弟节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $nextAll( filter?: String | Function ): Element[];
  /**
   * 获取从当前节点前面的所有匹配过滤条件的兄弟节点,
   * 若未传入过滤条件, 则直接返回当前节点前面的所有兄弟节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $prevAll( filter?: String | Function ): Element[];
  /**
   * 获取当前节点的父节点, 可传入过滤条件对父节点进行过滤
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $parent( filter?: String | Function ): Element | null;
  /**
   * 获取当前节点的符合过滤条件的父节点, 未查找到会一直继续向上查找,
   * 若未传入过滤条件, 则直接返回当前节点的父节点
   * @param filter 过滤条件: CSS 选择器或方法
   * @param checkSelf 是否从当前节点开始检测, 不从当前节点的父节点开始
   */
  $parents( filter?: String | Function, checkSelf?: Boolean ): Element | null
  /**
   * 调用原生 querySelectorAll 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $query( selectors ): NodeListOf<Element>;
  /**
   * 调用原生  querySelector 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $queryFirst( selectors ): Element;
  /**
   * 获取当前节点的所有符合过滤条件的兄弟节点
   * 若未传入过滤条件, 则直接返回当前节点的所有兄弟节点
   * @param filter 过滤条件: CSS 选择器或方法
   */
  $siblings( filter?: String | Function ): Element | null;
  /**
   * 对当前元素下的文本进行全选操作
   */
  selectText();
}

interface EventTarget{
  /**
   * 返回存储在对象上的全部数据
   */
  $data(): any;
  /**
   * 读取指定名称的数据
   * @param name 需要读取的数据名称
   */
  $data( name: String ): any;
  /**
   * 将数据读取或存储
   * @param name 需要存储的数据名称
   * @param value 存储的数据
   * @param weakRead 当前值为 true 时, 同样视为读取, 当前名称下有数据返回数据, 如无数据, 将 value 赋值并返回
   */
  $data( name: String, value: any, weakRead?: Boolean ): any;
  /**
   * 判断当前对象下是否存有数据
   */
  $hasData(): Boolean;
  /**
   * 传入数据名称, 判断当前对象下是否存储了这个数据
   * @param {String} name 需要判断的数据名称
   */
  $hasData( name: String ): Boolean;
  /**
   * 删除存储在对象上的全部数据
   */
  $deleteData(): this;
  /**
   * 传入数据名称, 删除当前对象下存储的相应名称的数据
   * @param {String} name 需要删除的数据名称, 多个可使用空格分隔
   */
  $deleteData( names:String ): this;
  /**
   * 传入键值对事件进行绑定
   * @param obj 事件: 方法
   */
  $on( obj: { type: Function } ): this;
  /**
   * 传入键值对事件进行绑定
   * @param obj 事件: 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $on( obj: { type: Function }, options?: any ): this;
  /**
   * 传入键值对事件进行绑定
   * @param obj 事件: 方法
   * @param selector 事件代理的选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $on( obj: { type: Function }, selector?: String, options?: any ): this;
  /**
   * 传入键值对事件进行绑定
   * @param selector 事件代理的选择器
   * @param obj 事件: 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $on( selector: String, obj: { type: Function }, options?: any ): this;
  /**
   * 传入事件名和方法对事件进行绑定
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   */
  $on( types: String, listener: Function ): this;
  /**
   * 传入事件名和方法对事件进行绑定
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $on( types: String, listener: Function, options?: any ): this;
  /**
   * 传入事件名和方法对事件进行绑定
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param selector 事件代理的选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $on( types: String, listener: Function, selector?: String, options?: any ): this;
  /**
   * 传入事件名和方法对事件进行绑定
   * @param types 需要绑定的事件名
   * @param selector 事件代理的选择器
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   */
  $on( types: String, selector: String, listener?: Function ): this;
  /**
   * 传入事件名和方法对事件进行绑定
   * @param types 需要绑定的事件名
   * @param selector 事件代理的选择器
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $on( types: String, selector: String, listener?: Function, options?: any ): this;
  /**
   * 传入键值对事件进行绑定, 只会执行一次
   * @param obj 事件: 方法
   */
  $one( obj: { type: Function } ): this;
  /**
   * 传入键值对事件进行绑定, 只会执行一次
   * @param obj 事件: 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $one( obj: { type: Function }, options?: any ): this;
  /**
   * 传入键值对事件进行绑定, 只会执行一次
   * @param obj 事件: 方法
   * @param selector 事件代理的选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $one( obj: { type: Function }, selector?: String, options?: any ): this;
  /**
   * 传入键值对事件进行绑定, 只会执行一次
   * @param selector 事件代理的选择器
   * @param obj 事件: 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $one( selector: String, obj: { type: Function }, options?: any ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   */
  $one( types: String, listener: Function ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $one( types: String, listener: Function, options?: any ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param selector 事件代理的选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $one( types: String, listener: Function, selector?: String, options?: any ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param selector 事件代理的选择器
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   */
  $one( types: String, selector: String, listener?: Function ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param selector 事件代理的选择器
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $one( types: String, selector: String, listener?: Function, options?: any ): this;
  /**
   * 传入键值对事件进行绑定, 只会执行一次
   * @param obj 事件: 方法
   */
  $once( obj: { type: Function } ): this;
  /**
   * 传入键值对事件进行绑定, 只会执行一次
   * @param obj 事件: 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $once( obj: { type: Function }, options?: any ): this;
  /**
   * 传入键值对事件进行绑定, 只会执行一次
   * @param obj 事件: 方法
   * @param selector 事件代理的选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $once( obj: { type: Function }, selector?: String, options?: any ): this;
  /**
   * 传入键值对事件进行绑定, 只会执行一次
   * @param selector 事件代理的选择器
   * @param obj 事件: 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $once( selector: String, obj: { type: Function }, options?: any ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   */
  $once( types: String, listener: Function ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $once( types: String, listener: Function, options?: any ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param selector 事件代理的选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $once( types: String, listener: Function, selector?: String, options?: any ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param selector 事件代理的选择器
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   */
  $once( types: String, selector: String, listener?: Function ): this;
  /**
   * 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param selector 事件代理的选择器
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $once( types: String, selector: String, listener?: Function, options?: any ): this;
  /**
   * 传入事件名和方法进行事件移除, 只会移除无委托选择器的相关事件方法
   * @param types 需要解绑的事件集
   */
  $off( types: String ): this;
  /**
   * 传入事件名和方法进行事件移除, 将会对事件委托选择器进行匹配, 将会移除匹配到的相关事件方法
   * @param types 需要解绑的事件集
   * @param selector 事件委托选择器, 若值为 "*", 则移除所有事件委托选择器相关事件方法, 若值为 "**", 则移除所有相关事件方法, 不管有没有事件委托选择器
   */
  $off( types: String, selector: String ): this;
  /**
   * 传入事件名和方法进行事件移除
   * @param types 需要解绑的事件集
   * @param selector 事件委托选择器, 若值为 "*", 则移除所有事件委托选择器相关事件方法, 若值为 "**", 则移除所有相关事件方法, 不管有没有事件委托选择器
   * @param listener 解绑的事件, 只会移除与传入方法匹配的相关事件方法
   */
  $off( types: String, selector: String, listener: Function ): this;
  /**
   * 触发绑定在元素上的事件( 只触发事件 )
   * @param types 触发的事件名
   * @param data 向方法传递的数据, 可为多个
   */
  $emit( types, ...data?: any[] ): this;
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
  $random( to: Number = 9 ): Number;
  /**
   * 在最小数和最大数之间随机一个数字
   * @param from 指定一个最小数, 必须大于-1 - default: 0
   * @param to 指定一个最大数, 必须大于-1 - default: 9
   */
  $random( from: Number = 0, to: Number = 9 ): Number;
  /**
   * 在 0 和 9 之间随机一个数字
   */
  $randomPlus(): Number;
  /**
   * 在 0 和指定值之间随机一个数字
   * @param to 指定一个值, 可为负数 - default: 9
   */
  $randomPlus( to: Number = 9 ): Number;
  /**
   * 在最小数和最大数之间随机一个数字
   * @param from 指定一个最小数, 可为负数 - default: 0
   * @param to 指定一个最大数, 可为负数 - default: 9
   */
  $randomPlus( from: Number = 0, to: Number = 9 ): Number;
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
  $delete( ...keys: any[] ): any;
  /**
   * 从对象中删除与传入值相同的对象
   * @param value 需要删除的对象
   * @param congruence 是否使用全等进行判断 - default: true
   */
  $deleteValue( value: any, congruence?: true ): any;
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
  $set( key: String, value: any ): any;
  /**
   * 批量给对象设置值
   * @param obj 批量修改对象内的值
   */
  $set( obj: any ): any;
  /**
   * 返回当前对象
   */
  $self(): any;
  /**
   * 返回当前对象
   */
  readonly __self__: any;
}

interface ObjectConstructor {
  /**
   * Object.assign 的深拷贝版本
   * @param shallow 是否使用浅拷贝
   */
  $assign( shallow? = false, ...args?: any[] ): any;
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
  $each( obj: any, callback: ( key: String, value: any, obj: any ) => Boolean ): any;
  /**
   * 判断两个对象的类型是否相同然后判断两个对象的各个属性是否相同. 如果属性也有属性, 也会继续进行判断.
   * 目前可判断原生类型以及提供了 toString 接口的对象.
   * 对于实在无法判断的对象, 将会使用 JSON.stringify 进行转换后进行判断( 这一步骤将会产生误差, 比如两个 Set 对象将无法进行判断 ).
   * @param obj 需要判断的第一个对象
   * @param obj2 需要判断的第二个对象
   */
  $equals( obj: any, obj2: any ): Boolean;
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
  $random( uppercase?: false ): String;
  /**
   * 随机指定长度的字符串
   * @param length 字符串长度 - default: 12
   * @param hasUppercase 是否随机大写字母 - default: false
   * @param hasNumber 是否随机数字( 不会随机到首位 ) - default: false
   */
  $someRandom( length: Number = 12, hasUppercase?: false, hasNumber?: false ): String;
}




interface Window {
  Zen: ZenJS,
  ZenJS: ZenJS,
  $querystring: $querystring,
  $ready: $ready,
  $typeof: $typeof
};


interface ZenJS {
  /**
   * 一些可修改的配置
   */
  config: {
    /**
     * 注入到浏览器中的功能, 将会改变浏览器默认行为
     */
    inject: {
      /**
       * ZenJS 重写的 $on 和 $off 对浏览器自带的 addEventListener 和 removeEventListener 的注入 - default: true
       */
      event: true;
    },
    event: {
      /**
       * 当事件绑定的方法返回 false 时,
       * 是否阻止浏览器默认行为且停止事件冒泡 - default: false
       */
      returnFalse: false,
      /**
       * 绑定事件时, 是否允许使用修饰符 - default: true
       */
      modifiers: true
    }
  },
  /**
   * 创建一个可写的事件对象
   * @param event 原生事件对象
   */
  Event( event: DocumentEventMap ): any,
  /**
   * 关于事件绑定/解绑/触发的方法( 内部使用 )
   */
  EventListener: {
    /**
     * 绑定事件( 内部使用 )
     * @param elem 需要绑定事件的对象
     * @param types 需要绑定的事件集
     * @param selector 事件委托的选择器
     * @param listener 绑定的事件
     * @param options 事件绑定参数
     */
    add( elem: Element, types: Array, selector: String, listener: Function, options: Object );
    /**
     * 触发事件时调用的方法( 内部使用 )
     * @param nativeEvent 当前触发的事件对象
     */
    dispatch( nativeEvent: DocumentEventMap ): any;
    /**
     * 移除事件( 内部使用 )
     * @param elem 需要移除事件的对象
     * @param types 需要解绑的事件集
     * @param listener 解绑的事件
     * @param selector 事件委托的选择器
     */
    remove( elem: Element, types: String, listener: Function, selector: String );
    /**
     * 触发绑定在元素上的事件( 只触发事件 && 内部使用 )
     * @param elem 需要触发事件的对象
     * @param types 需要触发的事件集
     */
    emit( elem: Element, types: String );
  },
  /**
   * 唯一编号, 每次读取会自动递增
   */
  readonly guid: Number,
  /**
   * ZenJS 工具包
   */
  util: {
    /**
     * 变量判断
     */
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
    /**
     * 变量类型判断
     */
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
    /**
     * 方法参数处理
     */
    parameters: {
      /**
       * 判断方法指定位参数是否传值
       * @param args arguments
       * @param index 需要在 arguments 中判断默认值得下标
       */
      has( args: IArguments, index: Number ): any;
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
      rest( args: IArguments, index: Number = 0 ): any[];
    },
    /**
     * 实用方法
     */
    fn: {
      /**
       * 在一个对象上定义/修改一个新属性 ( 对 Object.defineProperty 的封装 )
       * @param obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
       * @param name 要定义或修改的属性的名称
       * @param options 将被定义或修改的属性描述符
       * @param options2 将被定义或修改的属性描述符, 会覆盖前一个 options
       */
      define( obj: any, name: String, options: any, options2: any );
      /**
       * 在一个对象上定义/修改一个新属性的 get 描述符
       * @param obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
       * @param name 要定义或修改的属性的名称
       * @param get 将被定义或修改的 get 描述符
       * @param options 将被定义或修改的属性描述符
       */
      defineGet( obj: any, name: String, get: Function, options: any );
      /**
       * 在一个对象上定义/修改一个新属性的 value 描述符
       * @param obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
       * @param name 要定义或修改的属性的名称
       * @param value 将被定义或修改的 value 描述符
       * @param options 将被定义或修改的属性描述符
       */
      defineValue( obj: any, name: String, value: Function, options: any );
      returnTrue(): true;
      returnFalse(): false;
    },
    /**
     * 浏览器特性判断
     */
    supports: {
      /**
       * 判断浏览器是否支持事件的 passive 选项
       */
      readonly passiveEvent: Boolean,
      /**
       * 判断浏览器是否支持 EventTarget
       */
      readonly EventTarget: Boolean
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
  stringify( obj, sep: String = '&', eq: String = '=' ): String;
  /**
   * 将 URL 查询字符串反序列化为对象
   * @param str 需要反序列化的字符串
   * @param sep 在字符串中分隔不同键值对的字符串 -default: '&'
   * @param eq 在字符串中分隔键和值的字符串 -default: '='
   */
  parse( str, sep: String = '&', eq: String = '=' ): any;
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

declare const Zen: ZenJS;

declare const ZenJS: ZenJS;

declare const $querystring: $querystring;

declare const $ready: $ready;

declare const $typeof: $typeof;