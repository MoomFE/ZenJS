import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import { $isNumber } from "../../../shared/util/isNumber";


if( inBrowser ){

  [ 'width', 'height' ].forEach( prop => {

    defineValue( ElementProto, `$${ prop }`, function( value ){

      if( arguments.length ){
        this.style.setProperty( prop, $isNumber( value ) ? `${ value }px` : value );
        return this;
      }

      try{
        return this.getBoundingClientRect()[ prop ];
      }catch( error ){
        return 0;
      }
    });

  });

}