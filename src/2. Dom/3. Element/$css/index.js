import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import access from "../$attr/util/access";
import { camelCase } from "./util/camelCase";
import cssHooks from "./const/cssHooks";
import getCss from "./util/getCss";
import finalPropName from "./util/finalPropName";
import rcustomProp from "../../../shared/const/rcustomProp";
import cssDefault from "./const/cssDefault";


if( inBrowser ){

  defineValue( ElementProto, '$css', function( name ){
    return access( this, name, arguments, function( name, value ){
      return value === undefined ? css( this, name )
                                 : style( this, name, vlaue );
    });
  });

  function css( elem, name ){
    // 转为驼峰写法
    const origName = camelCase( name );
    // 是否是 css 变量
    const isCustomProp = rcustomProp.test( name );

    // 转为浏览器兼容写法
    if( !isCustomProp ){
      name = finalPropName( origName );
    }

    // 获取可能的兼容方法
    const hooks = cssHooks[ name ] || cssHooks[ origName ];

    let value;

    if( hooks ){
      value = hooks( elem );
    }

    if( value === undefined ){
      value = getCss( elem, name );
    }

    // 结果为空, 但是有默认值时, 返回默认值
    if( value === '' && name in cssDefault ){
      value = cssDefault[ name ];
    }

    return value;
  }

  function style( elem, name, value ){

  }

}