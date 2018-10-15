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
  propHooks.selected = {
    get( elem ){
      let parent = elem.parentNode;

      if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
      }

      return null;
    },
    set( elem ){
      var parent = elem.parentNode;

      if( parent ){
        parent.selectedIndex;

        if( parent.parentNode ){
          parent.parentNode.selectedIndex;
        }
      }
    }
  }
}


export default propHooks;