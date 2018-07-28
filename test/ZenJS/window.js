describes.push({
  name: 'window',
  describe: [
    {
      name: '$querystring',
      describe: [
        {
          name: 'stringify',
          it: function(){
            $querystring.stringify( { 1: 1 } ).should.equals( '1=1' );
            $querystring.stringify( { zen: window } ).should.equals( 'zen=' );
            $querystring.stringify( { zen: Infinity } ).should.equals( 'zen=' );
            $querystring.stringify( { zen: true } ).should.equals( 'zen=true' );
            $querystring.stringify( { zen: false } ).should.equals( 'zen=false' );
            $querystring.stringify( { 1: 1, 2: 2 } ).should.equals( '1=1&2=2' );

            $querystring.stringify( { 1: 1, 2: 2 }, 'z', 'w' ).should.equals( '1w1z2w2' );
            $querystring.stringify( { 1: 1, 2: 2 }, '1', '2' ).should.equals( '1211222' );
          }
        }, {
          name: 'parse',
          it: function(){
            $querystring.parse( '1=1' )[ 1 ].should.equals( '1' );
            $querystring.parse( '1=2&2=3' )[ 1 ].should.equals( '2' );
            $querystring.parse( '1=2&2=3' )[ 2 ].should.equals( '3' );

            $querystring.parse( '1w1z2w2', 'z', 'w' )[ 1 ].should.equals( '1' );
            $querystring.parse( '1w1z2w2', 'z', 'w' )[ 2 ].should.equals( '2' );
          }
        }
      ]
    }, {
      name: '$ready',
      it: function(){
        // 手动测试的 (*^▽^*)
      }
    }, {
      name: '$typeof',
      it: function(){
        $typeof( undefined ).should.equals( 'undefined' );
        $typeof( null ).should.equals( 'null' );
        $typeof( [] ).should.equals( 'array' );
        $typeof( {} ).should.equals( 'object' );
        $typeof( '' ).should.equals( 'string' );
        $typeof( 123 ).should.equals( 'number' );
        $typeof( true ).should.equals( 'boolean' );
        $typeof( false ).should.equals( 'boolean' );
      }
    }
  ]
});