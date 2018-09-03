import inBrowser from "../../../shared/const/inBrowser";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import rnothtmlwhite from "../../../shared/const/rnothtmlwhite";


function access( elem, _className, handle, isToggle ){

  const classList = elem.classList;
  const className = ( _className || '' ).match( rnothtmlwhite ) || [];

  // 判断是 class 否存在
  if( handle === 'has' ){
    const length = className.length;
    let index = 0;

    for( ; index < length; index++ ){
      if( classList.contains( className[ index ] ) === false ){
        return false;
      }
    }

    // 以防传入空等值时返回 true
    return length !== 0;
  }

  // 正常添加删除
  className.forEach( name => classList[ handle ]( name ) );
}

if( inBrowser ){

  defineValue( ElementProto, '$addClass', function( className ){
    return access( this, className, 'add' );
  });

  defineValue( ElementProto, '$removeClass $deleteClass', function( className ){
    return access( this, className, 'remove' );
  });

  defineValue( ElementProto, '$hasClass', function( className ){
    return access( this, className, 'has' );
  });

  defineValue( ElementProto, '$toggleClass', function( className ){
    const isToggle = arguments.length > 1;
    // 饿了, 吃饭去
    return access( this, className );
  });

}