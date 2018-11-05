 import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import propFix from "./const/propFix";
import propHooks from "./const/propHooks";
import access from "../$attr/util/access";
import rnothtmlwhite from "../../../shared/const/rnothtmlwhite";
import hasOwnProperty from "../../../shared/global/Object/hasOwnProperty";



if( inBrowser ){

  defineValue( ElementProto, '$prop', function( prop, value ){
    return access( this, prop, arguments, function( prop, value ){
      const name = propFix[ prop ] || prop;
      const hooks = propHooks[ name ];
      let result;

      if( arguments.length > 1 ){
        if( hooks && 'set' in hooks ) hooks.set( this );
        this[ name ] = value;
        return this;
      }

      if( hooks && 'get' in hooks && ( result = hooks.get( this, name ) ) !== undefined ){
        return result;
      }

      return this[ name ];
    });
  });

  defineValue( ElementProto, '$hasProp', function( prop ){
    return hasOwnProperty.call( this, propFix[ prop ] || prop );
  });

  defineValue( ElementProto, '$removeProp $deleteProp', function( props ){
    if( props = props && props.match( rnothtmlwhite ) ){
      let prop;
      let index = 0;

      while( prop = props[ index++ ] ){
        prop = propFix[ prop ] || prop;

        this[ prop ] = '';
        delete this[ prop ];
      }
    }

    return this;
  });

}