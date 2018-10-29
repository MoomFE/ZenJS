import inBrowser from "../const/inBrowser";
import getStyles from "../../2. Dom/3. Element/$css/util/getStyles";


let supportsCompoundStyle = true;

if( inBrowser ){

  const div = document.createElement('div').$appendTo( document.documentElement );
        div.style.margin = '10px';

  const margin = getStyles( div ).getPropertyValue('margin');

  supportsCompoundStyle = margin !== '';

  div.$remove();

}

export default supportsCompoundStyle;