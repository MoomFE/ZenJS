import inBrowser from "../const/inBrowser";
import getStyles from "../../2. Dom/3. Element/$css/util/getStyles";


/**
 * 判断当前浏览器的 getComputedStyle 方法是否支持返回复合样式
 */
let supportsCompoundStyle = true;

if( inBrowser ){

  const div = document.createElement('div').$appendTo( document.documentElement );
        div.style.margin = '10px';

  const margin = getStyles( div ).getPropertyValue('margin');

  supportsCompoundStyle = margin !== '';

  div.$remove();

}

export default supportsCompoundStyle;