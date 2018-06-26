import Object from '../../shared/global/Object/index';
import $assign from '../$assign/util';
import create from '../../shared/global/Object/create';

import defineValue from '../../shared/util/defineValue';
import isBoolean from '../../shared/util/isBoolean';
import parametersRest from '../../shared/util/parametersRest';


export default function $create( isNoProto ){
  const args = parametersRest( arguments, 1 );

  if( isBoolean( isNoProto ) || !isNoProto ){
    isNoProto = !!isNoProto;
  }else{
    args.unshift( isNoProto );
    isNoProto = false;
  }

  args.unshift(
    isNoProto ? create( null )
              : {}
  );

  return $assign.apply( isNoProto, args );
};

defineValue( Object, '$create', $create );