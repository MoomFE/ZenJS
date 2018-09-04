import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";


if( inBrowser ){
  defineValue( document, '$id', document.getElementById );
}