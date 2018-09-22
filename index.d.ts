interface ArrayConstructor {

  /**
   * 创建一个新的数组, 将传入数组按照指定的长度进行分割, 如果数组不能均分, 则最后的数组中是数组剩余的元素
   * @param array 需要进行分割的数组
   * @param size 分割的长度
   */
  $chunk( array: any[], size: Number ): any[];

  /**
   * 传入一个数组, 返回一个新的数组 ( 浅拷贝 )
   * @param source 需要复制的数组
   * @param array 将需要复制的数组合并到这个数组后进行返回, 返回的依旧是一个新的数组
   */
  $copy( source: any[], array: any[] ): any[];

  /**
   * 快捷创建数组
   * @param length 需要创建的数组的长度
   * @param insert 需要填充到数组中的内容, 若传入方法, 将会向方法内传入当前 index, 然后将方法的返回值填充到数组中
   * @param isInsert 若值为真, 即使二个参数 insert 是方法, 都会直接进行插入
   */
  $create( length: Number, insert: any, isInsert: Boolean ): any[];

  /**
   * 调用传入方法遍历传入数组
   * @param array 需要进行遍历的数组
   * @param callback 遍历数组时调用的方法, 方法返回 false 时, 将终止后续遍历
   */
  $each( array: any[], callback: ( value: any, index: Number, arr: any[] ) => Boolean ): any[];

  /**
   * 比较两个数组的内容是否相同, 与 Object.$equals 不同, 比较的两个数组可以是类数组对象
   * @param array 进行比较的第一个数组
   * @param array2 进行比较的第二个数组
   * @param predicate 是否使用全等进行判断, 为 false 则使用双等进行判断, 可传入自定义方法 - default: true
   */
  $equals( array: any[], array2: any[], predicate: Function | Boolean ): Boolean;

  /**
   * 判断传入对象是否是一个类数组对象
   * @param value 需要判断的对象
   */
  $isArrayLike( value: any ): Array;

  /**
   * 将传入参数转为数组
   * @param value 需要转为数组的对象
   */
  $toArray( value: any ): Array;

}

interface Array<T> {

  /**
   * 创建一个新的数组, 将数组按照指定的长度进行分割, 如果数组不能均分, 则最后的数组中是数组剩余的元素
   * @param size 分割的长度
   */
  $chunk( size: Number ): any[];

  /**
   * 调用传入方法遍历当前数组
   * @param callback 遍历数组时调用的方法, 方法返回 false 时, 将终止后续遍历
   */
  $each( callback: ( value: any, index: Number, arr: any[] ) => Boolean ): any[];

  /**
   * 比较当前数组和目标数组的内容是否相同, 与 Object.$equals 不同, 比较的两个数组可以是类数组对象
   * @param array 进行比较的数组
   * @param predicate 是否使用全等进行判断, 为 false 则使用双等进行判断, 可传入自定义方法 - default: true
   */
  $equals( array: any[], predicate: Function | Boolean ): Boolean;

  /**
   * 在数组指定位置插入对象
   * @param index 插入在数组中的位置, 可为负数
   * @param args 需要插入的对象, 可以是多个
   */
  $add( index: Number, ...args: any[] ): any[];

  /**
   * 在数组指定位置删除若干对象
   * @param index 需要删除的下标, 可为负数
   * @param num 需要从该下标开始删除几个对象 - default: 1
   * @param returnDeleted 是否返回删除的数据 - default: false
   */
  $delete( index: Number, num: Number = 1, returnDeleted?: false ): any[];

  /**
   * 在数组指定位置删除若干对象
   * @param index 需要删除的下标, 可为负数
   * @param num 需要从该下标开始删除几个对象 - default: 1
   * @param returnDeleted 是否返回删除的数据 - default: false
   */
  $remove( index: Number, num: Number = 1, returnDeleted?: false ): any[];

  /**
   * 从数组中删除与传入值相同的对象
   * @param value 需要从数组中删除的对象
   * @param predicate 是否使用全等进行判断, 为 false 则使用双等进行判断, 可传入自定义方法 - default: true
   */
  $deleteValue( value: any, predicate: Function | Boolean ): any[];

  /**
   * 从数组中删除与传入值相同的对象
   * @param predicate 用于自定义筛选内容
   */
  $deleteValue( predicate: Function ): any[];

  /**
   * 从数组中删除与传入值相同的对象
   * @param value 需要从数组中删除的对象
   * @param predicate 是否使用全等进行判断, 为 false 则使用双等进行判断, 可传入自定义方法 - default: true
   */
  $removeValue( value: any, predicate: Function | Boolean ): any[];

  /**
   * 从数组中删除与传入值相同的对象
   * @param predicate 用于自定义筛选内容
   */
  $removeValue( predicate: Function ): any[];

  /**
   * 行为类似于原生的 concat 方法, 但是不会创建一个新的数组, 而是将所有传入参数放到数组后
   * @param args 需要添加到数组后的数据
   */
  $concat( ...args: any[] ): any[];

  /**
   * 行为类似于原生的 concat 方法, 但是不会创建一个新的数组, 而是将所有传入参数放到数组指定下标位置
   * @param index 需要插入到数组位置的下标
   * @param args 需要添加的数据
   */
  $concatTo( index: Number, ...args: any[] ): any[];

