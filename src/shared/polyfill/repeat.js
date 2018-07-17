// String.prototype.repeat
export default function repeat( str, count ){
  let result = '';
  let i = 0;

  for( ; i < count; i++ ){
    result += str;
  }

  return result;
}