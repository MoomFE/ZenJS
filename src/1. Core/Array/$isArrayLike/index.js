import defineValue from "../../../shared/util/defineValue";
import Array from "../../../shared/global/Array/index";
import isArrayLike from "../../../shared/util/isArrayLike";


defineValue( Array, '$isArrayLike', isArrayLike );