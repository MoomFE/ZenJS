import inBrowser from "../const/inBrowser";


/**
 * 判断当前浏览器将 input 的 type 类型切换到 radio 时, 是否会丢失 value 值
 */
let supportsRadioValue = true;

if( inBrowser ){

  const input = document.createElement('input');
  
  input.value = 't';
  input.type = 'radio';

  // Support: IE <=11 only
	// An input loses its value after becoming a radio
  supportsRadioValue = input.value === 't';

}

export default supportsRadioValue;