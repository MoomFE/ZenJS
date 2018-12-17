import './$dayjs/index';






import Date from '../../shared/global/Date/index';
import dayjs from "../../shared/dependencies/dayjs/dayjs";
import entries from '../../shared/global/Object/entries';
import defineValue from "../../shared/util/defineValue";
import DateProto from "../../shared/global/Date/prototype/index";
import DAYJS from './$dayjs/index';
import isBetween from '../../shared/dependencies/dayjs/plugin/isBetween';
import isSameOrBefore from '../../shared/dependencies/dayjs/plugin/isSameOrBefore';
import isSameOrAfter from '../../shared/dependencies/dayjs/plugin/isSameOrAfter';
import isLeapYear from '../../shared/dependencies/dayjs/plugin/isLeapYear';

[
  isBetween,
  isSameOrBefore,
  isSameOrAfter,
  isLeapYear
].forEach( dayjs.extend );


const ignore = 'clone_init_parse_toDate_toISOString_toJSON_toString_locale'.split('_');
const isDayjs = dayjs.isDayjs;

dayjs.extend(( option, Dayjs ) => {
  entries( Dayjs.prototype ).forEach( obj => {
    ( obj[0].indexOf('$') === 0 || ignore.indexOf( obj[0] ) > -1 ) || install( obj[0], obj[1] );
  });
});

function install( name, fn ){

  defineValue( DateProto, '$' + name, function(){
    const result = fn.apply( this.$dayjs(), arguments );

    if( isDayjs( result ) ){
      this.setTime( result.valueOf() );
      this[ DAYJS ] = result;
      return this;
    }
    return result;
  });

  [ 'isValid', 'format' ].$inArray( name ) || defineValue( Date, '$' + name, function(){
    const result = fn.apply( dayjs(), arguments );

    return isDayjs( result ) ? result.$d.$set( DAYJS, result )
                             : result;
  });

}