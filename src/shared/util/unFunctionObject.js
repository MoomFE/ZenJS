export default function unFunctionObject( obj ){
  var type = typeof obj;
  return type !== 'object' && type !== 'function';
}