describes.push({
  name: 'EventTarget',
  describe: [
    {
      name: '$data',
      it: function(){
        // 存储数据返回对象本身
        isElement( div.$data('Data','div') ).should.true;
        isElement( div.$data({Data:'div'}) ).should.true;
        isElement( div.$data({Data:'div'},true) ).should.true;
        isWindow( window.$data('Data','window') ).should.true;
        isWindow( window.$data('Data','window') ).should.true;
        isWindow( window.$data({'Data':'window'}) ).should.true;
        isWindow( window.$data({'Data':'window'},true) ).should.true;
        document.$data('Data','document').should.equals( document );
        document.$data({'Data':'document'}).should.equals( document );
        document.$data({'Data':'document'},true).should.equals( document );
        // 有对应数据返回对应数据
        div.$data('Data','div').$data('Data').should.equals( 'div' );
        window.$data('Data').should.equals( 'window' );
        document.$data('Data').should.equals( 'document' );
        // 无对应数据时返回 undefined
        isUndef( div.$data('noData') ).should.true;
        isUndef( window.$data('noData') ).should.true;
        isUndef( document.$data('noData') ).should.true;
        // 未传入数据名, 返回全部数据集
        JSON.stringify( div.$data('Data','div').$data() ).should.equals( '{"Data":"div"}' );
        JSON.stringify( window.$data() ).should.equals( '{"Data":"window"}' );
        JSON.stringify( document.$data() ).should.equals( '{"Data":"document"}' );
        // 初始化添加方式
        div.$data('Data','div').$data('Data','no',true).should.equals( 'div' );
        div.$data('Data','yes',true).should.equals( 'yes' );
        window.$data('Data','no',true).should.equals( 'window' );
        window.$data('Data1','yes',true).should.equals( 'yes' );
        document.$data('Data','no',true).should.equals( 'document' );
        document.$data('Data1','yes',true).should.equals( 'yes' );
        // 批量添加
        JSON.stringify( div.$data({Data1:'div',Data2:'div'}).$data() ).should.equals( '{"Data1":"div","Data2":"div"}' );
        JSON.stringify( window.$data({'Data':'window','Data1':'yes'}).$data() ).should.equals( '{"Data":"window","Data1":"yes"}' );
        JSON.stringify( document.$data({'Data':'document','Data1':'yes'}).$data() ).should.equals( '{"Data":"document","Data1":"yes"}' );
        // 直接使用 $data 而不使用 window.$data
        $data('Data').should.equals('window');
      }
    }, {
      name: '$hasData',
      it: function(){
        // 未传入对象则检测是否存过数据
        div.$hasData().should.false;
        div.$data('Data','div').$hasData().should.true;
        window.__ZENJS_DATA__ = {};
        window.$hasData().should.false;
        window.$data('Data','window').$hasData().should.true;
        document.__ZENJS_DATA__ = {};
        document.$hasData().should.false;
        document.$data('Data','document').$hasData().should.true;
        // 传入对象检测相应对象
        div.$hasData('noData').should.false;
        div.$data('Data','div').$hasData('Data').should.true;
        window.$hasData('noData').should.false;
        window.$hasData('Data').should.true;
        document.$hasData('noData').should.false;
        document.$hasData('Data').should.true;
        // 直接使用 $data 而不使用 window.$data
        $hasData('noData').should.false;
        $hasData('Data').should.true;
      }
    }, {
      name: '$deleteData',
      it: function(){
        // 始终返回自身
        isElement( div.$deleteData() ).should.true;
        isElement( div.$deleteData('noData') ).should.true;
        isElement( div.$deleteData('noData1 noData2') ).should.true;
        isWindow( window.$deleteData() ).should.true;
        isWindow( window.$deleteData( 'noData' ) ).should.true;
        isWindow( window.$deleteData( 'noData1 noData2' ) ).should.true;
        document.$deleteData().should.equals( document );
        document.$deleteData( 'noData' ).should.equals( document );
        document.$deleteData( 'noData1 noData2' ).should.equals( document );
        // 删除单个数据
        div.$data('Data','div').$deleteData('Data').$hasData('Data').should.false;
        div.$data('Data','div').$deleteData('Data1').$hasData('Data').should.true;
        window.$data('Data','window').$deleteData('Data').$hasData('Data').should.false;
        window.$data('Data','window').$deleteData('Data1').$hasData('Data').should.true;
        document.$data('Data','document').$deleteData('Data').$hasData('Data').should.false;
        document.$data('Data','document').$deleteData('Data1').$hasData('Data').should.true;
        // 删除全部数据
        div.$data('Data','div').$deleteData().$hasData().should.false;
        window.$deleteData().$hasData().should.false;
        document.$deleteData().$hasData().should.false;
        // 直接使用 $data 而不使用 window.$data
        $data('Data','window');
        $deleteData().$hasData().should.false;
      }
    }, {
      name: '$on',
      it: function(){
        // 测试数据存储
        div.$on( 'click', false ).$hasData('events').should.true;
        div.$on( 'click', false ).$data('events').click.should.to.be.an('array');
        div.$on( 'click', false ).$data('events').click.length.should.equals( 1 );
        div.$on( 'click', false ).$on( 'click', false ).$data('events').click.length.should.equals( 2 );
        (
          typeof div.$on( 'click', false ).$data('events').click[0] === 'object'
        ).should.true;
        // 测试命名空间存储
        div.$on( 'click', false ).$data('events').click[0].namespaceStr.should.equals('');
        div.$on( 'click.a', false ).$data('events').click[0].namespaceStr.should.equals('a');
        div.$on( 'click.a.b', false ).$data('events').click[0].namespaceStr.should.equals('a.b');
        // 测试可选参数
        (
          typeof div.$on('click', false).$data('events').click[0].options === 'object'
        ).should.true;
          // 可选参数为 false 时, 不会添加到参数中
          JSON.stringify( div.$on( 'click', false, false ).$data('events').click[0].options ).should.equals('{}');
          JSON.stringify( div.$on( 'click', false, { capture: false } ).$data('events').click[0].options ).should.equals('{}');
          JSON.stringify( div.$on( 'click', false, { passive: false } ).$data('events').click[0].options ).should.equals('{}');
          JSON.stringify( div.$on( 'click', false, { once: false } ).$data('events').click[0].options ).should.equals('{}');
          JSON.stringify( div.$on( 'click', false, { one: false } ).$data('events').click[0].options ).should.equals('{}');
          // useCapture
          JSON.stringify( div.$on( 'click', false, true ).$data('events').click[0].options ).should.equals('{"capture":true}');
          JSON.stringify( div.$on( 'click', false, { capture: true } ).$data('events').click[0].options ).should.equals('{"capture":true}');
          // once
          JSON.stringify( div.$on( 'click', false, { once: true } ).$data('events').click[0].options ).should.equals('{}');
          JSON.stringify( div.$on( 'click', false, { one: true } ).$data('events').click[0].options ).should.equals('{}');
          (
            div.$on( 'click', false ).$data('events').click[0].listener ===
            div.$on( 'click', false ).$data('events').click[0].listener
          ).should.true;
          (
            div.$on( 'click', false ).$data('events').click[0].listener !==
            div.$on( 'click', false, { once: true } ).$data('events').click[0].listener
          ).should.true;
          (
            div.$on( 'click', false ).$data('events').click[0].listener !==
            div.$on( 'click', false, { one: true } ).$data('events').click[0].listener
          ).should.true;
          // passive
          if( ZenJS.util.supports.passiveEvent ){
            JSON.stringify( div.$on( 'click', false, { passive: true } ).$data('events').click[0].options ).should.equals('{"passive":true}');
          }else{
            JSON.stringify( div.$on( 'click', false, { passive: true } ).$data('events').click[0].options ).should.equals('{}');
          }
        // 测试各种传值方式
        var test = div.$on( 'click', 'div', false, false ).$data('events');

        Object.$equals( test, div.$on( { click: false }, 'div', false ).$data('events') ).should.true;
        Object.$equals( test, div.$on( { click: false }, false, 'div' ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, false ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, { capture: false } ).$data('events') ).should.true;

        test = div.$on( 'click', 'div', false, true ).$data('events');
        Object.$equals( test, div.$on( { click: false }, 'div', true ).$data('events') ).should.true;
        Object.$equals( test, div.$on( { click: false }, true, 'div' ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, true ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, { capture: true } ).$data('events') ).should.true;

        test = div.$on( 'click', 'div', true, true ).$data('events');
        Object.$equals( test, div.$on( { click: true }, 'div', true ).$data('events') ).should.true;
        Object.$equals( test, div.$on( { click: true }, true, 'div' ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: true }, true ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: true }, { capture: true } ).$data('events') ).should.true;

        test = div.$on( 'click', 'div', true, true ).$data('events');
        Object.$equals( test, div.$on( { click: true }, 'div', true ).$data('events') ).should.true;
        Object.$equals( test, div.$on( { click: true }, true, 'div' ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: true }, true ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: true }, { capture: true } ).$data('events') ).should.true;

        test = div.$on( 'click', 'div', false, { once: true } ).$data('events');
        Object.$equals( test, div.$on( { click: false }, 'div', { once: true } ).$data('events') ).should.true;
        Object.$equals( test, div.$on( { click: false }, { once: true }, 'div' ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, { once: true } ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, { once: true } ).$data('events') ).should.true;

        Object.$equals( test, div.$on( { click: false }, 'div', { one: true } ).$data('events') ).should.true;
        Object.$equals( test, div.$on( { click: false }, { one: true }, 'div' ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, { one: true } ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, { one: true } ).$data('events') ).should.true;

        test = div.$on( 'click', 'div', false, { passive: true } ).$data('events');
        Object.$equals( test, div.$on( { click: false }, 'div', { passive: true } ).$data('events') ).should.true;
        Object.$equals( test, div.$on( { click: false }, { passive: true }, 'div' ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, { passive: true } ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, { passive: true } ).$data('events') ).should.true;

        test = div.$on( 'click', false ).$on( 'dblclick', false ).$data('events');
        Object.$equals( test, div.$on( 'click dblclick', false ).$data('events') ).should.true;
      }
    }, {
      name: '$one / $once',
      it: function(){
        var test = div.$one( 'click', 'div', false ).$data('events');

        Object.$equals( test, div.$on( 'click', 'div', false, { once: true } ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'click', false, 'div', { once: true } ).$data('events') ).should.true;
        Object.$equals( test, div.$on( { click: false }, 'div', { once: true } ).$data('events') ).should.true;
        Object.$equals( test, div.$on( 'div', { click: false }, { once: true } ).$data('events') ).should.true;
      }
    }, {
      name: '$off',
      it: function(){
        // 移除全部事件
        Object.$equals( window.div.$on('click',false).$off().$data('events'), {} ).should.true;
        Object.$equals( window.div.$on('click.ZenJS',false).$off().$data('events'), {} ).should.true;
        Object.$equals( window.div.$on({ click: false, dblclick: true }).$off().$data('events'), {} ).should.true;
        // 移除全部指定事件
        Object.$equals( window.div.$on('click',false).$off('click').$data('events'), {} ).should.true;
        Object.$equals( window.div.$on({ click: false, dblclick: true }).$off('click').$data('events'), window.div.$on('dblclick',true).$data('events') ).should.true;
        // 使用命名空间移除事件
        Object.$equals( window.div.$on({ click: false, 'click.ZenJS': true }).$off('click.ZenJS').$data('events'), window.div.$on('click',false).$data('events') ).should.true;
        // 事件委托
        var div = window.div;

        div.$on( 'click', false );
        div.$on( 'click', false, 'div' );

        // 移除绑定在当前元素上的 click 事件, 但并不包括事件委托
        div.$off( 'click' );
        Object.$equals( div.$data('events'), window.div.$on( 'click', false, 'div' ).$data('events') ).should.true;

        // 移除绑定在当前元素上的 click 事件, 只移除事件委托
        div.$on( 'click', false );
        div.$off( 'click', '*' );
        Object.$equals( div.$data('events'), window.div.$on( 'click', false ).$data('events') ).should.true;

        // 移除绑定在当前元素上的 click 事件及事件委托
        div.$on( 'click', false );
        div.$off( 'click', '**' );
        Object.$equals( div.$data('events'), {} ).should.true;



        div = window.div;
        div.$on( { click: false, dblclick: false });
        div.$on( { click: false, dblclick: false }, 'div' );

        // 移除绑定在当前元素上的所有事件委托事件
        div.$off( '*' );
        Object.$equals( div.$data('events'), window.div.$on( { click: false, dblclick: false }).$data('events') ).should.true;

        // 移除绑定在当前元素上的所有事件及事件委托
        div.$on( { click: false, dblclick: false }, 'div' );
        div.$off( '**' );
        Object.$equals( div.$data('events'), {} ).should.true;

        // 正常移除
        div = window.$div;
        div.$on( 'click', function click(){
          this.$off( 'click', click );
        });
        div.click();
        isUndef( div.$data( 'events' ).click ).should.true;
      }
    }, {
      name: '$emit',
      it: function(){

        var div = window.div,
            num = 0;

        div.$on( 'click dblclick', function(){ num++ });

        div.$emit();
        num.should.equals( 0 );

        div.$emit( 'click' );
        num.should.equal( 1 );

        div.$emit( 'click dblclick' );
        num.should.equal( 3 );

        div.$off();
        num.should.equals( 3 );

        div
          .$on( 'Test-Event', function( event ){
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
          })
          .$emit( 'Test-Event' );

        div.$on( 'Test-Data', function( event, num1 ){
          num1.should.equals( 1 );
        });
        div.$emit( 'Test-Data', 1 );

        div.$on( 'Test-Data2', function( event, num1, num2, num3 ){
          num1.should.equals( 1 );
          num2.should.equals( 3 );
          num3.should.equals( 5 );
        });
        div.$emit( 'Test-Data2', 1, 3, 5 );
      }
    }, {
      name: '$on / $one / $once / $off / $emit',
      it: function(){

        var div = window.$div,
            num = 0;

        div.$on( 'click', function(){ num++ } )
           .click();
        num.should.equals( 1 );

        div.$on( 'click', function(){ num++ } )
           .click();
        num.should.equals( 3 );

        div.$one( 'click', function(){ num++ } )
           .click();
        num.should.equals( 6 );

        div.click();
        num.should.equals( 8 );

        num = 0;
        div.$off();

        var childDiv = div.appendChild( window.div );

        div.$on( 'click', function(){ num++ } );
        div.$on( 'click', 'div', function(){ num += 2 } );

        childDiv.click();
        num.should.equals( 3 );

        div.$off()
        childDiv.click();
        num.should.equals( 5 );

        div.$off('*');
        div.$on( 'click', function(){ num++ } );
        childDiv.click();
        num.should.equals( 6 );

        div.$off('**');
        childDiv.click();
        num.should.equals( 6 );

        // 向事件传递数据
        div.$on( 'Test-Data', function( event ){
          event.data.should.equals( 123 );
        }, {
          data: 123
        });
        div.$emit( 'Test-Data' );
      }
    }, {
      name: 'Functionality namespace',
      it: function(){

        var div = window.$div,
            childDiv;
        var num = 0;

        function numadd(){
          num++;
        }

        // .once
        div.$on( 'click.once', numadd );
        div.$on( 'click.once', numadd );
        div.click();
        num.should.equals( 1 );

        // .self
        div = window.div;
        childDiv = div.appendChild( window.div );

        div.$on( 'click.self', numadd );
        childDiv.$on( 'click', numadd );

        childDiv.click();
        num.should.equals( 2 );
        div.click();
        num.should.equals( 3 );

      }
    }
  ]
});