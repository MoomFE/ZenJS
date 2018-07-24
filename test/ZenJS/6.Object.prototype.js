describes.push({
  name: 'Object.prototype',
  describe: [
    {
      name: '$delete',
      it: function(){
        var test = { z: 1, e: 2, n: 3, j: 4, s: 5 };

        JSON
          .stringify(
            test.$delete('j').$delete('s').$delete( 'z','e','n' )
          )
          .should.equals('{}');
      }
    }, {
      name: '$deleteValue',
      it: function(){
        var test = { z: 1, e: 2, n: 3, j: 4, s: 4 };

        JSON
          .stringify(
            test.$deleteValue( 4 )
          )
          .should.equals(
            '{"z":1,"e":2,"n":3}'
          );
      }
    }, {
      name: '$get',
      it: function(){
        var test = { z: 1, e: 2, n: 3 };

        test.$get( 'z' ).should.equals( 1 );
        test.$get( 'e' ).should.equals( 2 );
        test.$get( 'n' ).should.equals( 3 );
      }
    }, {
      name: '$set',
      it: function(){
         var test = {};

         test.$set( 'ZenJS', 'Zw' )[ 'ZenJS' ].should.equals( 'Zw' );
         test.$set( 1, 2 )[ 1 ].should.equals( 2 );
      }
    }, {
      name: '$self',
      it: function(){
        var test = {};

        test.$self().should.equals( test );
        test.__self__.should.equals( test );
      }
    }
  ]
});