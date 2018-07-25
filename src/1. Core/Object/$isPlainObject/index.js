import Object from '../../shared/global/Object/index';
import defineValue from '../../shared/util/defineValue';
import $isPlainObject from '../../../shared/util/isPlainObject';


defineValue( Object, '$isPlainObject', $isPlainObject );