import toString from "../global/Object/prototype/toString";


export default function isNumber( obj ){
  return toString.call( obj ) === '[object Number]'
}