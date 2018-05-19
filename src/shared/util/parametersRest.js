import "../../Array/$get/index";

export default function parametersRest( args, index ){
  const length = args.length;

  if( length > index ){
    return Array.from( args ).$get( index, length );
  }
  return [];
}