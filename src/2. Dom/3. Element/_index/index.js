import inBrowser from "../../../shared/const/inBrowser";
import define from "../../../shared/util/define";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import min from "../../../shared/global/Math/min";


if( inBrowser ){
  define( ElementProto, '_index', {
    get(){
      return this.parentElement ? this.$prevAll().length : -1;
    },
    set( toIndex ){
      const parent = this.parentElement;
  
      if( parent == null ){
        return;
      }
  
      const siblings = parent.children;
      const selfIndex = this._index;
      const currentIndex = min( siblings.length - 1, toIndex );
  
      if( selfIndex === currentIndex ){
        return;
      }

      const currentElem = siblings[ currentIndex ];
  
      parent.insertBefore(
        this,
        selfIndex < currentIndex ? currentElem.nextElementSibling
                                 : currentElem
      );
    }
  });
}