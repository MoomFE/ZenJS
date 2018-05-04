/**
 * ZenJS
 */
const Zen = window.Zen = Object.create( null );

let guid = 1;

Object.defineProperty( Zen, 'guid', {
  get: () => guid++
});

export default Zen;