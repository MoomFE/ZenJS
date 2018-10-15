import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import propFix from "./const/propFix";
import propHooks from "./const/propHooks";
import isObject from "../../../shared/util/isObject";



if( inBrowser ){

  defineValue( ElementProto, '$prop', function( props, value ){

    if( isObject( props ) ){
      for( let _name in props ){
        this.$prop( name, props[ name ] );
      }
      return this;
    }

    const name = propFix[ props ] || props;
    const hooks = propHooks[ name ];
    let result;

    if( arguments.length > 1 ){
      if( hooks && 'set' in hooks ) hooks.set( elem );
      this[ name ] = value;
      return this;
    }

    if( hooks && 'get' in hooks && ( result = hooks.get( elem, name ) ) !== null ){
      return result;
    }

    return elem[ name ];
  });

}