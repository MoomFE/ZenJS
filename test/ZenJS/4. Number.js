describes.push({
  name: 'Number',
  describe: [
    {
      name: '$isNumber',
      describe: [
        {
          name: 'Test number type',
          it: function(){
            Number.$isNumber( -9007199254740991 ).should.true;
            Number.$isNumber( -1 ).should.true;
            Number.$isNumber( 0 ).should.true;
            Number.$isNumber( 1 ).should.true;
            Number.$isNumber( 9007199254740991 ).should.true;
          }
        }, {
          name: 'Test string type',
          it: function(){
            Number.$isNumber( '-9007199254740991' ).should.true;
            Number.$isNumber( '-1' ).should.true;
            Number.$isNumber( '0' ).should.true;
            Number.$isNumber( '1' ).should.true;
            Number.$isNumber( '9007199254740991' ).should.true;
            Number.$isNumber( 'ZenJS' ).should.false;
          }
        }, {
          name: 'Test other types',
          it: function(){
            Number.$isNumber( NaN ).should.false;
            Number.$isNumber( Infinity ).should.false;
            Number.$isNumber( [] ).should.false;
            Number.$isNumber( {} ).should.false;
            Number.$isNumber( true ).should.false;
            Number.$isNumber( false ).should.false;
            Number.$isNumber( function zen( a, b, c ){} ).should.false;
          }
        }
      ]
    }
  ]
});