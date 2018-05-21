import Zen from '../../shared/global/Zen/index';
import defineProperty from '../../shared/global/Object/defineProperty';

let guid = 1;

defineProperty( Zen, 'guid', {
  get: () => guid++
});