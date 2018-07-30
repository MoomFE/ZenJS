import defineValue from "../../shared/util/defineValue";
import DateProto from "../../shared/global/Date/prototype/index";
import abs from "../../shared/global/Math/abs";
import floor from "../../shared/global/Math/floor";
import String from "../../shared/global/String/index";


const FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';



defineValue( DateProto, '$format', function( str ){

  const formatStr = str || FORMAT_DEFAULT;
  const zoneStr = padZoneStr( this.getTimezoneOffset() );
  const locale = this.$locale();
});

function padStart( string, length, pad ){
  const s = String( string );

  if( !s || s.length >= length ){
    return string;
  }

  return `${ Array( ( length + 1 ) - s.length ).join( pad ) }${ string }`
}

function padZoneStr( negMinuts ){
  const minutes = abs( negMinuts );
  const hourOffset = floor( minutes / 60 );
  const minuteOffset = minutes % 60;

  return `${ negMinuts <= 0 ? '+' : '-' }${ padStart( hourOffset, 2, '0' ) }:${ padStart( minuteOffset, 2, '0' ) }`
}