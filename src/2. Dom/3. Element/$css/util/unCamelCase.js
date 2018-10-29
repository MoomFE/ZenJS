const reg = /[A-Z]/g;

function toLowerCase( char ){
  return '-' + char.toLowerCase();
}

export default function unCamelCase( name ){
  return name.replace( reg, toLowerCase );
}