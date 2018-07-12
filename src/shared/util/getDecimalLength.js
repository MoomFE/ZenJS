export default function getDecimalLength( num ){
  return ( ( '' + num ).split('.')[1] || '' ).length
}