import defineValue from "../../../shared/util/defineValue";
import Date from "../../../shared/global/Date/index";
import dayjs from "../../../shared/dependencies/dayjs/dayjs";
import DAYJS from "../../10. Date.prototype/$dayjs/index";


defineValue( Date, '$parse', function( date ){
  const $dayjs = dayjs( date );
  const $date = $dayjs.toDate().$set( DAYJS, $dayjs );

  return $date;
});