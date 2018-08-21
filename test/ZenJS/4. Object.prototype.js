describes.push({
  name: 'Object.prototype',
  describe: [
    {
      name: '$delete / $remove',
      describe: [
        {
          name: 'Can delete multiple at the same time',
          it: function(){
            var obj = { z: 1, e: 2, n: 3, j: 4, s: 5 };

            obj.$delete( 'z' ).$delete( 'e', 'n' ).should.equals( obj );
            Object.$equals( obj, { j: 4, s: 5 } ).should.true;
          }
        }, {
          name: 'Can pass in an array while deleting multiple',
          it: function(){
            var obj = { z: 1, e: 2, n: 3, j: 4, s: 5 };

            obj.$delete([ 'z' ]).$delete([ 'e', 'n' ]).should.equals( obj );
            Object.$equals( obj, { j: 4, s: 5 } ).should.true;
          }
        }
      ]
    }, {
      name: '$deleteValue / $removeValue',
      describe: [
        {
          name: 'Use congruent to delete',
          it: function(){
            var obj = { z: false, e: 0, n: '', j: null };

            // No parameters
            Object.$equals( {}.$assign( obj ).$deleteValue( 0 ), { z: false, n: '', j: null } ).should.true;
            Object.$equals( {}.$assign( obj ).$deleteValue( false ), { e: 0, n: '', j: null } ).should.true;
            Object.$equals( {}.$assign( obj ).$deleteValue( null ), { z: false, e: 0, n: '' } ).should.true;
            // Using parameters
            Object.$equals( {}.$assign( obj ).$deleteValue( 0, true ), { z: false, n: '', j: null } ).should.true;
            Object.$equals( {}.$assign( obj ).$deleteValue( false, true ), { e: 0, n: '', j: null } ).should.true;
            Object.$equals( {}.$assign( obj ).$deleteValue( null, true ), { z: false, e: 0, n: '' } ).should.true;
          }
        }, {
          name: 'Use double to delete',
          it: function(){
            var obj = { z: false, e: 0, n: '', j: null };

            Object.$equals( {}.$assign( obj ).$deleteValue( 0, false ), { j: null } ).should.true;
            Object.$equals( {}.$assign( obj ).$deleteValue( false, false ), { j: null } ).should.true;
            Object.$equals( {}.$assign( obj ).$deleteValue( null, false ), { z: false, e: 0, n: '' } ).should.true;
          }
        }, {
          name: 'Use a custom method to delete',
          it: function(){
            var obj = { z: false, e: 0, n: '', j: null, s: { ZenJS: true } };

            Object.$equals( {}.$assign( obj ).$deleteValue( 0, Object.$equals ), { z: false, n: '', j: null, s: { ZenJS: true } } ).should.true;
            Object.$equals( {}.$assign( obj ).$deleteValue( false, Object.$equals ), { e: 0, n: '', j: null, s: { ZenJS: true } } ).should.true;
            Object.$equals( {}.$assign( obj ).$deleteValue( null, Object.$equals ), { z: false, e: 0, n: '', s: { ZenJS: true } } ).should.true;

            // ( 1
            Object.$equals(
              {}.$assign( obj ).$deleteValue( { ZenJS: true }, Object.$equals ),
              { z: false, e: 0, n: '', j: null }
            ).should.true;

            // ( 2
            Object.$equals(
              {}.$assign( obj ).$deleteValue( 'ZenJS', function( json, key ){
                return typeof json == 'object' && json && key in json;
              }),
              { z: false, e: 0, n: '', j: null }
            ).should.true;

            // ( 3
            Object.$equals(
              {}.$assign( obj ).$deleteValue(function( json, key ){
                return typeof json == 'object' && json && 'ZenJS' in json;
              }),
              { z: false, e: 0, n: '', j: null }
            ).should.true;
          }
        }
      ]
    }


    //   name: '$deleteValue',
    //   it: function(){
    //     var test = { z: 1, e: 2, n: 3, j: 4, s: 4 };

    //     JSON
    //       .stringify(
    //         test.$deleteValue( 4 )
    //       )
    //       .should.equals(
    //         '{"z":1,"e":2,"n":3}'
    //       );
    //   }
    // }, {
    //   name: '$get',
    //   it: function(){
    //     var test = { z: 1, e: 2, n: 3 };

    //     test.$get( 'z' ).should.equals( 1 );
    //     test.$get( 'e' ).should.equals( 2 );
    //     test.$get( 'n' ).should.equals( 3 );
    //   }
    // }, {
    //   name: '$set',
    //   it: function(){
    //      var test = {};

    //      test.$set( 'ZenJS', 'Zw' )[ 'ZenJS' ].should.equals( 'Zw' );
    //      test.$set( 1, 2 )[ 1 ].should.equals( 2 );
    //   }
    // }, {
    //   name: '$self',
    //   it: function(){
    //     var test = {};

    //     test.$self().should.equals( test );
    //     test.__self__.should.equals( test );
    //   }
    // }
  ]
});