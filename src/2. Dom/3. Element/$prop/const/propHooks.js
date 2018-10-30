import rfocusable from "../../../../shared/const/rfocusable";
import rclickable from "../../../../shared/const/rclickable";
import supportsSelectedIndex from "../../../../shared/supports/selectedIndex";


const propHooks = {
  tabIndex: {
    get( elem, name ){
      const tabIndex = elem.getAttribute( name );

      if( tabIndex ){
        return parseInt( tabIndex, 10 );
      }

      if( rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ){
        return 0;
      }

      return -1;
    }
  }
};

if( !supportsSelectedIndex ){
  const selected = function( elem ){
    let parent = elem.parentNode;

    if ( parent ) {
      parent.selectedIndex
    }
  };

  propHooks.selected = {
    get: selected,
    set: selected
  };
}


export default propHooks;