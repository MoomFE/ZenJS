import Element from '../index';
import inBrowser from '../../../const/inBrowser';

const ElementProto = inBrowser ? Element.prototype : undefined;

export default ElementProto;