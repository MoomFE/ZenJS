describes.push({
  name: 'Number',
  describe: [
    {
      name: '$isNumber',
      it: function(){
        Number.$isNumber( -1 ).should.true;
        Number.$isNumber( 0 ).should.true;
        Number.$isNumber( 1 ).should.true;
        Number.$isNumber( '1' ).should.true;
        Number.$isNumber( NaN ).should.false;
        Number.$isNumber( Infinity ).should.false;
        Number.$isNumber( '1px' ).should.false;
        Number.$isNumber( [] ).should.false;
        Number.$isNumber( true ).should.false;
        Number.$isNumber( false ).should.false;
      }
    }
  ]
});