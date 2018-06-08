import $create from "../../../Object/$create/index";


const event = $create( true, {
  /**
   * 当事件绑定的方法返回 false 时,
   * 是否阻止浏览器默认事件且停止将事件冒泡到父节点
   */
  returnFalse: false
});

export default event;