import parametersDefault from "./parametersDefault";
import $toArray from "../../Array/$toArray/index";


export default function parametersRest( args ){
  const index = parametersDefault( arguments, 1, 0 );
  const length = args.length;

  if( length > index ){
    return $toArray( args ).$get( index, length );
  }
  return [];
}