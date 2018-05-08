import Zen from '../../shared/zen';
import add from './add';
import fix from './fix';
import dispatch from './dispatch';

const event = Zen.event = {
  add,
  fix,
  dispatch
};


export default event;