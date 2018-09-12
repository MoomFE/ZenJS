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
          name: 'Event binding test',
          it: function(){

          }
        }
      ]
    }, {
      name: '$one / $once',
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
    }
  ]
});

// describes.push({
//   name: 'EventTarget',
//   describe: [
//     {
//       name: '$one / $once',
//       it: function(){
//         var test = div.$one( 'click', 'div', false ).$data('events');

//         Object.$equals( test, div.$on( 'click', 'div', false, { once: true } ).$data('events') ).should.true;
//         Object.$equals( test, div.$on( 'click', false, 'div', { once: true } ).$data('events') ).should.true;
//         Object.$equals( test, div.$on( { click: false }, 'div', { once: true } ).$data('events') ).should.true;
//         Object.$equals( test, div.$on( 'div', { click: false }, { once: true } ).$data('events') ).should.true;
//       }
//     }, {
//       name: '$off',
//       it: function(){
//         // 移除全部事件
//         Object.$equals( window.div.$on('click',false).$off().$data('events'), {} ).should.true;
//         Object.$equals( window.div.$on('click.ZenJS',false).$off().$data('events'), {} ).should.true;
//         Object.$equals( window.div.$on({ click: false, dblclick: true }).$off().$data('events'), {} ).should.true;
//         // 移除全部指定事件
//         Object.$equals( window.div.$on('click',false).$off('click').$data('events'), {} ).should.true;
//         Object.$equals( window.div.$on({ click: false, dblclick: true }).$off('click').$data('events'), window.div.$on('dblclick',true).$data('events') ).should.true;
//         // 使用命名空间移除事件
//         Object.$equals( window.div.$on({ click: false, 'click.ZenJS': true }).$off('click.ZenJS').$data('events'), window.div.$on('click',false).$data('events') ).should.true;
//         // 事件委托
//         var div = window.div;

//         div.$on( 'click', false );
//         div.$on( 'click', false, 'div' );

//         // 移除绑定在当前元素上的 click 事件, 但并不包括事件委托
//         div.$off( 'click' );
//         Object.$equals( div.$data('events'), window.div.$on( 'click', false, 'div' ).$data('events') ).should.true;

//         // 移除绑定在当前元素上的 click 事件, 只移除事件委托
//         div.$on( 'click', false );
//         div.$off( 'click', '*' );
//         Object.$equals( div.$data('events'), window.div.$on( 'click', false ).$data('events') ).should.true;

//         // 移除绑定在当前元素上的 click 事件及事件委托
//         div.$on( 'click', false );
//         div.$off( 'click', '**' );
//         Object.$equals( div.$data('events'), {} ).should.true;



//         div = window.div;
//         div.$on( { click: false, dblclick: false });
//         div.$on( { click: false, dblclick: false }, 'div' );

//         // 移除绑定在当前元素上的所有事件委托事件
//         div.$off( '*' );
//         Object.$equals( div.$data('events'), window.div.$on( { click: false, dblclick: false }).$data('events') ).should.true;

//         // 移除绑定在当前元素上的所有事件及事件委托
//         div.$on( { click: false, dblclick: false }, 'div' );
//         div.$off( '**' );
//         Object.$equals( div.$data('events'), {} ).should.true;

//         // 正常移除
//         div = window.$div;
//         div.$on( 'click', function click(){
//           this.$off( 'click', click );
//         });
//         div.click();
//         isUndef( div.$data( 'events' ).click ).should.true;
//       }
//     }, {
//       name: '$emit',
//       it: function(){

//         var div = window.div,
//             num = 0;

//         div.$on( 'click dblclick', function(){ num++ });

//         div.$emit();
//         num.should.equals( 0 );

//         div.$emit( 'click' );
//         num.should.equal( 1 );

//         div.$emit( 'click dblclick' );
//         num.should.equal( 3 );

//         div.$off();
//         num.should.equals( 3 );

//         div
//           .$on( 'Test-Event', function( event ){
//             event.preventDefault();
//             event.stopPropagation();
//             event.stopImmediatePropagation();
//           })
//           .$emit( 'Test-Event' );

//         div.$on( 'Test-Data', function( event, num1 ){
//           num1.should.equals( 1 );
//         });
//         div.$emit( 'Test-Data', 1 );

//         div.$on( 'Test-Data2', function( event, num1, num2, num3 ){
//           num1.should.equals( 1 );
//           num2.should.equals( 3 );
//           num3.should.equals( 5 );
//         });
//         div.$emit( 'Test-Data2', 1, 3, 5 );
//       }
//     }, {
//       name: '$on / $one / $once / $off / $emit',
//       it: function(){

//         var div = window.$div,
//             num = 0;

//         div.$on( 'click', function(){ num++ } )
//            .click();
//         num.should.equals( 1 );

//         div.$on( 'click', function(){ num++ } )
//            .click();
//         num.should.equals( 3 );

//         div.$one( 'click', function(){ num++ } )
//            .click();
//         num.should.equals( 6 );

//         div.click();
//         num.should.equals( 8 );

//         num = 0;
//         div.$off();

//         var childDiv = div.appendChild( window.div );

//         div.$on( 'click', function(){ num++ } );
//         div.$on( 'click', 'div', function(){ num += 2 } );

//         childDiv.click();
//         num.should.equals( 3 );

//         div.$off()
//         childDiv.click();
//         num.should.equals( 5 );

//         div.$off('*');
//         div.$on( 'click', function(){ num++ } );
//         childDiv.click();
//         num.should.equals( 6 );

//         div.$off('**');
//         childDiv.click();
//         num.should.equals( 6 );

//         // 向事件传递数据
//         div.$on( 'Test-Data', function( event ){
//           event.data.should.equals( 123 );
//         }, {
//           data: 123
//         });
//         div.$emit( 'Test-Data' );
//       }
//     }, {
//       name: 'Functionality namespace',
//       it: function(){

//         var div = window.$div,
//             childDiv;
//         var num = 0;

//         function numadd(){
//           num++;
//         }

//         // .once
//         div.$on( 'click.once', numadd );
//         div.$on( 'click.once', numadd );
//         div.click();
//         num.should.equals( 1 );

//         // .self
//         div = window.div;
//         childDiv = div.appendChild( window.div );

//         div.$on( 'click.self', numadd );
//         childDiv.$on( 'click', numadd );

//         childDiv.click();
//         num.should.equals( 2 );
//         div.click();
//         num.should.equals( 3 );

//       }
//     }
//   ]
// });