import inBrowser from "./inBrowser";
import inNode from "./inNode";

const root = inBrowser ? window
                       : inNode ? global
                                : {};

export default root;