import supportsRadioValue from "../../../../shared/supports/radioValue";


const attrHooks = {
  type: {
    set( elem, value ){
      if( !supportsRadioValue && value === 'radio' && elem._nodeName === 'input' ){
        const val = elem.value;
    
        elem.setAttribute( 'type', value );
    
        if( val ){
          elem.value = val;
        }
    
        return value;
      }
    }
  }
};

export default attrHooks;