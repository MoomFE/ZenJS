import inBrowser from "../const/inBrowser";
import ElementProto from "../global/Element/prototype/index";


if( inBrowser ){
  ElementProto.matches || [ 'webkit', 'o', 'ms', 'moz' ].$each( core => {
    const matches = core + 'MatchesSelector';
    if( ElementProto[ matches ] ){
      return !( ElementProto.matches = ElementProto[ matches ] );
    }
  });
}