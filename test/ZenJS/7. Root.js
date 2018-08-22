describes.push({
  name: 'Window / Global',
  describe: [
    {
      name: '$typeof',
      describe: [
        {
          name: 'Normal use',
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
    }
  ]
})