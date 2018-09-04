import inBrowser from "../../../shared/const/inBrowser";
import define from "../../../shared/util/define";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import { $isNumber } from "../../../shared/util/isNumber";


if( inBrowser ){
  [ 'width', 'height' ].forEach( prop => {
    define( ElementProto, `_${ prop }`, {
      get(){
        try{
          return this.getBoundingClientRect()[ prop ];
        }catch( error ){
          return 0;
        }
      },
      set( value ){
        this.style[ prop ] = $isNumber( value ) ? value + 'px' : value;
      }
    });
  });
}