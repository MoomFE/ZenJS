import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import rnothtmlwhite from "../../../shared/const/rnothtmlwhite";
import { attrHooks, boolHook } from "./const/attrHooks";
import rBool from "./const/rBool";
import access from "./util/access";


if( inBrowser ){

  defineValue( ElementProto, '$attr', function( name, value ){
    return access( this, name, arguments, function( name, value ){
      let result;

      if( value === undefined ){
        return ( result = this.getAttribute( name ) ) == null ? undefined
                                                              : result;
      }

      if( value === null ){
        return this.$removeAttr( name );
      }

      const hooks = attrHooks[ name.toLowerCase() ] || ( rBool.test( name ) ? boolHook : undefined );

      if( !( hooks && hooks( this, value, name ) ) ){
        this.setAttribute( name, value + '' );
      }

      return this;
    });
  });

  defineValue( ElementProto, '$removeAttr $deleteAttr', function( names ){
    if( names = names && names.match( rnothtmlwhite ) ){
      let name;
      let index = 0;

      while( name = names[ index++ ] ){
        this.removeAttribute( name );
      }
    }

    return this;
  });

}