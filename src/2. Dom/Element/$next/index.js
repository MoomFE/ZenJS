import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import { Filter, dir } from "../util";


inBrowser && [
  [ '$next', 'nextElementSibling' ],
  [ '$prev', 'previousElementSibling' ]
].forEach( arr => {

  const name = arr[ 0 ],
        fn = arr[ 1 ];
  const options = {};

  options[ name ] = function( filter ){
    return Filter( this, filter, fn );
  };
  options[ name + 'All' ] = function( filter ){
    return Filter( dir( this, fn ), filter );
  }

  defineValue( ElementProto, options );

});