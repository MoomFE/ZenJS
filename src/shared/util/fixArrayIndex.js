export default function fixArrayIndex( array, index, add ){
  if( index < 0 && ( index = array.length + index + ( add || 0 ) ) < 0 ){
    index = 0;
  }
  return index;
}