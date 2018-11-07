import { camelCase } from "./camelCase";
import rcustomProp from "../../../../shared/const/rcustomProp";
import finalPropName from "./finalPropName";
import { isNumber } from "../../../../shared/util/isNumber";
import cssNumber from "../const/cssNumber";
import supportsClearCloneStyle from "../../../../shared/supports/clearCloneStyle";


export default function style( elem, name, value ){
  // 转为驼峰写法
  const origName = camelCase( name );
  // 是否是 css 变量
  const isCustomProp = rcustomProp.test( name );
  // 
  const style = elem.style;

  // 转为浏览器兼容写法
  if( !isCustomProp ){
    name = finalPropName( origName );
  }

  // setter
  if( value !== undefined ){

    if( value == null || value !== value ){
      return;
    }

    if( isNumber( value ) ){
      value += cssNumber[ origName ] ? '' : 'px';
    }

    if( supportsClearCloneStyle && value === '' && name.indexOf( "background" ) === 0 ){
      style[ name ] = 'inherit';
    }

    if( isCustomProp ){
      style.setProperty( name, value );
    }else{
      style[ name ] = value;
    }

  }else{
    return style[ name ];
  }
}