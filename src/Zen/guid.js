import Zen from '../shared/global/Zen/index';

let guid = 1;

Object.defineProperty( Zen, 'guid', {
  get: () => guid++
});

export default Zen.guid