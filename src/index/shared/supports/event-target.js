import inBrowser from "../const/inBrowser";


/**
 * @type {Boolean} 判断当前环境是否支持 EventTarget
 */
const supportsEventTarget = inBrowser && 'EventTarget' in window;

export {
  supportsEventTarget
};