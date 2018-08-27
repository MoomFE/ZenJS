describes.push({
  name: 'String',
  describe: [
    {
      name: '$random',
      describe: [
        {
          name: 'Random lowercase',
          it: function(){
            var set = new Set();
            var res;

            for( var i = 0; i < 2600; i++ ){
              /[a-z]/.test( res = String.$random() ).should.true;
              set.add( res );
            }

            set.size.should.equals( 26 );
          }
        }, {
          name: 'Random capitalization',
          it: function(){
            var set = new Set();
            var res;

            for( var i = 0; i < 2600; i++ ){
              /[A-Z]/.test( res = String.$random( true ) ).should.true;
              set.add( res );
            }

            set.size.should.equals( 26 );
          }
        }
      ]
    }, {
      name: '$someRandom',
      describe: [
        {
          name: 'Do not pass parameters, default random 12-bit all lowercase string',
          it: function(){
            for( var i = 0; i < 120; i++ ){
              /^[a-z]{12}$/.test( String.$someRandom() ).should.true;
            }
          }
        }, {
          name: 'Random other digit string',
          it: function(){
            for( var i = 10, reg; i < 20; i++ ){
              reg = new RegExp( '^[a-z]{'+ i +'}$' );
              reg.test( String.$someRandom( i ) );
            }
          }
        }, {
          name: 'Random case',
          it: function(){
            for( var i = 0; i < 120; i++ ){
              /^[a-zA-Z]{18}$/.test( String.$someRandom( 18, true ) ).should.true
            }
          }
        }, {
          name: 'Randomly containing numbers',
          it: function(){
            for( var i = 0; i < 120; i++ ){
              /^[a-z0-9]{18}$/.test( String.$someRandom( 18, false, true ) ).should.true
            }
          }
        }, {
          name: 'Randomly contains numbers and capitalization',
          it: function(){
            /^[a-zA-Z0-9]{18}$/.test( String.$someRandom( 18, true, true ) ).should.true
          }
        }
      ]
    }
  ]
});