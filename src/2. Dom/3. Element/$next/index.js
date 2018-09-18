import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import { Filter, dir } from "../$first/util";


inBrowser && [
  [ '$next', 'nextElementSibling' ],
  [ '$prev', 'previousElementSibling' ]
].forEach( arr => {

  const name = arr[ 0 ];
  const fn = arr[ 1 ];

  defineValue( ElementProto, name, function( filter ){
    return Filter( this, filter, fn );
  });

  defineValue( ElementProto, name + 'All', function( filter ){
    return Filter( dir( this, fn ), filter );
  });

});