  /**
   * 使用传入的方法遍历集合的内容, 返回首个符合传入方法检测的值
   * @param traversal 遍历集合的方法
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $find( traversal: Function, fromIndex?: Number ) : any;

  /**
   * 遍历集合的内容, 查找到第一个符合传入筛选条件的值
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param obj 需要筛选的一组 key: value 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $find( predicate?: true, obj: any, fromIndex?: Number ) : any;

  /**
   * 遍历集合的内容, 查找到第一个符合传入筛选条件的值
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param arr 需要筛选的一组 [ key, value, ... ] 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $find( predicate?: true, arr: any[], fromIndex?: Number ) : any;

  /**
   * 遍历集合的内容, 查找到第一个符合传入筛选条件的值
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param key 需要匹配的 key 值
   * @param value 需要匹配的 value 值
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $find( predicate?: true, key: String, value: any, fromIndex?: Number ) : any;

  /**
   * 使用传入的方法遍历集合的内容, 返回首个符合传入方法检测的值的下标
   * @param traversal 遍历集合的方法
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findIndex( traversal: Function, fromIndex?: Number ) : Number;

  /**
   * 遍历集合的内容, 查找到第一个符合传入筛选条件的值的下标
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param obj 需要筛选的一组 key: value 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findIndex( predicate?: true, obj: any, fromIndex?: Number ) : Number;

  /**
   * 遍历集合的内容, 查找到第一个符合传入筛选条件的值的下标
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param arr 需要筛选的一组 [ key, value, ... ] 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findIndex( predicate?: true, arr: any[], fromIndex?: Number ) : Number;

  /**
   * 遍历集合的内容, 查找到第一个符合传入筛选条件的值的下标
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param key 需要匹配的 key 值
   * @param value 需要匹配的 value 值
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findIndex( predicate?: true, key: String, value: any, fromIndex?: Number ) : Number;

  /**
   * 使用传入的方法逆序遍历集合的内容, 返回首个符合传入方法检测的值
   * @param traversal 遍历集合的方法
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findLast( traversal: Function, fromIndex?: Number ) : any;

  /**
   * 逆序遍历集合的内容, 查找到第一个符合传入筛选条件的值
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param obj 需要筛选的一组 key: value 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findLast( predicate?: true, obj: any, fromIndex?: Number ) : any;

  /**
   * 逆序遍历集合的内容, 查找到第一个符合传入筛选条件的值
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param arr 需要筛选的一组 [ key, value, ... ] 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findLast( predicate?: true, arr: any[], fromIndex?: Number ) : any;

  /**
   * 逆序遍历集合的内容, 查找到第一个符合传入筛选条件的值
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param key 需要匹配的 key 值
   * @param value 需要匹配的 value 值
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findLast( predicate?: true, key: String, value: any, fromIndex?: Number ) : any;

  /**
   * 使用传入的方法逆序遍历集合的内容, 返回首个符合传入方法检测的值的下标
   * @param traversal 遍历集合的方法
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findLastIndex( traversal: Function, fromIndex?: Number ) : Number;

  /**
   * 逆序遍历集合的内容, 查找到第一个符合传入筛选条件的值的下标
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param obj 需要筛选的一组 key: value 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findLastIndex( predicate?: true, obj: any, fromIndex?: Number ) : Number;

  /**
   * 逆序遍历集合的内容, 查找到第一个符合传入筛选条件的值的下标
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param arr 需要筛选的一组 [ key, value, ... ] 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findLastIndex( predicate?: true, arr: any[], fromIndex?: Number ) : Number;

  /**
   * 逆序遍历集合的内容, 查找到第一个符合传入筛选条件的值的下标
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param key 需要匹配的 key 值
   * @param value 需要匹配的 value 值
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findLastIndex( predicate?: true, key: String, value: any, fromIndex?: Number ) : Number;

  /**
   * 使用传入的方法遍历集合的内容, 返回所有符合传入方法检测的值
   * @param traversal 遍历集合的方法
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findAll( traversal: Function, fromIndex?: Number ) : any[];

  /**
   * 遍历集合的内容, 查找到所有符合传入筛选条件的值
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param obj 需要筛选的一组 key: value 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findAll( predicate?: true, obj: any, fromIndex?: Number ) : any[];

  /**
   * 遍历集合的内容, 查找到所有符合传入筛选条件的值
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param arr 需要筛选的一组 [ key, value, ... ] 键值对
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findAll( predicate?: true, arr: any[], fromIndex?: Number ) : any[];

  /**
   * 遍历集合的内容, 查找到所有符合传入筛选条件的值
   * @param predicate 比对键值时所调用的方法, 将使用传入的方法对值进行检测, 若未传入值或传入 Boolean 值, 则视为是否使用全等进行判断 - default: true
   * @param key 需要匹配的 key 值
   * @param value 需要匹配的 value 值
   * @param fromIndex 从指定的索引开始搜索 - default: 0
   */
  $findAll( predicate?: true, key: String, value: any, fromIndex?: Number ) : any[];

  /**
   * 获取指定下标的对象
   * @param index 需要获取的下标, 可为负数 - default: 0
   */
  $get( index?: 0 ): any;

  /**
   * 获取指定下标开始的若干个对象
   * @param index 需要获取的下标, 可为负数 - default: 0
   * @param num 需要从该下标开始获取几个对象 - default: 1
   */
  $get( index?: 0, num: Number ): any[];

  /**
   * 修改数组指定下标的值
   * @param index 下标, 可为负数
   * @param value 值
   */
  $set( index: Number, value: any ): any[];

  /**
   * 修改数组指定下标的值
   * @param obj 批量修改数组指定下标的值
   */
  $set( obj: { index: Number, value: any } ): any[];

  /**
   * 修改数组内指定下标的值, 修改时无论如何不会超出数组原有范围
   * @param index 下标, 可为负数
   * @param value 值
   */
  $edit( index: Number, value: any ): any[];

  /**
   * 修改数组内指定下标的值, 修改时无论如何不会超出数组原有范围
   * @param obj 批量修改数组内指定下标的值
   */
  $edit( obj: { index: Number, value: any } ): any[];

  /**
   * 修改数组内指定下标的值
   * @param index 下标, 可为负数
   * @param value 值
   */
  $edit( index: Number, value: any ): any[];

  /**
   * 修改数组内指定下标的值
   * @param obj 批量修改数组内指定下标的值
   */
  $edit( obj: { index: Number, value: any } ): any[];

  /**
   * 查找数组内是否有此传入值
   * @param value 需要在数组中检测的对象
   * @param predicate 是否使用全等进行判断, 为 false 则使用双等进行判断, 可传入自定义方法 - default: true
   */
  $inArray( value: any, predicate: Function | Boolean ): Boolean;

