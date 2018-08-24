import dayjs from "../../shared/dependencies/dayjs/dayjs";
import keys from "../../shared/global/Object/keys";
import defineValue from "../../shared/util/defineValue";
import DateProto from "../../shared/global/Date/prototype/index";


const DAYJS = '__ZENJS_DAYJS__';
const ignore = 'parse_init_clone_valueOf_toDate_toJSON_toISOString_toString_unix'.split('_');
const isDayjs = dayjs.isDayjs;

dayjs.extend(( option, Dayjs ) => {
  keys( Dayjs.prototype ).forEach( key => {
    ( key.indexOf('$') === 0 || ignore.indexOf( key ) > -1 ) || install( key );
  })
});

function install( name ){
  defineValue( DateProto, '$' + name, function(){
    let $dayjs = this.$dayjs();
    let result = $dayjs[ name ].apply( $dayjs, arguments );

    if( isDayjs( result ) ){
      return ( this[ DAYJS ] = result ).toDate();
    }
    return result;
  });
}

defineValue( DateProto, '$dayjs', function(){
  let $dayjs = this[ DAYJS ];

  if( !$dayjs || $dayjs.valueOf() !== +this ){
    return this[ DAYJS ] = dayjs( this );
  }

  return $dayjs;
});