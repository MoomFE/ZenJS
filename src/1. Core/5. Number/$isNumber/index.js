import defineValue from "../../../shared/util/defineValue";
import Number from "../../../shared/global/Number/index";
import { $isNumber } from "../../../shared/util/isNumber";


defineValue( Number, '$isNumber', $isNumber );