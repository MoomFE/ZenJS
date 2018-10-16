import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import { isNumber } from "../../../shared/util/isNumber";
import { isArray } from "../../../shared/const/type";
import valHooks from "./const/valHooks";
import rreturn from "../../../shared/const/rreturn";
import isString from "../../../shared/util/isString";


if( inBrowser ){

  defineValue( ElementProto, '$val $value', function( value ){

    if( arguments.length ){

      if( value == null ){
        value = '';
      }
      else if( isNumber( value ) ){
        value += '';
      }
      else if( value[ isArray ] ){
        value = value.map( val => val == null ? '' : val + '' );
      }

      const hooks = valHooks[ this.type ] || valHooks[ this._nodeName ];

      if( hooks && 'set' in hooks ) hooks.set( this, value );
      else{
        this.value = value;
      }

      return this;
    }

    const hooks = valHooks[ this.type ] || valHooks[ this._nodeName ];
    let result;

    if( hooks && 'get' in hooks && ( result = hooks.get( this ) ) !== undefined ){
      return result;
    }

    if( isString( result = this.value ) ){
      return result.replace( rreturn, '' );
    }

    if( result == null ){
      return '';
    }
    return result;
  });

}