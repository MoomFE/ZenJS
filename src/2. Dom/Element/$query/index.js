import ElementProto from "../../shared/global/Element/prototype/index";
import defineValue from "../../shared/util/defineValue";
import inBrowser from "../../shared/const/inBrowser";


inBrowser && [ document, ElementProto ].forEach( elem => {
  defineValue( elem, '$query', elem.querySelectorAll );
  defineValue( elem, '$queryFirst', elem.querySelector );
});