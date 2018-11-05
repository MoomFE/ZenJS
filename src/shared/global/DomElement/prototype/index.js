import DomElement from '../index';
import inBrowser from '../../../const/inBrowser';


/**
 * @type {Element}
 */
const ElementProto = inBrowser ? DomElement.prototype : undefined;

export default ElementProto;