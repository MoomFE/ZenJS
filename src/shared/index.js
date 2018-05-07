export const
  { document, Element, Array } = window,
  { prototype: ElementProto } = Element,
  { isArray } = Array;

/**
 * [ winodw, document, Element.prototype ]
 */
export const winDocEle = [ window, document, ElementProto ];

export const rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

export const rtypenamespace = /^([^.]*)(?:\.(.+)|)/;