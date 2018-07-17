import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";


inBrowser && defineValue( document, '$id', document.getElementById );