  /**
   * 查找数组内是否有此传入值
   * @param predicate 用于自定义筛选内容
   */
  $inArray( predicate: Function ): Boolean;

  /**
   * 移动数组内的某个元素到指定的位置
   * @param from 需要移动的元素下标, 可为负数
   * @param to 需要移动到的位置下标, 可为负数
   */
  $move( from: Number, to: Number ): any[];

  /**
   * 提取数组一个范围内的元素, 移动到指定下标中 ( 指定下标是按照需要移动的元素移除后的下标进行计算 )
   * @param start 需要移动的位置的起始下标, 可为负数
   * @param moveCount 从起始下标开始, 取几位进行移动
   * @param toIndex 需要移动到数组的目标下标, 可为负数
   */
  $moveRange( start: Number, moveCount: Number, toIndex: Number ): any[];

  /**
   * 将一个或多个元素添加到数组的末尾, 并返回当前数组
   * @param args 需要插入到数组末尾的对象
   */
  $push( ...args: any[] ): any[];

  /**
   * 从数组中删除最后一个元素, 并返回当前数组
   */
  $pop(): any[];

  /**
   * 将一个或多个元素添加到数组的开头, 并返回当前数组
   * @param args 需要插入到数组开头的对象
   */
  $unshift( ...args: any[] ): any[];

  /**
   * 从数组中删除第一个元素, 并返回当前数组
   */
  $shift(): any[];

  /**
   * 通过删除现有元素和 / 或添加新元素来更改一个数组的内容, 并返回当前数组
   * @param start 指定修改的开始位置
   * @param deleteCount 整数, 表示要移除的数组元素的个数
   * @param args 要添加进数组的元素
   */
  $splice( start: Number, deleteCount?: Number, ...args?: any ): any[];

}

interface ObjectConstructor {

  /**
   * 将多个源对象的可枚举属性合并到第一个对象中
   * @param shallow 是否使用浅拷贝模式, 类似于使用 Object.assign, 可不填 - Default: false
   */
  $assign( shallow? = false, ...args?: any[] ): any;

  /**
   * 判断传入的两个对象是否相同
   *
   * // 下面的比对结果都是 true
   * Object.$equals( NaN, NaN );
   * Object.$equals( 'ZenJS', 'ZenJS' );
   * Object.$equals( { a: 1 }, { a: 1 } );
   * Object.$equals( [ 1, 2, 3 ], [ 1, 2, 3 ] );
   * Object.$equals( function(){ return true }, function(){ return true } );
   * Object.$equals( new Map([ [ 1, 2 ], [ 3, 4 ] ]), new Map([ [ 1, 2 ], [ 3, 4 ] ]) );
   * Object.$equals( new Set([ 1, 2, 3, 4 ]), new Set([ 1, 2, 3, 4 ]) );
   * Object.$equals( document.createElement('div'), document.createElement('div') );
   * Object.$equals( new Date('2018/7/28'), new Date('2018/7/28') );
   * Object.$equals( /ZenJS/, /ZenJS/ );
   *
   * @param obj 需要判断的第一个对象
   * @param obj2 需要判断的第二个对象
   */
  $equals( obj: any, obj2: any ): Boolean;

  /**
   * 调用传入方法遍历传入对象
   * @param obj 需要进行遍历的对象
   * @param callback 遍历对象时调用的方法, 方法返回 false 时, 将终止后续遍历
   */
  $each( obj: any, callback: Function ): any;

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

interface Object {

  /**
   * 将多个源对象的可枚举属性合并到当前对象中
   * @param shallow 是否使用浅拷贝模式, 类似于使用 Object.assign, 可不填 - Default: false
   */
  $assign( shallow? = false, ...args?: any[] ): any;

  /**
   * 判断当前对象和传入对象是否相同, 比对规则请参考 Object.$equals
   * @param obj 需要比对的对象
   */
  $equals( obj: any ): Boolean;

  /**
   * 调用传入方法遍历当前对象
   * @param callback 遍历当前对象时调用的方法, 方法返回 false 时, 将终止后续遍历
   */
  $each( callback: Function ): any;

  /**
   * 获取对象的某个值
   * @param key 需要获取的值的 key
   */
  $get( key ): any;

  /**
   * 批量获取对象的值, 返回所有传入 key 和对应 value 的键值对
   * @param keys 需要获取的值的 key
   */
  $get( ...keys: any[] ): any;

  /**
   * 设置或修改对象的某个值
   * @param key 需要修改的值的 key
   * @param value 需要设置的值
   */
  $set( key, value ): any;

  /**
   * 批量设置或修改对象的值
   * @param obj key, value 的键值对
   */
  $set( obj ): any;

  /**
   * 删除对象中指定值
   * @param args 可删除多个指定值
   */
  $delete( ...args: any[] ): any;

  /**
   * 删除对象中指定值
   * @param args 可删除多个指定值
   */
  $delete( args: any[] ): any;

  /**
   * 删除对象中指定值
   * @param args 可删除多个指定值
   */
  $remove( ...args: any[] ): any;

  /**
   * 删除对象中指定值
   * @param args 可删除多个指定值
   */
  $remove( args: any[] ): any;

  /**
   * 从对象中删除与传入值相同的值
   * @param value 需要对象中删除的值
   * @param predicate 是否使用全等进行判断, 为 false 则使用双等进行判断, 可传入自定义方法 - default: true
   */
  $deleteValue( value: any, predicate: Function | Boolean ): any;

  /**
   * 从数组中删除与传入值相同的对象
   * @param predicate 用于自定义筛选内容
   */
  $deleteValue( predicate: Function ): any;

  /**
   * 从对象中删除与传入值相同的值
   * @param value 需要对象中删除的值
   * @param predicate 是否使用全等进行判断, 为 false 则使用双等进行判断, 可传入自定义方法 - default: true
   */
  $removeValue( value: any, predicate: Function | Boolean ): any;

