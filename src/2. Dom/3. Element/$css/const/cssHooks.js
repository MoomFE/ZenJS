import supportsCompoundStyle from "../../../../shared/supports/compoundStyle";
import each from "../../../../1. Core/3. Object/$each/index";
import getStyles from "../util/getStyles";
import { cssSide, cssRadius } from "./cssSide";


const cssHooks = {};

export default cssHooks;


// 当前浏览器不支持获取复合样式
if( !supportsCompoundStyle ){

  // margin
  // padding
  // border-width
  CreateSideHook({ margin: '', padding: '', border: 'Width' }, cssSide);

  // border-radius
  CreateSideHook({ border: 'Radius' }, cssRadius);

  function CreateSideHook( styles, cssSide ){
    each( styles, ( name, suffix ) => {
      cssHooks[ name + suffix ] = {
        get: function( elem ){
          const computed = getStyles( elem );
          const result = [];

          for( let index = 0; index < 4; index++ ){
            result[ index ] = computed[ name + cssSide[ index ] + suffix ] || '0px';
          }

          const top = result[ 0 ];
          const right = result[ 1 ];
          const bottom = result[ 2 ];
          const left = result[ 3 ];

          if( right === left ){ // 左右边相等
            if( top === bottom ){ // 上下边相等
              return top === right ? top // 单值语法
                                  : `${ top } ${ right }`; // 二值语法
            }else{
              return `${ top } ${ right } ${ bottom }`; // 三值语法
            }
          }

          return result.join(' ');// 四值语法
        }
      };
    });
  }

}