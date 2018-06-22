import toString from "../global/Object/prototype/toString";


export default function isRegExp( obj ){
  return toString.call( obj ) === '[object RegExp]'
}