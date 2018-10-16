import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import ElementProto from "../../../shared/global/DomElement/prototype/index";
import min from "../../../shared/global/Math/min";


if( inBrowser ){

  defineValue( ElementProto, '$index', function( toIndex ){

    if( arguments.length ){
      const parent = this.parentElement;

      if( parent ){
        const siblings = parent.children;
        const selfIndex = this.$prevAll().length;
        const currentIndex = min( siblings.length - 1, toIndex );

        if( selfIndex !== currentIndex ){
          const currentElem = siblings[ currentIndex ];

          parent.insertBefore(
            this,
            selfIndex < currentIndex ? currentElem.nextElementSibling
                                     : currentElem
          );
        }
      }

      return this;
    }

    return this.parentElement ? this.$prevAll().length
                              : -1;
  });

}