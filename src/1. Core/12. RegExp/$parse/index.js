import defineValue from "../../../shared/util/defineValue";
import RegExp from "../../../shared/global/RegExp/index";
import rkeyword from "../../../shared/const/rkeyword";


defineValue( RegExp, '$parse', ( keyword, flags ) => {
  return new RegExp(
    keyword.replace( rkeyword, '\\$1' ),
    flags
  );
});