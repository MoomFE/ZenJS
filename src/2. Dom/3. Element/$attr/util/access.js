import isObject from "../../../../shared/util/isObject";
import slice from "../../../../shared/global/Array/prototype/slice";


export default function access( elem, arg, args, func ){
  let name;

  if( isObject( arg ) ){
    args = slice.call( args ).splice( 0, 1 );

    for( name in arg ){
      func.apply( elem, [ name, arg[ name ] ].concat( args ) )
    }
  }else{
    return func.apply( elem, args );
  }

  return elem;
}