  /**
   * 从数组中删除与传入值相同的对象
   * @param predicate 用于自定义筛选内容
   */
  $removeValue( predicate: Function ): any;

  /**
   * 返回当前对象
   */
  $self(): any;

}

interface NumberConstructor {

  /**
   * 判断传入对象是否是数字类型或可转为数字
   * @param obj 需要判断的对象
   */
  $isNumber( obj: any ): Boolean;

}

interface Number {

  /**
   * 将传入数字与当前数字相加, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $add( num: Number ): Number;

  /**
   * 将传入数字与当前数字相加, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $jia( num: Number ): Number;

  /**
   * 将传入数字与当前数字相减, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $subtract( num: Number ): Number;

  /**
   * 将传入数字与当前数字相减, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $jian( num: Number ): Number;

  /**
   * 将传入数字与当前数字相乘, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $multiply( num: Number ): Number;

  /**
   * 将传入数字与当前数字相乘, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $cheng( num: Number ): Number;

  /**
   * 将传入数字与当前数字相除, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $divide( num: Number ): Number;

  /**
   * 将传入数字与当前数字相除, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $chu( num: Number ): Number;

}

interface Math {

  /**
   * 在最小数和最大数之间随机一个数字
   * @param from 指定一个最小数, 可为负数 - default: 0
   * @param to 指定一个最大数, 可为负数 - default: 9
   */
  $random( from: Number, to: Number ): Number;

  /**
   * 在 0 到传入值之间随机一个数字
   * @param to 指定一个数字, 可为负数
   */
  $random( to: Number ): Number;

  /**
   * 在 0 到 9 之间随机一个数字
   */
  $random(): Number;

  /**
   * 将传入的两个数字进行相加, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $add( num1: Number, num2: Number ): Number;

  /**
   * 将传入的两个数字进行相加, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $jia( num1: Number, num2: Number ): Number;

  /**
   * 将传入的两个数字进行相减, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $subtract( num1: Number, num2: Number ): Number;

  /**
   * 将传入的两个数字进行相减, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $jian( num1: Number, num2: Number ): Number;

  /**
   * 将传入的两个数字进行相乘, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $multiply( num1: Number, num2: Number ): Number;

  /**
   * 将传入的两个数字进行相乘, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $cheng( num1: Number, num2: Number ): Number;

  /**
   * 将传入的两个数字进行相除, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $divide( num1: Number, num2: Number ): Number;

  /**
   * 将传入的两个数字进行相除, 不会发生浮点数精度不准的问题
   * @param num1 数字1
   * @param num2 数字2
   */
  $chu( num1: Number, num2: Number ): Number;

  /**
   * 传入多个数字, 求出传入参数的平均值
   * @param args 任意个数数字
   */
  $mean( ...args?: Number[] ): Number;

}

interface StringConstructor {

  /**
   * 随机26个字母中的一个
   * @param uppercase 是否大写 - default: false
   */
  $random( uppercase?: false ): String;

  /**
   * 随机指定长度的字符串
   * @param length 随机的字符串长度 - default: 12
   * @param uppercase 是否随机大写字母 - default: false
   * @param number 是否随机数字 - default: false
   */
  $someRandom( length: Number = 12, uppercase?: false, number?: false ): String;

}

interface String {

  /**
   * 对当前字符串进行全局替换
   * @param searchValue 字符串或正则, 匹配字符串中被替换的部分
   * @param replaceValue 进行替换的字符串, 也可传入方法用来返回新字符串 - default: ''
   */
  $replaceAll( searchValue: String | RegExp, replaceValue: String | Function ): String;

  /**
   * 将字符串首字母大写, 其他字母小写
   * @param ignoreNext 是否忽略其他字母小写的操作
   */
  $toCapitalize( ignoreNext?: Boolean ): String;

}

interface DateConstructor{

  /**
   * 解析传入时间字符串, 返回原生的 Date 对象
   * @param date 标准的 ISO 8601 时间字符串
   */
  $parse( date: String | Date ): Date;

  /**
   * 解析传入时间及时间日期字符串并替换成相应的值
   * @param date 标准的 ISO 8601 时间字符串
   * @param formatStr ( YY: 两位数的年份 )
   *                  ( YYYY: 四位数的年份 )
   *                  ( M: 月份, 从 1 开始 )
   *                  ( MM: 月份, 两位数 )
   *                  ( MMM: 简写的月份名称 )
   *                  ( MMMM: 完整的月份名称 )
   *                  ( D: 月份里的一天 )
   *                  ( DD: 月份里的一天，两位数 )
   *                  ( d: 一周中的一天，星期天是 0 )
   *                  ( dd: 最简写的一周中一天的名称 )
   *                  ( ddd: 简写的一周中一天的名称 )
   *                  ( dddd: 一周中一天的名称 )
   *                  ( H: 小时 )
   *                  ( HH: 小时, 两位数 )
   *                  ( m: 分钟 )
   *                  ( mm: 分钟, 两位数 )
   *                  ( s: 秒 )
   *                  ( ss: 秒, 两位数 )
   *                  ( SSS: 秒, 三位数 )
   *                  ( Z: UTC 的偏移量 )
   *                  ( ZZ: UTC 的偏移量, 数字前面加上 0 )
   *                  ( A: AM PM )
   *                  ( a: am pm )
   */
  $format( date: String | Date, formatStr: String )

}

interface Date {

  /**
   * 返回当前对象的 dayjs 对象
   */
  $dayjs(): Dayjs;

  /**
   * 检测当前时间对象是否是一个有效的时间
   */
  $isValid(): Boolean;

  /**
   * 获取年份
   */
  $year(): Number;

  /**
   * 获取月份
   */
  $month(): Number;

  /**
   * 获取日期
   */
  $date(): Number;

  /**
   * 获取星期
   */
  $day(): Number;

  /**
   * 获取小时
   */
  $hour(): Number;

  /**
   * 获取分钟
   */
  $minute(): Number;

  /**
   * 获取秒
   */
  $second(): Number;

  /**
   * 获取毫秒
   */
  $millisecond(): Number;

