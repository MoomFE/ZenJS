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

        // 不同类型检测
        Object.$equals( new Map(), new Set() ).should.false;
        Object.$equals( new Set(), new Map() ).should.false;
        Object.$equals( div, new Map() ).should.false;
        Object.$equals( div, new Set() ).should.false;
        Object.$equals( div, span ).should.false;

        // Object.$equals( {}, {} ).should.true;
        // Object.$equals( { a: 1 }, { a: 1 } ).should.true;

        // Object.$equals( null, null ).should.true;
        // Object.$equals( { null: null }, { null: null } );

        // Object.$equals( undefined, undefined ).should.true;
        // Object.$equals( { undefined: undefined }, { undefined: undefined } ).should.true;

        // Object.$equals( 'ZenJS', 'ZenJS' ).should.true;
        // Object.$equals( { ZenJS: 'ZenJS' }, { ZenJS: 'ZenJS' } ).should.true;

        // Object.$equals( true, true ).should.true;
        // Object.$equals( false, false ).should.true;
        // Object.$equals( { true: true }, { true: true } ).should.true;
        // Object.$equals( { false: false }, { false: false } ).should.true;

        // Object.$equals( div, div ).should.true;
        // Object.$equals( { div: div }, { div: div } ).should.true;

        // Object.$equals( /ZenJS/, /ZenJS/ );
        // Object.$equals( { ZenJS: /ZenJS/ }, { ZenJS: /ZenJS/ } );

        // Object.$equals( {}, [] ).should.false;
        // Object.$equals( {}, div ).should.false;
        // Object.$equals( {}, { a: 1 } ).should.false;

        // var a = {};
        //     a.a = a;
        // Object.$equals( a, a ).should.true;

        // var b = {};
        //     b.a = a;
        // Object.$equals( a, b ).should.true;

        // b.a = b;
        // Object.$equals( a, b ).should.false;

        // b.a = { a: 1 };
        // Object.$equals( a, b ).should.false;
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