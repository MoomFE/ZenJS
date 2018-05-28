import ZenJS from '../../shared/global/ZenJS/index';
import defineProperty from '../../shared/global/Object/defineProperty';

let guid = 1;

defineProperty( ZenJS, 'guid', {
  get: () => guid++
});