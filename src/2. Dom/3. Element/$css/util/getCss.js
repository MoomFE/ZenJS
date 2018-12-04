import getStyles from "./getStyles";
import style from "./style";


export default function getCss( elem, name ){
  const computed = getStyles( elem );
  let result = computed.getPropertyValue( name ) || computed[ name ];

  // 元素不在 DOM 树中, 尝试从 style 中取值
  if( ( result === '' || result === 'auto' ) && !elem.$parents( document.documentElement ) ){
    result = style( elem, name );
  }

  return result !== undefined ? result + ''
                              : result;
}