import unCamelCase from "../util/unCamelCase";
import cssHooks from "../const/cssHooks";
import getCss from "../util/getCss";


export default function css( elem, name ){
  const origName = unCamelCase( name );
  const hooks = cssHooks[ origName ];

  let value;

  if( hooks && 'get' in hooks ){
    value = hooks.get( elem );
  }

  if( value === undefined ){
    value = getCss( elem, origName );
  }

  return value;
}