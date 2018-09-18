import defineProperty from "../../../shared/global/Object/defineProperty";
import ZenJS from "../../../shared/global/ZenJS/index";


let guid = 1;

defineProperty( ZenJS, 'guid', {
  get: () => guid++
});