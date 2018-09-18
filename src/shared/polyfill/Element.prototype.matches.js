import inBrowser from "../const/inBrowser";
import ElementProto from "../global/DomElement/prototype/index";


if( inBrowser && !ElementProto.matches ){
  [ 'webkit', 'o', 'ms', 'moz' ].$each( core => {
    const matchesKey = core + 'MatchesSelector';
    const matchesValue = ElementProto[ matchesKey ];

    if( matchesValue ){
      ElementProto.matches = matchesValue;
      return false;
    }
  });
}