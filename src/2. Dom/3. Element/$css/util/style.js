import { camelCase } from "./camelCase";
import rcustomProp from "../../../../shared/const/rcustomProp";
import finalPropName from "./finalPropName";
import { isNumber } from "../../../../shared/util/isNumber";


export default function style( elem, name, value ){
  // 转为驼峰写法
  const origName = camelCase( name );
  // 是否是 css 变量
  const isCustomProp = rcustomProp.test( name );

  // 转为浏览器兼容写法
  if( !isCustomProp ){
    name = finalPropName( origName );
  }

  // setter
  if( value !== undefined ){

    isNumber
    
    if( isNumber( value ) ){
      // value += 
    }
  }
}