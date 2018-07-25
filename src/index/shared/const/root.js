import inBrowser from "./inBrowser";
import inNode from "./inNode";

const root = inBrowser ? window
                       : inNode ? global
                                : undefined;

export default root;