  /**
   * 设置时间
   * @param unit 单位,
   *             [ day, d ] 星期几 ( 星期天 0, 星期六 6 ),
   *             [ month, M ] 月
   *             [ year, y ] 年
   *             [ hour, h ] 时
   *             [ minute, m ] 分
   *             [ second, s ] 秒
   *             [ millisecond, ms ] 毫秒
   * @param value 给传入单位设置的值
   */
  $set( unit : String, value : Number ): Date;

  /**
   * 增加时间
   * @param value 给当前时间对象增加的时间值
   * @param unit 单位,
   *             [ day, d ] 星期几 ( 星期天 0, 星期六 6 ),
   *             [ month, M ] 月
   *             [ year, y ] 年
   *             [ hour, h ] 时
   *             [ minute, m ] 分
   *             [ second, s ] 秒
   *             [ millisecond, ms ] 毫秒
   */
  $add( value : Number, unit : String ): Date;

  /**
   * 减少时间
   * @param value 给当前时间的指定单位增加的时间值
   * @param unit 单位,
   *             [ day, d ] 星期几 ( 星期天 0, 星期六 6 ),
   *             [ month, M ] 月
   *             [ year, y ] 年
   *             [ hour, h ] 时
   *             [ minute, m ] 分
   *             [ second, s ] 秒
   *             [ millisecond, ms ] 毫秒
   */
  $subtract( value : Number, unit : String ): Date;

  /**
   * 设置当前时间为指定单位的开头时间
   * @param unit 单位,
   *             [ day, d ] 星期几 ( 星期天 0, 星期六 6 ),
   *             [ month, M ] 月
   *             [ year, y ] 年
   *             [ hour, h ] 时
   *             [ minute, m ] 分
   *             [ second, s ] 秒
   *             [ millisecond, ms ] 毫秒
   */
  $startOf( unit : String ): Date;

  /**
   * 设置当前时间为指定单位的末尾时间
   * @param unit 单位,
   *             [ day, d ] 星期几 ( 星期天 0, 星期六 6 ),
   *             [ month, M ] 月
   *             [ year, y ] 年
   *             [ hour, h ] 时
   *             [ minute, m ] 分
   *             [ second, s ] 秒
   *             [ millisecond, ms ] 毫秒
   */
  $endOf( unit: String ): Date;

  /**
   * 接收一系列的时间日期字符串并替换成相应的值
   * @param formatStr ( YY: 两位数的年份 )
   *                  ( YYYY: 四位数的年份 )
   *                  ( M: 月份, 从 1 开始 )
   *                  ( MM: 月份, 两位数 )
   *                  ( MMM: 简写的月份名称 )
   *                  ( MMMM: 完整的月份名称 )
   *                  ( D: 月份里的一天 )
   *                  ( DD: 月份里的一天，两位数 )
   *                  ( d: 一周中的一天，星期天是 0 )
   *                  ( dd: 最简写的一周中一天的名称 )
   *                  ( ddd: 简写的一周中一天的名称 )
   *                  ( dddd: 一周中一天的名称 )
   *                  ( H: 小时 )
   *                  ( HH: 小时, 两位数 )
   *                  ( m: 分钟 )
   *                  ( mm: 分钟, 两位数 )
   *                  ( s: 秒 )
   *                  ( ss: 秒, 两位数 )
   *                  ( SSS: 秒, 三位数 )
   *                  ( Z: UTC 的偏移量 )
   *                  ( ZZ: UTC 的偏移量, 数字前面加上 0 )
   *                  ( A: AM PM )
   *                  ( a: am pm )
   */
  $format( formatStr: String ): String;

  /**
   * 获取当前时间和传入时间的时间差，默认毫秒
   * @param input 需要和当前时间比较的时间
   * @param units 单位,
   *              [ day, d ] 星期几 ( 星期天 0, 星期六 6 ),
   *              [ month, M ] 月
   *              [ year, y ] 年
   *              [ hour, h ] 时
   *              [ minute, m ] 分
   *              [ second, s ] 秒
   *              [ millisecond, ms ] 毫秒
   * @param float
   */
  $diff( input: String | Date, units: String, float: Boolean ): String;

  /**
   * 返回月份的天数
   */
  $daysInMonth(): Number;

  /**
   * 返回包含时间数值的数组
   */
  $toArray(): Array;

  /**
   * 返回包含时间数值的对象
   */
  $toObject(): any;

  /**
   * 检查当前时间是否在传入时间之前
   * @param input 需要和当前时间比较的时间
   */
  $isBefore( input: String | Date ): Boolean;

  /**
   * 检查当前时间是否和传入时间相同
   * @param input 需要和当前时间比较的时间
   */
  $isSame( input: String | Date ): Boolean;

  /**
   * 检查当前时间是否在传入时间之后
   * @param input 需要和当前时间比较的时间
   */
  $isAfter( input: String | Date ): Boolean;

}

interface Window {

  /**
   * 判断传入参数的类型
   * @param obj 需要判断类型的参数
   */
  $typeof: $typeof

  /**
   * $querystring 模块提供了一些实用函数, 用于解析与格式化 URL 查询字符串
   */
  $querystring: $querystring

  ZenJS: ZenJS

}


/**
 * 判断传入参数的类型
 * @param obj 需要判断类型的参数
 */
declare function $typeof( obj: any ): String;


/**
 * $querystring 模块提供了一些实用函数, 用于解析与格式化 URL 查询字符串
 */
declare const $querystring: $querystring;

interface $querystring {
  /**
   * 将对象进行序列化成 URL 查询字符串
   * @param obj 需要序列化的对象
   * @param sep 在字符串中分隔不同键值对的字符串 - default: '&'
   * @param eq 在字符串中分隔键和值的字符串 - default: '='
   */
  stringify( obj, sep: String = '&', eq: String = '=' ): String;

