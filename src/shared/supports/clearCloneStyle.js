import inBrowser from "../const/inBrowser";


/**
 * 判断当设置克隆元素的背景相关样式为空时, 是否会清空原元素的样式
 */
let supportsClearCloneStyle = false;

if( inBrowser ){

  const div = document.createElement('div');
        div.style.backgroundClip = 'content-box';

  div.cloneNode( true ).style.backgroundClip = '';

  supportsClearCloneStyle = div.style.backgroundClip === "content-box";

}

export default supportsClearCloneStyle;