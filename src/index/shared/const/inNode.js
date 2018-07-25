/**
 * @type {Boolean} 当前是否是 Node 环境
 */
const inNode = typeof global !== 'undefined';

export default inNode;