// describes.push({
//   name: 'String',
//   describe: [
//     {
//       name: '$random',
//       it: function(){
//         for( var i = 0; i < 260; i++ ){
//           /[a-z]/.test( String.$random() ).should.true;
//         }
//         for( var i = 0; i < 260; i++ ){
//           /[A-Z]/.test( String.$random( true ) ).should.true;
//         }
//       }
//     }, {
//       name: '$someRandom',
//       it: function(){
//         this.timeout( 666666 );

//         for( var i = 0; i < 260; i++ ){
//           /[a-z]+/.test( String.$someRandom() ).should.true;
//           String.$someRandom( i ).length.should.equals( i );
//         }
//         for( var i = 0; i < 260; i++ ){
//           /[a-zA-Z]/.test( String.$someRandom( 12, true ) ).should.true;
//           String.$someRandom( i, true ).length.should.equals( i );
//         }
//         for( var i = 0; i < 260; i++ ){
//           /[a-zA-Z0-9]/.test( String.$someRandom( 12, true, true ) ).should.true;
//           String.$someRandom( i, true, true ).length.should.equals( i );
//         }
//       }
//     }
//   ]
// });