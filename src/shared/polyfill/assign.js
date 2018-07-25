import assign from "../global/Object/assign";
import extend from "../util/extend";
import slice from "../global/Array/prototype/slice";


export default assign || function(){
  extend.apply(
    null,
    [ true ].concat(
      slice.call( arguments )
    )
  );
}