import Zen from '../../shared/zen';

let guid = 1;

Object.defineProperty( Zen, 'guid', {
  get: () => guid++
});

export default Zen.guid