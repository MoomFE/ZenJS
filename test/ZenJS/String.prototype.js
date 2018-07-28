describes.push({
  name: 'String.prototype',
  describe: [
    {
      name: '$toCapitalize',
      it: function(){
        '123'.$toCapitalize().should.equals( '123' );
        'zen'.$toCapitalize().should.equals( 'Zen' );
        'zEN'.$toCapitalize().should.equals( 'Zen' );
        
        '123'.$toCapitalize( true ).should.equals( '123' );
        'zen'.$toCapitalize( true ).should.equals( 'Zen' );
        'zEN'.$toCapitalize( true ).should.equals( 'ZEN' );
      }
    }, {
      name: '$replaceAll',
      it: function(){
        '121212'.$replaceAll( '1', '2' ).should.equals( '222222' );
        '121212'.$replaceAll( /1/, '2' ).should.equals( '222222' );
        '121212'.$replaceAll( /1/g, '2' ).should.equals( '222222' );
      }
    }
  ]
});