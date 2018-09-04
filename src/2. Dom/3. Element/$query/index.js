import inBrowser from "../../../shared/const/inBrowser";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import defineValue from "../../../shared/util/defineValue";


if( inBrowser ){
  [ document, ElementProto ].forEach( elem => {
    defineValue( elem, '$query $find', elem.querySelectorAll );
    defineValue( elem, '$queryFirst $findFirst', elem.querySelector );
  });
}