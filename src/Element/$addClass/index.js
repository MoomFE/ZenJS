import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import rnothtmlwhite from "../../shared/const/rnothtmlwhite";
import inBrowser from "../../shared/const/inBrowser";


/**
 * 
 * @param {Element} elem 
 * @param {String} className 
 * @param {String} handle 
 * @param {Boolean} isToggle
 */
function access( elem, _className, handle, isToggle ){

  const classList = elem.classList,
        className = ( _className || '' ).match( rnothtmlwhite ) || [];

  if( handle === 'has' ){
    let index = 0,
        length = className.length;

    for( ; index < length; index++ ){
      if( classList.contains( className[ index ] ) === false )
        return false;
    }

    return length !== 0;
  }

  // 强制引导渲染元素
  elem.offsetHeight;

  if( isToggle ){
    className.forEach( _class => {
      classList.contains( _class ) ? classList.remove( _class )
                                   : classList.add( _class );
    });
  }else{
    className.forEach( _class => {
      classList[ handle ]( _class );
    });
  }

  return elem;
}


inBrowser && defineValue( ElementProto, {
  $addClass( className ){
    return access( this, className, 'add' );
  },
  $removeClass( className ){
    return access( this, className, 'remove' );
  },
  $hasClass( className ){
    return access( this, className, 'has' );
  },
  $toggleClass( className, tSwitch ){
    let notSwitch = !( arguments.length > 1 );

    return access(
      this, className,
      notSwitch ? null
                : tSwitch ? 'add' : 'remove',
      notSwitch
    );
  }
});