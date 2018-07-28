describes.push({
  name: 'Array',
  describe: [
    {
      name: 'Array.$chunk',
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
          name: 'Chunk',
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
            // Success
            Object.$equals( [ 1, 2, 3 ].$chunk( 1 ), [ [ 1 ], [ 2 ], [ 3 ] ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$chunk( 2 ), [ [ 1, 2 ], [ 3 ] ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$chunk( 3 ), [ [ 1, 2, 3 ] ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$chunk( 4 ), [ [ 1, 2, 3 ] ] ).should.true;
          }
        }
      ]
    }, {
      name: 'Array.$copy',
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
          name: 'Copy',
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
      name: 'Array.$create',
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
          name: 'Success',
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
    }


    // {
    //   name: '$create',
    //   it: function(){
    //     Array.$create( 10 ).length.should.equals( 10 );
    //     Array.$create( true ).length.should.equals( 1 );
    //     Array.$create( false ).length.should.equals( 0 );
    //     Array.$create( 1, true )[0].should.true;
    //     Array.$create( 1, false )[0].should.false;
    //     Array
    //       .$create( 10, function( index ){
    //         return 'ZenJS-' + index
    //       })
    //       [ 9 ]
    //       .should.equals( 'ZenJS-9' )
    //   }
    // }, {
    //   name: '$toArray',
    //   it: function(){

    //     Array.$toArray( null ).$equals( [] ).should.true;
    //     Array.$toArray( undefined ).$equals( [] ).should.true;
    //     Array.$toArray( '' ).$equals( [] ).should.true;
    //     Array.$toArray( false ).$equals( [] ).should.true;
    //     Array.$toArray( true ).$equals( [] ).should.true;
    //     Array.$toArray( NaN ).$equals( [] ).should.true;
    //     Array.$toArray( undefined ).$equals( [] ).should.true;
    //     Array.$toArray( 0 ).$equals( [] ).should.true;
    //     Array.$toArray( 1 ).$equals( [] ).should.true;
    //     Array.$toArray( Infinity ).$equals( [] ).should.true;

    //     Array.$toArray( '135' ).$equals( [ '1', '3', '5' ] ).should.true;
    //     Array.$toArray( '💪' ).$equals( [ '💪' ] ).should.true;
    //     Array.$toArray( '💪💪' ).$equals( [ '💪', '💪' ] ).should.true;

    //     var div = window.div;
    //     var div1 = div.appendChild( window.div );
    //     var div2 = div.appendChild( window.div );
    //     var div3 = div.appendChild( window.div );

    //     Array.$toArray( div.querySelectorAll('div') ).$equals( [ div1, div2, div3 ] ).should.true;

    //   }
    // }, {
    //   name: '$isArrayLike',
    //   it: function(){

    //     Array.$isArrayLike( null ).should.false;
    //     Array.$isArrayLike( undefined ).should.false;
    //     Array.$isArrayLike( NaN ).should.false;
    //     Array.$isArrayLike( Infinity ).should.false;
    //     Array.$isArrayLike( function(){} ).should.false;
    //     Array.$isArrayLike( 123 ).should.false;

    //     Array.$isArrayLike( '123' ).should.true;
    //     Array.$isArrayLike( [] ).should.true;

    //   }
    // }
  ]
});