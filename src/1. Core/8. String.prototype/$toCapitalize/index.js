import defineValue from "../../../shared/util/defineValue";
import StringProto from "../../../shared/global/String/prototype/index";


[ '$toCapitalize', '' ].forEach(( name, index ) => {
  const fn = [ 'toUpperCase', 'toLowerCase' ][ index ? 'reverse' : '$self' ]();
  const toUpperCase = fn[0];
  const toLowerCase = fn[1];

  defineValue( StringProto, `${ name } $${ toUpperCase.replace('C','FirstC') }`, function( ignoreNext ){
    return this.substr( 0, 1 )[ toUpperCase ]() + this.substr( 1 )[ ignoreNext ? '$self' : toLowerCase ]();
  });
});