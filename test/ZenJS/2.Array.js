describes.push({
  name: 'Array',
  describe: [
    {
      name: '$chunk',
      it: function(){
        Object.$equals( Array.$chunk(), [] ).should.true;
        Object.$equals( Array.$chunk( null ), [] ).should.true;
        Object.$equals( Array.$chunk( [], 0 ), [] ).should.true;
        Object.$equals( Array.$chunk( [], -1 ), [] ).should.true;


        Object.$equals( Array.$chunk( [ 1, 2, 3 ], 1 ), [ [1], [2], [3] ] ).should.true;
        Object.$equals( Array.$chunk( [ 1, 2, 3 ], 2 ), [ [ 1, 2 ], [ 3 ] ] ).should.true;
        Object.$equals( Array.$chunk( [ 1, 2, 3 ], 3 ), [ [ 1, 2, 3 ] ] ).should.true;
        Object.$equals( Array.$chunk( [ 1, 2, 3 ], 4 ), [ [ 1, 2, 3 ] ] ).should.true;
      }
    }, {
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
    }, {
      name: '$isArrayLike',
      it: function(){

        Array.$isArrayLike( null ).should.false;
        Array.$isArrayLike( undefined ).should.false;
        Array.$isArrayLike( NaN ).should.false;
        Array.$isArrayLike( Infinity ).should.false;
        Array.$isArrayLike( function(){} ).should.false;
        Array.$isArrayLike( 123 ).should.false;

        Array.$isArrayLike( '123' ).should.true;
        Array.$isArrayLike( [] ).should.true;

      }
    }
  ]
});