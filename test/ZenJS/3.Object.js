describes.push({
  name: 'Object',
  describe: [
    {
      name: '$equals',
      describe: [
        {
          name: 'equal to null',
          it: function(){
            // true
            Object.$equals( undefined, undefined ).should.true;
            Object.$equals( null, null ).should.true;
            // false
            Object.$equals( undefined, null ).should.false;
            Object.$equals( null, undefined ).should.false;
          }
        }, {
          name: 'equal to false',
          it: function(){
            // true
            Object.$equals( false, false ).should.true;
            Object.$equals( '', '' ).should.true;
            Object.$equals( 0, 0 ).should.true;
            // false
            Object.$equals( false, '' ).should.false;
            Object.$equals( '', false ).should.false;
            Object.$equals( false, 0 ).should.false;
            Object.$equals( 0, false ).should.false;
            Object.$equals( '', 0 ).should.false;
            Object.$equals( 0, '' ).should.false;
          }
        }, {
          name: 'other equal to false',
          it: function(){
            // true
            Object.$equals( NaN, NaN ).should.true;
            Object.$equals( Infinity, Infinity ).should.true;
            // false
            Object.$equals( NaN, Infinity ).should.false;
            Object.$equals( Infinity, NaN ).should.false;
          }
        }, {
          name: 'String type',
          it: function(){
            // true
            Object.$equals( 'ZenJS', 'ZenJS' ).should.true;
            Object.$equals( 'ZenUI', 'ZenUI' ).should.true;
            Object.$equals( '123', '123' ).should.true;
            // false
            Object.$equals( 'ZenJS', 'ZenUI' ).should.false;
            Object.$equals( '123', '456' ).should.false;
            Object.$equals( '', '123' ).should.false;
          }
        }, {
          name: 'Boolean type',
          it: function(){
            // true
            Object.$equals( true, true ).should.true;
            Object.$equals( false, false ).should.true;
            // false
            Object.$equals( true, false ).should.false;
          }
        }, {
          name: 'Number type',
          it: function(){
            // true
            Object.$equals( -1 , -1 ).should.true;
            Object.$equals( 0 , 0 ).should.true;
            Object.$equals( 1 , 1 ).should.true;
            Object.$equals( NaN , NaN ).should.true;
            Object.$equals( Infinity , Infinity ).should.true;
            Object.$equals( Infinity , Infinity ).should.true;
            // false
            Object.$equals( -1, 0 ).should.false;
            Object.$equals( 0, 1 ).should.false;
            Object.$equals( 0, NaN ).should.false;
            Object.$equals( 0, Infinity ).should.false;
            Object.$equals( NaN, Infinity ).should.false;
          }
        }, {
          name: 'Function type',
          it: function(){
            // true
            function func1(){};
            function func2(){};
            Object.$equals( func1, func1 ).should.true;
            Object.$equals( func2, func2 ).should.true;
            Object.$equals( function(){ return true }, function(){ return true }).should.true;
            Object.$equals( function(){ return false }, function(){ return false }).should.true;
            // false
            Object.$equals( func1, func2 ).should.false;
            Object.$equals( function(){ return true }, function(){ return false }).should.false;
          }
        }, {
          name: 'Array type',
          it: function(){
            // true
            Object.$equals( [], [] ).should.true;
            Object.$equals( [ 1 ], [ 1 ] ).should.true;
            Object.$equals( [ 1, 2 ], [ 1, 2 ] ).should.true;
            // false
            Object.$equals( [ ], [ 1 ] ).should.false;
            Object.$equals( [ 1 ], [ 2 ] ).should.false;
            Object.$equals( [ 1, 2, 3 ], [ 1, 2, 4 ] ).should.false;
          }
        }, {
          name: 'Array Like for IArguments',
          it: function(){
            var args1;
            var args2;
            function func1(){
              args1 = arguments;
            }
            function func2(){
              args2 = arguments;
            }

            func1( 1, 2, 3 );
            func2( 1, 2, 3 );

            // true
            Object.$equals( args1, args2 ).should.true;
            // false
            func2( 1, 2, 3, 4 );
            Object.$equals( args1, args2 ).should.false;
          }
        }, {
          name: 'Array Like for DOMTokenList',
          it: function(){
            var div1 = div;
            var div2 = div;

            div1.className = div2.className = '1 2 3';

            // true
            Object.$equals( div1.classList, div2.classList ).should.true;
            // false
            div2.className = '1 2 3 4';
            Object.$equals( div1.classList, div2.classList ).should.false;
          }
        }, {
          name: 'Plain Object',
          it: function(){
            // true
            Object.$equals( {}, {} ).should.true;
            Object.$equals( { a: 1 }, { a: 1 } ).should.true;
            Object.$equals( { a: 1, b: 2 }, { a: 1, b: 2 } ).should.true;
            Object.$equals( { zenjs: /ZenJS/ }, { zenjs: /ZenJS/ } ).should.true;
            // false
            Object.$equals( {}, { a: 1 } ).should.false;
            Object.$equals( { a: 1 }, { a: 2 } ).should.false;
            Object.$equals( { a: 1, b: 2 }, { a: 1 } ).should.false;
            Object.$equals( { a: 1, b: 2 }, { a: 1, b: 3 } ).should.false;
            Object.$equals( { zenjs: /ZenJS/ }, { zenjs: /ZenJS/img } ).should.false;
          }
        }, {
          name: 'Regexp type',
          it: function(){
            // true
            Object.$equals( /ZenJS/, /ZenJS/ ).should.true;
            Object.$equals( /ZenJS/img, /ZenJS/img ).should.true;
            // false
            Object.$equals( /ZenJS/, /ZenUI/ ).should.false;
            Object.$equals( /ZenJS/, /ZenJS/img ).should.false;
          }
        }, {
          name: 'Date type',
          it: function(){
            // true
            Object.$equals( new Date(), new Date() ).should.true;
            Object.$equals( new Date('2018/7/28'), new Date('2018/7/28') ).should.true;
            Object.$equals( new Date('2019/7/28'), new Date('2019/7/28') ).should.true;
            // false
            Object.$equals( new Date(), new Date('2018/7/28') ).should.false;
            Object.$equals( new Date('2018/7/28'), new Date('2019/7/28') ).should.false;
          }
        }, {
          name: 'Elemnet type',
          it: function(){
            // true
            Object.$equals( div, div ).should.true;
            Object.$equals( span, span ).should.true;
            Object.$equals( select, select ).should.true;
            Object.$equals( option, option ).should.true;
            // false
            Object.$equals( div, span ).should.false;
            Object.$equals( span, select ).should.false;
            Object.$equals( select, option ).should.false;
          }
        }, {
          name: 'Map',
          it: function(){
            // true
            Object.$equals( new Map(), new Map() ).should.true;
            Object.$equals( new Map(), new Map([]) ).should.true;
            Object.$equals( new Map([]), new Map([]) ).should.true;
            Object.$equals( new Map([ [ 1, 2 ] ]), new Map([ [ 1, 2 ] ]) ).should.true;
            Object.$equals( new Map([ [ 1, 2 ], [ 3, 4 ] ]), new Map([ [ 1, 2 ], [ 3, 4 ] ]) ).should.true;
            // false
            Object.$equals( new Map(), new Map([ [ 1, 2 ] ]) ).should.false;
            Object.$equals( new Map([ [ 1, 2 ] ]), new Map([ [ 3, 4 ] ]) ).should.false;
            Object.$equals( new Map([ [ 1, 2 ], [ 3, 4 ] ]), new Map([ [ 1, 2 ], [ 3, 5 ] ]) ).should.false;
          }
        }, {
          name: 'Set',
          it: function(){
            // true
            Object.$equals( new Set(), new Set() ).should.true;
            Object.$equals( new Set(), new Set([]) ).should.true;
            Object.$equals( new Set([]), new Set([]) ).should.true;
            Object.$equals( new Set([ 1 ]), new Set([ 1 ]) ).should.true;
            Object.$equals( new Set([ 1, 2 ]), new Set([ 1, 2 ]) ).should.true;
            Object.$equals( new Set([ 1, 2, 3 ]), new Set([ 1, 2, 3 ]) ).should.true;
            // false
            Object.$equals( new Set(), new Set([ 1 ]) ).should.false;
            Object.$equals( new Set([ 1 ]), new Set([ 1, 2 ]) ).should.false;
            Object.$equals( new Set([ 1, 2 ]), new Set([ 1, 2, 3 ]) ).should.false;
          }
        }, {
          name: 'Check different types',
          it: function(){
            Object.$equals( new Map(), new Set() ).should.false;
            Object.$equals( new Set(), new Map() ).should.false;
            Object.$equals( div, new Map() ).should.false;
            Object.$equals( div, new Set() ).should.false;
          }
        }
      ]
    }
    // , {
    //   name: '$assign',
    //   it: function(){

    //     Object.$isPlainObject( Object.$assign() ).should.true;
    //     Object.$isEmptyObject( Object.$assign() ).should.true;

    //     var obj1 = {},
    //         obj2 = { asd: 123 },
    //         obj3 = { asd: 1234 };

    //     Object.$assign( obj1 ).should.equals( obj1 );
    //     Object.$isEmptyObject( Object.$assign( obj1 ) ).should.true;

    //     Object.$assign( obj1, obj2 ).should.equals( obj1 );
    //     Object.$isEmptyObject( Object.$assign( obj1, obj2 ) ).should.false;

    //     Object.$assign( obj1, obj2 ).asd.should.equals( 123 );
    //     Object.$assign( obj1, obj2, obj3 ).asd.should.equals( 1234 );

    //     var obj4 = { infiniteLoop: obj5 },
    //         obj5 = { infiniteLoop: obj4 };

    //     isUndef( Object.$assign( obj4, obj5 ).infiniteLoop ).should.true;


    //     // Shallow Mode
    //     var obj6 = {},
    //         obj7 = { obj: { asd: 1 } },
    //         obj8 = { obj: { asd: 1 } };

    //     Object.$assign( true, obj6, obj7 ).should.equals( obj6 );
    //     Object.$assign( true, obj6, obj8 ).should.equals( obj6 );

    //     obj6.obj.should.equals( obj8.obj );
    //   }
    // }, {
    //   name: '$create',
    //   it: function(){
    //     Object.$isEmptyObject( Object.$create() ).should.true;
    //     Object.$isPlainObject( Object.$create() ).should.true;
    //     Object.$isPlainObject( Object.$create( true ) ).should.true;
    //     Object.$isPlainObject( Object.$create( false ) ).should.true;

    //     ( Object.getPrototypeOf( Object.$create( true ) ) == null ).should.true;
    //     ( Object.$create().constructor != null ).should.true;

    //     var obj1 = { asd: 123 },
    //         obj2 = { asd: 1234 };

    //     Object.$create( obj1 ).asd.should.equals( 123 );
    //     Object.$create( obj1, obj2 ).asd.should.equals( 1234 );
    //     isEqual( obj1, Object.$create( obj1 ) ).should.false;
    //   }
    // }, {
    //   name: '$each',
    //   it: function(){
    //     var test1 = Object.$each( { "1": 3, "2": 2, "3": 1 }, function( key, value, obj ){
    //       switch( key ){
    //         case "3": obj[ key ] = 3; break;
    //         case "1": obj[ key ] = 1; break;
    //       }
    //     });

    //     test1[ "3" ].should.equals( 3 );
    //     test1[ "1" ].should.equals( 1 );

    //     var test2 = Object.$each( { "1": 3, "2": 2, "3": 1 }, function( key, value, obj ){
    //       switch( key ){
    //         case "3": obj[ key ] = 3; break;
    //         case "1": obj[ key ] = 1;
    //                   return false;
    //       }
    //     });

    //     test2[ "1" ].should.equals( 1 );
    //     test2[ "3" ].should.equals( 1 );
    //   }
    // }, {
    //   name: '$isEmptyObject',
    //   it: function(){
    //     Object.$isEmptyObject( {} ).should.true;
    //     Object.$isEmptyObject( { Empty: false } ).should.false;
    //   }
    // }, {
    //   name: '$isPlainObject',
    //   it: function(){
    //     Object.$isPlainObject( {} ).should.true;
    //     Object.$isPlainObject( Object.create( null ) ).should.true;
    //     Object.$isPlainObject( div ).should.false;
    //     Object.$isPlainObject( Element ).should.false;
    //     Object.$isPlainObject( Element.prototype ).should.false;
    //     Object.$isPlainObject( new function(){} ).should.false;
    //   }
    // }
  ]
});