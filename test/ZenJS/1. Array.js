describes.push({
  name: 'Array',
  describe: [
    {
      name: '$chunk',
      describe: [
        {
          name: 'Return empty Array',
          it: function(){
            Object.$equals( Array.$chunk(), [] ).should.true;
            Object.$equals( Array.$chunk( null ), [] ).should.true;
            Object.$equals( Array.$chunk( undefined ), [] ).should.true;
            Object.$equals( Array.$chunk( false ), [] ).should.true;
            Object.$equals( Array.$chunk( true ), [] ).should.true;
            Object.$equals( Array.$chunk( [ 1, 2, 3, 4 ], 0 ), [] ).should.true;
            Object.$equals( Array.$chunk( [ 1, 2, 3, 4 ], -1 ), [] ).should.true;
          }
        }, {
          name: 'Normal use',
          it: function(){
            Object.$equals( Array.$chunk( [ 1, 2, 3 ], 1 ), [ [ 1 ], [ 2 ], [ 3 ] ] ).should.true;
            Object.$equals( Array.$chunk( [ 1, 2, 3 ], 2 ), [ [ 1, 2 ], [ 3 ] ] ).should.true;
            Object.$equals( Array.$chunk( [ 1, 2, 3 ], 3 ), [ [ 1, 2, 3 ] ] ).should.true;
            Object.$equals( Array.$chunk( [ 1, 2, 3 ], 4 ), [ [ 1, 2, 3 ] ] ).should.true;
          }
        }, {
          name: 'Array.prototype.$chunk',
          it: function(){
            // Return empty Array
            Object.$equals( [ 1, 2, 3, 4 ].$chunk( 0 ), [] ).should.true;
            Object.$equals( [ 1, 2, 3, 4 ].$chunk( -1 ), [] ).should.true;
            // Normal use
            Object.$equals( [ 1, 2, 3 ].$chunk( 1 ), [ [ 1 ], [ 2 ], [ 3 ] ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$chunk( 2 ), [ [ 1, 2 ], [ 3 ] ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$chunk( 3 ), [ [ 1, 2, 3 ] ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$chunk( 4 ), [ [ 1, 2, 3 ] ] ).should.true;
          }
        }
      ]
    }, {
      name: '$copy',
      describe: [
        {
          name: 'Return empty Array',
          it: function(){
            Object.$equals( Array.$copy(), [] ).should.true;
            Object.$equals( Array.$copy( null ), [] ).should.true;
            Object.$equals( Array.$copy( undefined ), [] ).should.true;
            Object.$equals( Array.$copy( false ), [] ).should.true;
            Object.$equals( Array.$copy( true ), [] ).should.true;
            Object.$equals( Array.$copy([]), [] ).should.true;
          }
        }, {
          name: 'Normal use',
          it: function(){
            var arr = [ 1, 2, 3 ];

            Object.$equals( Array.$copy( arr ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( Array.$copy( arr ) === arr, false ).should.true;
          }
        }, {
          name: 'Copy to Array',
          it: function(){
            var arr1 = [ 1, 2, 3 ];
            var arr2 = [ 4, 5, 6 ];
            var copy = Array.$copy( arr2, arr1 );

            Object.$equals( copy, [ 1, 2, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( copy === arr1, false ).should.true;
            Object.$equals( copy === arr2, false ).should.true;
          }
        }
      ]
    }, {
      name: '$create',
      describe: [
        {
          name: 'Return empty Array',
          it: function(){
            Object.$equals( Array.$create(), [] ).should.true;
            Object.$equals( Array.$create( null ), [] ).should.true;
            Object.$equals( Array.$create( undefined ), [] ).should.true;
            Object.$equals( Array.$create( false ), [] ).should.true;
            Object.$equals( Array.$create( true ), [] ).should.true;
            Object.$equals( Array.$create( 0 ), [] ).should.true;
            Object.$equals( Array.$create( -1 ), [] ).should.true;
          }
        }, {
          name: 'Normal use',
          it: function(){
            Array.$create( 10 ).length.should.equals( 10 );
            Array.$create( 100 ).length.should.equals( 100 );
            Object.$equals( Array.$create( 1, true ), [ true ] ).should.true;
            Object.$equals( Array.$create( 2, true ), [ true, true ] ).should.true;
            Object.$equals( Array.$create( 1, false ), [ false ] ).should.true;
            Object.$equals( Array.$create( 2, false ), [ false, false ] ).should.true;
            Object.$equals( Array.$create( 1 ), [ undefined ] ).should.true;
            Object.$equals( Array.$create( 2 ), [ undefined, undefined ] ).should.true;
            Object.$equals(
              Array.$create( 3, function( index ){
                return 'ZenJS-' + index;
              }),
              [ 'ZenJS-0', 'ZenJS-1', 'ZenJS-2' ]
            );
          }
        }
      ]
    }, {
      name: '$each',
      describe: [
        {
          name: 'Always return the first incoming value',
          it: function(){
            Object.$equals( Array.$each(), undefined ).should.true;
            Object.$equals( Array.$each( null ), null ).should.true;
            Object.$equals( Array.$each( undefined ), undefined ).should.true;
            Object.$equals( Array.$each( false ), false ).should.true;
            Object.$equals( Array.$each( true ), true ).should.true;
            Object.$equals( Array.$each( [] ), [] ).should.true;
            Object.$equals( Array.$each( [ 1, 2, 3 ] ), [ 1, 2, 3 ] ).should.true;
          }
        }, {
          name: 'Determine if the parameters of the incoming callback are correct',
          it: function(){
            var index;

            index = 3;
            Array.$each( [ 3, 4, 5, 6, 7, 8 ], function( value ){
              Object.$equals( value, index++ ).should.true;
            });

            index = 0;
            Array.$each( [ 3, 4, 5, 6, 7, 8 ], function( value, _index ){
              Object.$equals( _index, index++ ).should.true;
            });

            Array.$each( [ 3, 4, 5, 6, 7, 8 ], function( value, index, array ){
              Object.$equals( array, [ 3, 4, 5, 6, 7, 8 ] ).should.true;
            });
          }
        }, {
          name: 'Passing false will terminate traversal',
          it: function(){
            var value;

            Array.$each( [ 1, 2, 3, 4, 5, 6 ], function( _value ){
              value = _value;
              if( _value === 3 ) return false;
            });

            Object.$equals( value, 3 ).should.true;
          }
        }, {
          name: 'Array.prototype.$each',
          it: function(){
            var index, value;

            // Always return the first incoming value
            Object.$equals( [].$each(), [] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$each(), [ 1, 2, 3 ] ).should.true;
            // Determine if the parameters of the incoming callback are correct
            index = 3;
            [ 3, 4, 5, 6, 7, 8 ].$each(function( value ){
              Object.$equals( value, index++ ).should.true;
            });
            index = 0;
            [ 3, 4, 5, 6, 7, 8 ].$each(function( value, _index ){
              Object.$equals( _index, index++ ).should.true;
            });
            [ 3, 4, 5, 6, 7, 8 ].$each(function( value, index, array ){
              Object.$equals( array, [ 3, 4, 5, 6, 7, 8 ] ).should.true;
            });
            // Passing false will terminate traversal
            Array.$each( [ 1, 2, 3, 4, 5, 6 ], function( _value ){
              value = _value;
              if( _value === 3 ) return false;
            });
            Object.$equals( value, 3 ).should.true;
          }
        }
      ]
    }, {
      name: '$equals',
      describe: [
        {
          name: 'Always return Boolean type',
          it: function(){
            Array.$equals().should.false;
            Array.$equals( null ).should.false;
            Array.$equals( undefined ).should.false;
            Array.$equals( false ).should.false;
            Array.$equals( true ).should.false;
            Array.$equals( [] ).should.false;
            Array.$equals( [], null ).should.false;
            Array.$equals( [], undefined ).should.false;
            Array.$equals( [], false ).should.false;
            Array.$equals( [], true ).should.false;
          }
        }, {
          name: 'Use congruence for comparison',
          it: function(){
            // No parameters
            Array.$equals( [ 1 ], [ 1 ] ).should.true;
            Array.$equals( [ 1 ], [ '1' ] ).should.false;
            Array.$equals( [ 1, 2, 3, 4 ], [ 1, 2, 3, 4 ] ).should.true;
            Array.$equals( [ 1, 2, 3, 4 ], [ '1', '2', '3', '4' ] ).should.false;
            // Using parameters
            Array.$equals( [ 1 ], [ 1 ], true ).should.true;
            Array.$equals( [ 1 ], [ '1' ], true ).should.false;
            Array.$equals( [ 1, 2, 3, 4 ], [ 1, 2, 3, 4 ], true ).should.true;
            Array.$equals( [ 1, 2, 3, 4 ], [ '1', '2', '3', '4' ], true ).should.false;
          }
        }, {
          name: 'Use double comparison',
          it: function(){
            Array.$equals( [ 1 ], [ 1 ], false ).should.true;
            Array.$equals( [ 1 ], [ '1' ], false ).should.true;
            Array.$equals( [ 1, 2, 3, 4 ], [ 1, 2, 3, 4 ], false ).should.true;
            Array.$equals( [ 1, 2, 3, 4 ], [ '1', '2', '3', '4' ], false ).should.true;
          }
        }, {
          name: 'Compare using a custom method',
          it: function(){
            Array.$equals( [ { ZenJS: true } ], [ { ZenJS: true } ], Object.$equals ).should.true;
            Array.$equals( [ { ZenJS: true } ], [ { ZenJS: false } ], Object.$equals ).should.false;
          }
        }, {
          name: 'Compare with like array',
          it: function(){
            var div = window.div;
            div.className = 'z e n j s';

            Array.$equals( [ 'z', 'e', 'n', 'j', 's' ], div.classList ).should.true;
          }
        }, {
          name: 'Array.prototype.$equals',
          it: function(){
            // Always return Boolean type
            [].$equals().should.false;
            [].$equals( null ).should.false;
            [].$equals( undefined ).should.false;
            [].$equals( false ).should.false;
            [].$equals( true ).should.false;
            // Use congruence for comparison
            [ 1 ].$equals( [ 1 ] ).should.true;
            [ 1 ].$equals( [ '1' ] ).should.false;
            [ 1, 2, 3, 4 ].$equals( [ 1, 2, 3, 4 ] ).should.true;
            [ 1, 2, 3, 4 ].$equals( [ '1', '2', '3', '4' ] ).should.false;
            [ 1 ].$equals( [ 1 ], true ).should.true;
            [ 1 ].$equals( [ '1' ], true ).should.false;
            [ 1, 2, 3, 4 ].$equals( [ 1, 2, 3, 4 ], true ).should.true;
            [ 1, 2, 3, 4 ].$equals( [ '1', '2', '3', '4' ], true ).should.false;
            // Use double comparison
            [ 1 ].$equals( [ 1 ], false ).should.true;
            [ 1 ].$equals( [ '1' ], false ).should.true;
            [ 1, 2, 3, 4 ].$equals( [ 1, 2, 3, 4 ], false ).should.true;
            [ 1, 2, 3, 4 ].$equals( [ '1', '2', '3', '4' ], false ).should.true;
            // Compare using a custom method
            [ { ZenJS: true } ].$equals( [ { ZenJS: true } ], Object.$equals ).should.true;
            [ { ZenJS: true } ].$equals( [ { ZenJS: false } ], Object.$equals ).should.false;
            // Compare with like array
            var div = window.div;
            div.className = 'z e n j s';

            [ 'z', 'e', 'n', 'j', 's' ].$equals( div.classList ).should.true;
          }
        }
      ]
    }, {
      name: '$isArrayLike',
      describe: [
        {
          name: 'Success',
          it: function(){
            Array.$isArrayLike( [] ).should.true;
            Array.$isArrayLike( 'ZenJS' ).should.true;
            Array.$isArrayLike( div.classList ).should.true;
          }
        }, {
          name: 'Error',
          it: function(){
            Array.$isArrayLike( null ).should.false;
            Array.$isArrayLike( undefined ).should.false;
            Array.$isArrayLike( false ).should.false;
            Array.$isArrayLike( true ).should.false;
            Array.$isArrayLike( NaN ).should.false;
            Array.$isArrayLike( Infinity ).should.false;
            Array.$isArrayLike( -1 ).should.false;
            Array.$isArrayLike( 0 ).should.false;
            Array.$isArrayLike( 1 ).should.false;
            Array.$isArrayLike( function(){} ).should.false;
            Array.$isArrayLike( /ZenJS/ ).should.false;
            Array.$isArrayLike( div ).should.false;
            Array.$isArrayLike( new Date() ).should.false;
            Array.$isArrayLike( new Map() ).should.false;
            Array.$isArrayLike( new Set() ).should.false;
          }
        }
      ]
    }, {
      name: '$toArray',
      describe: [
        {
          name: 'Return empty Array',
          it: function(){
            Object.$equals( Array.$toArray(), [] ).should.true;
            Object.$equals( Array.$toArray( null ), [] ).should.true;
            Object.$equals( Array.$toArray( undefined ), [] ).should.true;
            Object.$equals( Array.$toArray( false ), [] ).should.true;
            Object.$equals( Array.$toArray( true ), [] ).should.true;
            Object.$equals( Array.$toArray( NaN ), [] ).should.true;
            Object.$equals( Array.$toArray( Infinity ), [] ).should.true;
            Object.$equals( Array.$toArray( -1 ), [] ).should.true;
            Object.$equals( Array.$toArray( 0 ), [] ).should.true;
            Object.$equals( Array.$toArray( 1 ), [] ).should.true;
            Object.$equals( Array.$toArray( function(){} ), [] ).should.true;
            Object.$equals( Array.$toArray( /ZenJS/ ), [] ).should.true;
            Object.$equals( Array.$toArray( div ), [] ).should.true;
            Object.$equals( Array.$toArray( new Date() ), [] ).should.true;
          }
        }, {
          name: 'Normal use',
          it: function(){
            Object.$equals( Array.$toArray( 'ZenJS' ), [ 'Z', 'e', 'n', 'J', 'S' ] ).should.true;
            Object.$equals( Array.$toArray( '💪' ), [ '💪' ] ).should.true;
            Object.$equals( Array.$toArray( '💪💪' ), [ '💪', '💪' ] ).should.true;

            var div = window.div;
                div.className = 'Zen JS UI';
            var div1 = div.appendChild( window.div );
            var div2 = div.appendChild( window.div );
            var div3 = div.appendChild( window.div );

            Object.$equals( Array.$toArray( div.classList ), [ 'Zen', 'JS', 'UI' ] ).should.true;
            Object.$equals( Array.$toArray( div.querySelectorAll('div') ), [ div1, div2, div3 ] ).should.true;
          }
        }, {
          name: 'Convert a pure Object object',
          it: function(){
            var json = {
              a: 1, b: 2, c: 3
            };

            Object.$equals( Array.$toArray( json ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( Array.$toArray( json, true ), [ 'a', 'b', 'c' ] ).should.true;
          }
        }
      ]
    }
  ]
});