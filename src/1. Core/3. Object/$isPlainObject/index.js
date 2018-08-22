import defineValue from "../../../shared/util/defineValue";
import Object from "../../../shared/global/Object/index";
import isPlainObject from "../../../shared/util/isPlainObject";


defineValue( Object, '$isPlainObject', isPlainObject );