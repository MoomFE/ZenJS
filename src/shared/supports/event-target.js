import inBrowser from "../const/inBrowser";

export const supportsEventTarget = inBrowser && 'EventTarget' in window;