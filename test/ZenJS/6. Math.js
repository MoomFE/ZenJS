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
    }
  ]
});


// describes.push({
//   name: 'Math',
//   describe: [
//     {
//       name: '$plus',
//       it: function(){
//         Math.$plus( 1, 2 ).should.equals( 1 + 2 );
//         Math.$plus( 10010, 10086 ).should.equals( 10010 + 10086 );
//         Math.$plus( 0.2, 0.1 ).should.equals( 0.3 );
//         Math.$plus( 0.7, 0.2 ).should.equals( 0.9 );
//         Math.$plus( 1.000007, 0.1 ).should.equals( 1.100007 );
//         Math.$plus( 22.77, 10 ).should.equals( 32.77 );
//         Math.$plus( 2.777, 10 ).should.equals( 12.777 );
//         Math.$plus( 9007199254740990, 1 ).should.equals( 9007199254740990 + 1 );
//         Math.$plus( 90071992547409, 0.9007199254740991 ).should.equals( 90071992547409 + 0.9007199254740991 );
//       }
//     }, {
//       name: '$minus',
//       it: function(){
//         Math.$minus( 2, 1 ).should.equals( 1 );
//         Math.$minus( 10086, 10010 ).should.equals( 76 );
//         Math.$minus( 0.3, 0.1 ).should.equals( 0.2 );
//         Math.$minus( 0.7, 0.2 ).should.equals( 0.5 );
//         Math.$minus( 1.000007, 0.1 ).should.equals( 0.900007 );
//       }
//     }, {
//       name: '$multiply',
//       it: function(){
//         Math.$multiply( 32.77, 10 ).should.equals( 327.7 );
//         Math.$multiply( 12.32, 7 ).should.equals( 86.24 );
//         Math.$multiply( 1.1, 56 ).should.equals( 61.6 );
//         Math.$multiply( 10, 5 ).should.equals( 50 );
//         Math.$multiply( 11, 2 ).should.equals( 22 );
//       }
//     }, {
//       name: '$divide',
//       it: function(){
//         Math.$divide( 32.77, 10 ).should.equals( 3.277 );
//         Math.$divide( 12.32, 7 ).should.equals( 1.76 );
//         Math.$divide( 1.1, 10 ).should.equals( 0.11 );
//         Math.$divide( 0.222222, 0.5 ).should.equals( 0.444444 );
//       }
//     }, {
//       name: '$mean',
//       it: function(){
//         Math.$mean( 2, 4, 6 ).should.equals( 4 );
//         Math.$mean( -1, 1 ).should.equals( 0 );
//         Math.$mean( -1, 3 ).should.equals( 1 );
//       }
//     }
//   ]
// });