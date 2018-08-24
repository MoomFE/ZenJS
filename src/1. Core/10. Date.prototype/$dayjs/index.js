import defineValue from "../../../shared/util/defineValue";
import DateProto from "../../../shared/global/Date/prototype/index";
import dayjs from "../../../shared/dependencies/dayjs/dayjs";


const DAYJS = '__ZENJS_DAYJS__';

defineValue( DateProto, '$dayjs', function(){
  let $dayjs = this[ DAYJS ];

  if( !$dayjs || $dayjs.valueOf() !== +this ){
    return this[ DAYJS ] = dayjs( this );
  }

  return $dayjs;
});

export default DAYJS;