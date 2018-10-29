
/**
 * @param {Element} elem 
 */
export default function getStyles( elem ){

  // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
  // IE throws on elements created in popups
  // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
  let view = elem.ownerDocument.defaultView;

  if( !view || !view.opener ){
    view = window;
  }

  return view.getComputedStyle( elem );
}