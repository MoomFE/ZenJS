import "../../2. Dom/3. Element/$append";
import inBrowser from "../const/inBrowser";


/**
 * 判断当前浏览器的 option 是否在不激活 selectedIndex 属性时, 是始终返回 false 的
 */
let supportsSelectedIndex = true;

if( inBrowser ){

  const select = document.createElement( 'select' );
  const option = document.createElement( 'option' ).$appendTo( select );

  // Support: IE <=11 only
	// Must access selectedIndex to make default options select
  supportsSelectedIndex = option.selected;

}

export default supportsSelectedIndex;