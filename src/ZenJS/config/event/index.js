import $create from "../../../Object/$create/index";


const event = $create( true, {
  /**
   * 当事件绑定的方法返回 false 时,
   * 是否阻止浏览器默认行为且停止事件冒泡
   */
  returnFalse: false,
  /**
   * 绑定事件时, 是否允许使用修饰符
   */
  modifiers: true
});

export default event;