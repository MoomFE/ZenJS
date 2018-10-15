import inBrowser from "../../../shared/const/inBrowser";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import defineValue from "../../../shared/util/defineValue";
import slice from "../../../shared/global/Array/prototype/slice";


if( inBrowser ){
  [ document, ElementProto ].forEach( elem => {
    const querySelectorAll = elem.querySelectorAll;

    defineValue( elem, '$query $find', function(){
      return slice.call(
        querySelectorAll.apply( this, arguments )
      );
    });

    defineValue( elem, '$queryFirst $findFirst', elem.querySelector );

  });
}