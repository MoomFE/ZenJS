import inBrowser from "../const/inBrowser";


const supportsRadioValue = true;

if( inBrowser ){

  const input = document.createElement('input');
  
  input.value = 't';
  input.type = 'radio';

  // Support: IE <=11 only
	// An input loses its value after becoming a radio
  supportsRadioValue = input.value === 't';

}

export default supportsRadioValue;