  /**
   * 将 URL 查询字符串反序列化为对象
   * @param str 需要反序列化的字符串
   * @param sep 在字符串中分隔不同键值对的字符串 - default: '&'
   * @param eq 在字符串中分隔键和值的字符串 - default: '='
   */
  parse( str, sep: String = '&', eq: String = '=' ): any;
}


declare const ZenJS: ZenJS;

interface ZenJS {

  /**
   * GUID, 自动自增
   */
  guid: Number;

  /**
   * 提供了一部分在低级浏览器上不支持的方法,
   * 如果浏览器支持该方法, 使用时将直接返回浏览器自带方法.
   */
  polyfill: {

    /**
     * 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象. 它将返回目标对象.
     * Object.assign polyfill
     */
    assign( ...args: any[] ): any;

    /**
     * 方法返回一个给定对象自身可枚举属性的键值对数组.
     * Object.entries polyfill
     */
    entries( obj: any ): Array[];

  },

  /**
   * 提供了一些内部使用的工具包
   */
  util: {

    /**
     * 判断传入的两个参数是否全等 ( === )
     * @param one 需要判断的第一参数
     * @param two 需要判断的第二参数
     */
    congruence( one: any, two: any ): Boolean;

    /**
     * 判断传入的两个参数是否相等 ( == )
     * @param one 需要判断的第一参数
     * @param two 需要判断的第二参数
     */
    equals( one: any, two: any ): Boolean;

    /**
     * 在一个对象上定义/修改一个新属性 ( 对 Object.defineProperty 的封装 )
     * @param obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
     * @param name 要定义或修改的属性的名称
     * @param options 将被定义或修改的属性描述符
     * @param options2 将被定义或修改的属性描述符, 会覆盖前一个 options
     */
    define( obj: any, name: String, options: any, options2: any );

    /**
     * 在一个对象上定义/修改一个新属性的 value 描述符
     * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
     * @param {String} name 要定义或修改的属性的名称
     * @param {Function} value 将被定义或修改的 value 描述符
     * @param {any} options 将被定义或修改的属性描述符
     */
    defineValue( obj: any, name: String, value: Function, options: any );

    /**
     * 在一个对象上定义/修改一个新属性的 get 描述符
     * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
     * @param {String} name 要定义或修改的属性的名称
     * @param {Function} get 将被定义或修改的 get 描述符
     * @param {any} options 将被定义或修改的属性描述符
     */
    defineGet( obj: any, name: String, get: Function, options: any );

    /**
     * 在传入的两个正整数中随机一个数字
     * @param {Number} from
     * @param {Number} to
     */
    intRandom( from:Number, to:Number ): Number;

    /**
     * 返回传入的第一个参数
     * @param {any} arg
     */
    returnArg( arg: any ): any;

    /**
     * 始终返回 true
     */
    returnTrue(): true;

    /**
     * 始终返回 false
     */
    returnFalse(): false;

    /**
     * 获取方法指定位参数, 若未传入参数, 则取默认值
     * @param args arguments
     * @param index 需要在 argument 中取得默认值的下标
     * @param defaultValue 若未传入值时取得默认值
     */
    parametersDefault( args: IArguments, index: Number, defaultValue: any ): any;

    /**
     * 获取方法从指定位开始的剩余参数
     * @param { IArguments } args arguments
     * @param { Number } index 需要在 arguments 中开始取参数的下标 - default: 0
     */
    parametersRest( args: IArguments, index: Number ): Array[];

    /**
     * 判断传入对象是否是 String 类型
     * @param obj 需要判断的对象
     */
    isString( obj: any ): Boolean;

    /**
     * 判断传入对象是否是 Boolean 类型
     * @param obj 需要判断的对象
     */
    isBoolean( obj: any ): Boolean;

    /**
     * 判断传入对象是否是 Array 类型
     * @param obj 需要判断的对象
     */
    isArray( obj: any ): Boolean;

    /**
     * 判断传入对象是否是 Number 类型, 并且不为 NaN 和 Infinity
     * @param obj 需要判断的对象
     */
    isNumber( obj: any ): Boolean;

    /**
     * 判断传入对象是否是 RegExp 类型
     * @param obj 需要判断的对象
     */
    isRegExp( obj: any ): Boolean;

    /**
     * 判断传入对象是否是 Set 对象
     * @param obj 需要判断的对象
     */
    isSet( obj: any ): Boolean;

    /**
     * 判断传入对象是否是 Map 对象
     * @param obj 需要判断的对象
     */
    isMap( obj: any ): Boolean;

    /**
     * 判断传入对象是否是 Function 类型
     * @param obj 需要判断的对象
     */
    isFunction( obj: any ): Boolean;

    /**
     * 判断传入对象是否是 Object 类型, 并且不为 null
     * @param obj 需要判断的对象
     */
    isObject( obj: any ): Boolean;

    /**
     * 判断一个对象是否是引用类型
     * @param obj 需要判断的对象
     */
    isReferenceType( obj: any ): Boolean;

    /**
     * 将 Map 或 Set 类型转换为数组类型,
     * 执行到这之前必须确定传进来的是 Map 或 Set 类型
     */
    mapSetToArray( mapOrSet: Map | Set )

  },

  /**
   * 创建一个可写的事件对象
   * @param event 原生事件对象
   */
  Event( src: DocumentEventMap ): any;

}


/*
 * DOM API
 */

interface Document {

  /**
   * ( Fat ) document.getElementById 的引用
   * @param elmentId ID
   */
  $id( elmentId: String ): Element;

  /**
   * ( Fat ) 当前页面加载完成后执行传入代码
   *
   * @param func DOM 载入完成后执行的方法
   * @param data 需要传入方法的数据
   */
  $ready( func: () => void, data?: any ): void;

