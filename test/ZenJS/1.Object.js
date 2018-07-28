describes.push({
  name: 'Object',
  describe: [
    {
      name: '$equals',
      it: function(){

        // null
        Object.$equals( undefined, undefined ).should.true;
        Object.$equals( null, null ).should.true;
        // --
        Object.$equals( undefined, null ).should.false;
        Object.$equals( null, undefined ).should.false;

        // false
        Object.$equals( false, false ).should.true;
        Object.$equals( '', '' ).should.true;
        Object.$equals( 0, 0 ).should.true;
        // --
        Object.$equals( false, '' ).should.false;
        Object.$equals( '', false ).should.false;
        Object.$equals( false, 0 ).should.false;
        Object.$equals( 0, false ).should.false;
        Object.$equals( '', 0 ).should.false;
        Object.$equals( 0, '' ).should.false;

        // Other
        Object.$equals( NaN, NaN ).should.true;
        Object.$equals( Infinity, Infinity ).should.true;
        // --
        Object.$equals( NaN, Infinity ).should.false;
        Object.$equals( Infinity, NaN ).should.false;

        // String
        Object.$equals( 'ZenJS', 'ZenJS' ).should.true;
        Object.$equals( 'ZenUI', 'ZenUI' ).should.true;
        Object.$equals( '123', '123' ).should.true;
        // --
        Object.$equals( 'ZenJS', 'ZenUI' ).should.false;
        Object.$equals( '123', '456' ).should.false;
        Object.$equals( '', '123' ).should.false;

        // Boolean
        Object.$equals( true, true ).should.true;
        Object.$equals( false, false ).should.true;
        // --
        Object.$equals( true, false ).should.false;

        // Number
        Object.$equals( -1 , -1 ).should.true;
        Object.$equals( 0 , 0 ).should.true;
        Object.$equals( 1 , 1 ).should.true;
        Object.$equals( NaN , NaN ).should.true;
        Object.$equals( Infinity , Infinity ).should.true;
        Object.$equals( Infinity , Infinity ).should.true;
        // --
        Object.$equals( -1, 0 ).should.false;
        Object.$equals( 0, 1 ).should.false;
        Object.$equals( 0, NaN ).should.false;
        Object.$equals( 0, Infinity ).should.false;
        Object.$equals( NaN, Infinity ).should.false;

        // Function
        function func1(){};
        function func2(){};
        Object.$equals( func1, func1 ).should.true;
        Object.$equals( func2, func2 ).should.true;
        Object.$equals( function(){ return true }, function(){ return true }).should.true;
        Object.$equals( function(){ return false }, function(){ return false }).should.true;
        // --
        Object.$equals( func1, func2 ).should.false;
        Object.$equals( function(){ return true }, function(){ return false }).should.false;

        // Array
        Object.$equals( [], [] ).should.true;
        Object.$equals( [ 1 ], [ 1 ] ).should.true;
        Object.$equals( [ 1, 2 ], [ 1, 2 ] ).should.true;
        // --
        Object.$equals( [ ], [ 1 ] ).should.false;
        Object.$equals( [ 1 ], [ 2 ] ).should.false;
        Object.$equals( [ 1, 2, 3 ], [ 1, 2, 4 ] ).should.false;

        // ArrayLike for IArguments
        var args3;
        var args4;
        function func3(){
          args3 = arguments;
        }
        function func4(){
          args4 = arguments;
        }

        func3( 1, 2, 3 );
        func4( 1, 2, 3 );

        Object.$equals( args3, args4 ).should.true;
        // --
        func4( 1, 2, 3, 4 );
        Object.$equals( args3, args4 ).should.false;

        // ArrayLike for DOMTokenList
        var div1 = div;
        var div2 = div;

        div1.className = div2.className = '1 2 3';

        Object.$equals( div1.classList, div2.classList ).should.true;
        // --
        div2.className = '1 2 3 4';
        Object.$equals( div1.classList, div2.classList ).should.false;

        // JSON
        Object.$equals( {}, {} ).should.true;
        Object.$equals( { a: 1 }, { a: 1 } ).should.true;
        Object.$equals( { a: 1, b: 2 }, { a: 1, b: 2 } ).should.true;
        Object.$equals( { zenjs: /ZenJS/ }, { zenjs: /ZenJS/ } ).should.true;
        // --
        Object.$equals( {}, { a: 1 } ).should.false;
        Object.$equals( { a: 1 }, { a: 2 } ).should.false;
        Object.$equals( { a: 1, b: 2 }, { a: 1 } ).should.false;
        Object.$equals( { a: 1, b: 2 }, { a: 1, b: 3 } ).should.false;
        Object.$equals( { zenjs: /ZenJS/ }, { zenjs: /ZenJS/img } ).should.false;

        // Regexp
        Object.$equals( /ZenJS/, /ZenJS/ ).should.true;
        Object.$equals( /ZenJS/img, /ZenJS/img ).should.true;
        // --
        Object.$equals( /ZenJS/, /ZenUI/ ).should.false;
        Object.$equals( /ZenJS/, /ZenJS/img ).should.false;

        // Date
        Object.$equals( new Date(), new Date() ).should.true;
        Object.$equals( new Date('2018/7/28'), new Date('2018/7/28') ).should.true;
        Object.$equals( new Date('2019/7/28'), new Date('2019/7/28') ).should.true;
        // --
        Object.$equals( new Date(), new Date('2018/7/28') ).should.false;
        Object.$equals( new Date('2018/7/28'), new Date('2019/7/28') ).should.false;

        // Elemnet
        Object.$equals( div, div ).should.true;
        Object.$equals( span, span ).should.true;
        Object.$equals( select, select ).should.true;
        Object.$equals( option, option ).should.true;
        // --
        Object.$equals( div, span ).should.false;
        Object.$equals( span, select ).should.false;
        Object.$equals( select, option ).should.false;

        // Map
        Object.$equals( new Map(), new Map() ).should.true;
        Object.$equals( new Map(), new Map([]) ).should.true;
        Object.$equals( new Map([]), new Map([]) ).should.true;
        Object.$equals( new Map([ [ 1, 2 ] ]), new Map([ [ 1, 2 ] ]) ).should.true;
        Object.$equals( new Map([ [ 1, 2 ], [ 3, 4 ] ]), new Map([ [ 1, 2 ], [ 3, 4 ] ]) ).should.true;
        // --
        Object.$equals( new Map(), new Map([ [ 1, 2 ] ]) ).should.false;
        Object.$equals( new Map([ [ 1, 2 ] ]), new Map([ [ 3, 4 ] ]) ).should.false;
        Object.$equals( new Map([ [ 1, 2 ], [ 3, 4 ] ]), new Map([ [ 1, 2 ], [ 3, 5 ] ]) ).should.false;

        // Set
        Object.$equals( new Set(), new Set() ).should.true;
        Object.$equals( new Set(), new Set([]) ).should.true;
        Object.$equals( new Set([]), new Set([]) ).should.true;
        Object.$equals( new Set([ 1 ]), new Set([ 1 ]) ).should.true;
        Object.$equals( new Set([ 1, 2 ]), new Set([ 1, 2 ]) ).should.true;
        Object.$equals( new Set([ 1, 2, 3 ]), new Set([ 1, 2, 3 ]) ).should.true;
        // --
        Object.$equals( new Set(), new Set([ 1 ]) ).should.false;
        Object.$equals( new Set([ 1 ]), new Set([ 1, 2 ]) ).should.false;
        Object.$equals( new Set([ 1, 2 ]), new Set([ 1, 2, 3 ]) ).should.false;

        // 不同类型检测
        Object.$equals( new Map(), new Set() ).should.false;
        Object.$equals( new Set(), new Map() ).should.false;
        Object.$equals( div, new Map() ).should.false;
        Object.$equals( div, new Set() ).should.false;
      }
    }, {
      name: '$assign',
      it: function(){

        Object.$isPlainObject( Object.$assign() ).should.true;
        Object.$isEmptyObject( Object.$assign() ).should.true;

        var obj1 = {},
            obj2 = { asd: 123 },
            obj3 = { asd: 1234 };

        Object.$assign( obj1 ).should.equals( obj1 );
        Object.$isEmptyObject( Object.$assign( obj1 ) ).should.true;

        Object.$assign( obj1, obj2 ).should.equals( obj1 );
        Object.$isEmptyObject( Object.$assign( obj1, obj2 ) ).should.false;

        Object.$assign( obj1, obj2 ).asd.should.equals( 123 );
        Object.$assign( obj1, obj2, obj3 ).asd.should.equals( 1234 );

        var obj4 = { infiniteLoop: obj5 },
            obj5 = { infiniteLoop: obj4 };

        isUndef( Object.$assign( obj4, obj5 ).infiniteLoop ).should.true;


        // Shallow Mode
        var obj6 = {},
            obj7 = { obj: { asd: 1 } },
            obj8 = { obj: { asd: 1 } };

        Object.$assign( true, obj6, obj7 ).should.equals( obj6 );
        Object.$assign( true, obj6, obj8 ).should.equals( obj6 );

        obj6.obj.should.equals( obj8.obj );
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