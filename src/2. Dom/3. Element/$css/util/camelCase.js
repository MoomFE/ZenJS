const reg = /-([a-z])/g;

function toUpperCase( all, char ){
  return char.toUpperCase();
}

export function camelCase( name ){
  return name.replace( reg, toUpperCase );
}

export function unCamelCase( name ){
  
}