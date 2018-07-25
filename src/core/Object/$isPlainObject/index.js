import Object from '../../shared/global/Object/index';
import defineValue from '../../shared/util/defineValue';
import $isPlainObject from './util';


defineValue( Object, '$isPlainObject', $isPlainObject );