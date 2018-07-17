import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import isString from "../../shared/util/isString";
import rreturn from "../../shared/const/rreturn";
import isFunction from "../../shared/util/isFunction";
import isNumber from "../../shared/util/isNumber";
import isArray from "../../shared/global/Array/isArray";
import rnothtmlwhite from "../../shared/const/rnothtmlwhite";
import $toArray from "../../Array/$toArray/index";


inBrowser && defineValue( ElementProto, '$val $value', function( value ){
  let hooks,
      result;

  // 读取
  if( !arguments.length ){
    // 兼容性处理
    hooks = valHooks[ this.type ] || valHooks[ this._nodeName ];

    if( hooks && 'get' in hooks && ( result = hooks.get( this ) ) !== undefined ){
      return result;
    }

    if( isString( result = this.value ) ){
      return result.replace( rreturn, '' );
    }

    return result == null ? '' : result;
  }

  // 设置
  if( isFunction( value ) ){
    value = value.call( this, this.$val() );
  }

  if( value == null ){
    value = '';
  }
  else if( isNumber( value ) ){
    value += '';
  }
  else if( isArray( value ) ){
    value = value.map( val => val == null ? '' : val + '' );
  }

  hooks = valHooks[ this.type ] || valHooks[ this._nodeName ];

  if( !hooks || !( 'set' in hooks ) || hooks.set( this, value ) === undefined ){
    this.value = value;
  }

  return this;
});


const valHooks = {
  option: {
    get( elem ){
      const value = elem.getAttribute( 'value' );
      return value == null ? (
                                elem.textContent.match( rnothtmlwhite ) || []
                             ).join(' ')
                           : value;
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

      if( index < 0 ){
        i = max;
      }else{
        i = one ? index : 0;
      }

      for( ; i < max; i++ ){
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

        if( option.selected = values.$inArray( valHooks.option.get( option ) ) ){
          optionSet = true;
        }
      }

      if( !optionSet ){
        elem.selectedIndex = -1;
      }

      return values;
    }
  }
}


const input = document.createElement('input');
      input.type = 'checkbox';

// checkbox 的默认值应该为 'on'
if( input.value !== '' ){
  [ 'radio', 'checkbox' ].forEach( type => {
    valHooks[ type ] = {
      get( elem ){
        return elem.getAttribute( 'value' ) === null ? 'on' : elem.value;
      }
    };
  });
}