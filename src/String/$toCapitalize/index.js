import defineValue from '../../shared/util/defineValue';
import StringProto from '../../shared/global/String/prototype/index';

/**
 * 将字符串首字母大写
 * 
 * @returns {String}
 */
export default function $toCapitalize(){
  return this.substr(0,1).toUpperCase() + this.substr(1).toLowerCase();
}

defineValue( StringProto, '$toCapitalize', $toCapitalize );