import inBrowser from "../../shared/const/inBrowser";
import define from "../../shared/util/define";
import ElementProto from "../../shared/global/Element/prototype/index";
import $isNumber from "../../Number/$isNumber/index";


inBrowser && [ 'width', 'height' ].forEach( prop => {
  const name = '_' + prop;

  define( ElementProto, name, {
    get(){
      return this.getBoundingClientRect()[ prop ];
    },
    set( value ){
      this.style[ prop ] = $isNumber( value ) ? value + 'px' : value;
    }
  });
});