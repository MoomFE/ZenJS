import defineValue from '../../shared/util/defineValue';
import StringProto from '../../shared/global/String/prototype/index';


defineValue( StringProto, '$toCapitalize', function $toCapitalize( ignoreNext ){
  return this.substr(0,1).toUpperCase() + this.substr(1)[ ignoreNext ? '$self' : 'toLowerCase' ]();
});