  /**
   * ( Fat ) 调用原生 querySelectorAll 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $query( selectors ): NodeListOf<Element>;

  /**
   * ( Fat ) 调用原生 querySelectorAll 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $find( selectors ): NodeListOf<Element>;

  /**
   * ( Fat ) 调用原生  querySelector 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $queryFirst( selectors ): Element | null;

  /**
   * ( Fat ) 调用原生  querySelector 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $findFirst( selectors ): Element | null;

}

interface Window {

  /**
   * ( Fat ) 当前页面及页面资源载入完成后传入代码
   *
   * @param func 页面及页面资源载入完成后执行的方法
   * @param data 需要传入方法的数据
   */
  $ready: $ready;

}

/**
 * ( Fat ) 当前页面及页面资源载入完成后传入代码
 *
 * @param func 页面及页面资源载入完成后执行的方法
 * @param data 需要传入方法的数据
 */
declare function $ready( func: () => void, data?: any ): void;


interface Element {

  /**
   * ( Fat ) 向元素添加一个或多个类
   * @param className 类名
   */
  $addClass( className: Stirng ): Element;

  /**
   * ( Fat ) 向元素移除一个或多个类
   * @param className 类名
   */
  $removeClass( className: Stirng ): Element;

  /**
   * ( Fat ) 判断元素是否有一个或多个类
   * @param className 类名
   */
  $hasClass( className: Stirng ): Boolean;

  /**
   * ( Fat ) 设置或移除元素的一个或多个类进行切换
   * @param className 类名
   * @param toggle 若值为 true, 则规定只添加类, 反之只移除
   */
  $toggleClass( className: Stirng, toggle: Boolean ): Element;

  /**
   * ( Fat ) 判断当前节点是否符合传入的要求
   * @param selector DOM 节点或 CSS 选择器
   */
  $is( selector: Element | String ): Boolean;

  /**
   * ( Fat ) 判断当前节点是否不符合传入的要求
   * @param selector DOM 节点或 CSS 选择器
   */
  $not( selector: Element | String ): Boolean;

  /**
   * ( Fat ) 获取当前节点下首个匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回首个子节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $first( filter?: Element | String | Function ): Element | null;

  /**
   * ( Fat ) 获取当前节点下首个匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回首个子节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $firstChild( filter?: Element | String | Function ): Element | null;

  /**
   * ( Fat ) 获取当前节点下最后一个匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回最后一个子节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $last( filter?: Element | String | Function ): Element | null;

  /**
   * ( Fat ) 获取当前节点下最后一个匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回最后一个子节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $lastChild( filter?: Element | String | Function ): Element | null;

  /**
   * ( Fat ) 获取当前节点的下一个匹配过滤条件的节点,
   * 若未传入过滤条件, 则直接返回当前节点的下一个节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $next( filter?: Element | String | Function ): Element | null;

  /**
   * ( Fat ) 获取当前节点的上一个匹配过滤条件的节点,
   * 若未传入过滤条件, 则直接返回当前节点的上一个节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $prev( filter?: Element | String | Function ): Element | null;

  /**
   * ( Fat ) 获取从当前节点后面的所有匹配过滤条件的兄弟节点,
   * 若未传入过滤条件, 则直接返回当前节点后面的所有兄弟节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $nextAll( filter?: Element | String | Function ): Element[];

  /**
   * ( Fat ) 获取从当前节点前面的所有匹配过滤条件的兄弟节点,
   * 若未传入过滤条件, 则直接返回当前节点前面的所有兄弟节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $prevAll( filter?: Element | String | Function ): Element[];

  /**
   * ( Fat ) 获取当前节点下的所有匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回所有子节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $child( filter?: Element | String | Function ): Element[];

  /**
   * ( Fat ) 获取当前节点下的所有匹配过滤条件的子节点,
   * 若未传入过滤条件, 则返回所有子节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $children( filter?: Element | String | Function ): Element[];

  /**
   * ( Fat ) 获取当前节点的父节点, 可传入过滤条件对父节点进行过滤
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $parent( filter?: Element | String | Function ): Element | null;

  /**
   * ( Fat ) 获取当前节点的符合过滤条件的父节点, 未查找到会一直继续向上查找,
   * 若未传入过滤条件, 则直接返回当前节点的父节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   * @param checkSelf 是否从当前节点开始检测, 不从当前节点的父节点开始
   */
  $parents( filter?: Element | String | Function, checkSelf?: Boolean ): Element | null;

  /**
   * ( Fat ) 获取当前节点的所有符合过滤条件的兄弟节点
   * 若未传入过滤条件, 则直接返回当前节点的所有兄弟节点
   * @param filter 过滤条件: 方法或者 DOM 节点或 CSS 选择器
   */
  $siblings( filter?: String | Function ): Element | null;

  /**
   * ( Fat ) 添加元素到当前元素内的尾部
   * @param elem 需要添加的元素
   * @returns 返回当前元素
   */
  $append( elem: Element ): Element;

  /**
   * ( Fat ) 添加元素到当前元素内的头部
   * @param elem 需要添加的元素
   * @returns 返回当前元素
   */
  $prepend( elem: Element ): Element;

  /**
   * ( Fat ) 添加当前元素到目标元素的尾部
   * @param elem 目标元素
   * @returns 返回当前元素
   */
  $appendTo( elem: Element ): Element;

  /**
   * ( Fat ) 添加当前元素到目标元素的元素
   * @param elem 目标元素
   * @returns 返回当前元素
   */
  $prependTo( elem: Element ): Element;

  /**
   * ( Fat ) 将目标元素插入到当前元素前面
   * @param elem 目标元素
   * @returns 返回当前元素
   */
  $before( elem: Element ): Element;

  /**
   * ( Fat ) 将目标元素插入到当前元素后面
   * @param elem 目标元素
   * @returns 返回当前元素
   */
  $after( elem: Element ): Element;

  /**
   * ( Fat ) 移除当前节点
   */
  $delete();

  /**
   * ( Fat ) 移除当前节点
   */
  $remove();

  /**
   * ( Fat ) 调用原生 querySelectorAll 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $query( selectors ): NodeListOf<Element>;

  /**
   * ( Fat ) 调用原生 querySelectorAll 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $find( selectors ): NodeListOf<Element>;

  /**
   * ( Fat ) 调用原生  querySelector 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $queryFirst( selectors ): Element | null;

  /**
   * ( Fat ) 调用原生  querySelector 方法
   * @param selectors 包含一个或多个要匹配的选择器的 DOMString
   */
  $findFirst( selectors ): Element | null;

