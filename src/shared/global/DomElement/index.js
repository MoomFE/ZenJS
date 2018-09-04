import inBrowser from "../../const/inBrowser";

/**
 * @type {Element}
 */
const DomElement = inBrowser ? window.Element : undefined;

export default DomElement;