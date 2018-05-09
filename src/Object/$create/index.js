import Object from '../../shared/global/Object/index';
import assign from '../../shared/global/Object/assign';
import create from '../../shared/global/Object/create';
import concat from '../../shared/global/Array/prototype/concat';

import define from '../../shared/util/defineValue';

export default function $create(){
  return assign.apply(
    null,
    concat.apply(
      [ create( null ) ],
      arguments
    )
  )
};

define( Object, '$create', $create );