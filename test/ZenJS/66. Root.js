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
    }, {
      name: '$querystring',
      describe: [
        {
          name: 'stringify',
          it: function(){
            $querystring.stringify({ asd: 123 }).should.equals('asd=123');
            $querystring.stringify({ asd: 123, sdf: 234, dfg: 345 }).should.equals('asd=123&sdf=234&dfg=345');
            $querystring.stringify({ asd: 123, sdf: 234, dfg: 345 },'|').should.equals('asd=123|sdf=234|dfg=345');
            $querystring.stringify({ asd: 123, sdf: 234, dfg: 345 },'|',',').should.equals('asd,123|sdf,234|dfg,345');
          }
        }, {
          name: 'parse',
          it: function(){
            Object.$equals( $querystring.parse(''), {} ).should.true
            Object.$equals( $querystring.parse('asd'), { asd: '' } ).should.true
            Object.$equals( $querystring.parse('asd=123'), { asd: '123' } ).should.true
            Object.$equals( $querystring.parse('asd=123&sdf=234&dfg=345'), { asd: '123', sdf: '234', dfg: '345' } ).should.true
            Object.$equals( $querystring.parse('asd=123|sdf=234|dfg=345','|'), { asd: '123', sdf: '234', dfg: '345' } ).should.true
            Object.$equals( $querystring.parse('asd,123|sdf,234|dfg,345','|',','), { asd: '123', sdf: '234', dfg: '345' } ).should.true
          }
        }
      ]
    }
  ]
})