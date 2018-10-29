import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import access from "../$attr/util/access";
import unCamelCase from "./util/unCamelCase";
import cssHooks from "./const/cssHooks";
import getCss from "./util/getCss";


if( inBrowser ){

  defineValue( ElementProto, '$css', function( name ){
    return access( this, name, arguments, function( name, value ){
      return value === undefined ? css( this, name )
                                 : style( this, name, vlaue );
    });
  });

  function css( elem, name ){
    const origName = unCamelCase( name );
    const hooks = cssHooks[ origName ];

    let value;

    if( hooks && 'get' in hooks ){
      value = hooks.get( elem );
    }

    if( value === undefined ){
      value = getCss( elem, origName );
    }

    return value;
  }

  function style( elem, name, value ){

  }

}