  /**
   * ( Fat ) 将当前元素替换为新的元素
   * @param elem
   */
  $replaceWith( elem: Element );

  /**
   * ( Fat ) 将当前元素替换为新的元素
   * @param elem
   */
  $replace( elem: Element );

  /**
   * ( Fat ) 读取时获取元素的小写 nodeName;
   * 不可写入
   */
  _nodeName: String;

  /**
   * ( Fat ) 读取时获取元素在父元素的下标;
   * 写入时将元素的下标设置为写入值 ( 将会移动元素 )
   */
  _index: Number;

  /**
   * ( Fat ) 读取时返回元素的宽度;
   * 写入时设置元素的宽度
   */
  _width: Number;

  /**
   * ( Fat ) 读取时返回元素的高度;
   * 写入时设置元素的高度
   */
  _height: Number;

  /**
   * ( Fat ) 读取时返回元素的 innerHTML 值
   * 写入时设置元素的 innerHTML 值
   */
  _html: String;

  /**
   * ( Fat ) 读取时返回元素的 value 值;
   * 写入时设置元素的 value 值
   */
  _val: String;

  /**
   * ( Fat ) 读取时返回元素的 value 值;
   * 写入时设置元素的 value 值
   */
  _value: String;

}

interface EventTarget {

  /**
   * ( Fat ) 返回存储在对象上的全部数据
   */
  $data(): any;

  /**
   * ( Fat ) 读取指定名称的数据
   * @param name 需要读取的数据名称
   */
  $data( name: String ): any;

  /**
   * ( Fat ) 将数据读取或存储
   * @param name 需要存储的数据名称
   * @param value 存储的数据
   * @param weakRead 当前值为 true 时, 同样视为读取, 当前名称下有数据返回数据, 如无数据, 将 value 赋值并返回
   */
  $data( name: String, value: any, weakRead?: Boolean ): any;

  /**
   * ( Fat ) 判断当前对象下是否存有数据
   */
  $hasData(): Boolean;

  /**
   * ( Fat ) 传入数据名称, 判断当前对象下是否存储了这个数据
   * @param {String} name 需要判断的数据名称
   */
  $hasData( name: String ): Boolean;

  /**
   * ( Fat ) 删除存储在对象上的全部数据
   */
  $deleteData(): any;

  /**
   * ( Fat ) 传入数据名称, 删除当前对象下存储的相应名称的数据
   * @param {String} name 需要删除的数据名称, 多个可使用空格分隔
   */
  $deleteData( names: String ): any;

  /**
   * ( Fat ) 传入键值对事件进行绑定
   * @param obj \{ 事件: 方法 }
   * @param selector 事件代理选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $on( obj: any, selector?: String, options?: any ): any;

  /**
   * ( Fat ) 传入事件名和方法对事件进行绑定
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param selector 事件代理选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $on( types: String, listener: Function, selector?: String, options?: any ): any;

  /**
   * ( Fat ) 传入键值对事件进行绑定, 只会执行一次
   * @param obj \{ 事件: 方法 }
   * @param selector 事件代理选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $one( obj: any, selector?: String, options?: any ): any;

  /**
   * ( Fat ) 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param selector 事件代理选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $one( types: String, listener: Function, selector?: String, options?: any ): any;

  /**
   * ( Fat ) 传入键值对事件进行绑定, 只会执行一次
   * @param obj \{ 事件: 方法 }
   * @param selector 事件代理选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $once( obj: any, selector?: String, options?: any ): any;

  /**
   * ( Fat ) 传入事件名和方法对事件进行绑定, 只会执行一次
   * @param types 需要绑定的事件名
   * @param listener 需要绑定到事件上的方法, 可为 Boolean 值, 会自动替换为 return[ true | false ] 方法
   * @param selector 事件代理选择器
   * @param options 原生事件绑定参数, useCapture || { capture, passive, once }
   */
  $once( types: String, listener: Function, selector?: String, options?: any ): any;

  /**
   * ( Fat ) 传入事件名和方法进行事件移除
   * @param types 需要解绑的事件集
   * @param selector 事件委托选择器,
   *                 若不填, 则移除所有无事件委托选择器相关事件方法;
   *                 若值为 "*", 则移除所有事件委托选择器相关事件方法;
   *                 若值为 "**", 则移除所有相关事件方法, 不管有没有事件委托选择器;
   *                 为其他值, 则会移除匹配到的事件委托选择器的相关事件方法
   * @param listener 解绑的事件, 只会移除与传入方法匹配的相关事件方法
   */
  $off( types: String, selector?: String, listener?: Function ): any;

  /**
   * ( Fat ) 触发绑定在元素上的事件( 只触发事件 )
   * @param types 触发的事件名
   * @param data 向方法传递的数据, 可为多个
   */
  $emit( types: String, ...data?: any[] ): any;

}


interface Document {

  /**
   * ( Plugins ) 读取页面所有 cookie, 以键值对返回
   */
  $cookie(): any;

  /**
   * ( Plugins ) 读取传入名称的页面 cookie
   * @param value 需要读取的 cookie 的值
   */
  $cookie( key: String ): String | undefined;

  /**
   * ( Plugins ) 设置页面 cookie
   * @param key 需要设置的 cookie 的名称
   * @param value 需要设置的 cookie 的值
   * @param attributes cookie 的配置
   */
  $cookie( key: String, value: String, attributes?: any ): String;

  /**
   * ( Plugins ) 删除页面指定 cookie
   * @param key 需要删除的 cookie 名称
   * @param attributes cookie 的配置
   */
  $deleteCookie( key: String, attributes?: any );

  /**
   * ( Plugins ) 删除页面指定 cookie
   * @param key 需要删除的 cookie 名称
   * @param attributes cookie 的配置
   */
  $removeCookie( key: String, attributes?: any );

}