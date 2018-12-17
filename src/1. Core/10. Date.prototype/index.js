import './$dayjs/index';






import dayjs from "../../shared/dependencies/dayjs/dayjs";
import keys from "../../shared/global/Object/keys";
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
  keys( Dayjs.prototype ).forEach( key => {
    ( key.indexOf('$') === 0 || ignore.indexOf( key ) > -1 ) || install( key );
  });
});

function install( name ){
  defineValue( DateProto, '$' + name, function(){
    let $dayjs = this.$dayjs();
    let result = $dayjs[ name ].apply( $dayjs, arguments );

    if( isDayjs( result ) ){
      this.setTime( result.valueOf() );
      this[ DAYJS ] = result;
      return this;
    }
    return result;
  });
}