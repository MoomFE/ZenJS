import supportsCompoundStyle from "../../../../shared/supports/compoundStyle";
import each from "../../../../1. Core/3. Object/$each/index";
import getStyles from "../util/getStyles";
import cssExpand from "./cssExpand";


const cssHooks = {};

export default cssHooks;


// 当前浏览器不支持获取复合样式
if( !supportsCompoundStyle ){

  each({ margin: '', padding: '', border: '-width' }, ( name, suffix ) => {
    cssHooks[ name + suffix ] = {
      get: function( elem ){
        const computed = getStyles( elem );
        const result = [];

        for( let index = 0; index < 4; index++ ){
          result[ index ] = computed.getPropertyValue( name + cssExpand[ index ] + suffix ) || '0px';
        }

        const one = result[ 0 ];
        const two = result[ 1 ];
        const three = result[ 2 ];
        const four = result[ 3 ];

        if( two === four ){ // 左右边相等
          if( one === three ){ // 上下边相等
            return one === two ? one // 单值语法
                               : `${ one } ${ two }`; // 二值语法
          }else{
            return `${ one } ${ two } ${ three }`; // 三值语法
          }
        }

        return result.join(' ');// 四值语法
      }
    };
  });

}