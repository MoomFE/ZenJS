import getStyles from "./getStyles";


export default function getCss( elem, name ){
  const computed = getStyles( elem );
  const result = computed.getPropertyValue( name );

  return result !== undefined ? result + ''
                              : result;
}