import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import isArray from "../../../shared/global/Array/isArray";
import $add from "../$add/index";
import parametersRest from "../../../shared/util/parametersRest";
import fixArrayIndex from "../../../shared/util/fixArrayIndex";
import slice from "../../../shared/global/Array/prototype/slice";


defineValue( ArrayProto, '$concat', function(){

  slice.call( arguments ).forEach( arg => {
    $add(
      this,
      -1,
      isArray( arg ) ? arg : [ arg ]
    );
  });

  return this;
});

defineValue( ArrayProto, '$concatTo', function( index ){
  const args = parametersRest( arguments, 1 );

  if( !args.length ){
    return this;
  }

  const originLength = this.length;
  let increasedLength = 0;

  index = fixArrayIndex( this, index, 1 );

  args.forEach( arg => {
    $add(
      this,
      increasedLength + index,
      isArray( arg ) ? arg : [ arg ]
    );
    // 用于修正 index, 后续的 arg 需要插入到前面的 arg 后面
    increasedLength = this.length - originLength;
  });

  return this;
});