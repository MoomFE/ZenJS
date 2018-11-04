import getStyles from "./getStyles";
import style from "./style";


export default function getCss( elem, name ){
  const computed = getStyles( elem );
  const result = computed.getPropertyValue( name ) || computed[ name ];

  // 元素不在 DOM 树中
  if( result && elem.$parents( document.documentElement ) ){
    result = style( elem, name );
  }

  return result !== undefined ? result + ''
                              : result;
}