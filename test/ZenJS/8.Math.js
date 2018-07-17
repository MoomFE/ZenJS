describes.push({
  name: 'Math',
  describe: [
    {
      name: '$add',
      it: function(){
        Math.$add( 1, 2 ).should.equals( 1 + 2 );
        Math.$add( 10010, 10086 ).should.equals( 10010 + 10086 );
        Math.$add( 0.2, 0.1 ).should.equals( 0.3 );
        Math.$add( 0.7, 0.2 ).should.equals( 0.9 );
        Math.$add( 1.000007, 0.1 ).should.equals( 1.100007 );
        Math.$add( 22.77, 10 ).should.equals( 32.77 );
        Math.$add( 2.777, 10 ).should.equals( 12.777 );
        Math.$add( 9007199254740990, 1 ).should.equals( 9007199254740990 + 1 );
        Math.$add( 90071992547409, 0.9007199254740991 ).should.equals( 90071992547409 + 0.9007199254740991 );
      }
    }, {
      name: '$addPlus',
      it: function(){
        Math.$addPlus( 1, 2 ).should.equals( 1 + 2 );
        Math.$addPlus( 10010, 10086 ).should.equals( 10010 + 10086 );
        Math.$addPlus( 0.2, 0.1 ).should.equals( 0.3 );
        Math.$addPlus( 0.7, 0.2 ).should.equals( 0.9 );
        Math.$addPlus( 1.000007, 0.1 ).should.equals( 1.100007 );
        Math.$addPlus( 22.77, 10 ).should.equals( 32.77 );
        Math.$addPlus( 2.777, 10 ).should.equals( 12.777 );
        Math.$addPlus( 9007199254740990, 1 ).should.equals( 9007199254740990 + 1 );
        Math.$addPlus( 90071992547409, 0.9007199254740991 ).should.equals( 90071992547409 + 0.9007199254740991 );

        var nums = [ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7 ];
        Math.$addPlus.apply( null, nums ).should.equals( 15.3 );
      }
    }, {
      name: '$minus',
      it: function(){
        Math.$minus( 2, 1 ).should.equals( 1 );
        Math.$minus( 10086, 10010 ).should.equals( 76 );
        Math.$minus( 0.3, 0.1 ).should.equals( 0.2 );
        Math.$minus( 0.7, 0.2 ).should.equals( 0.5 );
        Math.$minus( 1.000007, 0.1 ).should.equals( 0.900007 );
      }
    }, {
      name: '$minusPlus',
      it: function(){
        Math.$minusPlus( 2, 1 ).should.equals( 1 );
        Math.$minusPlus( 10086, 10010 ).should.equals( 76 );
        Math.$minusPlus( 0.3, 0.1 ).should.equals( 0.2 );
        Math.$minusPlus( 0.7, 0.2 ).should.equals( 0.5 );
        Math.$minusPlus( 1.000007, 0.1 ).should.equals( 0.900007 );

        var nums = [ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7 ].reverse();
        Math.$minusPlus.apply( null, nums ).should.equals( -11.9 );
      }
    }, {
      name: '$multiply',
      it: function(){
        Math.$multiply( 32.77, 10 ).should.equals( 327.7 );
        Math.$multiply( 12.32, 7 ).should.equals( 86.24 );
        Math.$multiply( 1.1, 56 ).should.equals( 61.6 );
      }
    }, {
      name: '$multiplyPlus',
      it: function(){
        Math.$multiplyPlus( 32.77, 10 ).should.equals( 327.7 );
        Math.$multiplyPlus( 12.32, 7 ).should.equals( 86.24 );
        Math.$multiplyPlus( 1.1, 56 ).should.equals( 61.6 );

        var nums = [ 1, 2, 3, 4, 5, 6, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6 ];
        Math.$multiplyPlus.apply( null, nums ).should.equals( 4151.3472 );

        nums = [ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7 ];
        Math.$multiplyPlus.apply( null, nums ).should.equals( 0.00355687428096 );
      }
    }, {
      name: '$divide',
      it: function(){
        Math.$divide( 32.77, 10 ).should.equals( 3.277 );
        Math.$divide( 12.32, 7 ).should.equals( 1.76 );
        Math.$divide( 1.1, 10 ).should.equals( 0.11 );
      }
    }, {
      name: '$dividePlus',
      it: function(){
        Math.$dividePlus( 32.77, 10 ).should.equals( 3.277 );
        Math.$dividePlus( 12.32, 7 ).should.equals( 1.76 );
        Math.$dividePlus( 1.1, 10 ).should.equals( 0.11 );

        var nums = [ 6, 5, 4, 3, 2, 1 ];
        Math.$dividePlus.apply( null, nums ).should.equals( 0.05 );
      }
    }, {
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