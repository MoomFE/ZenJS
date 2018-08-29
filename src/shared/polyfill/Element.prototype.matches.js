import inBrowser from "../const/inBrowser";
import ElementProto from "../global/DomElement/prototype/index";

let matches;

if( inBrowser ){
  ( matches = ElementProto.matches ) || [ 'webkit', 'o', 'ms', 'moz' ].$each( core => {
    const matchesKey = core + 'MatchesSelector';
    const matchesValue = ElementProto[ matchesKey ];

    if( matchesValue ){
      matches = matchesValue;
      return false;
    }
  });
}

export default matches;