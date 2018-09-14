describes.push({
  name: 'Object',
  describe: [
    {
      name: '$assign',
      describe: [
        {
          name: 'Default mode - deep copy',
          it: function(){
            var target = { zenjs: { test: true } };
            var source = {
              zenjs: { InDevelopment: true }
            }

            Object.$assign( target, source );
            Object.$equals( target, { zenjs: { test: true, InDevelopment: true } } ).should.true;
            Object.$equals( source, { zenjs: { InDevelopment: true } } ).should.true;

            target = { zenjs: { test: true } };

            Object.$assign( false, target, source );
            Object.$equals( target, { zenjs: { test: true, InDevelopment: true } } ).should.true;
            Object.$equals( source, { zenjs: { InDevelopment: true } } ).should.true;
          }
        }, {
          name: 'Default mode - shallow copy',
          it: function(){
            var target = { zenjs: { test: true } };
            var source = {
              zenjs: { InDevelopment: true }
            }

            Object.$assign( true, target, source );
            Object.$equals( target, { zenjs: { InDevelopment: true } } ).should.true;
            Object.$equals( source, { zenjs: { InDevelopment: true } } ).should.true;

            target.zenjs.should.equals( source.zenjs );
          }
        }, {
          name: 'infinite Loop',
          it: function(){

            var target = {},
                source = { infiniteLoop: target };

            Object.$equals( Object.$assign( target, source ), {} ).should.true;


            target = {};
            source = {};
            target.source = source;
            source.target = target;

            Object.$equals( Object.$assign( {}, target ), {} ).should.true;

          }
        }, {
          name: 'Intelligent undefined',
          it: function(){
            Object.$equals( Object.$assign( { asd: 123 }, { asd: undefined } ), { asd: 123 } ).should.true;
            Object.$equals( Object.$assign( {}, { asd: undefined } ), { asd: undefined } ).should.true;
          }
        }
      ]
    }, {
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
            // 如果你看到这个没通过单元测试, 不要惊讶, 刷新下就可以了
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
        }, {
          name: 'Object infinite Loop',
          it: function(){

            var parent = {};
            var children = {};
            parent.children = children;
            children.parent = parent;

            var parent2 = {};
            var children2 = {};
            parent2.children = children2;
            children2.parent = parent2;

            Object.$equals( parent, parent2 ).should.true;

          }
        }, {
          name: 'Array infinite Loop',
          it: function(){

            var parent = [];
            var children = [];
            parent.push( children );
            children.push( parent );

            var parent2 = [];
            var children2 = [];
            parent2.push( children2 );
            children2.push( parent2 );

            Object.$equals( parent, parent2 ).should.true;

          }
        }
      ]
    }, {
      name: '$each',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            var obj = { 1: 3, 2: 2, 3: 1 };

            Object.$each( obj, function( key, value, obj ){
              switch( key ){
                case "1": obj[ key ] = 1; break;
                case "3": obj[ key ] = 3; break;
              }
            });

            Object.$equals( obj, { 1: 1, 2: 2, 3: 3 } ).should.true;

            Object
              .$each( obj, function( key, value, obj ){
                Object.$equals( this, value ).should.true;
                Object.$equals( obj, obj ).should.true;
              })
              .should.equals( obj );
          }
        }, {
          name: 'Object.prototype.$each',
          it: function(){
            var obj = { 1: 3, 2: 2, 3: 1 };

            obj.$each(function( key, value, obj ){
              switch( key ){
                case "1": obj[ key ] = 1; break;
                case "3": obj[ key ] = 3; break;
              }
            });

            Object.$equals( obj, { 1: 1, 2: 2, 3: 3 } ).should.true;

            obj
              .$each(function( key, value, obj ){
                Object.$equals( this, value ).should.true;
                Object.$equals( obj, obj ).should.true;
              })
              .should.equals( obj );
          }
        }
      ]
    }, {
      name: '$isEmptyObject',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            Object.$isEmptyObject( {} ).should.true;
            Object.$isEmptyObject( { Empty: false } ).should.false;
          }
        }
      ]
    }, {
      name: '$isPlainObject',
      describe: [
        {
          name: 'Normal use',
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
    }
  ]
});