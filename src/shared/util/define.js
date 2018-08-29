import defineProperty from '../global/Object/defineProperty';
import assign from '../global/Object/assign';


/**
 * 在一个对象上定义/修改一个新属性 ( 对 Object.defineProperty 的封装 )
 * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
 * @param {String} name 要定义或修改的属性的名称
 * @param {any} options 将被定义或修改的属性描述符
 * @param {any} options2 将被定义或修改的属性描述符, 会覆盖前一个 options
 */
export default function define( obj, name, options, options2 ){

  if( obj == null ){
    return;
  }

  name.split(' ').forEach( name => {
    defineProperty(
      obj, name, assign(
        {}, options, options2
      )
    );
  });
}