import DomElement from '../index';
import inBrowser from '../../../const/inBrowser';

const ElementProto = inBrowser ? DomElement.prototype : undefined;

export default ElementProto;