describes.push({
  name: 'Array.prototype',
  describe: [
    {
      name: '$add',
      describe: [
        {
          name: 'Always return to itself',
          it: function(){
            var arr = [];

            arr.$add().should.equals( arr );
            arr.$add( -1 ).should.equals( arr );
            arr.$add( 0 ).should.equals( arr );
            arr.$add( 1 ).should.equals( arr );
          }
        }, {
          name: 'Add to an empty array',
          it: function(){
            Object.$equals( [].$add( -2, 1, 2, 3, 4, 5 ), [ 1, 2, 3, 4, 5 ] ).should.true;
            Object.$equals( [].$add( -1, 1, 2, 3, 4, 5 ), [ 1, 2, 3, 4, 5 ] ).should.true;
            Object.$equals( [].$add( 0, 1, 2, 3, 4, 5 ), [ 1, 2, 3, 4, 5 ] ).should.true;
            Object.$equals( [].$add( 1, 1, 2, 3, 4, 5 ), [ 1, 2, 3, 4, 5 ] ).should.true;
            Object.$equals( [].$add( 2, 1, 2, 3, 4, 5 ), [ 1, 2, 3, 4, 5 ] ).should.true;
          }
        }, {
          name: 'Add to a non-empty array',
          it: function(){
            Object.$equals( [ 1, 2, 3 ].$add( -5, 4, 5, 6 ), [ 4, 5, 6, 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$add( -4, 4, 5, 6 ), [ 4, 5, 6, 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$add( -3, 4, 5, 6 ), [ 1, 4, 5, 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$add( -2, 4, 5, 6 ), [ 1, 2, 4, 5, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$add( -1, 4, 5, 6 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$add( 0, 4, 5, 6 ), [ 4, 5, 6, 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$add( 1, 4, 5, 6 ), [ 1, 4, 5, 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$add( 2, 4, 5, 6 ), [ 1, 2, 4, 5, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$add( 3, 4, 5, 6 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$add( 4, 4, 5, 6 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$concat',
      describe: [
        {
          name: 'Always return to itself',
          it: function(){
            var arr = [];

            arr.$concat().should.equals( arr );
            arr.$concat( 1 ).should.equals( arr );
            arr.$concat( [] ).should.equals( arr );
            arr.$concat( [ 1, 2, 3 ] ).should.equals( arr );
          }
        }, {
          name: 'Normal use',
          it: function(){
            Object.$equals( [].$concat( 4 ), [ 4 ] ).should.true;
            Object.$equals( [ 1 ].$concat( 4, 5 ), [ 1, 4, 5 ] ).should.true;
            Object.$equals( [ 1, 2 ].$concat( 4, 5, 6 ), [ 1, 2, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concat( 4, 5, 6, 7 ), [ 1, 2, 3, 4, 5, 6, 7 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concat( 4, [ 5, 6 ], 7, 8 ), [ 1, 2, 3, 4, 5, 6, 7, 8 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concat( 4, [ 5, 6 ], [ 7, 8, 9 ] ), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concat( 4, [ [ 5, 6 ], [ 7, 8, 9 ] ] ), [ 1, 2, 3, 4, [ 5, 6 ], [ 7, 8, 9 ] ] ).should.true;
          }
        }
      ]
    }, {
      name: '$concatTo',
      describe: [
        {
          name: 'Always return to itself',
          it: function(){
            var arr = [];

            arr.$concatTo().should.equals( arr );
            arr.$concatTo( 0 ).should.equals( arr );
            arr.$concatTo( 1, [] ).should.equals( arr );
            arr.$concatTo( 2, [ 1, 2, 3 ] ).should.equals( arr );
          }
        }, {
          name: 'Normal use',
          it: function(){
            Object.$equals( [].$concatTo( -2, 1, 2, 3 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [].$concatTo( -1, 1, 2, 3 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [].$concatTo( 0, 1, 2, 3 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [].$concatTo( 1, 1, 2, 3 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [].$concatTo( 2, 1, 2, 3 ), [ 1, 2, 3 ] ).should.true;

            Object.$equals( [ 1, 2, 3 ].$concatTo( -5, 4, 5, 6 ), [ 4, 5, 6, 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( -4, 4, 5, 6 ), [ 4, 5, 6, 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( -3, 4, 5, 6 ), [ 1, 4, 5, 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( -2, 4, 5, 6 ), [ 1, 2, 4, 5, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( -1, 4, 5, 6 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( 0, 4, 5, 6 ), [ 4, 5, 6, 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( 1, 4, 5, 6 ), [ 1, 4, 5, 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( 2, 4, 5, 6 ), [ 1, 2, 4, 5, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( 3, 4, 5, 6 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( 4, 4, 5, 6 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;

            Object.$equals( [ 1, 2, 3 ].$concatTo( -1, 4, 5, 6, 7, 8, 9 ), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( -1, [ 4, 5, 6 ], 7, 8, 9 ), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( -1, [ 4, 5, 6 ], [ 7, 8, 9 ] ), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$concatTo( -1, [ [ 4, 5, 6 ], [ 7, 8, 9 ] ] ), [ 1, 2, 3, [ 4, 5, 6 ], [ 7, 8, 9 ] ] ).should.true;
          }
        }
      ]
    }, {
      name: '$delete / $remove',
      describe: [
        {
          name: 'Return itself by default',
          it: function(){
            var arr = [];

            arr.$delete().should.equals( arr );
            arr.$delete( 0 ).should.equals( arr );
            arr.$delete( 1 ).should.equals( arr );
            arr.$delete( 1, 1 ).should.equals( arr );
          }
        }, {
          name: 'Can return deleted content',
          it: function(){
            Object.$equals( [ 1, 2, 3, 4, 5 ].$delete( 1, 3, true ), [ 2, 3, 4 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5 ].$delete( 0, 99, true ), [ 1, 2, 3, 4, 5 ] ).should.true;
          }
        }, {
          name: 'Normal use',
          it: function(){
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( -7 ), [ 2, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( -6 ), [ 2, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( -5 ), [ 1, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( -4 ), [ 1, 2, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( -3 ), [ 1, 2, 3, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( -2 ), [ 1, 2, 3, 4, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( -1 ), [ 1, 2, 3, 4, 5 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( 0 ), [ 2, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( 1 ), [ 1, 3, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( 2 ), [ 1, 2, 4, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( 3 ), [ 1, 2, 3, 5, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( 4 ), [ 1, 2, 3, 4, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( 5 ), [ 1, 2, 3, 4, 5 ] ).should.true;
            Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$delete( 6 ), [ 1, 2, 3, 4, 5 ] ).should.true;
          }
        }, {
          name: 'Delete the first one when there are no parameters',
          it: function(){
            Object.$equals( [ 1, 2, 3 ].$delete(), [ 2, 3 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$deleteValue / $removeValue',
      describe: [
        {
          name: 'Use congruent to delete',
          it: function(){
            // No parameters
            Object.$equals( [ 1, 2, 3, 4 ].$deleteValue( 4 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 4, 4, 4, 4 ].$deleteValue( 4 ), [] ).should.true;
            Object.$equals( [ 4, 1, 2, 4 ].$deleteValue( 4 ), [ 1, 2 ] ).should.true;
            Object.$equals( [ false, 0, '' ].$deleteValue( false ), [ 0, '' ] ).should.true;
            Object.$equals( [ null, undefined ].$deleteValue( null ), [ undefined ] ).should.true;
            // Using parameters
            Object.$equals( [ 1, 2, 3, 4 ].$deleteValue( 4, true ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 4, 4, 4, 4 ].$deleteValue( 4, true ), [] ).should.true;
            Object.$equals( [ 4, 1, 2, 4 ].$deleteValue( 4, true ), [ 1, 2 ] ).should.true;
            Object.$equals( [ false, 0, '' ].$deleteValue( false, true ), [ 0, '' ] ).should.true;
            Object.$equals( [ null, undefined ].$deleteValue( null, true ), [ undefined ] ).should.true;
          }
        }, {
          name: 'Use double to delete',
          it: function(){
            Object.$equals( [ 1, 2, 3, 4 ].$deleteValue( 4, false ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 4, 4, 4, 4 ].$deleteValue( 4, false ), [] ).should.true;
            Object.$equals( [ 4, 1, 2, 4 ].$deleteValue( 4, false ), [ 1, 2 ] ).should.true;
            Object.$equals( [ false, 0, '' ].$deleteValue( false, false ), [] ).should.true;
            Object.$equals( [ null, undefined ].$deleteValue( null, false ), [] ).should.true;
          }
        }, {
          name: 'Use a custom method to delete',
          it: function(){
            Object.$equals( [ 1, 2, 3, 4 ].$deleteValue( 4, Object.$equals ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 4, 4, 4, 4 ].$deleteValue( 4, Object.$equals ), [] ).should.true;
            Object.$equals( [ 4, 1, 2, 4 ].$deleteValue( 4, Object.$equals ), [ 1, 2 ] ).should.true;

            var arr = [
              { ZenJS: true }, { ZenJS: false },
              { ZenUI: true }, { ZenUI: false }
            ];

            // ( 1
            Object.$equals(
              arr.slice().$deleteValue( { ZenJS: true }, Object.$equals ),
              arr.slice().$delete( 0 )
            ).should.true;

            // ( 2
            Object.$equals(
              arr.slice().$deleteValue( 'ZenJS', function( json, key ){
                return key in json;
              }),
              arr.slice().$delete( 0, 2 )
            ).should.true;

            // ( 3
            Object.$equals(
              arr.slice().$deleteValue(function( json ){
                return 'ZenUI' in json;
              }),
              arr.slice().$delete( -2, 2 )
            ).should.true
          }
        }
      ]
    }, {
      name: '$find',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 0, 1, 2, 3 ];

            Object.$equals( arr.$find(function( value ){ return value === -4 }), null ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === -3 }), null ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === -2 }), null ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === -1 }), null ).should.true;
            Object.$equals( arr.$find(function( value ){ return value }), 1 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 0 }), 0 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 1 }), 1 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 2 }), 2 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 3 }), 3 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 4 }), null ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$find(function( obj ){ return obj.name }), { name: 'zen' } ).should.true;
            Object.$equals( arr.$find(function( obj ){ return obj.type }), { name: 'zenjs', type: 'js' } ).should.true;
            Object.$equals( arr.$find(function( obj ){ return obj.name && obj.type }), { name: 'zenjs', type: 'js' } ).should.true;
            Object.$equals( arr.$find(function( obj ){ return obj.name === 'zenjs' }), { name: 'zenjs' } ).should.true;
            Object.$equals( arr.$find(function( obj ){ return obj.name === 'zenui' }), { name: 'zenui', type: 'ui' } ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$find({ name: 'xxx' }), null ).should.true;
            Object.$equals( arr.$find({ name: 'zen' }), { name: 'zen' } ).should.true;
            Object.$equals( arr.$find({ name: 'zenjs' }), { name: 'zenjs' } ).should.true;
            Object.$equals( arr.$find({ name: 'zenjs', type: 'js' }), { name: 'zenjs', type: 'js' } ).should.true;
            Object.$equals( arr.$find({ name: 'zenui' }), { name: 'zenui', type: 'ui' } ).should.true;
            Object.$equals( arr.$find({ name: 'zenui', type: 'ui' }), { name: 'zenui', type: 'ui' } ).should.true;
            Object.$equals( arr.$find({ name: 'zenui', type: 'js' }), null ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$find([ 'name' ]), { name: 'zen' } ).should.true;
            Object.$equals( arr.$find([ 'type' ]), { name: 'zenjs', type: 'js' } ).should.true;
            Object.$equals( arr.$find([ 'name', 'xxx' ]), null ).should.true;
            Object.$equals( arr.$find([ 'name', 'zen' ]), { name: 'zen' } ).should.true;
            Object.$equals( arr.$find([ 'name', 'zenjs' ]), { name: 'zenjs' } ).should.true;
            Object.$equals( arr.$find([ 'name', 'zenjs', 'type', 'js' ]), { name: 'zenjs', type: 'js' } ).should.true;
            Object.$equals( arr.$find([ 'name', 'zenui' ]), { name: 'zenui', type: 'ui' } ).should.true;
            Object.$equals( arr.$find([ 'name', 'zenui', 'type', 'ui' ]), { name: 'zenui', type: 'ui' } ).should.true;
            Object.$equals( arr.$find([ 'name', 'zenui', 'type', 'js' ]), null ).should.true;
          }
        }, {
          name: 'Incoming parameters for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$find( 'name' ), { name: 'zen' } ).should.true;
            Object.$equals( arr.$find( 'type' ), { name: 'zenjs', type: 'js' } ).should.true;
            Object.$equals( arr.$find( 'name', 'xxx' ), null ).should.true;
            Object.$equals( arr.$find( 'name', 'zen' ), { name: 'zen' } ).should.true;
            Object.$equals( arr.$find( 'name', 'zenjs' ), { name: 'zenjs' } ).should.true;
            Object.$equals( arr.$find( 'name', 'zenjs', 'type', 'js' ), { name: 'zenjs', type: 'js' } ).should.true;
            Object.$equals( arr.$find( 'name', 'zenui' ), { name: 'zenui', type: 'ui' } ).should.true;
            Object.$equals( arr.$find( 'name', 'zenui', 'type', 'ui' ), { name: 'zenui', type: 'ui' } ).should.true;
            Object.$equals( arr.$find( 'name', 'zenui', 'type', 'js' ), null ).should.true;
          }
        }
      ]
    }, {
      name: '$findIndex',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 0, 1, 2, 3 ];

            Object.$equals( arr.$findIndex(function( value ){ return value === -4 }), -1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === -3 }), -1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === -2 }), -1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === -1 }), -1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value }), 2 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 0 }), 0 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 1 }), 2 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 2 }), 3 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 3 }), 4 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 4 }), -1 ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findIndex(function( obj ){ return obj.name }), 0 ).should.true;
            Object.$equals( arr.$findIndex(function( obj ){ return obj.type }), 2 ).should.true;
            Object.$equals( arr.$findIndex(function( obj ){ return obj.name && obj.type }), 2 ).should.true;
            Object.$equals( arr.$findIndex(function( obj ){ return obj.name === 'zenjs' }), 1 ).should.true;
            Object.$equals( arr.$findIndex(function( obj ){ return obj.name === 'zenui' }), 3 ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findIndex({ name: 'xxx' }), -1 ).should.true;
            Object.$equals( arr.$findIndex({ name: 'zen' }), 0 ).should.true;
            Object.$equals( arr.$findIndex({ name: 'zenjs' }), 1 ).should.true;
            Object.$equals( arr.$findIndex({ name: 'zenjs', type: 'js' }), 2 ).should.true;
            Object.$equals( arr.$findIndex({ name: 'zenui' }), 3 ).should.true;
            Object.$equals( arr.$findIndex({ name: 'zenui', type: 'ui' }), 3 ).should.true;
            Object.$equals( arr.$findIndex({ name: 'zenui', type: 'js' }), -1 ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findIndex([ 'name' ]), 0 ).should.true;
            Object.$equals( arr.$findIndex([ 'type' ]), 2 ).should.true;
            Object.$equals( arr.$findIndex([ 'name', 'xxx' ]), -1 ).should.true;
            Object.$equals( arr.$findIndex([ 'name', 'zen' ]), 0 ).should.true;
            Object.$equals( arr.$findIndex([ 'name', 'zenjs' ]), 1 ).should.true;
            Object.$equals( arr.$findIndex([ 'name', 'zenjs', 'type', 'js' ]), 2 ).should.true;
            Object.$equals( arr.$findIndex([ 'name', 'zenui' ]), 3 ).should.true;
            Object.$equals( arr.$findIndex([ 'name', 'zenui', 'type', 'ui' ]), 3 ).should.true;
            Object.$equals( arr.$findIndex([ 'name', 'zenui', 'type', 'js' ]), -1 ).should.true;
          }
        }, {
          name: 'Incoming parameters for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findIndex( 'name' ), 0 ).should.true;
            Object.$equals( arr.$findIndex( 'type' ), 2 ).should.true;
            Object.$equals( arr.$findIndex( 'name', 'xxx' ), -1 ).should.true;
            Object.$equals( arr.$findIndex( 'name', 'zen' ), 0 ).should.true;
            Object.$equals( arr.$findIndex( 'name', 'zenjs' ), 1 ).should.true;
            Object.$equals( arr.$findIndex( 'name', 'zenjs', 'type', 'js' ), 2 ).should.true;
            Object.$equals( arr.$findIndex( 'name', 'zenui' ), 3 ).should.true;
            Object.$equals( arr.$findIndex( 'name', 'zenui', 'type', 'ui' ), 3 ).should.true;
            Object.$equals( arr.$findIndex( 'name', 'zenui', 'type', 'js' ), -1 ).should.true;
          }
        }
      ]
    }, {
      name: '$get',
      describe: [
        {
          name: 'Get an object from an array',
          it: function(){
            var arr = [ 6, 66, 666, 6666, 66666, 666666 ];

            Object.$equals( arr.$get( -7 ), 6 ).should.true;
            Object.$equals( arr.$get( -6 ), 6 ).should.true;
            Object.$equals( arr.$get( -5 ), 66 ).should.true;
            Object.$equals( arr.$get( -4 ), 666 ).should.true;
            Object.$equals( arr.$get( -3 ), 6666 ).should.true;
            Object.$equals( arr.$get( -2 ), 66666 ).should.true;
            Object.$equals( arr.$get( -1 ), 666666 ).should.true;
            Object.$equals( arr.$get(), 6 ).should.true;
            Object.$equals( arr.$get( 0 ), 6 ).should.true;
            Object.$equals( arr.$get( 1 ), 66 ).should.true;
            Object.$equals( arr.$get( 2 ), 666 ).should.true;
            Object.$equals( arr.$get( 3 ), 6666 ).should.true;
            Object.$equals( arr.$get( 4 ), 66666 ).should.true;
            Object.$equals( arr.$get( 5 ), 666666 ).should.true;
            Object.$equals( arr.$get( 6 ), undefined ).should.true;
          }
        }, {
          name: 'Get some objects from the array',
          it: function(){
            var arr = [ 6, 66, 666, 6666, 66666, 666666 ];

            Object.$equals( arr.$get( 0, 0 ), [] ).should.true;
            Object.$equals( arr.$get( 0, undefined ), [ 6 ] ).should.true;
            Object.$equals( arr.$get( 0, 1 ), [ 6 ] ).should.true;
            Object.$equals( arr.$get( 0, 2 ), [ 6, 66 ] ).should.true;
            Object.$equals( arr.$get( 0, 3 ), [ 6, 66, 666 ] ).should.true;
            Object.$equals( arr.$get( 0, 4 ), [ 6, 66, 666, 6666 ] ).should.true;
            Object.$equals( arr.$get( 0, 5 ), [ 6, 66, 666, 6666, 66666 ] ).should.true;
            Object.$equals( arr.$get( 0, 6 ), [ 6, 66, 666, 6666, 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( 0, 7 ), [ 6, 66, 666, 6666, 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( 1, 0 ), [] ).should.true;
            Object.$equals( arr.$get( 1, undefined ), [ 66 ] ).should.true;
            Object.$equals( arr.$get( 1, 1 ), [ 66 ] ).should.true;
            Object.$equals( arr.$get( 1, 2 ), [ 66, 666 ] ).should.true;
            Object.$equals( arr.$get( 1, 3 ), [ 66, 666, 6666 ] ).should.true;
            Object.$equals( arr.$get( 1, 4 ), [ 66, 666, 6666, 66666 ] ).should.true;
            Object.$equals( arr.$get( 1, 5 ), [ 66, 666, 6666, 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( 1, 6 ), [ 66, 666, 6666, 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( 2, 0 ), [] ).should.true;
            Object.$equals( arr.$get( 2, undefined ), [ 666 ] ).should.true;
            Object.$equals( arr.$get( 2, 1 ), [ 666 ] ).should.true;
            Object.$equals( arr.$get( 2, 2 ), [ 666, 6666 ] ).should.true;
            Object.$equals( arr.$get( 2, 3 ), [ 666, 6666, 66666 ] ).should.true;
            Object.$equals( arr.$get( 2, 4 ), [ 666, 6666, 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( 2, 5 ), [ 666, 6666, 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( 3, 0 ), [] ).should.true;
            Object.$equals( arr.$get( 3, undefined ), [ 6666 ] ).should.true;
            Object.$equals( arr.$get( 3, 1 ), [ 6666 ] ).should.true;
            Object.$equals( arr.$get( 3, 2 ), [ 6666, 66666 ] ).should.true;
            Object.$equals( arr.$get( 3, 3 ), [ 6666, 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( 3, 4 ), [ 6666, 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( 4, 0 ), [] ).should.true;
            Object.$equals( arr.$get( 4, undefined ), [ 66666 ] ).should.true;
            Object.$equals( arr.$get( 4, 1 ), [ 66666 ] ).should.true;
            Object.$equals( arr.$get( 4, 2 ), [ 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( 4, 3 ), [ 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( 5, 0 ), [] ).should.true;
            Object.$equals( arr.$get( 5, undefined ), [ 666666 ] ).should.true;
            Object.$equals( arr.$get( 5, 1 ), [ 666666 ] ).should.true;
            Object.$equals( arr.$get( 5, 2 ), [ 666666 ] ).should.true;

            Object.$equals( arr.$get( 6, 0 ), [] ).should.true;
            Object.$equals( arr.$get( 6, undefined ), [] ).should.true;
            Object.$equals( arr.$get( 6, 1 ), [] ).should.true;
            Object.$equals( arr.$get( 6, 2 ), [] ).should.true;


            
            Object.$equals( arr.$get( -7, 0 ), [] ).should.true;
            Object.$equals( arr.$get( -7, undefined ), [ 6 ] ).should.true;
            Object.$equals( arr.$get( -7, 1 ), [ 6 ] ).should.true;
            Object.$equals( arr.$get( -7, 2 ), [ 6, 66 ] ).should.true;
            Object.$equals( arr.$get( -7, 3 ), [ 6, 66, 666 ] ).should.true;
            Object.$equals( arr.$get( -7, 4 ), [ 6, 66, 666, 6666 ] ).should.true;
            Object.$equals( arr.$get( -7, 5 ), [ 6, 66, 666, 6666, 66666 ] ).should.true;
            Object.$equals( arr.$get( -7, 6 ), [ 6, 66, 666, 6666, 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( -7, 7 ), [ 6, 66, 666, 6666, 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( -6, 0 ), [] ).should.true;
            Object.$equals( arr.$get( -6, undefined ), [ 6 ] ).should.true;
            Object.$equals( arr.$get( -6, 1 ), [ 6 ] ).should.true;
            Object.$equals( arr.$get( -6, 2 ), [ 6, 66 ] ).should.true;
            Object.$equals( arr.$get( -6, 3 ), [ 6, 66, 666 ] ).should.true;
            Object.$equals( arr.$get( -6, 4 ), [ 6, 66, 666, 6666 ] ).should.true;
            Object.$equals( arr.$get( -6, 5 ), [ 6, 66, 666, 6666, 66666 ] ).should.true;
            Object.$equals( arr.$get( -6, 6 ), [ 6, 66, 666, 6666, 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( -6, 7 ), [ 6, 66, 666, 6666, 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( -5, 0 ), [] ).should.true;
            Object.$equals( arr.$get( -5, undefined ), [ 66 ] ).should.true;
            Object.$equals( arr.$get( -5, 1 ), [ 66 ] ).should.true;
            Object.$equals( arr.$get( -5, 2 ), [ 66, 666 ] ).should.true;
            Object.$equals( arr.$get( -5, 3 ), [ 66, 666, 6666 ] ).should.true;
            Object.$equals( arr.$get( -5, 4 ), [ 66, 666, 6666, 66666 ] ).should.true;
            Object.$equals( arr.$get( -5, 5 ), [ 66, 666, 6666, 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( -5, 6 ), [ 66, 666, 6666, 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( -4, 0 ), [] ).should.true;
            Object.$equals( arr.$get( -4, undefined ), [ 666 ] ).should.true;
            Object.$equals( arr.$get( -4, 1 ), [ 666 ] ).should.true;
            Object.$equals( arr.$get( -4, 2 ), [ 666, 6666 ] ).should.true;
            Object.$equals( arr.$get( -4, 3 ), [ 666, 6666, 66666 ] ).should.true;
            Object.$equals( arr.$get( -4, 4 ), [ 666, 6666, 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( -4, 5 ), [ 666, 6666, 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( -3, 0 ), [] ).should.true;
            Object.$equals( arr.$get( -3, undefined ), [ 6666 ] ).should.true;
            Object.$equals( arr.$get( -3, 1 ), [ 6666 ] ).should.true;
            Object.$equals( arr.$get( -3, 2 ), [ 6666, 66666 ] ).should.true;
            Object.$equals( arr.$get( -3, 3 ), [ 6666, 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( -3, 4 ), [ 6666, 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( -2, 0 ), [] ).should.true;
            Object.$equals( arr.$get( -2, undefined ), [ 66666 ] ).should.true;
            Object.$equals( arr.$get( -2, 1 ), [ 66666 ] ).should.true;
            Object.$equals( arr.$get( -2, 2 ), [ 66666, 666666 ] ).should.true;
            Object.$equals( arr.$get( -2, 3 ), [ 66666, 666666 ] ).should.true;

            Object.$equals( arr.$get( -1, 0 ), [] ).should.true;
            Object.$equals( arr.$get( -1, undefined ), [ 666666 ] ).should.true;
            Object.$equals( arr.$get( -1, 1 ), [ 666666 ] ).should.true;
            Object.$equals( arr.$get( -1, 2 ), [ 666666 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$set / $edit',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            Object.$equals( [ 1, 2, 3 ].$set( -5, 6 ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( -4, 6 ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( -3, 6 ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( -2, 6 ), [ 1, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( -1, 6 ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( 0, 6 ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( 1, 6 ), [ 1, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( 2, 6 ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( 3, 6 ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( 4, 6 ), [ 1, 2, 6 ] ).should.true;
          }
        }, {
          name: 'Batch setting',
          it: function(){
            Object.$equals( [ 1, 2, 3 ].$set( { '-5': 6 } ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '-4': 6 } ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '-3': 6 } ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '-2': 6 } ), [ 1, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '-1': 6 } ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '0': 6 } ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '1': 6 } ), [ 1, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '2': 6 } ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '3': 6 } ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '4': 6 } ), [ 1, 2, 6 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$inArray',
      describe: [
        {
          name: 'Use the equality to judge by default',
          it: function(){
            // No parameters
            [ 1, 2, 3, 4, 5 ].$inArray( 5 ).should.true;
            [ 1, 2, 3, 4, 5 ].$inArray( 6 ).should.false;
            [ 0, '' ].$inArray( false ).should.false;
            [ undefined ].$inArray( null ).should.false;
            // Using parameters
            [ 1, 2, 3, 4, 5 ].$inArray( 5, true ).should.true;
            [ 1, 2, 3, 4, 5 ].$inArray( 6, true ).should.false;
            [ 0, '' ].$inArray( false, true ).should.false;
            [ undefined ].$inArray( null, true ).should.false;
          }
        }, {
          name: 'Use double to judge',
          it: function(){
            [ 1, 2, 3, 4, 5 ].$inArray( 5, false ).should.true;
            [ 1, 2, 3, 4, 5 ].$inArray( 6, false ).should.false;
            [ 0, '' ].$inArray( false, false ).should.true;
            [ undefined ].$inArray( null, false ).should.true;
          }
        }, {
          name: 'Use custom methods to compare values',
          it: function(){
            [ 1, 2, 3, 4, 5 ].$inArray( 5, Object.$equals ).should.true;
            [ 1, 2, 3, 4, 5 ].$inArray( 6, Object.$equals ).should.false;
            [ 0, '' ].$inArray( false, Object.$equals ).should.false;
            [ undefined ].$inArray( null, Object.$equals ).should.false;

            var arr = [
              { ZenJS: true }, { ZenJS: false },
              { ZenUI: true }
            ];


            // ( 1
            arr.$inArray( { ZenUI: true }, Object.$equals ).should.true;

            // ( 2
            arr.$inArray( 'ZenJS', function( value, key ){
              return key in value;
            }).should.true;

            arr.$inArray( 'ZenXX', function( value, key ){
              return key in value;
            }).should.false;

            arr.$inArray( 'ZenUI', function( value, key ){
              return key in value && value[ key ];
            }).should.true;

            arr.$inArray( 'ZenUI', function( value, key ){
              return key in value && !value[ key ];
            }).should.false;

            // ( 3
            arr.$inArray(function( value ){
              return 'ZenUI' in value && value.ZenUI;
            });

            arr.$inArray(function( value ){
              return 'ZenUI' in value && value.ZenUI === false;
            });
          }
        }
      ]
    }, {
      name: '$move',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            Object.$equals( [ 1, 2, 3 ].$move( -1, 3 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( -1, 2 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( -1, 1 ), [ 1, 3, 2 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( -1, 0 ), [ 3, 1, 2 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( -1, -1 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 0, 0 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 0, 1 ), [ 2, 1, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 0, 2 ), [ 2, 3, 1 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 0, 3 ), [ 2, 3, 1 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 0, 3 ), [ 2, 3, 1 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 0, -1 ), [ 2, 3, 1 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 0, -2 ), [ 2, 1, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 0, -3 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 0, -4 ), [ 1, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 1, 0 ), [ 2, 1, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$move( 1, 2 ), [ 1, 3, 2 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$moveRange',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            var arr = [ 1, 2, 3, 4, 5, 6 ];

            Object.$equals( arr.slice().$moveRange( 0, 2, -4 ), [ 1, 2, 3, 4, 5, 6 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, -3 ), [ 1, 2, 3, 4, 5, 6 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, -2 ), [ 3, 1, 2, 4, 5, 6 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, -2 ), [ 3, 4, 1, 2, 5, 6 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, -2 ), [ 3, 4, 5, 1, 2, 6 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, -1 ), [ 3, 4, 5, 6, 1, 2 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, 0 ), [ 1, 2, 3, 4, 5, 6 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, 1 ), [ 3, 1, 2, 4, 5, 6 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, 2 ), [ 3, 4, 1, 2, 5, 6 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, 3 ), [ 3, 4, 5, 1, 2, 6 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, 4 ), [ 3, 4, 5, 6, 1, 2 ] );
            Object.$equals( arr.slice().$moveRange( 0, 2, 5 ), [ 3, 4, 5, 6, 1, 2 ] );
            Object.$equals( arr.slice().$moveRange( 4, 9, 0 ), [ 5, 6, 1, 2, 3, 4 ] );
            Object.$equals( arr.slice().$moveRange( 4, 9, 1 ), [ 1, 5, 6, 2, 3, 4 ] );
            Object.$equals( arr.slice().$moveRange( 4, 9, 2 ), [ 1, 2, 5, 6, 3, 4 ] );
            Object.$equals( arr.slice().$moveRange( 4, 9, 3 ), [ 1, 2, 3, 5, 6, 4 ] );
            Object.$equals( arr.slice().$moveRange( 4, 9, 4 ), [ 1, 2, 3, 4, 5, 6 ] );
            Object.$equals( arr.slice().$moveRange( 4, 9, 5 ), [ 1, 2, 3, 4, 5, 6 ] );
          }
        }
      ]
    }


    // }, {
    //   name: '$moveRange',
    //   it: function(){
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, 0 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, 1 ), [ 3, 1, 2, 4, 5, 6 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, 2 ), [ 3, 4, 1, 2, 5, 6 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, 3 ), [ 3, 4, 5, 1, 2, 6 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, 4 ), [ 3, 4, 5, 6, 1, 2 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, 5 ), [ 3, 4, 5, 6, 1, 2 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, -1 ), [ 3, 4, 5, 6, 1, 2 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, -2 ), [ 3, 4, 5, 1, 2, 6 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, -3 ), [ 3, 4, 1, 2, 5, 6 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, -4 ), [ 3, 1, 2, 4, 5, 6 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, -5 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( 0, 2, -6 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( -2, 2, 0 ), [ 5, 6, 1, 2, 3, 4 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( -2, 2, 1 ), [ 1, 5, 6, 2, 3, 4 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange( -2, 2, -2 ), [ 1, 2, 3, 5, 6, 4 ] ).should.true;
    //   }
    // }, {
    //   name: '$moveRange2',
    //   it: function(){
    //     // // 放到自己选取内则不进行移动
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( 0, 2, 2 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( 1, 3, 1 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( 1, 3, 2 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( 1, 3, 3 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( 1, 3, 4 ), [ 1, 2, 3, 4, 5, 6 ] ).should.true;
    //     // // 正确的移动
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( 0, 2, 3 ), [ 3, 1, 2, 4, 5, 6 ] ).should.true;
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( 1, 2, 4 ), [ 3, 4, 1, 2, 5, 6 ] ).should.true;
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( 1, 2, -1 ), [ 1, 4, 5, 6, 2, 3 ] ).should.true;
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( -2, 2, 0 ), [ 5, 6, 1, 2, 3, 4 ] ).should.true;
    //     // Object.$equals( [ 1, 2, 3, 4, 5, 6 ].$moveRange2( -2, 2, 3 ), [ 1, 2, 3, 5, 6, 4 ] ).should.true;
    //   }
    // }, {
    //   name: '$push',
    //   it: function(){
    //     [ 1 ].$push( 2 ).length.should.equals( 2 );
    //     [ 1 ].$push( 2 )[ 1 ].should.equals( 2 );
    //   }
    // }, {
    //   name: '$unshift',
    //   it: function(){
    //     [ 1 ].$unshift( 0 ).length.should.equals( 2 );
    //     [ 1 ].$unshift( 0 )[ 0 ].should.equals( 0 );
    //   }
    // }, {
    //   name: '$pop',
    //   it: function(){
    //     [ 1, 2, 3 ].$pop().length.should.equals( 2 );
    //     [ 1, 2, 3 ].$pop()[ 1 ].should.equals( 2 );
    //   }
    // }, {
    //   name: '$shift',
    //   it: function(){
    //     [ 1, 2, 3 ].$shift().length.should.equals( 2 );
    //     [ 1, 2, 3 ].$shift()[ 1 ].should.equals( 3 );
    //   }
    // }
  ]
});