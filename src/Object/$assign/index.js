import Object from '../../shared/global/Object/index';
import assign from '../../shared/global/Object/assign';
import concat from '../../shared/global/Array/prototype/concat';

import define from '../../shared/util/defineValue';


export default function $assign(){
  return assign.apply(
    null,
    concat.apply( [{}], arguments )
  )
};

define( Object, '$assign', $assign );