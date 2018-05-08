export const { prototype: ElementProto } = Element;

export const { isArray, prototype: ArrayProto } = Array;

export const { concat } = ArrayProto;

export const { defineProperty } = Object;

/**
 * [ winodw, document, Element.prototype ]
 */
export const winDocEle = [ window, document, ElementProto ];

export const rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

export const rtypenamespace = /^([^.]*)(?:\.(.+)|)/;