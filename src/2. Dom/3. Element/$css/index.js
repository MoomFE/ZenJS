import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import access from "../$attr/util/access";
import css from "./main/css";
import style from "./main/style";


if( inBrowser ){

  defineValue( ElementProto, '$css', function( name ){
    return access( this, name, arguments, function( name, value ){
      return value === undefined ? css( this, name )
                                 : style( this, name, vlaue );
    });
  });

}