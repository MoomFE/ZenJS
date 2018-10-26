import supportsRadioValue from "../../../../shared/supports/radioValue";


export const attrHooks = {
  type( elem, value ){
    if( !supportsRadioValue && value === 'radio' && elem._nodeName === 'input' ){
      const val = elem.value;
  
      elem.setAttribute( 'type', value );
  
      if( val ){
        elem.value = val;
      }
  
      return value;
    }
  }
};


export function boolHook( elem, value, name ){
  if( value === false ) elem.$removeAttr( name );
  else elem.setAttribute( name, name );
  return name;
}