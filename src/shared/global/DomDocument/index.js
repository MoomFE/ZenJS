import inBrowser from "../../const/inBrowser";


/**
 * @type {Document}
 */
const DomDocument = inBrowser ? window.document : undefined;

export default DomDocument;