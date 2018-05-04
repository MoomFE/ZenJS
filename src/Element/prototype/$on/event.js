import Zen from '../../../var/Zen';

  
const eventHandleFn = function( event ){
  return typeof Zen !== 'undefined' && Zen.event.triggered !== event.type
            ? Zen.event.dispatch( this, arguments )
            : undefined;
}

export default Zen.event = {

  global: {},

  add: function( elem, types, handler, options, selector ){

    let elemData = elem.$data(),
        events,
        eventHandle,
        t = types.length;


    handler.guid || (
      handler.guid = Zen.guid
    );

    if( !( events = elemData.events ) ){
      events = elemData = {};
    }

    if( !( eventHandle = elemData.handle ) ){
      eventHandle = elemData.handle = eventHandleFn.bind( elem );
    }

    while( t-- ){
      
    }
  }
};