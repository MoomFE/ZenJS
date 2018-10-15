import "../../2. Dom/3. Element/$append";
import inBrowser from "../const/inBrowser";


let supportsSelectedIndex = true;

if( inBrowser ){

  const select = document.createElement( 'select' );
  const option = document.createElement( 'option' ).$appendTo( select );

  // Support: IE <=11 only
	// Must access selectedIndex to make default options select
  supportsSelectedIndex = option.selected;

}

export default supportsSelectedIndex;