describes.push({
  name: 'Math',
  describe: [
    {
      name: '$plus',
      it: function(){
        Math.$plus( 1, 2 ).should.equals( 1 + 2 );
        Math.$plus( 10010, 10086 ).should.equals( 10010 + 10086 );
        Math.$plus( 0.2, 0.1 ).should.equals( 0.3 );
        Math.$plus( 0.7, 0.2 ).should.equals( 0.9 );
        Math.$plus( 1.000007, 0.1 ).should.equals( 1.100007 );
        Math.$plus( 22.77, 10 ).should.equals( 32.77 );
        Math.$plus( 2.777, 10 ).should.equals( 12.777 );
        Math.$plus( 9007199254740990, 1 ).should.equals( 9007199254740990 + 1 );
        Math.$plus( 90071992547409, 0.9007199254740991 ).should.equals( 90071992547409 + 0.9007199254740991 );
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
      name: '$multiply',
      it: function(){
        Math.$multiply( 32.77, 10 ).should.equals( 327.7 );
        Math.$multiply( 12.32, 7 ).should.equals( 86.24 );
        Math.$multiply( 1.1, 56 ).should.equals( 61.6 );
        Math.$multiply( 10, 5 ).should.equals( 50 );
        Math.$multiply( 11, 2 ).should.equals( 22 );
      }
    }, {
      name: '$divide',
      it: function(){
        Math.$divide( 32.77, 10 ).should.equals( 3.277 );
        Math.$divide( 12.32, 7 ).should.equals( 1.76 );
        Math.$divide( 1.1, 10 ).should.equals( 0.11 );
        Math.$divide( 0.222222, 0.5 ).should.equals( 0.444444 );
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