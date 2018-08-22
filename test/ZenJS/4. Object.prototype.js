describes.push({
  name: 'Object.prototype',
  describe: [
    {
      name: '$get',
      describe: [
        {
          name: 'Get a single value',
          it: function(){
            var obj = { z: 1, e: 2, n: 3, j: 4, s: 5 };

            obj.$get('z').should.equals( 1 );
            obj.$get('e').should.equals( 2 );
            obj.$get('n').should.equals( 3 );
            obj.$get('j').should.equals( 4 );
            obj.$get('s').should.equals( 5 );
          }
        }, {
          name: 'Get multiple values',
          it: function(){
            var obj = { z: 1, e: 2, n: 3, j: 4, s: 5 };

            Object.$equals( obj.$get( 'z', 'e', 'n', 'j', 's' ), { z: 1, e: 2, n: 3, j: 4, s: 5 } ).should.true;
            Object.$equals( obj.$get( 'z', 'e', 'n' ), { z: 1, e: 2, n: 3 } ).should.true;
            Object.$equals( obj.$get( 'j', 's' ), { j: 4, s: 5 } ).should.true;
          }
        }
      ]
    }, {
      name: '$set / $edit',
      describe: [
        {
          name: 'Set a single value',
          it: function(){
            var obj = {};

            Object.$equals( obj.$set( 'z', 1 ), { z: 1 } );
            Object.$equals( obj.$set( 'e', 2 ), { z: 1, e: 2 } );
            Object.$equals( obj.$set( 'n', 3 ), { z: 1, e: 2, n: 3 } );
            Object.$equals( obj.$set( 'j', 4 ), { z: 1, e: 2, n: 3, j: 4 } );
            Object.$equals( obj.$set( 's', 5 ), { z: 1, e: 2, n: 3, j: 4, s: 5 } );
            Object.$equals( obj, { z: 1, e: 2, n: 3, j: 4, s: 5 } );
          }
        }, {
          name: 'Set multiple values',
          it: function(){
            var obj = {};
            
            Object.$equals( obj.$set({ z: 1 }), { z: 1 } );
            Object.$equals( obj.$set({ e: 2, n: 3 }), { z: 1, e: 2, n: 3 } );
            Object.$equals( obj.$set({ z: 1, e: 2, n: 3, j: 4, s: 5 }), { z: 1, e: 2, n: 3, j: 4, s: 5 } );
            Object.$equals( obj, { z: 1, e: 2, n: 3, j: 4, s: 5 } );
          }
        }
      ]
    }, {
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
    }, {
      name: '$self',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            var arr = [ 1, 2, 3 ];
            var obj = { 1: 1 }

            arr.$self().should.equals( arr );
            obj.$self().should.equals( obj );
          }
        }
      ]
    }
  ]
});