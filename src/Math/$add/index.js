import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import slice from "../../shared/global/Array/prototype/slice";


export function $add( num1, num2 ){
  return ( num1 * 10 + num2 * 10 ) / 10;
}

export function $addPlus(){
  const args = slice.call( arguments ).map( num => num * 10 );
  const count = args.reduce(( count, next ) => count + next );

  return count / 10;
}

defineValue( Math, {
  $add,
  $addPlus
});