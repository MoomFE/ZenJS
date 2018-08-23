import defineValue from "../../../shared/util/defineValue";
import Date from "../../../shared/global/Date/index";
import dayjs from "../../../shared/dependencies/dayjs/dayjs";


defineValue( Date, '$parse', date => {
  console.log(
    dayjs
  )
});