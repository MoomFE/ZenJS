import supportsCompoundStyle from '../../../../../../shared/supports/compoundStyle';
import each from '../../../../../../1. Core/3. Object/$each/index';
import cssHooks from '../../cssHooks/index';
import getStyles from '../../../util/getStyles';


if( !supportsCompoundStyle ){
  

  each({
    margin: '',
    padding: '',
    border: '-width'
  }, ( name, suffix ) => {

    cssHooks[ name + suffix ] = {
      get( elem ){
        const computed = getStyles( elem );
        const result = [];

        for( let index = 0; index < 4; index++ ){
          result[ index ] = computed.getPropertyValue( name + cssExpand[ index ] + suffix );
        }

        return result.join(' ');
      }
    };

  });
}