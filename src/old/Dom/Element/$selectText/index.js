import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";


inBrowser && defineValue( ElementProto, '$selectText', function(){
  let range;

  // input
  if( this.select ){
    this.select();
  }
  // contenteditable
  else if( this.hasAttribute('contenteditable') ){
    if( document.selection ){
      range = document.body.createTextRange();
      range.moveToElementText( this );
      range.select();
    }else if( window.getSelection ){
      range = document.createRange();
      range.selectNodeContents( this );
      window.getSelection().removeAllRanges();
      window.getSelection().addRange( range );
    }
  }
});