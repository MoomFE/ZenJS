describes.push({
  name: 'Math',
  describe: [
    {
      name: '$random',
      describe: [
        {
          name: 'Do not pass parameters, default random 0 to 9',
          it: function(){
            var set = new Set();
            var res;

            for( var i = 0; i < 1000; i++ ){
              compare( res = Math.$random(), 0, 9 ).should.true;
              set.add( res );
            }

            set.size.should.equals( 10 );
            for( i = 0; i < 10; i++ ){
              set.has( i ).should.true;
            }
          }
        }, {
          name: 'Pass in a positive integer',
          it: function(){
            var set = new Set();
            var res;

            for( var i = 0; i < 3700; i++ ){
              compare( res = Math.$random( 36 ), 0, 36 ).should.true;
              set.add( res );
            }

            set.size.should.equals( 37 );
            for( i = 0; i <= 36; i++ ){
              set.has( i ).should.true;
            }
          }
        }, {
          name: 'Pass in two positive integers',
          it: function(){
            var set = new Set();
            var res;

            for( var i = 100; i < 5100; i++ ){
              compare( res = Math.$random( 100, 150 ), 100, 150 ).should.true;
              set.add( res );
            }

            set.size.should.equals( 51 );
            for( i = 100; i <= 150; i++ ){
              set.has( i ).should.true;
            }
          }
        }, {
          name: 'Pass in a negative integer',
          it: function(){
            var set = new Set();
            var res;

            for( var i = 0; i < 1000; i++ ){
              compare( res = Math.$random( -9 ), -9, 0 ).should.true;
              set.add( res );
            }

            set.size.should.equals( 10 );
            for( i = -9; i <= 0; i++ ){
              set.has( i ).should.true;
            }
          }
        }, {
          name: 'Pass in two negative integers',
          it: function(){
            var set = new Set();
            var res;

            for( var i = 0; i < 5100; i++ ){
              compare( res = Math.$random( -100, -150 ), -150, -100 ).should.true;
              set.add( res );
            }

            set.size.should.equals( 51 );
            for( i = -150; i <= -100; i++ ){
              set.has( i ).should.true;
            }
          }
        }, {
          name: 'The first is a positive integer and the second is a negative integer',
          it: function(){
            var set = new Set();
            var res;

            for( var i = 0; i < 5100; i++ ){
              compare( res = Math.$random( 14, -36 ), -36, 14 ).should.true;
              set.add( res );
            }

            set.size.should.equals( 51 );
            for( i = -36; i <= 14; i++ ){
              set.has( i ).should.true;
            }
          }
        }, {
          name: 'The first is a negative integer and the second is a positive integer',
          it: function(){
            var set = new Set();
            var res;

            for( var i = 0; i < 5100; i++ ){
              compare( res = Math.$random( -36, 14 ), -36, 14 ).should.true;
              set.add( res );
            }

            set.size.should.equals( 51 );
            for( i = -36; i <= 14; i++ ){
              set.has( i ).should.true;
            }
          }
        }
      ]
    }, {
      name: '$add / $jia',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            Math.$add( 0, 1 ).should.equals( 1 );
            Math.$add( 1, 2 ).should.equals( 3 );
            Math.$add( 9007199254740990, 1 ).should.equals( 9007199254740991 );
            Math.$add( 9007199254740990, 992800745259010 ).should.equals( 10000000000000000 );
          }
        }, {
          name: 'Fractional precision problem',
          it: function(){
            Math.$add( 0.2, 0.1 ).should.equals( 0.3 );
            Math.$add( 0.7, 0.2 ).should.equals( 0.9 );
            Math.$add( 1.000007, 0.1 ).should.equals( 1.100007 );
            Math.$add( 22.77, 10 ).should.equals( 32.77 );
            Math.$add( 2.777, 10 ).should.equals( 12.777 );
          }
        }
      ]
    }, {
      name: '$subtract / $jian',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            Math.$subtract( 1, 0 ).should.equals( 1 );
            Math.$subtract( 2, 1 ).should.equals( 1 );
            Math.$subtract( 9007199254740991, 1 ).should.equals( 9007199254740990 );
            Math.$subtract( 10000000000000000, 9007199254740990 ).should.equals( 992800745259010 );
          }
        }, {
          name: 'Fractional precision problem',
          it: function(){
            Math.$subtract( 0.3, 0.1 ).should.equals( 0.2 );
            Math.$subtract( 0.7, 0.2 ).should.equals( 0.5 );
            Math.$subtract( 1.000007, 0.1 ).should.equals( 0.900007 );
          }
        }
      ]
    }, {
      name: '$multiply / $cheng',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            Math.$multiply( 1, 0 ).should.equals( 0 );
            Math.$multiply( 2, 1 ).should.equals( 2 );
            Math.$multiply( 10, 5 ).should.equals( 50 );
          }
        }, {
          name: 'Fractional precision problem',
          it: function(){
            Math.$multiply( 32.77, 10 ).should.equals( 327.7 );
            Math.$multiply( 12.32, 7 ).should.equals( 86.24 );
            Math.$multiply( 1.1, 56 ).should.equals( 61.6 );
          }
        }
      ]
    }, {
      name: '$divide / $chu',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            Math.$divide( 2, 1 ).should.equals( 2 );
            Math.$divide( 10, 2 ).should.equals( 5 );
          }
        }, {
          name: 'Fractional precision problem',
          it: function(){
            Math.$divide( 0.222222, 0.5 ).should.equals( 0.444444 );
          }
        }
      ]
    }, {
      name: '$mean',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            Math.$mean( 2, 4, 6 ).should.equals( 4 );
            Math.$mean( -1, 1 ).should.equals( 0 );
            Math.$mean( -1, 3 ).should.equals( 1 );
          }
        }, {
          name: 'The same can solve the accuracy problem',
          it: function(){
            Math.$mean( 0.1, 0.2 ).should.equals( 0.15 );
            Math.$mean( 0.1, 0.2, 33.47, 0, 0, 0, 0, 0, 0, 0 ).should.equals( 3.377 );
          }
        }
      ]
    }
  ]
});