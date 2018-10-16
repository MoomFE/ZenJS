import rnothtmlwhite from "../../../../shared/const/rnothtmlwhite";
import $toArray from "../../../../1. Core/1. Array/$toArray/index";


const valHooks = {
  option: {
    get( elem ){
      const value = elem.getAttribute( 'value' );

      if( value == null ){
        return ( elem.textContent.match( rnothtmlwhite ) || [] ).join(' ');
      }
      return value;
    }
  },
  select: {
    get( elem ){
      const options = elem.options;
      const index = elem.selectedIndex;
      const one = elem.type === 'select-one';
      const max = one ? index + 1 : options.length;
      let values = one ? null : [];
      let value, option, i;

      for( i = index < 0 ? max : one ? index : 0; i < max; i++ ){
        option = options[ i ];

        if(
          ( option.selected || i === index )
          && !option.disabled
          && (
            !option.parentNode.disabled
            || option.parentNode._nodeName !== 'optgroup'
          )
        ){
          value = valHooks.option.get( option );
  
          if( one ){
            return value;
          }

          values.push( value );
        }
      }

      return values;
    },
    set( elem, value ){
      const options = elem.options;
      const values = $toArray( value );
      let i = options.length;
      let optionSet, option;

      while( i-- ){
        option = options[ i ];

        console.log(
          values
        );
        if( option.selected = values.$inArray( valHooks.option.get( option ) ) ){
          optionSet = true;
        }
      }

      if( !optionSet ){
        elem.selectedIndex = -1;
      }
    }
  }
};

export default valHooks;