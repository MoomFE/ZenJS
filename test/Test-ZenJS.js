!function(){

  var isLowBrowser = true;
  var div = document.createElement('div');

  div.addEventListener( 'click', function(){
    isLowBrowser = false;
  });
  div.click();

  if( isLowBrowser ){
    Object.defineProperty( window, '$div', {
      get: function(){
        var parent = document.createElement('mark');
        var div = document.createElement('div');
        return parent.appendChild( div );
      }
    });
  }else{
    Object.defineProperty( window, '$div', {
      get: function(){
        return document.createElement('div');
      }
    });
  }

  Object.defineProperty( window, 'div', {
    get: function(){
      return document.createElement('div');
    }
  });

  Object.defineProperty( window, 'span', {
    get: function(){
      return document.createElement('span');
    }
  });

  Object.defineProperty( window, 'a', {
    get: function(){
      return document.createElement('a');
    }
  });

}();


!function(){

  var toString = function( obj ){
    return this.call( obj );
  }.bind(
    {}.toString
  );

  function isUndef( obj ){
    return obj === undefined;
  }
  function isNull( obj ){
    return obj === null;
  }
  function isLikeNull( obj ){
    return obj == null;
  }
  function isEqual( first, second ){
    return first === second;
  }
  function isElement( elem ){
    return toString( elem ) === '[object HTMLDivElement]';
  }
  function isWindow( obj ){
    return obj != null && obj === obj.window;
  }

  var describes = [];



  describes.push({
    name: 'Object',
    describe: [
      {
        name: '$assign',
        it: function(){

          Object.$isPlainObject( Object.$assign() ).should.true;
          Object.$isEmptyObject( Object.$assign() ).should.true;

          var obj1 = {},
              obj2 = { asd: 123 },
              obj3 = { asd: 1234 };

          Object.$assign( obj1 ).should.equals( obj1 )
          Object.$isEmptyObject( Object.$assign( obj1 ) ).should.true;

          Object.$assign( obj1, obj2 ).should.equals( obj1 );
          Object.$isEmptyObject( Object.$assign( obj1, obj2 ) ).should.false;

          Object.$assign( obj1, obj2 ).asd.should.equals( 123 );
          Object.$assign( obj1, obj2, obj3 ).asd.should.equals( 1234 );

          var obj4 = { infiniteLoop: obj5 },
              obj5 = { infiniteLoop: obj4 };

          isUndef( Object.$assign( obj4, obj5 ).infiniteLoop ).should.true;
        }
      }, {
        name: '$create',
        it: function(){
          Object.$isEmptyObject( Object.$create() ).should.true;
          Object.$isPlainObject( Object.$create() ).should.true;
          Object.$isPlainObject( Object.$create( true ) ).should.true;
          Object.$isPlainObject( Object.$create( false ) ).should.true;

          ( Object.getPrototypeOf( Object.$create( true ) ) == null ).should.true;
          ( Object.$create().constructor != null ).should.true;

          var obj1 = { asd: 123 },
              obj2 = { asd: 1234 };

          Object.$create( obj1 ).asd.should.equals( 123 );
          Object.$create( obj1, obj2 ).asd.should.equals( 1234 );
          isEqual( obj1, Object.$create( obj1 ) ).should.false;
        }
      }, {
        name: '$each',
        it: function(){
          var test1 = Object.$each( { "1": 3, "2": 2, "3": 1 }, function( key, value, obj ){
            switch( key ){
              case "3": obj[ key ] = 3; break;
              case "1": obj[ key ] = 1; break; 
            }
          });

          test1[ "3" ].should.equals( 3 );
          test1[ "1" ].should.equals( 1 );

          var test2 = Object.$each( { "1": 3, "2": 2, "3": 1 }, function( key, value, obj ){
            switch( key ){
              case "3": obj[ key ] = 3; break; 
              case "1": obj[ key ] = 1; 
                        return false;
            }
          });

          test2[ "1" ].should.equals( 1 );
          test2[ "3" ].should.equals( 1 );
        }
      }, {
        name: '$equals',
        it: function(){
          Object.$equals( {}, {} ).should.true;
          Object.$equals( { a: 1 }, { a: 1 } ).should.true;

          Object.$equals( null, null ).should.true;
          Object.$equals( { null: null }, { null: null } );

          Object.$equals( undefined, undefined ).should.true;
          Object.$equals( { undefined: undefined }, { undefined: undefined } ).should.true;

          Object.$equals( 'ZenJS', 'ZenJS' ).should.true;
          Object.$equals( { ZenJS: 'ZenJS' }, { ZenJS: 'ZenJS' } ).should.true;

          Object.$equals( true, true ).should.true;
          Object.$equals( false, false ).should.true;
          Object.$equals( { true: true }, { true: true } ).should.true;
          Object.$equals( { false: false }, { false: false } ).should.true;

          Object.$equals( div, div ).should.true;
          Object.$equals( { div: div }, { div: div } ).should.true;

          Object.$equals( /ZenJS/, /ZenJS/ );
          Object.$equals( { ZenJS: /ZenJS/ }, { ZenJS: /ZenJS/ } );

          Object.$equals( {}, [] ).should.false;
          Object.$equals( {}, div ).should.false;
          Object.$equals( {}, { a: 1 } ).should.false;

          var a = {};
              a.a = a;
          Object.$equals( a, a ).should.true;

          var b = {};
              b.a = a;
          Object.$equals( a, b ).should.true;

          b.a = b;
          Object.$equals( a, b ).should.false;

          b.a = { a: 1 };
          Object.$equals( a, b ).should.false;
        }
      }, {
        name: '$isEmptyObject',
        it: function(){
          Object.$isEmptyObject( {} ).should.true;
          Object.$isEmptyObject( { Empty: false } ).should.false;
        }
      }, {
        name: '$isPlainObject',
        it: function(){
          Object.$isPlainObject( {} ).should.true;
          Object.$isPlainObject( Object.create( null ) ).should.true;
          Object.$isPlainObject( div ).should.false;
          Object.$isPlainObject( Element ).should.false;
          Object.$isPlainObject( Element.prototype ).should.false;
          Object.$isPlainObject( new function(){} ).should.false;
        }
      }
    ]
  });

  describes.push({
    name: 'Array',
    describe: [
      {
        name: '$create',
        it: function(){
          Array.$create( 10 ).length.should.equals( 10 );
          Array.$create( true ).length.should.equals( 1 );
          Array.$create( false ).length.should.equals( 0 );
          Array.$create( 1, true )[0].should.true;
          Array.$create( 1, false )[0].should.false;
          Array
            .$create( 10, function( index ){
              return 'ZenJS-' + index
            })
            [ 9 ]
            .should.equals( 'ZenJS-9' )
        }
      }, {
        name: '$toArray',
        it: function(){

          Array.$toArray( null ).$equals( [] ).should.true;
          Array.$toArray( undefined ).$equals( [] ).should.true;
          Array.$toArray( '' ).$equals( [] ).should.true;
          Array.$toArray( false ).$equals( [] ).should.true;
          Array.$toArray( true ).$equals( [] ).should.true;
          Array.$toArray( NaN ).$equals( [] ).should.true;
          Array.$toArray( undefined ).$equals( [] ).should.true;
          Array.$toArray( 0 ).$equals( [] ).should.true;
          Array.$toArray( 1 ).$equals( [] ).should.true;
          Array.$toArray( Infinity ).$equals( [] ).should.true;

          Array.$toArray( '135' ).$equals( [ '1', '3', '5' ] ).should.true;
          Array.$toArray( '💪' ).$equals( [ '💪' ] ).should.true;
          Array.$toArray( '💪💪' ).$equals( [ '💪', '💪' ] ).should.true;

          var div = window.div;
          var div1 = div.appendChild( window.div );
          var div2 = div.appendChild( window.div );
          var div3 = div.appendChild( window.div );

          Array.$toArray( div.querySelectorAll('div') ).$equals( [ div1, div2, div3 ] ).should.true;

        }
      }, {
        name: '$copy',
        it: function(){

          var arr = [ 1, 2, 3 ], arr1;
          var result;

          result = Array.$copy( arr );
          result.$equals( arr ).should.true;
          isEqual( result, arr ).should.false;

          arr1 = [ 4, 5, 6 ];
          result = Array.$copy( arr1, arr );
          result.$equals([ 1, 2, 3, 4, 5, 6 ]).should.true;
          isEqual( result, arr ).should.false;
          isEqual( result, arr1 ).should.false;

        }
      }
    ]
  });

  describes.push({
    name: 'Array.prototype',
    describe: [
      {
        name: '$add',
        it: function(){
          [ 1 ].$add( 0, 0 )[ 0 ].should.equals( 0 );
          [ 1 ].$add( 0, 0 )[ 1 ].should.equals( 1 );
          [ 1 ].$add( 0, 0 ).length.should.equals( 2 );
          [ 5 ].$add( 1, 4, 3, 2, 1 ).length.should.equals( 5 );

          Object.$equals( [ 1 ].$add( 0, 0 ), [ 0, 1 ] ).should.true;
          Object.$equals( [ 1 ].$add( 1, 2 ), [ 1, 2 ] ).should.true;
          Object.$equals( [ 1 ].$add( -1, 2 ), [ 1, 2 ] ).should.true;
          Object.$equals( [ 1, 2 ].$add( -1, 3 ), [ 1, 2, 3 ] ).should.true;
        }
      }, {
        name: '$concat',
        it: function(){
          Object.$equals( [ 1 ].$concat( 2 ), [ 1, 2 ] ).should.true;
          Object.$equals( [ 1 ].$concat( 2, 3, 4 ), [ 1, 2, 3, 4 ] ).should.true;
          Object.$equals( [ 1, 2 ].$concat( 3, 4 ), [ 1, 2, 3, 4 ] ).should.true;
          Object.$equals( [ 1 ].$concat( [ 2 ] ), [ 1, 2 ] ).should.true;
          Object.$equals( [ 1 ].$concat( 2, [ 3, 4 ], 5 ), [ 1, 2, 3, 4, 5 ] ).should.true;
          Object.$equals( [ 1 ].$concat( 2, [ 3, 4, [ 5 ] ], 6 ), [ 1, 2, 3, 4, [ 5 ], 6 ] ).should.true;
        }
      }, {
        name: '$delete',
        it: function(){
          [ 1 ].$delete( 0 ).length.should.equals( 0 );
          [ 0, 1 ].$delete( 0, 2 ).length.should.equals( 0 );
          [ 0, 1, 2 ].$delete( 0, 2 ).length.should.equals( 1 );
          [ 0, 1, 2 ].$delete( 0, 2 )[ 0 ].should.equals( 2 );
        }
      }, {
        name: '$deleteValue',
        it: function(){
          [ 1, 2, 3, 4 ].$deleteValue( 4 ).length.should.equals( 3 );
          Array.$create( 10 ).$deleteValue( undefined ).length.should.equals( 0 );
          Array.$create( 10, null ).concat( Array.$create( 10, 0 ) ).$deleteValue( false ).length.should.equals( 20 );
          Array.$create( 10, null ).concat( Array.$create( 10, 0 ) ).$deleteValue( false, false ).length.should.equals( 10 );
        }
      }, {
        name: '$each',
        it: function(){
          var test1 = [ 1, 2, 3 ].$each(function( value, index, arr ){
            if( index === 0 ) arr[ index ] = 3;
            else if( index === 2 ) arr[ index ] = 1;
          });

          test1[ 0 ].should.equals( 3 );
          test1[ 2 ].should.equals( 1 );


          var test2 = [ 1, 2, 3 ].$each(function( value, index, arr ){
            if( index === 0 ){
              arr[ index ] = 3;
              return false;
            }
            else if( index === 2 ) arr[ index ] = 1;
          });

          test2[ 0 ].should.equals( 3 );
          test2[ 2 ].should.equals( 3 );
        }
      }, {
        name: '$equals',
        it: function(){
          [].$equals( ZenJS ).should.false;
          [ 1, 2, 3 ].$equals( [ 3, 2, 1 ] ).should.false;
          [].$equals([]).should.true;
          [ 1, 2, 3 ].$equals( [ 1, 2, 3 ] ).should.true;
        }
      }, {
        name: '$get',
        it: function(){
          [ 0, 1, 2, 3, 4, 5 ].$get().should.equals( 0 );
          [ 0, 1, 2, 3, 4, 5 ].$get( 2 ).should.equals( 2 );
          [ 0, 1, 2, 3, 4, 5 ].$get( 0, 3 ).length.should.equals( 3 );
          [ 0, 1, 2, 3, 4, 5 ].$get( 2, 3 ).length.should.equals( 3 );
        }
      }, {
        name: '$inArray',
        it: function(){
          [ 1, 2, 3 ].$inArray( 1 ).should.true;
          [ 1, 2, 3 ].$inArray( 0 ).should.false;
          [ '' ].$inArray( false ).should.true;
          [ undefined ].$inArray( null ).should.true;
        }
      }, {
        name: '$set',
        it: function(){
          [ 1, 2, 3 ].$set( 1, 4 )[ 1 ].should.equals( 4 );
          [ 1 ].$set( 1, 2 )[ 1 ].should.equals( 2 );
          [].$set( 1, 1 )[ 1 ].should.equals( 1 );
          [].$set({ 0: 0, 1: 1, 2: 2 }).length.should.equals( 3 );
        }
      }, {
        name: '$push',
        it: function(){
          [ 1 ].$push( 2 ).length.should.equals( 2 );
          [ 1 ].$push( 2 )[ 1 ].should.equals( 2 );
        }
      }, {
        name: '$unshift',
        it: function(){
          [ 1 ].$unshift( 0 ).length.should.equals( 2 );
          [ 1 ].$unshift( 0 )[ 0 ].should.equals( 0 );
        }
      }, {
        name: '$pop',
        it: function(){
          [ 1, 2, 3 ].$pop().length.should.equals( 2 );
          [ 1, 2, 3 ].$pop()[ 1 ].should.equals( 2 );
        }
      }, {
        name: '$shift',
        it: function(){
          [ 1, 2, 3 ].$shift().length.should.equals( 2 );
          [ 1, 2, 3 ].$shift()[ 1 ].should.equals( 3 );
        }
      }
    ]
  });

  describes.push({
    name: 'document',
    describe: [
      {
        name: '$ready',
        it: function(){
          // 手动测试的 (*^▽^*)
        }
      }
    ]
  });

  describes.push({
    name: 'Element.prototype',
    describe: [
      {
        name: '_index',
        it: function(){

          var div = window.div;
          var div0 = div.appendChild( window.div );
          var div1 = div.appendChild( window.div );
          var div2 = div.appendChild( window.div );
          var div3 = div.appendChild( window.div );
          var div4 = div.appendChild( window.div );
          var div5 = div.appendChild( window.div );
          var div6 = div.appendChild( window.div );

          // [ div0, div1, div2, div3, div4, div5, div6 ]
          div0._index.should.equals( 0 );
          div1._index.should.equals( 1 );
          div2._index.should.equals( 2 );
          div3._index.should.equals( 3 );
          div4._index.should.equals( 4 );
          div5._index.should.equals( 5 );
          div6._index.should.equals( 6 );

          // [ div1, div0, div2, div3, div4, div5, div6 ]
          div0._index = 1;
          div0._index.should.equals( 1 );
          div1._index.should.equals( 0 );

          // [ div1, div2, div3, div4, div5, div6, div0 ]
          div0._index = 666;
          div0._index.should.equals( 6 );
          div1._index.should.equals( 0 );
          div2._index.should.equals( 1 );
          div3._index.should.equals( 2 );
          div4._index.should.equals( 3 );
          div5._index.should.equals( 4 );
          div6._index.should.equals( 5 );

          // [ div0, div1, div2, div3, div4, div5, div6 ]
          div0._index = 0;
          div0._index.should.equals( 0 );
          div1._index.should.equals( 1 );
          div2._index.should.equals( 2 );
          div3._index.should.equals( 3 );
          div4._index.should.equals( 4 );
          div5._index.should.equals( 5 );
          div6._index.should.equals( 6 );

        }
      }, {
        name: '$addClass',
        it: function(){

          var div = window.div;

          div.$addClass('test1').should.equals( div );
          div.className.should.equals('test1');
          div.$addClass('test1').className.should.equals('test1');
          div.$addClass('test2').className.should.equals('test1 test2');

          div.className = '';
          div.$addClass('test1 test2').className.should.equals('test1 test2');
          div.$addClass('test3').className.should.equals('test1 test2 test3');
          div.$addClass().className.should.equals('test1 test2 test3');
        }
      }, {
        name: '$removeClass',
        it: function(){

          var div = window.div;

          div.$addClass('test1');
          div.$removeClass('test1').should.equals( div );

          div.$addClass('test1 test2');
          div.$removeClass('test2').className.should.equals('test1');

          div.$addClass('test2');
          div.$removeClass('').className.should.equals('test1 test2');

        }
      }, {
        name: '$hasClass',
        it: function(){

          var div = window.div;

          div.$hasClass().should.false;
          div.$hasClass('').should.false;
          div.$hasClass('test1').should.false;

          div.$addClass('test1');
          div.$hasClass('test1').should.true;
          div.$hasClass('test2').should.false;

          div.$addClass('test2');
          div.$hasClass('test1 test2').should.true;
          div.$hasClass('test1 test3').should.false;

        }
      }, {
        name: '$toggleClass',
        it: function(){

          var div = window.div;

          div.$toggleClass().className.should.equals('');
          div.$toggleClass('test1').className.should.equals('test1');
          div.$toggleClass('test1').className.should.equals('');
          div.$toggleClass('test1 test2').className.should.equals('test1 test2');
          div.$removeClass('test1').$toggleClass('test1 test2').className.should.equals('test1');

          div.$toggleClass('test1',true).className.should.equals('test1');
          div.$toggleClass('test2',true).className.should.equals('test1 test2');
          div.$toggleClass('test2',false).className.should.equals('test1');
          div.$toggleClass('test2 test3',true).className.should.equals('test1 test2 test3');

        }
      }, {
        name: '$child / $children',
        it: function(){

          var div = window.div;
          var span = div.appendChild( window.span );
          var a = div.appendChild( window.a );

          div.$child().$equals([ span, a ]).should.true;
          div.$child('span').$equals([ span ]).should.true;
          div.$child('a').$equals([ a ]).should.true;
          div.$child('div').$equals([]).should.true;

          ( div.$child === div.$children ).should.true;

        }
      }, {
        name: '$first / $firstChild',
        it: function(){

          var div = window.div;
          var span = div.appendChild( window.span );
          var a = div.appendChild( window.a );

          div.$first().should.equals( span );
          div.$first('span').should.equals( span );
          div.$first('a').should.equals( a );
          isNull( div.$first('div') ).should.true;

          ( div.$first === div.$firstChild ).should.true;

        }
      }, {
        name: '$last / $lastChild',
        it: function(){

          var div = window.div;
          var span = div.appendChild( window.span );
          var a = div.appendChild( window.a );

          div.$last().should.equals( a );
          div.$last('span').should.equals( span );
          div.$last('a').should.equals( a );
          isNull( div.$last('div') ).should.true;

          ( div.$last === div.$lastChild ).should.true;

        }
      }, {
        name: '$is',
        it: function(){
          var div1 = div;

          div.$is( div ).should.false;
          div1.$is( div1 ).should.true;

          div.$is( 'span' ).should.false;
          div.$is( 'div' ).should.true;

          div.$is( window ).should.false;
        }
      }, {
        name: '$not',
        it: function(){
          var div1 = div;

          div.$not( div ).should.true;
          div1.$not( div1 ).should.false;

          div.$not( 'span' ).should.true;
          div.$not( 'div' ).should.false;

          div.$not( window ).should.true;
        }
      }, {
        name: '$next',
        it: function(){

          var div = window.div,
              div1 = div.appendChild( window.div ),
              div2 = div.appendChild( window.div ),
              div3 = div.appendChild( window.div.$set( 'id', 'div3' ) );

          div1.$next().should.equals( div2 );
          div1.$next('div').should.equals( div2 );
          div1.$next('#div3').should.equals( div3 );
          isLikeNull( div3.$next() ).should.true;
          isLikeNull( div3.$next('div') ).should.true;
        }
      }, {
        name: '$prev',
        it: function(){

          var div = window.div,
              div1 = div.appendChild( window.div.$set( 'id', 'div3' ) ),
              div2 = div.appendChild( window.div ),
              div3 = div.appendChild( window.div );

          div3.$prev().should.equals( div2 );
          div3.$prev('div').should.equals( div2 );
          div3.$prev('#div3').should.equals( div1 );
          isLikeNull( div1.$prev() ).should.true;
          isLikeNull( div1.$prev('div') ).should.true;

        }
      }, {
        name: '$nextAll',
        it: function(){

          var div = window.div,
              div1 = div.appendChild( window.div.$set( 'id', 'div3' ) ),
              div2 = div.appendChild( window.div ),
              div3 = div.appendChild( window.div );

          Object.$equals( div1.$nextAll(), [ div2, div3 ] ).should.true;
          Object.$equals( div2.$nextAll(), [ div3 ] ).should.true;
          Object.$equals( div3.$nextAll(), [  ] ).should.true;

          Object.$equals( div1.$nextAll('div'), [ div2, div3 ] ).should.true;
          Object.$equals( div2.$nextAll('div'), [ div3 ] ).should.true;
          Object.$equals( div3.$nextAll('div'), [  ] ).should.true;

        }
      }, {
        name: '$prevAll',
        it: function(){

          var div = window.div,
              div1 = div.appendChild( window.div.$set( 'id', 'div3' ) ),
              div2 = div.appendChild( window.div ),
              div3 = div.appendChild( window.div );

          Object.$equals( div3.$prevAll(), [ div1, div2 ] ).should.true;
          Object.$equals( div2.$prevAll(), [ div1 ] ).should.true;
          Object.$equals( div1.$prevAll(), [  ] ).should.true;

          Object.$equals( div3.$prevAll('div'), [ div1, div2 ] ).should.true;
          Object.$equals( div2.$prevAll('div'), [ div1 ] ).should.true;
          Object.$equals( div1.$prevAll('div'), [  ] ).should.true;

        }
      }, {
        name: '$parent',
        it: function(){

          var div = window.div,
              div_div = div.appendChild( window.div ),
              div_span = div.appendChild( span ),
              div_span_a = div_span.appendChild( a );

          isLikeNull( div.$parent() ).should.true;
          div_div.$parent().should.equals( div );
          div_span.$parent().should.equals( div );
          div_span_a.$parent().should.equals( div_span );

          isLikeNull( div.$parent('div') ).should.true;
          isLikeNull( div_span_a.$parent('div') ).should.true;
          div_div.$parent('div').should.equals( div );
          div_span.$parent('div').should.equals( div );

        }
      }, {
        name: '$parents',
        it: function(){

          var div = window.div,
              div_div = div.appendChild( window.div ),
              div_div_div = div_div.appendChild( window.div );

          div.id = 'div';
          div_div.id = 'div_div';

          isLikeNull( div.$parents() ).should.true;
          isLikeNull( div_div.$parents('span') ).should.true;

          div_div.$parents().should.equals( div );
          div_div.$parents('div').should.equals( div );
          div_div_div.$parents('div').should.equals( div_div );
          div_div_div.$parents('#div').should.equals( div );

          // checkSelf
          div_div_div.$parents( null, true ).should.equals( div_div_div );
        }
      }, {
        name: '$query',
        it: function(){
          div.$query.should.equal( div.querySelectorAll );
        }
      }, {
        name: '$queryFirst',
        it: function(){
          div.$queryFirst.should.equal( div.querySelector );
        }
      }, {
        name: '$siblings',
        it: function(){

          var div = window.div;
          var div1 = div.appendChild( window.div );
          var div2 = div.appendChild( window.div );
          var span = div.appendChild( window.span );
          var a = div.appendChild( window.a );

          div1.$siblings().$equals([ div2, span, a ]).should.true;
          div1.$siblings('div').$equals([ div2 ]).should.true;
          div1.$siblings('span').$equals([ span ]).should.true;
          div1.$siblings('a').$equals([ a ]).should.true;

          span.$siblings().$equals([ div1, div2, a ]).should.true;
          span.$siblings('div').$equals([ div1, div2 ]).should.true;
          span.$siblings('span').$equals([]).should.true;
          span.$siblings('a').$equals([ a ]).should.true;

        }
      }
    ]
  });

  describes.push({
    name: 'Object.prototype',
    describe: [
      {
        name: '$delete',
        it: function(){
          var test = { z: 1, e: 2, n: 3, j: 4, s: 5 };

          JSON
            .stringify(
              test.$delete('j').$delete('s').$delete( 'z','e','n' )
            )
            .should.equals('{}');
        }
      }, {
        name: '$deleteValue',
        it: function(){
          var test = { z: 1, e: 2, n: 3, j: 4, s: 4 };

          JSON
            .stringify(
              test.$deleteValue( 4 )
            )
            .should.equals(
              '{"z":1,"e":2,"n":3}'
            );
        }
      }, {
        name: '$get',
        it: function(){
          var test = { z: 1, e: 2, n: 3 };

          test.$get( 'z' ).should.equals( 1 );
          test.$get( 'e' ).should.equals( 2 );
          test.$get( 'n' ).should.equals( 3 );
        }
      }, {
        name: '$set',
        it: function(){
           var test = {};

           test.$set( 'ZenJS', 'Zw' )[ 'ZenJS' ].should.equals( 'Zw' );
           test.$set( 1, 2 )[ 1 ].should.equals( 2 );
        }
      }, {
        name: '$self',
        it: function(){
          var test = {};

          test.$self().should.equals( test );
          test.__self__.should.equals( test );
        }
      }
    ]
  });

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

  describes.push({
    name: 'Math',
    describe: [
      {
        name: '$mean',
        it: function(){
          Math.$mean( 2, 4, 6 ).should.equals( 4 );
          Math.$mean( -1, 1 ).should.equals( 0 );
          Math.$mean( -1, 3 ).should.equals( 1 );
        }
      },
      function(){
        function compare( num, min, max ){
          return num >= min && num <= max;
        }
        it( '$random', function(){
          for( var i = 0; i < 100; i++ ){
            compare( Math.$random(), 0, 9 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( 90 ), 0, 90 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( 36, 126 ), 36, 126 ).should.true;
          }
        });

        it( '$randomPlus', function(){
          for( var i = 0; i < 100; i++ ){
            compare( Math.$random(), 0, 9 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( 90 ), 0, 90 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( 36, 126 ), 36, 126 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( -90 ), -90, 0 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( -36, -126 ), -126, -36 ).should.true;
          }
        });
      }
    ]
  });

  describes.push({
    name: 'Number',
    describe: [
      {
        name: '$isNumber',
        it: function(){
          Number.$isNumber( -1 ).should.true;
          Number.$isNumber( 0 ).should.true;
          Number.$isNumber( 1 ).should.true;
          Number.$isNumber( '1' ).should.true;
          Number.$isNumber( NaN ).should.false;
          Number.$isNumber( Infinity ).should.false;
          Number.$isNumber( '1px' ).should.false;
          Number.$isNumber( [] ).should.false;
          Number.$isNumber( true ).should.false;
          Number.$isNumber( false ).should.false;
        }
      }
    ]
  });

  describes.push({
    name: 'String',
    describe: [
      {
        name: '$random',
        it: function(){
          for( var i = 0; i < 260; i++ ){
            /[a-z]/.test( String.$random() ).should.true;
          }
          for( var i = 0; i < 260; i++ ){
            /[A-Z]/.test( String.$random( true ) ).should.true;
          }
        }
      }, {
        name: '$someRandom',
        it: function(){
          this.timeout( 666666 );

          for( var i = 0; i < 260; i++ ){
            /[a-z]+/.test( String.$someRandom() ).should.true;
            String.$someRandom( i ).length.should.equals( i );
          }
          for( var i = 0; i < 260; i++ ){
            /[a-zA-Z]/.test( String.$someRandom( 12, true ) ).should.true;
            String.$someRandom( i, true ).length.should.equals( i );
          }
          for( var i = 0; i < 260; i++ ){
            /[a-zA-Z0-9]/.test( String.$someRandom( 12, true, true ) ).should.true;
            String.$someRandom( i, true, true ).length.should.equals( i );
          }
        }
      }
    ]
  });

  describes.push({
    name: 'String.prototype',
    describe: [
      {
        name: '$toCapitalize',
        it: function(){
          '123'.$toCapitalize().should.equals( '123' );
          'zen'.$toCapitalize().should.equals( 'Zen' );
          'zEN'.$toCapitalize().should.equals( 'Zen' );
        }
      }, {
        name: '$replaceAll',
        it: function(){
          '121212'.$replaceAll( '1', '2' ).should.equals( '222222' );
          '121212'.$replaceAll( /1/, '2' ).should.equals( '222222' );
          '121212'.$replaceAll( /1/g, '2' ).should.equals( '222222' );
        }
      }
    ]
  });

  describes.push({
    name: 'window',
    describe: [
      {
        name: '$querystring',
        describe: [
          {
            name: 'stringify',
            it: function(){
              $querystring.stringify( { 1: 1 } ).should.equals( '1=1' );
              $querystring.stringify( { zen: window } ).should.equals( 'zen=' );
              $querystring.stringify( { zen: Infinity } ).should.equals( 'zen=' );
              $querystring.stringify( { zen: true } ).should.equals( 'zen=true' );
              $querystring.stringify( { zen: false } ).should.equals( 'zen=false' );
              $querystring.stringify( { 1: 1, 2: 2 } ).should.equals( '1=1&2=2' );

              $querystring.stringify( { 1: 1, 2: 2 }, 'z', 'w' ).should.equals( '1w1z2w2' );
              $querystring.stringify( { 1: 1, 2: 2 }, '1', '2' ).should.equals( '1211222' );
            }
          }, {
            name: 'parse',
            it: function(){
              $querystring.parse( '1=1' )[ 1 ].should.equals( '1' );
              $querystring.parse( '1=2&2=3' )[ 1 ].should.equals( '2' );
              $querystring.parse( '1=2&2=3' )[ 2 ].should.equals( '3' );

              $querystring.parse( '1w1z2w2', 'z', 'w' )[ 1 ].should.equals( '1' );
              $querystring.parse( '1w1z2w2', 'z', 'w' )[ 2 ].should.equals( '2' );
            }
          }
        ]
      }, {
        name: '$ready',
        it: function(){
          // 手动测试的 (*^▽^*)
        }
      }, {
        name: '$typeof',
        it: function(){
          $typeof( undefined ).should.equals( 'undefined' );
          $typeof( null ).should.equals( 'null' );
          $typeof( [] ).should.equals( 'array' );
          $typeof( {} ).should.equals( 'object' );
          $typeof( '' ).should.equals( 'string' );
          $typeof( 123 ).should.equals( 'number' );
          $typeof( true ).should.equals( 'boolean' );
          $typeof( false ).should.equals( 'boolean' );
        }
      }
    ]
  });





  describe( 'ZenJS', function(){
    (function access( next ){
      ( next || describes ).forEach(function( _describe ){
        if( typeof _describe === 'function' ) return _describe();
        if( _describe.it ) it( _describe.name, _describe.it );
        else if( _describe.describe ){
          describe( _describe.name, function(){
            if( Array.isArray( _describe.describe ) ) access( _describe.describe );
            else _describe.describe();
          });
        };
      });
    })();
  });

}();