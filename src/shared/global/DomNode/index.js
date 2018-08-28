import inBrowser from "../../const/inBrowser";

/**
 * @type {Node}
 */
const DomNode = inBrowser ? window.Node : {};

export default DomNode;