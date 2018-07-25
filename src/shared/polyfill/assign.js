import extend from "../util/extend";
import slice from "../global/Array/prototype/slice";
import Object from "../global/Object/index";


export default Object.assign || function(){
  extend.apply(
    null,
    [ true ].concat(
      slice.call( arguments )
    )
  );
}