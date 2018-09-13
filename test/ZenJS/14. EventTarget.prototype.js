describes.push({
  name: 'EventTarget.prototype',
  describe: [
    {
      name: '$data',
      describe: function(){
        /** @type {Element} */
        var div = window.div;

        it( 'adding data', function(){
          div.$data( 'Data', 'div' ).should.equals( div );
          window.$data( 'Data', 'window' ).should.equals( window );
          document.$data( 'Data', 'document' ).should.equals( document );
        });

        it( 'Read data', function(){
          div.$data( 'Data' ).should.equals( 'div' );
          window.$data( 'Data' ).should.equals( 'window' );
          document.$data( 'Data' ).should.equals( 'document' );
        });

        it( 'Read all data', function(){
          Object.$equals( div.$data(), { Data: 'div' } );
          Object.$equals( window.$data(), { Data: 'window' } );
          Object.$equals( document.$data(), { Data: 'document' } );
        });

        it( 'Add data in bulk', function(){
          div.$data({ a: 1, b: 2 }).should.equals( div );
          window.$data({ a: 1, b: 2 }).should.equals( window );
          document.$data({ a: 1, b: 2 }).should.equals( document );
          Object.$equals( div.$data(), { Data: 'div', a: 1, b: 2 } );
          Object.$equals( window.$data(), { Data: 'window', a: 1, b: 2 } );
          Object.$equals( document.$data(), { Data: 'document', a: 1, b: 2 } );
        });

        it( 'Initialize add method', function(){
          div.$data( 'b', 3, true ).should.equals( 2 );
          window.$data( 'b', 3, true ).should.equals( 2 );
          document.$data( 'b', 3, true ).should.equals( 2 );
          Object.$equals( div.$data(), { Data: 'div', a: 1, b: 2 } );
          Object.$equals( window.$data(), { Data: 'window', a: 1, b: 2 } );
          Object.$equals( document.$data(), { Data: 'document', a: 1, b: 2 } );

          div.$data( 'c', 3, true ).should.equals( 3 );
          window.$data( 'c', 3, true ).should.equals( 3 );
          document.$data( 'c', 3, true ).should.equals( 3 );
          Object.$equals( div.$data(), { Data: 'div', a: 1, b: 2, c: 3 } );
          Object.$equals( window.$data(), { Data: 'window', a: 1, b: 2, c: 3 } );
          Object.$equals( document.$data(), { Data: 'document', a: 1, b: 2, c: 3 } );
        });

        it( 'Use $data directly', function(){
          $data( 'Data' ).should.equals( 'window' );

          window.__ZENJS_DATA__ = {};
          document.__ZENJS_DATA__ = {};
        });
      }
    }, {
      name: '$hasData',
      describe: function(){
        /** @type {Element} */
        var div = window.div;

        it( 'No incoming parameter detection has value', function(){
          div.$hasData().should.false;
          div.$data('Data','div').$hasData().should.true;
          window.$hasData().should.false;
          window.$data('Data','window').$hasData().should.true;
          document.$hasData().should.false;
          document.$data('Data','document').$hasData().should.true;
        });

        it( 'Incoming parameter detection for value', function(){
          div.$hasData('Data').should.true;
          window.$hasData('Data').should.true;
          document.$hasData('Data').should.true;
          div.$hasData('noData').should.false;
          window.$hasData('noData').should.false;
          document.$hasData('noData').should.false;
        });

        it( 'Use $hasData directly', function(){
          $hasData('Data').should.true;
          $hasData('noData').should.false;

          window.__ZENJS_DATA__ = {};
          document.__ZENJS_DATA__ = {};
        });
      }
    }, {
      name: '$deleteData',
      describe: function(){
        /** @type {Element} */
        var div = window.div;

        it( 'Delete single data', function(){
          div.$data({ Data: 'div', a: 1, b: 2 });
          window.$data({ Data: 'window', a: 1, b: 2 });
          document.$data({ Data: 'document', a: 1, b: 2 });

          div.$deleteData('Data').should.equals( div );
          window.$deleteData('Data').should.equals( window );
          document.$deleteData('Data').should.equals( document );

          div.$hasData('Data').should.false;
          window.$hasData('Data').should.false;
          document.$hasData('Data').should.false;
          div.$hasData('a').should.true;
          window.$hasData('a').should.true;
          document.$hasData('a').should.true;
        });

        it( 'Delete all data', function(){
          div.$deleteData().should.equals( div );
          window.$deleteData().should.equals( window );
          document.$deleteData().should.equals( document );
          div.$hasData().should.false;
          window.$hasData().should.false;
          document.$hasData().should.false;
        });
      }
    }, {
      name: '$on',
      describe: [
        {
          name: 'Basic data storage',
          it: function(){
            var EventData = div.$on( 'click', false ).$data('events');

            $typeof( EventData.click ).should.equals('array');
            EventData.click.length.should.equals( 1 );
            $typeof( EventData.click[0] ).should.equals('object');
          }
        }, {
          name: 'Test if all parameters are received correctly - namespace',
          it: function(){
            var EventData;
            var EventListener = function( event ){ return event };

            EventData = div.$on( 'click.btn', EventListener ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.true;
            Object.$equals( EventData.namespace, [ 'btn' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', EventListener ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on({ 'click.btn.ripple': EventListener }).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;
          }
        }, {
          name: 'Test if all parameters are received correctly - options',
          it: function(){
            var EventData;
            var EventListener = function( event ){ return event };

            EventData = div.$on( 'click.btn.ripple', EventListener, true ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, { capture: true } ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', EventListener, { capture: true } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, { capture: true } ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', EventListener, { one: true } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( { 'click.btn.ripple': EventListener }, { one: true } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            /**
             * @type {Boolean} 当前环境是否支持 addEventListener 的 passive 属性
             */
            let supportsPassiveEvent = false;

            try{
              const options = defineProperty( {}, 'passive', {
                get: function(){
                  supportsPassiveEvent = true;
                }
              });
              window.addEventListener( 'test', null, options );
            }catch(e){}

            if( supportsPassiveEvent ){
              EventData = div.$on( 'click.btn.ripple', EventListener, { passive: true } ).$data('events').click[0];
              Object.$equals( EventData.elem, div ).should.true;
              Object.$equals( EventData.listener, EventListener ).should.true;
              Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
              Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
              Object.$equals( EventData.options, { passive: true } ).should.true;
              Object.$equals( EventData.selector ).should.true;
              Object.$equals( EventData.type, 'click' ).should.true;
            }
          }
        }, {
          name: 'Test if all parameters are received correctly - delegate',
          it: function(){
            var EventData;
            var EventListener = function( event ){ return event };

            EventData = div.$on( 'click.btn.ripple', '.div', EventListener, { one: true } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', EventListener, '.div', { one: true } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', EventListener, { one: true }, '.div' ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( { 'click.btn.ripple': EventListener }, '.div', { one: true } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( '.div', { 'click.btn.ripple': EventListener }, { one: true } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( { 'click.btn.ripple': EventListener }, { one: true }, '.div' ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;
            
          }
        }, {
          name: 'Test if all parameters are received correctly',
          it: function(){
            var EventData;
            var EventListener = function( event ){ return event };

            EventData = div.$on( 'click.btn.ripple', '.div', EventListener, { capture: false } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', '.div', false, { capture: false } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, ZenJS.util.returnFalse ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', '.div', false, false ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, ZenJS.util.returnFalse ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', false, false, '.div' ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, ZenJS.util.returnFalse ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', false, '.div', false ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, ZenJS.util.returnFalse ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector, '.div' ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$on( 'click.btn.ripple', false, false ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, ZenJS.util.returnFalse ).should.true;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;
          }
        }, {
          name: 'Event binding',
          it: function(){
            var div = window.$div;
            var index = 0;

            div.$on( 'click', function(){ index++ } );

            div.click();
            index.should.equals( 1 );

            div.click();
            div.click();
            index.should.equals( 3 );
          }
        }, {
          name: 'Event binding - delegate',
          it: function(){
            var div = window.$div;
            var span = div.appendChild( window.span );
            var index = 0;

            div.$on( 'click', 'span', function(){ index++ } );

            div.click();
            index.should.equals( 0 );

            span.click();
            index.should.equals( 1 );

            span.click();
            span.click();
            index.should.equals( 3 );
          }
        }
      ]
    }, {
      name: '$one / $once / options.one / options.once',
      describe: [
        {
          name: 'Test if all parameters are received correctly',
          it: function(){
            var EventData;
            var EventListener = function( event ){ return event };

            EventData = div.$on( 'click.btn.ripple', EventListener, { one: true } ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$one( 'click.btn.ripple', EventListener ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;

            EventData = div.$once( 'click.btn.ripple', EventListener ).$data('events').click[0];
            Object.$equals( EventData.elem, div ).should.true;
            Object.$equals( EventData.listener, EventListener ).should.false;
            Object.$equals( EventData.namespace, [ 'btn', 'ripple' ] ).should.true;
            Object.$equals( EventData.namespaceStr, 'btn.ripple' ).should.true;
            Object.$equals( EventData.options, {} ).should.true;
            Object.$equals( EventData.selector ).should.true;
            Object.$equals( EventData.type, 'click' ).should.true;
          }
        }
      ]
    }, {
      name: '$off',
      describe: [
        {
          name: 'Test availability and check if data is deleted correctly',
          it: function(){
            var div = $div;
            var index = 0;
            var EventListener = function( event ){ index++ };

            div.$on( 'click', EventListener );
            div.click();
            index.should.equals( 1 );
            div.$off( 'click', EventListener );
            div.click();
            index.should.equals( 1 );
            Object.$equals( div.$data('events'), {} ).should.true;

            div.$on( 'click', EventListener );
            div.click();
            index.should.equals( 2 );
            div.$off( 'click' );
            div.click();
            index.should.equals( 2 );
            Object.$equals( div.$data('events'), {} ).should.true;
          }
        }, {
          name: 'Test availability and check if data is deleted correctly - namespace',
          it: function(){
            var div = $div;
            var index = 0;
            var EventListener = function( event ){ index++ };

            div.$on( 'click.zenjs', EventListener );
            div.$on( 'click.zenui', EventListener );
            div.click();
            index.should.equals( 2 );
            div.$off( 'click.zenjs' );
            div.click();
            index.should.equals( 3 );
            div.$off( 'click.zenui' );
            div.click();
            index.should.equals( 3 );

            div.$on( 'click.zenjs.zenui', EventListener );
            div.$on( 'click.zenui', EventListener );
            div.click();
            index.should.equals( 5 );
            div.$off( 'click.zenui' );
            div.click();
            index.should.equals( 6 );
            div.$off( 'click.zenui.zenjs' );
            div.click();
            index.should.equals( 6 );

            div.$on( 'click.zenjs', EventListener );
            div.$on( 'click.zenui', EventListener );
            div.click();
            index.should.equals( 8 );
            div.$off( 'click' );
            div.click();
            index.should.equals( 8 );
          }
        }, {
          name: 'Test availability and check if data is deleted correctly - delegate',
          it: function(){
            var div = $div;
            var span = div.appendChild( window.span );
            var index = 0;
            var EventListener = function( event ){ index++ };

            div.$on( 'click', 'span', EventListener );
            div.click();
            index.should.equals( 0 );
            span.click();
            index.should.equals( 1 );
            div.$off( 'click', EventListener );
            span.click();
            index.should.equals( 2 );
            div.$off( 'click', 'span', EventListener );
            span.click();
            index.should.equals( 2 );

            div.$on( 'click', 'span', EventListener );
            div.click();
            index.should.equals( 2 );
            span.click();
            index.should.equals( 3 );
            div.$off( 'click' );
            span.click();
            index.should.equals( 4 );
            div.$off( 'click', 'span', EventListener );
            span.click();
            index.should.equals( 4 );

            div.$on( 'click', 'span', EventListener );
            div.click();
            index.should.equals( 4 );
            span.click();
            index.should.equals( 5 );
            div.$off( 'click', '*' );
            span.click();
            index.should.equals( 5 );

            div.$on( 'click', 'span', EventListener );
            div.click();
            index.should.equals( 5 );
            span.click();
            index.should.equals( 6 );
            div.$off( 'click', '**' );
            span.click();
            index.should.equals( 6 );
          }
        }, {
          name: 'Test availability and check if data is deleted correctly - delegate Wildcard',
          it: function(){
            var div = $div;
            var span = div.appendChild( window.span );
            var index = 0;
            var EventListener = function( event ){ index++ };

            div.$on( 'click', EventListener );
            div.$on( 'click', 'span', EventListener );
            div.click();
            index.should.equals( 1 );
            span.click();
            index.should.equals( 3 );
            div.click();
            span.click();
            index.should.equals( 6 );
            div.$off( 'click', EventListener );
            div.click();
            index.should.equals( 6 );
            span.click();
            index.should.equals( 7 );
            div.$off( 'click', 'span', EventListener );
            div.click();
            index.should.equals( 7 );
            span.click();
            index.should.equals( 7 );

            div.$on( 'click', EventListener );
            div.$on( 'click', 'span', EventListener );
            div.click();
            index.should.equals( 8 );
            span.click();
            index.should.equals( 10 );
            div.click();
            span.click();
            index.should.equals( 13 );
            div.$off( 'click', '*', EventListener );
            div.click();
            index.should.equals( 14 );
            span.click();
            index.should.equals( 15 );
            div.$off( 'click', EventListener );
            div.click();
            index.should.equals( 15 );
            span.click();
            index.should.equals( 15 );

            div.$on( 'click', EventListener );
            div.$on( 'click', 'span', EventListener );
            div.click();
            index.should.equals( 16 );
            span.click();
            index.should.equals( 18 );
            div.click();
            span.click();
            index.should.equals( 21 );
            div.$off( 'click', '**', EventListener );
            div.click();
            index.should.equals( 21 );
            span.click();
            index.should.equals( 21 );
          }
        }, {
          name: 'Delete events using the ZenJS.Event event object',
          it: function(){
            var div = $div;
            var span = div.appendChild( window.span );
            var index = 0;
            var EventListener = function( event ){
              index++;
              event.target.$off( event );
            };

            div.$on( 'click', EventListener );
            div.click();
            index.should.equals( 1 );
            div.click();
            index.should.equals( 1 );

            div.$on( 'click', 'span', EventListener );
            span.click();
            index.should.equals( 2 );
            span.click();
            index.should.equals( 2 );
          }
        }, {
          name: 'Delete events using the object',
          it: function(){
            var div = $div;
            var span = div.appendChild( window.span );
            var index = 0;
            var EventListener = function( event ){ index++ };

            div.$on( 'click', EventListener );
            div.$on( 'keydown', EventListener );
            div.$off({ click: EventListener, keydown: EventListener });
            Object.$equals( div.$data('events'), {} ).should.true;

            div.$on( 'click', 'span', EventListener );
            div.$on( 'keydown', 'span', EventListener );
            div.$off( { click: EventListener, keydown: EventListener }, 'span' );
            Object.$equals( div.$data('events'), {} ).should.true;

            div.$on( 'click', 'span', EventListener );
            div.$on( 'keydown', 'span', EventListener );
            div.$off( { click: EventListener, keydown: EventListener }, '*' );
            Object.$equals( div.$data('events'), {} ).should.true;

            div.$on( 'click', 'span', EventListener );
            div.$on( 'keydown', 'span', EventListener );
            div.$off( { click: EventListener, keydown: EventListener }, '**' );
            Object.$equals( div.$data('events'), {} ).should.true;

            div.$on( 'click', EventListener );
            div.$on( 'keydown', 'span', EventListener );
            div.$off( { click: EventListener, keydown: EventListener }, '*' );
            Object.$equals( div.$data('events'), {} ).should.false;
            div.$off( { click: EventListener } );
            Object.$equals( div.$data('events'), {} ).should.true;
          }
        }
      ]
    }
  ]
});