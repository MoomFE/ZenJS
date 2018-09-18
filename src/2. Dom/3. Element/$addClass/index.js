import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import rnothtmlwhite from "../../../shared/const/rnothtmlwhite";


function access( elem, _className, handle ){

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
  // 切换 class
  else if( handle === null ){
    className.forEach( name => {
      classList[ classList.contains( name ) ? 'remove' : 'add' ]( name );
    });
  }
  // 正常添加删除
  else{
    className.forEach( name => classList[ handle ]( name ) );
  }

  return elem;
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

  defineValue( ElementProto, '$toggleClass', function( className, tSwitch ){
    const handle = arguments.length > 1 ? tSwitch ? 'add' : 'remove'
                                        : null;
    return access( this, className, handle );
  });

}