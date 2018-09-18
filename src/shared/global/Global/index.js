import inBrowser from "../../const/inBrowser";
import inNode from "../../const/inNode";


/**
 * @type {Window}
 */
const global = inBrowser ? window
                         : inNode ? global
                                  : undefined;

export default global;