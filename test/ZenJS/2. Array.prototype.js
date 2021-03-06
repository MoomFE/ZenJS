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
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$find(function( value ){ return value === -4 }), undefined ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === -3 }), undefined ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === -2 }), undefined ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === -1 }), undefined ).should.true;
            Object.$equals( arr.$find(function( value ){ return value }), 1 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 0 }), 0 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 1 }), 1 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 2 }), 2 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 3 }), 3 ).should.true;
            Object.$equals( arr.$find(function( value ){ return value === 4 }), undefined ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$find(function( obj ){ return obj.name }).should.equals( arr[0] );
            arr.$find(function( obj ){ return obj.type }).should.equals( arr[3] );
            arr.$find(function( obj ){ return obj.name && obj.type }).should.equals( arr[3] );
            arr.$find(function( obj ){ return obj.name == 'zenjs' }).should.equals( arr[1] );
            arr.$find(function( obj ){ return obj.name == 'zenui' }).should.equals( arr[2] );
            arr.$find(function( obj ){ return obj.type == 'js' }).should.equals( arr[3] );
            arr.$find(function( obj ){ return obj.type == 'ui' }).should.equals( arr[4] );
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$find({ name: 'xxx' }), undefined ).should.true;
            arr.$find({ name: 'zen' }).should.equals( arr[0] );
            arr.$find({ name: 'zenjs' }).should.equals( arr[1] );
            arr.$find({ name: 'zenui' }).should.equals( arr[2] );
            arr.$find({ type: 'js' }).should.equals( arr[3] );
            arr.$find({ type: 'ui' }).should.equals( arr[4] );
            arr.$find({ name: 'zenjs', type: 'js' }).should.equals( arr[3] );
            arr.$find({ name: 'zenui', type: 'ui' }).should.equals( arr[4] );
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$find([ 'name', 'xxx' ]), undefined ).should.true;
            arr.$find([ 'name', 'zen' ]).should.equals( arr[0] );
            arr.$find([ 'name', 'zenjs' ]).should.equals( arr[1] );
            arr.$find([ 'name', 'zenui' ]).should.equals( arr[2] );
            arr.$find([ 'type', 'js' ]).should.equals( arr[3] );
            arr.$find([ 'type', 'ui' ]).should.equals( arr[4] );
            arr.$find([ 'name', 'zenjs', 'type', 'js' ]).should.equals( arr[3] );
            arr.$find([ 'name', 'zenui', 'type', 'ui' ]).should.equals( arr[4] );
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$find( { arr: 0 } ).should.equals( arr[1] );
            arr.$find( { arr: 0 }, true ).should.equals( arr[1] );
            arr.$find( { arr: 0 }, false ).should.equals( arr[0] );
            arr.$find( { arr: 0 }, Object.$equals ).should.equals( arr[1] );

            // Pass in an array for lookup
            arr.$find( [ 'arr', 0 ] ).should.equals( arr[1] );
            arr.$find( [ 'arr', 0 ], true ).should.equals( arr[1] );
            arr.$find( [ 'arr', 0 ], false ).should.equals( arr[0] );
            arr.$find( [ 'arr', 0 ], Object.$equals ).should.equals( arr[1] );
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            arr.$find( function( obj ){ return obj.name }, 1 ).should.equals( arr[1] );
            arr.$find( function( obj ){ return obj.name == 'zenjs' }, 2 ).should.equals( arr[3] );
            arr.$find( function( obj ){ return obj.name == 'zenui' }, 3 ).should.equals( arr[4] );

            // Incoming object for lookup
            Object.$equals( arr.$find( { name: 'zen' }, 1 ), undefined ).should.true;
            arr.$find( { name: 'zenjs' }, 2 ).should.equals( arr[3] );
            arr.$find( { name: 'zenui' }, 3 ).should.equals( arr[4] );

            // Pass in an array for lookup
            Object.$equals( arr.$find( [ 'name', 'zen' ], 1 ), undefined ).should.true;
            arr.$find( [ 'name', 'zenjs' ], 2 ).should.equals( arr[3] );
            arr.$find( [ 'name', 'zenui' ], 3 ).should.equals( arr[4] );
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$find( { arr: 0 } ).should.equals( arr[1] );
            arr.$find( { arr: 0 }, true ).should.equals( arr[1] );
            arr.$find( { arr: 0 }, false ).should.equals( arr[0] );
            arr.$find( { arr: 0 }, Object.$equals ).should.equals( arr[1] );
            // Pass in an array for lookup
            arr.$find( [ 'arr', 0 ] ).should.equals( arr[1] );
            arr.$find( [ 'arr', 0 ], true ).should.equals( arr[1] );
            arr.$find( [ 'arr', 0 ], false ).should.equals( arr[0] );
            arr.$find( [ 'arr', 0 ], Object.$equals ).should.equals( arr[1] );


            // Incoming object for lookup
            arr.$find( { arr: 0 }, 2 ).should.equals( arr[3] );
            arr.$find( { arr: 0 }, true, 2 ).should.equals( arr[3] );
            arr.$find( { arr: 0 }, false, 2 ).should.equals( arr[2] );
            arr.$find( { arr: 0 }, Object.$equals, 2 ).should.equals( arr[3] );
            // Pass in an array for lookup
            arr.$find( [ 'arr', 0 ], 2 ).should.equals( arr[3] );
            arr.$find( [ 'arr', 0 ], true, 2 ).should.equals( arr[3] );
            arr.$find( [ 'arr', 0 ], false, 2 ).should.equals( arr[2] );
            arr.$find( [ 'arr', 0 ], Object.$equals, 2 ).should.equals( arr[3] );
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$find([ 'innerHTML', '1' ]).should.equals( span1 );
            div.$find('span').$find([ 'innerHTML', '2' ]).should.equals( span2 );
            div.$find('span').$find([ 'innerHTML', '3' ]).should.equals( span3 );
            div.$find('span').$find({ innerHTML: '1' }).should.equals( span1 );
            div.$find('span').$find({ innerHTML: '2' }).should.equals( span2 );
            div.$find('span').$find({ innerHTML: '3' }).should.equals( span3 );

            div.$find('span').$find( [ 'innerHTML', '3' ], 3 ).should.equals( span4 );
            div.$find('span').$find( [ 'innerHTML', '2' ], 3 ).should.equals( span5 );
            div.$find('span').$find( [ 'innerHTML', '1' ], 3 ).should.equals( span6 );
            div.$find('span').$find( { innerHTML: '3' }, 3 ).should.equals( span4 );
            div.$find('span').$find( { innerHTML: '2' }, 3 ).should.equals( span5 );
            div.$find('span').$find( { innerHTML: '1' }, 3 ).should.equals( span6 );
          }
        }
      ]
    }, {
      name: '$findIndex',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findIndex(function( value ){ return value === -4 }), -1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === -3 }), -1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === -2 }), -1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === -1 }), -1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value }), 1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 0 }), 0 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 1 }), 1 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 2 }), 2 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 3 }), 3 ).should.true;
            Object.$equals( arr.$findIndex(function( value ){ return value === 4 }), -1 ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findIndex(function( obj ){ return obj.name }).should.equals( 0 );
            arr.$findIndex(function( obj ){ return obj.type }).should.equals( 3 );
            arr.$findIndex(function( obj ){ return obj.name && obj.type }).should.equals( 3 );
            arr.$findIndex(function( obj ){ return obj.name == 'zenjs' }).should.equals( 1 );
            arr.$findIndex(function( obj ){ return obj.name == 'zenui' }).should.equals( 2 );
            arr.$findIndex(function( obj ){ return obj.type == 'js' }).should.equals( 3 );
            arr.$findIndex(function( obj ){ return obj.type == 'ui' }).should.equals( 4 );
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findIndex({ name: 'xxx' }), -1 ).should.true;
            arr.$findIndex({ name: 'zen' }).should.equals( 0 );
            arr.$findIndex({ name: 'zenjs' }).should.equals( 1 );
            arr.$findIndex({ name: 'zenui' }).should.equals( 2 );
            arr.$findIndex({ type: 'js' }).should.equals( 3 );
            arr.$findIndex({ type: 'ui' }).should.equals( 4 );
            arr.$findIndex({ name: 'zenjs', type: 'js' }).should.equals( 3 );
            arr.$findIndex({ name: 'zenui', type: 'ui' }).should.equals( 4 );
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findIndex([ 'name', 'xxx' ]), -1 ).should.true;
            arr.$findIndex([ 'name', 'zen' ]).should.equals( 0 );
            arr.$findIndex([ 'name', 'zenjs' ]).should.equals( 1 );
            arr.$findIndex([ 'name', 'zenui' ]).should.equals( 2 );
            arr.$findIndex([ 'type', 'js' ]).should.equals( 3 );
            arr.$findIndex([ 'type', 'ui' ]).should.equals( 4 );
            arr.$findIndex([ 'name', 'zenjs', 'type', 'js' ]).should.equals( 3 );
            arr.$findIndex([ 'name', 'zenui', 'type', 'ui' ]).should.equals( 4 );
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findIndex( { arr: 0 } ).should.equals( 1 );
            arr.$findIndex( { arr: 0 }, true ).should.equals( 1 );
            arr.$findIndex( { arr: 0 }, false ).should.equals( 0 );
            arr.$findIndex( { arr: 0 }, Object.$equals ).should.equals( 1 );

            // Pass in an array for lookup
            arr.$findIndex( [ 'arr', 0 ] ).should.equals( 1 );
            arr.$findIndex( [ 'arr', 0 ], true ).should.equals( 1 );
            arr.$findIndex( [ 'arr', 0 ], false ).should.equals( 0 );
            arr.$findIndex( [ 'arr', 0 ], Object.$equals ).should.equals( 1 );
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            arr.$findIndex( function( obj ){ return obj.name }, 1 ).should.equals( 1 );
            arr.$findIndex( function( obj ){ return obj.name == 'zenjs' }, 2 ).should.equals( 3 );
            arr.$findIndex( function( obj ){ return obj.name == 'zenui' }, 3 ).should.equals( 4 );

            // Incoming object for lookup
            Object.$equals( arr.$findIndex( { name: 'zen' }, 1 ), -1 ).should.true;
            arr.$findIndex( { name: 'zenjs' }, 2 ).should.equals( 3 );
            arr.$findIndex( { name: 'zenui' }, 3 ).should.equals( 4 );

            // Pass in an array for lookup
            Object.$equals( arr.$findIndex( [ 'name', 'zen' ], 1 ), -1 ).should.true;
            arr.$findIndex( [ 'name', 'zenjs' ], 2 ).should.equals( 3 );
            arr.$findIndex( [ 'name', 'zenui' ], 3 ).should.equals( 4 );
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findIndex( { arr: 0 } ).should.equals( 1 );
            arr.$findIndex( { arr: 0 }, true ).should.equals( 1 );
            arr.$findIndex( { arr: 0 }, false ).should.equals( 0 );
            arr.$findIndex( { arr: 0 }, Object.$equals ).should.equals( 1 );
            // Pass in an array for lookup
            arr.$findIndex( [ 'arr', 0 ] ).should.equals( 1 );
            arr.$findIndex( [ 'arr', 0 ], true ).should.equals( 1 );
            arr.$findIndex( [ 'arr', 0 ], false ).should.equals( 0 );
            arr.$findIndex( [ 'arr', 0 ], Object.$equals ).should.equals( 1 );


            // Incoming object for lookup
            arr.$findIndex( { arr: 0 }, 2 ).should.equals( 3 );
            arr.$findIndex( { arr: 0 }, true, 2 ).should.equals( 3 );
            arr.$findIndex( { arr: 0 }, false, 2 ).should.equals( 2 );
            arr.$findIndex( { arr: 0 }, Object.$equals, 2 ).should.equals( 3 );
            // Pass in an array for lookup
            arr.$findIndex( [ 'arr', 0 ], 2 ).should.equals( 3 );
            arr.$findIndex( [ 'arr', 0 ], true, 2 ).should.equals( 3 );
            arr.$findIndex( [ 'arr', 0 ], false, 2 ).should.equals( 2 );
            arr.$findIndex( [ 'arr', 0 ], Object.$equals, 2 ).should.equals( 3 );
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$findIndex([ 'innerHTML', '1' ]).should.equals( 0 );
            div.$find('span').$findIndex([ 'innerHTML', '2' ]).should.equals( 1 );
            div.$find('span').$findIndex([ 'innerHTML', '3' ]).should.equals( 2 );
            div.$find('span').$findIndex({ innerHTML: '1' }).should.equals( 0 );
            div.$find('span').$findIndex({ innerHTML: '2' }).should.equals( 1 );
            div.$find('span').$findIndex({ innerHTML: '3' }).should.equals( 2 );

            div.$find('span').$findIndex( [ 'innerHTML', '3' ], 3 ).should.equals( 3 );
            div.$find('span').$findIndex( [ 'innerHTML', '2' ], 3 ).should.equals( 4 );
            div.$find('span').$findIndex( [ 'innerHTML', '1' ], 3 ).should.equals( 5 );
            div.$find('span').$findIndex( { innerHTML: '3' }, 3 ).should.equals( 3 );
            div.$find('span').$findIndex( { innerHTML: '2' }, 3 ).should.equals( 4 );
            div.$find('span').$findIndex( { innerHTML: '1' }, 3 ).should.equals( 5 );
          }
        }
      ]
    }, {
      name: '$findChunk',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findChunk(function( value ){ return value === -4 }), undefined ).should.true;
            Object.$equals( arr.$findChunk(function( value ){ return value === -3 }), undefined ).should.true;
            Object.$equals( arr.$findChunk(function( value ){ return value === -2 }), undefined ).should.true;
            Object.$equals( arr.$findChunk(function( value ){ return value === -1 }), undefined ).should.true;
            Object.$equals( arr.$findChunk(function( value ){ return value }), [ 1, 1 ] ).should.true;
            Object.$equals( arr.$findChunk(function( value ){ return value === 0 }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findChunk(function( value ){ return value === 1 }), [ 1, 1 ] ).should.true;
            Object.$equals( arr.$findChunk(function( value ){ return value === 2 }), [ 2, 2 ] ).should.true;
            Object.$equals( arr.$findChunk(function( value ){ return value === 3 }), [ 3, 3 ] ).should.true;
            Object.$equals( arr.$findChunk(function( value ){ return value === 4 }), undefined ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findChunk(function( obj ){ return obj.name }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findChunk(function( obj ){ return obj.type }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk(function( obj ){ return obj.name && obj.type }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk(function( obj ){ return obj.name == 'zenjs' }), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk(function( obj ){ return obj.name == 'zenui' }), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findChunk(function( obj ){ return obj.type == 'js' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk(function( obj ){ return obj.type == 'ui' }), [ 4, arr[4] ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findChunk({ name: 'xxx' }), undefined ).should.true;
            Object.$equals( arr.$findChunk({ name: 'zen' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findChunk({ name: 'zenjs' }), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk({ name: 'zenui' }), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findChunk({ type: 'js' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk({ type: 'ui' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findChunk({ name: 'zenjs', type: 'js' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk({ name: 'zenui', type: 'ui' }), [ 4, arr[4] ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findChunk([ 'name', 'xxx' ]), undefined ).should.true;
            Object.$equals( arr.$findChunk([ 'name', 'zen' ]), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findChunk([ 'name', 'zenjs' ]), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk([ 'name', 'zenui' ]), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findChunk([ 'type', 'js' ]), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk([ 'type', 'ui' ]), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findChunk([ 'name', 'zenjs', 'type', 'js' ]), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk([ 'name', 'zenui', 'type', 'ui' ]), [ 4, arr[4] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findChunk( { arr: 0 } ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk( { arr: 0 }, true ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk( { arr: 0 }, false ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findChunk( { arr: 0 }, Object.$equals ), [ 1, arr[1] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findChunk( [ 'arr', 0 ] ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], true ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], false ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], Object.$equals ), [ 1, arr[1] ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findChunk( function( obj ){ return obj.name }, 1 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk( function( obj ){ return obj.name == 'zenui' }, 3 ), [ 4, arr[4] ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findChunk( { name: 'zen' }, 1 ), undefined ).should.true;
            Object.$equals( arr.$findChunk( { name: 'zenjs' }, 2 ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk( { name: 'zenui' }, 3 ), [ 4, arr[4] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findChunk( [ 'name', 'zen' ], 1 ), undefined ).should.true;
            Object.$equals( arr.$findChunk( [ 'name', 'zenjs' ], 2 ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'name', 'zenui' ], 3 ), [ 4, arr[4] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findChunk( { arr: 0 } ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk( { arr: 0 }, true ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk( { arr: 0 }, false ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findChunk( { arr: 0 }, Object.$equals ), [ 1, arr[1] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findChunk( [ 'arr', 0 ] ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], true ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], false ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], Object.$equals ), [ 1, arr[1] ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findChunk( { arr: 0 }, 2 ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk( { arr: 0 }, true, 2 ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk( { arr: 0 }, false, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findChunk( { arr: 0 }, Object.$equals, 2 ), [ 3, arr[3] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], 2 ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], true, 2 ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], false, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findChunk( [ 'arr', 0 ], Object.$equals, 2 ), [ 3, arr[3] ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            Object.$equals( div.$find('span').$findChunk([ 'innerHTML', '1' ]), [ 0, span1 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk([ 'innerHTML', '2' ]), [ 1, span2 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk([ 'innerHTML', '3' ]), [ 2, span3 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk({ innerHTML: '1' }), [ 0, span1 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk({ innerHTML: '2' }), [ 1, span2 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk({ innerHTML: '3' }), [ 2, span3 ] ).should.true;

            Object.$equals( div.$find('span').$findChunk( [ 'innerHTML', '3' ], 3 ), [ 3, span4 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk( [ 'innerHTML', '2' ], 3 ), [ 4, span5 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk( [ 'innerHTML', '1' ], 3 ), [ 5, span6 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk( { innerHTML: '3' }, 3 ), [ 3, span4 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk( { innerHTML: '2' }, 3 ), [ 4, span5 ] ).should.true;
            Object.$equals( div.$find('span').$findChunk( { innerHTML: '1' }, 3 ), [ 5, span6 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$findLast',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findLast(function( value ){ return value === -4 }), undefined ).should.true;
            Object.$equals( arr.$findLast(function( value ){ return value === -3 }), undefined ).should.true;
            Object.$equals( arr.$findLast(function( value ){ return value === -2 }), undefined ).should.true;
            Object.$equals( arr.$findLast(function( value ){ return value === -1 }), undefined ).should.true;
            Object.$equals( arr.$findLast(function( value ){ return value }), 3 ).should.true;
            Object.$equals( arr.$findLast(function( value ){ return value === 0 }), 0 ).should.true;
            Object.$equals( arr.$findLast(function( value ){ return value === 1 }), 1 ).should.true;
            Object.$equals( arr.$findLast(function( value ){ return value === 2 }), 2 ).should.true;
            Object.$equals( arr.$findLast(function( value ){ return value === 3 }), 3 ).should.true;
            Object.$equals( arr.$findLast(function( value ){ return value === 4 }), undefined ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findLast(function( obj ){ return obj.name }).should.equals( arr[4] );
            arr.$findLast(function( obj ){ return obj.type }).should.equals( arr[4] );
            arr.$findLast(function( obj ){ return obj.name && obj.type }).should.equals( arr[4] );
            arr.$findLast(function( obj ){ return obj.name == 'zenjs' }).should.equals( arr[3] );
            arr.$findLast(function( obj ){ return obj.name == 'zenui' }).should.equals( arr[4] );
            arr.$findLast(function( obj ){ return obj.type == 'js' }).should.equals( arr[3] );
            arr.$findLast(function( obj ){ return obj.type == 'ui' }).should.equals( arr[4] );
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findLast({ name: 'xxx' }), undefined ).should.true;
            arr.$findLast({ name: 'zen' }).should.equals( arr[0] );
            arr.$findLast({ name: 'zenjs' }).should.equals( arr[3] );
            arr.$findLast({ name: 'zenui' }).should.equals( arr[4] );
            arr.$findLast({ type: 'js' }).should.equals( arr[3] );
            arr.$findLast({ type: 'ui' }).should.equals( arr[4] );
            arr.$findLast({ name: 'zenjs', type: 'js' }).should.equals( arr[3] );
            arr.$findLast({ name: 'zenui', type: 'ui' }).should.equals( arr[4] );
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findLast([ 'name', 'xxx' ]), undefined ).should.true;
            arr.$findLast([ 'name', 'zen' ]).should.equals( arr[0] );
            arr.$findLast([ 'name', 'zenjs' ]).should.equals( arr[3] );
            arr.$findLast([ 'name', 'zenui' ]).should.equals( arr[4] );
            arr.$findLast([ 'type', 'js' ]).should.equals( arr[3] );
            arr.$findLast([ 'type', 'ui' ]).should.equals( arr[4] );
            arr.$findLast([ 'name', 'zenjs', 'type', 'js' ]).should.equals( arr[3] );
            arr.$findLast([ 'name', 'zenui', 'type', 'ui' ]).should.equals( arr[4] );
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findLast( { arr: 0 } ).should.equals( arr[1] );
            arr.$findLast( { arr: 0 }, true ).should.equals( arr[1] );
            arr.$findLast( { arr: 0 }, false ).should.equals( arr[1] );
            arr.$findLast( { arr: 0 }, Object.$equals ).should.equals( arr[1] );

            // Pass in an array for lookup
            arr.$findLast( [ 'arr', 0 ] ).should.equals( arr[1] );
            arr.$findLast( [ 'arr', 0 ], true ).should.equals( arr[1] );
            arr.$findLast( [ 'arr', 0 ], false ).should.equals( arr[1] );
            arr.$findLast( [ 'arr', 0 ], Object.$equals ).should.equals( arr[1] );
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            arr.$findLast( function( obj ){ return obj.name }, 1 ).should.equals( arr[1] );
            arr.$findLast( function( obj ){ return obj.name == 'zenjs' }, 2 ).should.equals( arr[1] );
            arr.$findLast( function( obj ){ return obj.name == 'zenui' }, 3 ).should.equals( arr[2] );

            // Incoming object for lookup
            arr.$findLast( { name: 'zen' }, 1 ).should.equals( arr[0] );
            arr.$findLast( { name: 'zenjs' }, 2 ).should.equals( arr[1] );
            arr.$findLast( { name: 'zenui' }, 3 ).should.equals( arr[2] );

            // Pass in an array for lookup
            arr.$findLast( [ 'name', 'zen' ], 1 ).should.equals( arr[0] );
            arr.$findLast( [ 'name', 'zenjs' ], 2 ).should.equals( arr[1] );
            arr.$findLast( [ 'name', 'zenui' ], 3 ).should.equals( arr[2] );
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findLast( { arr: 0 } ).should.equals( arr[3] );
            arr.$findLast( { arr: 0 }, true ).should.equals( arr[3] );
            arr.$findLast( { arr: 0 }, false ).should.equals( arr[3] );
            arr.$findLast( { arr: 0 }, Object.$equals ).should.equals( arr[3] );
            // Pass in an array for lookup
            arr.$findLast( [ 'arr', 0 ] ).should.equals( arr[3] );
            arr.$findLast( [ 'arr', 0 ], true ).should.equals( arr[3] );
            arr.$findLast( [ 'arr', 0 ], false ).should.equals( arr[3] );
            arr.$findLast( [ 'arr', 0 ], Object.$equals ).should.equals( arr[3] );


            // Incoming object for lookup
            arr.$findLast( { arr: 0 }, 2 ).should.equals( arr[1] );
            arr.$findLast( { arr: 0 }, true, 2 ).should.equals( arr[1] );
            arr.$findLast( { arr: 0 }, false, 2 ).should.equals( arr[2] );
            arr.$findLast( { arr: 0 }, Object.$equals, 2 ).should.equals( arr[1] );
            // Pass in an array for lookup
            arr.$findLast( [ 'arr', 0 ], 2 ).should.equals( arr[1] );
            arr.$findLast( [ 'arr', 0 ], true, 2 ).should.equals( arr[1] );
            arr.$findLast( [ 'arr', 0 ], false, 2 ).should.equals( arr[2] );
            arr.$findLast( [ 'arr', 0 ], Object.$equals, 2 ).should.equals( arr[1] );
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$findLast([ 'innerHTML', '1' ]).should.equals( span6 );
            div.$find('span').$findLast([ 'innerHTML', '2' ]).should.equals( span5 );
            div.$find('span').$findLast([ 'innerHTML', '3' ]).should.equals( span4 );
            div.$find('span').$findLast({ innerHTML: '1' }).should.equals( span6 );
            div.$find('span').$findLast({ innerHTML: '2' }).should.equals( span5 );
            div.$find('span').$findLast({ innerHTML: '3' }).should.equals( span4 );

            div.$find('span').$findLast( [ 'innerHTML', '3' ], 3 ).should.equals( span4 );
            div.$find('span').$findLast( [ 'innerHTML', '2' ], 3 ).should.equals( span2 );
            div.$find('span').$findLast( [ 'innerHTML', '1' ], 3 ).should.equals( span1 );
            div.$find('span').$findLast( { innerHTML: '3' }, 3 ).should.equals( span4 );
            div.$find('span').$findLast( { innerHTML: '2' }, 3 ).should.equals( span2 );
            div.$find('span').$findLast( { innerHTML: '1' }, 3 ).should.equals( span1 );
          }
        }
      ]
    }, {
      name: '$findLastIndex',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findLastIndex(function( value ){ return value === -4 }), -1 ).should.true;
            Object.$equals( arr.$findLastIndex(function( value ){ return value === -3 }), -1 ).should.true;
            Object.$equals( arr.$findLastIndex(function( value ){ return value === -2 }), -1 ).should.true;
            Object.$equals( arr.$findLastIndex(function( value ){ return value === -1 }), -1 ).should.true;
            Object.$equals( arr.$findLastIndex(function( value ){ return value }), 4 ).should.true;
            Object.$equals( arr.$findLastIndex(function( value ){ return value === 0 }), 0 ).should.true;
            Object.$equals( arr.$findLastIndex(function( value ){ return value === 1 }), 1 ).should.true;
            Object.$equals( arr.$findLastIndex(function( value ){ return value === 2 }), 2 ).should.true;
            Object.$equals( arr.$findLastIndex(function( value ){ return value === 3 }), 4 ).should.true;
            Object.$equals( arr.$findLastIndex(function( value ){ return value === 4 }), -1 ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findLastIndex(function( obj ){ return obj.name }).should.equals( 4 );
            arr.$findLastIndex(function( obj ){ return obj.type }).should.equals( 4 );
            arr.$findLastIndex(function( obj ){ return obj.name && obj.type }).should.equals( 4 );
            arr.$findLastIndex(function( obj ){ return obj.name == 'zenjs' }).should.equals( 3 );
            arr.$findLastIndex(function( obj ){ return obj.name == 'zenui' }).should.equals( 4 );
            arr.$findLastIndex(function( obj ){ return obj.type == 'js' }).should.equals( 3 );
            arr.$findLastIndex(function( obj ){ return obj.type == 'ui' }).should.equals( 4 );
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findLastIndex({ name: 'xxx' }).should.equals( -1 );
            arr.$findLastIndex({ name: 'zen' }).should.equals( 0 );
            arr.$findLastIndex({ name: 'zenjs' }).should.equals( 3 );
            arr.$findLastIndex({ name: 'zenui' }).should.equals( 4 );
            arr.$findLastIndex({ type: 'js' }).should.equals( 3 );
            arr.$findLastIndex({ type: 'ui' }).should.equals( 4 );
            arr.$findLastIndex({ name: 'zenjs', type: 'js' }).should.equals( 3 );
            arr.$findLastIndex({ name: 'zenui', type: 'ui' }).should.equals( 4 );
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findLastIndex([ 'name', 'xxx' ]).should.equals( -1 );
            arr.$findLastIndex([ 'name', 'zen' ]).should.equals( 0 );
            arr.$findLastIndex([ 'name', 'zenjs' ]).should.equals( 3 );
            arr.$findLastIndex([ 'name', 'zenui' ]).should.equals( 4 );
            arr.$findLastIndex([ 'type', 'js' ]).should.equals( 3 );
            arr.$findLastIndex([ 'type', 'ui' ]).should.equals( 4 );
            arr.$findLastIndex([ 'name', 'zenjs', 'type', 'js' ]).should.equals( 3 );
            arr.$findLastIndex([ 'name', 'zenui', 'type', 'ui' ]).should.equals( 4 );
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findLastIndex( { arr: 0 } ).should.equals( 1 );
            arr.$findLastIndex( { arr: 0 }, true ).should.equals( 1 );
            arr.$findLastIndex( { arr: 0 }, false ).should.equals( 1 );
            arr.$findLastIndex( { arr: 0 }, Object.$equals ).should.equals( 1 );

            // Pass in an array for lookup
            arr.$findLastIndex( [ 'arr', 0 ] ).should.equals( 1 );
            arr.$findLastIndex( [ 'arr', 0 ], true ).should.equals( 1 );
            arr.$findLastIndex( [ 'arr', 0 ], false ).should.equals( 1 );
            arr.$findLastIndex( [ 'arr', 0 ], Object.$equals ).should.equals( 1 );
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            arr.$findLastIndex( function( obj ){ return obj.name }, 1 ).should.equals( 1 );
            arr.$findLastIndex( function( obj ){ return obj.name == 'zenjs' }, 2 ).should.equals( 1 );
            arr.$findLastIndex( function( obj ){ return obj.name == 'zenui' }, 3 ).should.equals( 2 );

            // Incoming object for lookup
            arr.$findLastIndex( { name: 'zen' }, 1 ).should.equals( 0 );
            arr.$findLastIndex( { name: 'zenjs' }, 2 ).should.equals( 1 );
            arr.$findLastIndex( { name: 'zenui' }, 3 ).should.equals( 2 );

            // Pass in an array for lookup
            arr.$findLastIndex( [ 'name', 'zen' ], 1 ).should.equals( 0 );
            arr.$findLastIndex( [ 'name', 'zenjs' ], 2 ).should.equals( 1 );
            arr.$findLastIndex( [ 'name', 'zenui' ], 3 ).should.equals( 2 );
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findLastIndex( { arr: 0 } ).should.equals( 3 );
            arr.$findLastIndex( { arr: 0 }, true ).should.equals( 3 );
            arr.$findLastIndex( { arr: 0 }, false ).should.equals( 3 );
            arr.$findLastIndex( { arr: 0 }, Object.$equals ).should.equals( 3 );
            // Pass in an array for lookup
            arr.$findLastIndex( [ 'arr', 0 ] ).should.equals( 3 );
            arr.$findLastIndex( [ 'arr', 0 ], true ).should.equals( 3 );
            arr.$findLastIndex( [ 'arr', 0 ], false ).should.equals( 3 );
            arr.$findLastIndex( [ 'arr', 0 ], Object.$equals ).should.equals( 3 );


            // Incoming object for lookup
            arr.$findLastIndex( { arr: 0 }, 2 ).should.equals( 1 );
            arr.$findLastIndex( { arr: 0 }, true, 2 ).should.equals( 1 );
            arr.$findLastIndex( { arr: 0 }, false, 2 ).should.equals( 2 );
            arr.$findLastIndex( { arr: 0 }, Object.$equals, 2 ).should.equals( 1 );
            // Pass in an array for lookup
            arr.$findLastIndex( [ 'arr', 0 ], 2 ).should.equals( 1 );
            arr.$findLastIndex( [ 'arr', 0 ], true, 2 ).should.equals( 1 );
            arr.$findLastIndex( [ 'arr', 0 ], false, 2 ).should.equals( 2 );
            arr.$findLastIndex( [ 'arr', 0 ], Object.$equals, 2 ).should.equals( 1 );
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$findLastIndex([ 'innerHTML', '1' ]).should.equals( 5 );
            div.$find('span').$findLastIndex([ 'innerHTML', '2' ]).should.equals( 4 );
            div.$find('span').$findLastIndex([ 'innerHTML', '3' ]).should.equals( 3 );
            div.$find('span').$findLastIndex({ innerHTML: '1' }).should.equals( 5 );
            div.$find('span').$findLastIndex({ innerHTML: '2' }).should.equals( 4 );
            div.$find('span').$findLastIndex({ innerHTML: '3' }).should.equals( 3 );

            div.$find('span').$findLastIndex( [ 'innerHTML', '3' ], 3 ).should.equals( 3 );
            div.$find('span').$findLastIndex( [ 'innerHTML', '2' ], 3 ).should.equals( 1 );
            div.$find('span').$findLastIndex( [ 'innerHTML', '1' ], 3 ).should.equals( 0 );
            div.$find('span').$findLastIndex( { innerHTML: '3' }, 3 ).should.equals( 3 );
            div.$find('span').$findLastIndex( { innerHTML: '2' }, 3 ).should.equals( 1 );
            div.$find('span').$findLastIndex( { innerHTML: '1' }, 3 ).should.equals( 0 );
          }
        }
      ]
    }, {
      name: '$findLastChunk',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findLastChunk(function( value ){ return value === -4 }), undefined ).should.true;
            Object.$equals( arr.$findLastChunk(function( value ){ return value === -3 }), undefined ).should.true;
            Object.$equals( arr.$findLastChunk(function( value ){ return value === -2 }), undefined ).should.true;
            Object.$equals( arr.$findLastChunk(function( value ){ return value === -1 }), undefined ).should.true;
            Object.$equals( arr.$findLastChunk(function( value ){ return value }), [ 4, 3 ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( value ){ return value === 0 }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( value ){ return value === 1 }), [ 1, 1 ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( value ){ return value === 2 }), [ 2, 2 ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( value ){ return value === 3 }), [ 4, 3 ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( value ){ return value === 4 }), undefined ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findLastChunk(function( obj ){ return obj.name }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( obj ){ return obj.type }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( obj ){ return obj.name && obj.type }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( obj ){ return obj.name == 'zenjs' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( obj ){ return obj.name == 'zenui' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( obj ){ return obj.type == 'js' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk(function( obj ){ return obj.type == 'ui' }), [ 4, arr[4] ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findLastChunk({ name: 'xxx' }), undefined ).should.true;
            Object.$equals( arr.$findLastChunk({ name: 'zen' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findLastChunk({ name: 'zenjs' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk({ name: 'zenui' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastChunk({ type: 'js' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk({ type: 'ui' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastChunk({ name: 'zenjs', type: 'js' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk({ name: 'zenui', type: 'ui' }), [ 4, arr[4] ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findLastChunk([ 'name', 'xxx' ]), undefined ).should.true;
            Object.$equals( arr.$findLastChunk([ 'name', 'zen' ]), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findLastChunk([ 'name', 'zenjs' ]), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk([ 'name', 'zenui' ]), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastChunk([ 'type', 'js' ]), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk([ 'type', 'ui' ]), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastChunk([ 'name', 'zenjs', 'type', 'js' ]), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk([ 'name', 'zenui', 'type', 'ui' ]), [ 4, arr[4] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findLastChunk( { arr: 0 } ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, true ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, false ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, Object.$equals ), [ 1, arr[1] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ] ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], true ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], false ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], Object.$equals ), [ 1, arr[1] ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findLastChunk( function( obj ){ return obj.name }, 1 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( function( obj ){ return obj.name == 'zenui' }, 3 ), [ 2, arr[2] ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findLastChunk( { name: 'zen' }, 1 ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { name: 'zenjs' }, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { name: 'zenui' }, 3 ), [ 2, arr[2] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findLastChunk( [ 'name', 'zen' ], 1 ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'name', 'zenjs' ], 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'name', 'zenui' ], 3 ), [ 2, arr[2] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findLastChunk( { arr: 0 } ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, true ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, false ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, Object.$equals ), [ 3, arr[3] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ] ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], true ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], false ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], Object.$equals ), [ 3, arr[3] ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findLastChunk( { arr: 0 }, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, true, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, false, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, Object.$equals, 2 ), [ 1, arr[1] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], true, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], false, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], Object.$equals, 2 ), [ 1, arr[1] ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$findLastChunk([ 'innerHTML', '1' ]), [ 5, span6 ]
            div.$find('span').$findLastChunk([ 'innerHTML', '2' ]), [ 4, span5 ]
            div.$find('span').$findLastChunk([ 'innerHTML', '3' ]), [ 3, span4 ]
            div.$find('span').$findLastChunk({ innerHTML: '1' }), [ 5, span6 ]
            div.$find('span').$findLastChunk({ innerHTML: '2' }), [ 4, span5 ]
            div.$find('span').$findLastChunk({ innerHTML: '3' }), [ 3, span4 ]

            div.$find('span').$findLastChunk( [ 'innerHTML', '3' ], 3 ), [ 3, span4 ]
            div.$find('span').$findLastChunk( [ 'innerHTML', '2' ], 3 ), [ 1, span2 ]
            div.$find('span').$findLastChunk( [ 'innerHTML', '1' ], 3 ), [ 0, span1 ]
            div.$find('span').$findLastChunk( { innerHTML: '3' }, 3 ), [ 3, span4 ]
            div.$find('span').$findLastChunk( { innerHTML: '2' }, 3 ), [ 1, span2 ]
            div.$find('span').$findLastChunk( { innerHTML: '1' }, 3 ), [ 0, span1 ]
          }
        }
      ]
    }, {
      name: '$findAll',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findAll(function( value ){ return value === -4 }), [] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === -3 }), [] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === -2 }), [] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === -1 }), [] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value }), [ 1, 2, 3, 3 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 0 }), [ 0 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 1 }), [ 1 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 2 }), [ 2 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 3 }), [ 3, 3 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 4 }), [] ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAll(function( obj ){ return obj.name }), [ { name: 'zen' }, { name: 'zenjs' }, { name: 'zenui' }, { name: 'zenjs', type: 'js' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.type }), [ { name: 'zenjs', type: 'js' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.name && obj.type }), [ { name: 'zenjs', type: 'js' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.name == 'zenjs' }), [ { name: 'zenjs' }, { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.name == 'zenui' }), [ { name: 'zenui' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.type == 'js' }), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.type == 'ui' }), [ { name: 'zenui', type: 'ui' } ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAll({ name: 'xxx' }), [] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zen' }), [ { name: 'zen' } ] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zenjs' }), [ { name: 'zenjs' }, { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zenui' }), [ { name: 'zenui' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll({ type: 'js' }), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll({ type: 'ui' }), [ { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zenjs', type: 'js' }), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zenui', type: 'ui' }), [ { name: 'zenui', type: 'ui' } ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAll([ 'name', 'xxx' ]), [] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zen' ]), [ { name: 'zen' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zenjs' ]), [ { name: 'zenjs' }, { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zenui' ]), [ { name: 'zenui' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'type', 'js' ]), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'type', 'ui' ]), [ { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zenjs', 'type', 'js' ]), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zenui', 'type', 'ui' ]), [ { name: 'zenui', type: 'ui' } ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAll( { arr: 0 } ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, true ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, false ), [ { arr: false }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, Object.$equals ), [ { arr: 0 } ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAll( [ 'arr', 0 ] ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], true ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], false ), [ { arr: false }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], Object.$equals ), [ { arr: 0 } ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findAll( function( obj ){ return obj.name }, 1 ), [ { name: 'zenjs' }, { name: 'zenui' }, { name: 'zenjs', type: 'js' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll( function( obj ){ return obj.name == 'zenui' }, 3 ), [ { name: 'zenui', type: 'ui' } ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findAll( { name: 'zen' }, 1 ), [] ).should.true;
            Object.$equals( arr.$findAll( { name: 'zenjs' }, 2 ), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll( { name: 'zenui' }, 3 ), [ { name: 'zenui', type: 'ui' } ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAll( [ 'name', 'zen' ], 1 ), [] ).should.true;
            Object.$equals( arr.$findAll( [ 'name', 'zenjs' ], 2 ), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'name', 'zenui' ], 3 ), [ { name: 'zenui', type: 'ui' } ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAll( { arr: 0 } ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, true ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, false ), arr ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, Object.$equals ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAll( [ 'arr', 0 ] ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], true ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], false ), arr ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], Object.$equals ), [ { arr: 0 }, { arr: 0 } ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findAll( { arr: 0 }, 2 ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, true, 2 ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, false, 2 ), [ { arr: false }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, Object.$equals, 2 ), [ { arr: 0 } ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAll( [ 'arr', 0 ], 2 ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], true, 2 ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], false, 2 ), [ { arr: false }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], Object.$equals, 2 ), [ { arr: 0 } ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            Object.$equals( div.$find('span').$findAll([ 'innerHTML', '1' ]), [ span1, span6 ] ).should.true;
            Object.$equals( div.$find('span').$findAll([ 'innerHTML', '2' ]), [ span2, span5 ] ).should.true;
            Object.$equals( div.$find('span').$findAll([ 'innerHTML', '3' ]), [ span3, span4 ] ).should.true;
            Object.$equals( div.$find('span').$findAll({ innerHTML: '1' }), [ span1, span6 ] ).should.true;
            Object.$equals( div.$find('span').$findAll({ innerHTML: '2' }), [ span2, span5 ] ).should.true;
            Object.$equals( div.$find('span').$findAll({ innerHTML: '3' }), [ span3, span4 ] ).should.true;

            Object.$equals( div.$find('span').$findAll( [ 'innerHTML', '3' ], 3 ), [ span4 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( [ 'innerHTML', '2' ], 3 ), [ span5 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( [ 'innerHTML', '1' ], 3 ), [ span6 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( { innerHTML: '3' }, 3 ), [ span4 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( { innerHTML: '2' }, 3 ), [ span5 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( { innerHTML: '1' }, 3 ), [ span6 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$findAllIndex',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findAllIndex(function( value ){ return value === -4 }), [] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === -3 }), [] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === -2 }), [] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === -1 }), [] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value }), [ 1, 2, 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 0 }), [ 0 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 1 }), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 2 }), [ 2 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 3 }), [ 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 4 }), [] ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.name }), [ 0, 1, 2, 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.type }), [ 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.name && obj.type }), [ 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.name == 'zenjs' }), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.name == 'zenui' }), [ 2, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.type == 'js' }), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.type == 'ui' }), [ 4 ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllIndex({ name: 'xxx' }), [] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zen' }), [ 0 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zenjs' }), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zenui' }), [ 2, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ type: 'js' }), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ type: 'ui' }), [ 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zenjs', type: 'js' }), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zenui', type: 'ui' }), [ 4 ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllIndex([ 'name', 'xxx' ]), [] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zen' ]), [ 0 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zenjs' ]), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zenui' ]), [ 2, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'type', 'js' ]), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'type', 'ui' ]), [ 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zenjs', 'type', 'js' ]), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zenui', 'type', 'ui' ]), [ 4 ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAllIndex( { arr: 0 } ), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, true ), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, false ), [ 0, 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, Object.$equals ), [ 1 ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ] ), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], true ), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], false ), [ 0, 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], Object.$equals ), [ 1 ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findAllIndex( function( obj ){ return obj.name }, 1 ), [ 1, 2, 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( function( obj ){ return obj.name == 'zenui' }, 3 ), [ 4 ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findAllIndex( { name: 'zen' }, 1 ), [] ).should.true;
            Object.$equals( arr.$findAllIndex( { name: 'zenjs' }, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { name: 'zenui' }, 3 ), [ 4 ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAllIndex( [ 'name', 'zen' ], 1 ), [] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'name', 'zenjs' ], 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'name', 'zenui' ], 3 ), [ 4 ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAllIndex( { arr: 0 } ), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, true ), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, false ), [ 0, 1, 2, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, Object.$equals ), [ 1, 3 ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ] ), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], true ), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], false ), [ 0, 1, 2, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], Object.$equals ), [ 1, 3 ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findAllIndex( { arr: 0 }, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, true, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, false, 2 ), [ 2, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, Object.$equals, 2 ), [ 3 ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], true, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], false, 2 ), [ 2, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], Object.$equals, 2 ), [ 3 ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            Object.$equals( div.$find('span').$findAllIndex([ 'innerHTML', '1' ]), [ 0, 5 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex([ 'innerHTML', '2' ]), [ 1, 4 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex([ 'innerHTML', '3' ]), [ 2, 3 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex({ innerHTML: '1' }), [ 0, 5 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex({ innerHTML: '2' }), [ 1, 4 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex({ innerHTML: '3' }), [ 2, 3 ] ).should.true;

            Object.$equals( div.$find('span').$findAllIndex( [ 'innerHTML', '3' ], 3 ), [ 3 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( [ 'innerHTML', '2' ], 3 ), [ 4 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( [ 'innerHTML', '1' ], 3 ), [ 5 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( { innerHTML: '3' }, 3 ), [ 3 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( { innerHTML: '2' }, 3 ), [ 4 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( { innerHTML: '1' }, 3 ), [ 5 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$findAllChunk',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findAllChunk(function( value ){ return value === -4 }), [] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === -3 }), [] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === -2 }), [] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === -1 }), [] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value }), [ [ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 3 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 0 }), [ [ 0, 0 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 1 }), [ [ 1, 1 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 2 }), [ [ 2, 2 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 3 }), [ [ 3, 3 ], [ 4, 3 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 4 }), [] ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.name }), [ [ 0, { name: 'zen' } ], [ 1, { name: 'zenjs' } ], [ 2, { name: 'zenui' } ], [ 3, { name: 'zenjs', type: 'js' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.type }), [ [ 3, { name: 'zenjs', type: 'js' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.name && obj.type }), [ [ 3, { name: 'zenjs', type: 'js' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.name == 'zenjs' }), [ [ 1, { name: 'zenjs' } ], [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.name == 'zenui' }), [ [ 2, { name: 'zenui' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.type == 'js' }), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.type == 'ui' }), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllChunk({ name: 'xxx' }), [] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zen' }), [ [ 0, { name: 'zen' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zenjs' }), [ [ 1, { name: 'zenjs' } ], [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zenui' }), [ [ 2, { name: 'zenui' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ type: 'js' }), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ type: 'ui' }), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zenjs', type: 'js' }), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zenui', type: 'ui' }), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllChunk([ 'name', 'xxx' ]), [] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zen' ]), [ [ 0, { name: 'zen' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zenjs' ]), [ [ 1, { name: 'zenjs' } ], [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zenui' ]), [ [ 2, { name: 'zenui' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'type', 'js' ]), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'type', 'ui' ]), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zenjs', 'type', 'js' ]), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zenui', 'type', 'ui' ]), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAllChunk( { arr: 0 } ), [ [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, true ), [ [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, false ), [ [ 0, { arr: false } ], [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, Object.$equals ), [ [ 1, { arr: 0 } ] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ] ), [ [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], true ), [ [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], false ), [ [ 0, { arr: false } ], [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], Object.$equals ), [ [ 1, { arr: 0 } ] ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findAllChunk( function( obj ){ return obj.name }, 1 ), [ [ 1, { name: 'zenjs' } ], [ 2, { name: 'zenui' } ], [ 3, { name: 'zenjs', type: 'js' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( function( obj ){ return obj.name == 'zenui' }, 3 ), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findAllChunk( { name: 'zen' }, 1 ), [] ).should.true;
            Object.$equals( arr.$findAllChunk( { name: 'zenjs' }, 2 ), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { name: 'zenui' }, 3 ), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAllChunk( [ 'name', 'zen' ], 1 ), [] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'name', 'zenjs' ], 2 ), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'name', 'zenui' ], 3 ), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAllChunk( { arr: 0 } ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, true ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, false ), arr.map(function( obj, index ){ return [ index, obj ] }) ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, Object.$equals ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ] ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], true ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], false ), arr.map(function( obj, index ){ return [ index, obj ] }) ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], Object.$equals ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findAllChunk( { arr: 0 }, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, true, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, false, 2 ), [ [ 2, { arr: false } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, Object.$equals, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], true, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], false, 2 ), [ [ 2, { arr: false } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], Object.$equals, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            Object.$equals( div.$find('span').$findAllChunk([ 'innerHTML', '1' ]), [ [ 0, span1 ], [ 5, span6 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk([ 'innerHTML', '2' ]), [ [ 1, span2 ], [ 4, span5 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk([ 'innerHTML', '3' ]), [ [ 2, span3 ], [ 3, span4 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk({ innerHTML: '1' }), [ [ 0, span1 ], [ 5, span6 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk({ innerHTML: '2' }), [ [ 1, span2 ], [ 4, span5 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk({ innerHTML: '3' }), [ [ 2, span3 ], [ 3, span4 ] ] ).should.true;

            Object.$equals( div.$find('span').$findAllChunk( [ 'innerHTML', '3' ], 3 ), [ [ 3, span4 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( [ 'innerHTML', '2' ], 3 ), [ [ 4, span5 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( [ 'innerHTML', '1' ], 3 ), [ [ 5, span6 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( { innerHTML: '3' }, 3 ), [ [ 3, span4 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( { innerHTML: '2' }, 3 ), [ [ 4, span5 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( { innerHTML: '1' }, 3 ), [ [ 5, span6 ] ] ).should.true;
          }
        }
      ]
    }, {
      name: '$findNot',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findNot(function( value ){ return value === -4 }), 0 ).should.true;
            Object.$equals( arr.$findNot(function( value ){ return value === -3 }), 0 ).should.true;
            Object.$equals( arr.$findNot(function( value ){ return value === -2 }), 0 ).should.true;
            Object.$equals( arr.$findNot(function( value ){ return value === -1 }), 0 ).should.true;
            Object.$equals( arr.$findNot(function( value ){ return value }), 0 ).should.true;
            Object.$equals( arr.$findNot(function( value ){ return value === 0 }), 1 ).should.true;
            Object.$equals( arr.$findNot(function( value ){ return value === 1 }), 0 ).should.true;
            Object.$equals( arr.$findNot(function( value ){ return value === 2 }), 0 ).should.true;
            Object.$equals( arr.$findNot(function( value ){ return value === 3 }), 0 ).should.true;
            Object.$equals( arr.$findNot(function( value ){ return value === 4 }), 0 ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findNot(function( obj ){ return obj.name }), undefined ).should.true;
            arr.$findNot(function( obj ){ return obj.type }).should.equals( arr[0] );
            arr.$findNot(function( obj ){ return obj.name && obj.type }).should.equals( arr[0] );
            arr.$findNot(function( obj ){ return obj.name == 'zenjs' }).should.equals( arr[0] );
            arr.$findNot(function( obj ){ return obj.name == 'zenui' }).should.equals( arr[0] );
            arr.$findNot(function( obj ){ return obj.type == 'js' }).should.equals( arr[0] );
            arr.$findNot(function( obj ){ return obj.type == 'ui' }).should.equals( arr[0] );
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findNot({ name: 'xxx' }).should.equals( arr[0] );
            arr.$findNot({ name: 'zen' }).should.equals( arr[1] );
            arr.$findNot({ name: 'zenjs' }).should.equals( arr[0] );
            arr.$findNot({ name: 'zenui' }).should.equals( arr[0] );
            arr.$findNot({ type: 'js' }).should.equals( arr[0] );
            arr.$findNot({ type: 'ui' }).should.equals( arr[0] );
            arr.$findNot({ name: 'zenjs', type: 'js' }).should.equals( arr[0] );
            arr.$findNot({ name: 'zenui', type: 'ui' }).should.equals( arr[0] );
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findNot([ 'name', 'xxx' ]).should.equals( arr[0] );
            arr.$findNot([ 'name', 'zen' ]).should.equals( arr[1] );
            arr.$findNot([ 'name', 'zenjs' ]).should.equals( arr[0] );
            arr.$findNot([ 'name', 'zenui' ]).should.equals( arr[0] );
            arr.$findNot([ 'type', 'js' ]).should.equals( arr[0] );
            arr.$findNot([ 'type', 'ui' ]).should.equals( arr[0] );
            arr.$findNot([ 'name', 'zenjs', 'type', 'js' ]).should.equals( arr[0] );
            arr.$findNot([ 'name', 'zenui', 'type', 'ui' ]).should.equals( arr[0] );
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findNot( { arr: 0 } ).should.equals( arr[0] );
            arr.$findNot( { arr: 0 }, true ).should.equals( arr[0] );
            Object.$equals( arr.$findNot( { arr: 0 }, false ), undefined ).should.true;
            arr.$findNot( { arr: 0 }, Object.$equals ).should.equals( arr[0] );

            // Pass in an array for lookup
            arr.$findNot( [ 'arr', 0 ] ).should.equals( arr[0] );
            arr.$findNot( [ 'arr', 0 ], true ).should.equals( arr[0] );
            Object.$equals( arr.$findNot( [ 'arr', 0 ], false ), undefined ).should.true;
            arr.$findNot( [ 'arr', 0 ], Object.$equals ).should.equals( arr[0] );
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findNot( function( obj ){ return obj.name }, 1 ), undefined ).should.true;
            arr.$findNot( function( obj ){ return obj.name == 'zenjs' }, 2 ).should.equals( arr[2] );
            arr.$findNot( function( obj ){ return obj.name == 'zenui' }, 3 ).should.equals( arr[3] );

            // Incoming object for lookup
            arr.$findNot( { name: 'zen' }, 2 ).should.equals( arr[2] );
            arr.$findNot( { name: 'zenjs' }, 2 ).should.equals( arr[2] );
            arr.$findNot( { name: 'zenui' }, 3 ).should.equals( arr[3] );

            // Pass in an array for lookup
            arr.$findNot( [ 'name', 'zen' ], 2 ).should.equals( arr[2] );
            arr.$findNot( [ 'name', 'zenjs' ], 2 ).should.equals( arr[2] );
            arr.$findNot( [ 'name', 'zenui' ], 3 ).should.equals( arr[3] );
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findNot( { arr: 0 } ).should.equals( arr[0] );
            arr.$findNot( { arr: 0 }, true ).should.equals( arr[0] );
            Object.$equals( arr.$findNot( { arr: 0 }, false ), undefined ).should.true;
            arr.$findNot( { arr: 0 }, Object.$equals ).should.equals( arr[0] );
            // Pass in an array for lookup
            arr.$findNot( [ 'arr', 0 ] ).should.equals( arr[0] );
            arr.$findNot( [ 'arr', 0 ], true ).should.equals( arr[0] );
            Object.$equals( arr.$findNot( [ 'arr', 0 ], false ), undefined ).should.true;
            arr.$findNot( [ 'arr', 0 ], Object.$equals ).should.equals( arr[0] );


            // Incoming object for lookup
            arr.$findNot( { arr: 0 }, 2 ).should.equals( arr[2] );
            arr.$findNot( { arr: 0 }, true, 2 ).should.equals( arr[2] );
            Object.$equals( arr.$findNot( { arr: 0 }, false, 2 ), undefined ).should.true;
            arr.$findNot( { arr: 0 }, Object.$equals, 2 ).should.equals( arr[2] );
            // Pass in an array for lookup
            arr.$findNot( [ 'arr', 0 ], 2 ).should.equals( arr[2] );
            arr.$findNot( [ 'arr', 0 ], true, 2 ).should.equals( arr[2] );
            Object.$equals( arr.$findNot( [ 'arr', 0 ], false, 2 ), undefined ).should.true;
            arr.$findNot( [ 'arr', 0 ], Object.$equals, 2 ).should.equals( arr[2] );
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$findNot([ 'innerHTML', '1' ]).should.equals( span2 );
            div.$find('span').$findNot([ 'innerHTML', '2' ]).should.equals( span1 );
            div.$find('span').$findNot([ 'innerHTML', '3' ]).should.equals( span1 );
            div.$find('span').$findNot({ innerHTML: '1' }).should.equals( span2 );
            div.$find('span').$findNot({ innerHTML: '2' }).should.equals( span1 );
            div.$find('span').$findNot({ innerHTML: '3' }).should.equals( span1 );

            div.$find('span').$findNot( [ 'innerHTML', '3' ], 3 ).should.equals( span5 );
            div.$find('span').$findNot( [ 'innerHTML', '2' ], 3 ).should.equals( span4 );
            div.$find('span').$findNot( [ 'innerHTML', '1' ], 3 ).should.equals( span4 );
            div.$find('span').$findNot( { innerHTML: '3' }, 3 ).should.equals( span5 );
            div.$find('span').$findNot( { innerHTML: '2' }, 3 ).should.equals( span4 );
            div.$find('span').$findNot( { innerHTML: '1' }, 3 ).should.equals( span4 );
          }
        }
      ]
    }, {
      name: '$findNotIndex',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findNotIndex(function( value ){ return value === -4 }),0 ).should.true;
            Object.$equals( arr.$findNotIndex(function( value ){ return value === -3 }),0 ).should.true;
            Object.$equals( arr.$findNotIndex(function( value ){ return value === -2 }),0 ).should.true;
            Object.$equals( arr.$findNotIndex(function( value ){ return value === -1 }),0 ).should.true;
            Object.$equals( arr.$findNotIndex(function( value ){ return value }), 0 ).should.true;
            Object.$equals( arr.$findNotIndex(function( value ){ return value === 0 }), 1 ).should.true;
            Object.$equals( arr.$findNotIndex(function( value ){ return value === 1 }), 0 ).should.true;
            Object.$equals( arr.$findNotIndex(function( value ){ return value === 2 }), 0 ).should.true;
            Object.$equals( arr.$findNotIndex(function( value ){ return value === 3 }), 0 ).should.true;
            Object.$equals( arr.$findNotIndex(function( value ){ return value === 4 }), 0 ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findNotIndex(function( obj ){ return obj.name }).should.equals( -1 );
            arr.$findNotIndex(function( obj ){ return obj.type }).should.equals( 0 );
            arr.$findNotIndex(function( obj ){ return obj.name && obj.type }).should.equals( 0 );
            arr.$findNotIndex(function( obj ){ return obj.name == 'zenjs' }).should.equals( 0 );
            arr.$findNotIndex(function( obj ){ return obj.name == 'zenui' }).should.equals( 0 );
            arr.$findNotIndex(function( obj ){ return obj.type == 'js' }).should.equals( 0 );
            arr.$findNotIndex(function( obj ){ return obj.type == 'ui' }).should.equals( 0 );
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findNotIndex({ name: 'xxx' }), 0 ).should.true;
            arr.$findNotIndex({ name: 'zen' }).should.equals( 1 );
            arr.$findNotIndex({ name: 'zenjs' }).should.equals( 0 );
            arr.$findNotIndex({ name: 'zenui' }).should.equals( 0 );
            arr.$findNotIndex({ type: 'js' }).should.equals( 0 );
            arr.$findNotIndex({ type: 'ui' }).should.equals( 0 );
            arr.$findNotIndex({ name: 'zenjs', type: 'js' }).should.equals( 0 );
            arr.$findNotIndex({ name: 'zenui', type: 'ui' }).should.equals( 0 );
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findNotIndex([ 'name', 'xxx' ]), 0 ).should.true;
            arr.$findNotIndex([ 'name', 'zen' ]).should.equals( 1 );
            arr.$findNotIndex([ 'name', 'zenjs' ]).should.equals( 0 );
            arr.$findNotIndex([ 'name', 'zenui' ]).should.equals( 0 );
            arr.$findNotIndex([ 'type', 'js' ]).should.equals( 0 );
            arr.$findNotIndex([ 'type', 'ui' ]).should.equals( 0 );
            arr.$findNotIndex([ 'name', 'zenjs', 'type', 'js' ]).should.equals( 0 );
            arr.$findNotIndex([ 'name', 'zenui', 'type', 'ui' ]).should.equals( 0 );
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findNotIndex( { arr: 0 } ).should.equals( 0 );
            arr.$findNotIndex( { arr: 0 }, true ).should.equals( 0 );
            arr.$findNotIndex( { arr: 0 }, false ).should.equals( -1 );
            arr.$findNotIndex( { arr: 0 }, Object.$equals ).should.equals( 0 );

            // Pass in an array for lookup
            arr.$findNotIndex( [ 'arr', 0 ] ).should.equals( 0 );
            arr.$findNotIndex( [ 'arr', 0 ], true ).should.equals( 0 );
            arr.$findNotIndex( [ 'arr', 0 ], false ).should.equals( -1 );
            arr.$findNotIndex( [ 'arr', 0 ], Object.$equals ).should.equals( 0 );
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            arr.$findNotIndex( function( obj ){ return obj.name }, 1 ).should.equals( -1 );
            arr.$findNotIndex( function( obj ){ return obj.name == 'zenjs' }, 2 ).should.equals( 2 );
            arr.$findNotIndex( function( obj ){ return obj.name == 'zenui' }, 3 ).should.equals( 3 );

            // Incoming object for lookup
            Object.$equals( arr.$findNotIndex( { name: 'zen' }, 1 ), 1 ).should.true;
            arr.$findNotIndex( { name: 'zenjs' }, 2 ).should.equals( 2 );
            arr.$findNotIndex( { name: 'zenui' }, 3 ).should.equals( 3 );

            // Pass in an array for lookup
            Object.$equals( arr.$findNotIndex( [ 'name', 'zen' ], 1 ), 1 ).should.true;
            arr.$findNotIndex( [ 'name', 'zenjs' ], 2 ).should.equals( 2 );
            arr.$findNotIndex( [ 'name', 'zenui' ], 3 ).should.equals( 3 );
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findNotIndex( { arr: 0 } ).should.equals( 0 );
            arr.$findNotIndex( { arr: 0 }, true ).should.equals( 0 );
            arr.$findNotIndex( { arr: 0 }, false ).should.equals( -1 );
            arr.$findNotIndex( { arr: 0 }, Object.$equals ).should.equals( 0 );
            // Pass in an array for lookup
            arr.$findNotIndex( [ 'arr', 0 ] ).should.equals( 0 );
            arr.$findNotIndex( [ 'arr', 0 ], true ).should.equals( 0 );
            arr.$findNotIndex( [ 'arr', 0 ], false ).should.equals( -1 );
            arr.$findNotIndex( [ 'arr', 0 ], Object.$equals ).should.equals( 0 );


            // Incoming object for lookup
            arr.$findNotIndex( { arr: 0 }, 2 ).should.equals( 2 );
            arr.$findNotIndex( { arr: 0 }, true, 2 ).should.equals( 2 );
            arr.$findNotIndex( { arr: 0 }, false, 2 ).should.equals( -1 );
            arr.$findNotIndex( { arr: 0 }, Object.$equals, 2 ).should.equals( 2 );
            // Pass in an array for lookup
            arr.$findNotIndex( [ 'arr', 0 ], 2 ).should.equals( 2 );
            arr.$findNotIndex( [ 'arr', 0 ], true, 2 ).should.equals( 2 );
            arr.$findNotIndex( [ 'arr', 0 ], false, 2 ).should.equals( -1 );
            arr.$findNotIndex( [ 'arr', 0 ], Object.$equals, 2 ).should.equals( 2 );
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$findNotIndex([ 'innerHTML', '1' ]).should.equals( 1 );
            div.$find('span').$findNotIndex([ 'innerHTML', '2' ]).should.equals( 0 );
            div.$find('span').$findNotIndex([ 'innerHTML', '3' ]).should.equals( 0 );
            div.$find('span').$findNotIndex({ innerHTML: '1' }).should.equals( 1 );
            div.$find('span').$findNotIndex({ innerHTML: '2' }).should.equals( 0 );
            div.$find('span').$findNotIndex({ innerHTML: '3' }).should.equals( 0 );

            div.$find('span').$findNotIndex( [ 'innerHTML', '3' ], 3 ).should.equals( 4 );
            div.$find('span').$findNotIndex( [ 'innerHTML', '2' ], 3 ).should.equals( 3 );
            div.$find('span').$findNotIndex( [ 'innerHTML', '1' ], 3 ).should.equals( 3 );
            div.$find('span').$findNotIndex( { innerHTML: '3' }, 3 ).should.equals( 4 );
            div.$find('span').$findNotIndex( { innerHTML: '2' }, 3 ).should.equals( 3 );
            div.$find('span').$findNotIndex( { innerHTML: '1' }, 3 ).should.equals( 3 );
          }
        }
      ]
    }, {
      name: '$findNotChunk',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findNotChunk(function( value ){ return value === -4 }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( value ){ return value === -3 }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( value ){ return value === -2 }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( value ){ return value === -1 }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( value ){ return value }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( value ){ return value === 0 }), [ 1, 1 ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( value ){ return value === 1 }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( value ){ return value === 2 }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( value ){ return value === 3 }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( value ){ return value === 4 }), [ 0, 0 ] ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findNotChunk(function( obj ){ return obj.name }), undefined ).should.true;
            Object.$equals( arr.$findNotChunk(function( obj ){ return obj.type }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( obj ){ return obj.name && obj.type }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( obj ){ return obj.name == 'zenjs' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( obj ){ return obj.name == 'zenui' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( obj ){ return obj.type == 'js' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk(function( obj ){ return obj.type == 'ui' }), [ 0, arr[0] ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findNotChunk({ name: 'xxx' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk({ name: 'zen' }), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findNotChunk({ name: 'zenjs' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk({ name: 'zenui' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk({ type: 'js' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk({ type: 'ui' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk({ name: 'zenjs', type: 'js' }), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk({ name: 'zenui', type: 'ui' }), [ 0, arr[0] ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findNotChunk([ 'name', 'xxx' ]), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk([ 'name', 'zen' ]), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findNotChunk([ 'name', 'zenjs' ]), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk([ 'name', 'zenui' ]), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk([ 'type', 'js' ]), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk([ 'type', 'ui' ]), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk([ 'name', 'zenjs', 'type', 'js' ]), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk([ 'name', 'zenui', 'type', 'ui' ]), [ 0, arr[0] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findNotChunk( { arr: 0 } ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk( { arr: 0 }, true ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk( { arr: 0 }, false ), undefined ).should.true;
            Object.$equals( arr.$findNotChunk( { arr: 0 }, Object.$equals ), [ 0, arr[0] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ] ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], true ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], false ), undefined ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], Object.$equals ), [ 0, arr[0] ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findNotChunk( function( obj ){ return obj.name }, 1 ), undefined ).should.true;
            Object.$equals( arr.$findNotChunk( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findNotChunk( function( obj ){ return obj.name == 'zenui' }, 3 ), [ 3, arr[3] ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findNotChunk( { name: 'zen' }, 1 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findNotChunk( { name: 'zenjs' }, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findNotChunk( { name: 'zenui' }, 3 ), [ 3, arr[3] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findNotChunk( [ 'name', 'zen' ], 1 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'name', 'zenjs' ], 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'name', 'zenui' ], 3 ), [ 3, arr[3] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findNotChunk( { arr: 0 } ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk( { arr: 0 }, true ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk( { arr: 0 }, false ), undefined ).should.true;
            Object.$equals( arr.$findNotChunk( { arr: 0 }, Object.$equals ), [ 0, arr[0] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ] ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], true ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], false ), undefined ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], Object.$equals ), [ 0, arr[0] ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findNotChunk( { arr: 0 }, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findNotChunk( { arr: 0 }, true, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findNotChunk( { arr: 0 }, false, 2 ), undefined ).should.true;
            Object.$equals( arr.$findNotChunk( { arr: 0 }, Object.$equals, 2 ), [ 2, arr[2] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], true, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], false, 2 ), undefined ).should.true;
            Object.$equals( arr.$findNotChunk( [ 'arr', 0 ], Object.$equals, 2 ), [ 2, arr[2] ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            Object.$equals( div.$find('span').$findNotChunk([ 'innerHTML', '1' ]), [ 1, span2 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk([ 'innerHTML', '2' ]), [ 0, span1 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk([ 'innerHTML', '3' ]), [ 0, span1 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk({ innerHTML: '1' }), [ 1, span2 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk({ innerHTML: '2' }), [ 0, span1 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk({ innerHTML: '3' }), [ 0, span1 ] ).should.true;

            Object.$equals( div.$find('span').$findNotChunk( [ 'innerHTML', '3' ], 3 ), [ 4, span5 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk( [ 'innerHTML', '2' ], 3 ), [ 3, span4 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk( [ 'innerHTML', '1' ], 3 ), [ 3, span4 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk( { innerHTML: '3' }, 3 ), [ 4, span5 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk( { innerHTML: '2' }, 3 ), [ 3, span4 ] ).should.true;
            Object.$equals( div.$find('span').$findNotChunk( { innerHTML: '1' }, 3 ), [ 3, span4 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$findLastNot',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findLastNot(function( value ){ return value === -4 }), 3 ).should.true;
            Object.$equals( arr.$findLastNot(function( value ){ return value === -3 }), 3 ).should.true;
            Object.$equals( arr.$findLastNot(function( value ){ return value === -2 }), 3 ).should.true;
            Object.$equals( arr.$findLastNot(function( value ){ return value === -1 }), 3 ).should.true;
            Object.$equals( arr.$findLastNot(function( value ){ return value }), 0 ).should.true;
            Object.$equals( arr.$findLastNot(function( value ){ return value === 0 }), 3 ).should.true;
            Object.$equals( arr.$findLastNot(function( value ){ return value === 1 }), 3 ).should.true;
            Object.$equals( arr.$findLastNot(function( value ){ return value === 2 }), 3 ).should.true;
            Object.$equals( arr.$findLastNot(function( value ){ return value === 3 }), 2 ).should.true;
            Object.$equals( arr.$findLastNot(function( value ){ return value === 4 }), 3 ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findLastNot(function( obj ){ return obj.name }), undefined ).should.true;
            arr.$findLastNot(function( obj ){ return obj.type }).should.equals( arr[2] );
            arr.$findLastNot(function( obj ){ return obj.name && obj.type }).should.equals( arr[2] );
            arr.$findLastNot(function( obj ){ return obj.name == 'zenjs' }).should.equals( arr[4] );
            arr.$findLastNot(function( obj ){ return obj.name == 'zenui' }).should.equals( arr[3] );
            arr.$findLastNot(function( obj ){ return obj.type == 'js' }).should.equals( arr[4] );
            arr.$findLastNot(function( obj ){ return obj.type == 'ui' }).should.equals( arr[3] );
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findLastNot({ name: 'xxx' }).should.equals( arr[4] )
            arr.$findLastNot({ name: 'zen' }).should.equals( arr[4] );
            arr.$findLastNot({ name: 'zenjs' }).should.equals( arr[4] );
            arr.$findLastNot({ name: 'zenui' }).should.equals( arr[3] );
            arr.$findLastNot({ type: 'js' }).should.equals( arr[4] );
            arr.$findLastNot({ type: 'ui' }).should.equals( arr[3] );
            arr.$findLastNot({ name: 'zenjs', type: 'js' }).should.equals( arr[4] );
            arr.$findLastNot({ name: 'zenui', type: 'ui' }).should.equals( arr[3] );
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findLastNot([ 'name', 'xxx' ]).should.equals( arr[4] )
            arr.$findLastNot([ 'name', 'zen' ]).should.equals( arr[4] );
            arr.$findLastNot([ 'name', 'zenjs' ]).should.equals( arr[4] );
            arr.$findLastNot([ 'name', 'zenui' ]).should.equals( arr[3] );
            arr.$findLastNot([ 'type', 'js' ]).should.equals( arr[4] );
            arr.$findLastNot([ 'type', 'ui' ]).should.equals( arr[3] );
            arr.$findLastNot([ 'name', 'zenjs', 'type', 'js' ]).should.equals( arr[4] );
            arr.$findLastNot([ 'name', 'zenui', 'type', 'ui' ]).should.equals( arr[3] );
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findLastNot( { arr: 0 } ).should.equals( arr[0] );
            arr.$findLastNot( { arr: 0 }, true ).should.equals( arr[0] );
            Object.$equals( arr.$findLastNot( { arr: 0 }, false ), undefined ).should.true;
            arr.$findLastNot( { arr: 0 }, Object.$equals ).should.equals( arr[0] );

            // Pass in an array for lookup
            arr.$findLastNot( [ 'arr', 0 ] ).should.equals( arr[0] );
            arr.$findLastNot( [ 'arr', 0 ], true ).should.equals( arr[0] );
            Object.$equals( arr.$findLastNot( [ 'arr', 0 ], false ), undefined ).should.true;
            arr.$findLastNot( [ 'arr', 0 ], Object.$equals ).should.equals( arr[0] );
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findLastNot( function( obj ){ return obj.name }, 1 ), undefined ).should.true;
            arr.$findLastNot( function( obj ){ return obj.name == 'zenjs' }, 2 ).should.equals( arr[2] );
            arr.$findLastNot( function( obj ){ return obj.name == 'zenui' }, 3 ).should.equals( arr[3] );

            // Incoming object for lookup
            arr.$findLastNot( { name: 'zen' }, 1 ).should.equals( arr[1] );
            arr.$findLastNot( { name: 'zenjs' }, 2 ).should.equals( arr[2] );
            arr.$findLastNot( { name: 'zenui' }, 3 ).should.equals( arr[3] );

            // Pass in an array for lookup
            arr.$findLastNot( [ 'name', 'zen' ], 1 ).should.equals( arr[1] );
            arr.$findLastNot( [ 'name', 'zenjs' ], 2 ).should.equals( arr[2] );
            arr.$findLastNot( [ 'name', 'zenui' ], 3 ).should.equals( arr[3] );
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findLastNot( { arr: 0 } ).should.equals( arr[2] );
            arr.$findLastNot( { arr: 0 }, true ).should.equals( arr[2] );
            Object.$equals( arr.$findLastNot( { arr: 0 }, false ), undefined ).should.true;
            arr.$findLastNot( { arr: 0 }, Object.$equals ).should.equals( arr[2] );
            // Pass in an array for lookup
            arr.$findLastNot( [ 'arr', 0 ] ).should.equals( arr[2] );
            arr.$findLastNot( [ 'arr', 0 ], true ).should.equals( arr[2] );
            Object.$equals( arr.$findLastNot( [ 'arr', 0 ], false ), undefined ).should.true;
            arr.$findLastNot( [ 'arr', 0 ], Object.$equals ).should.equals( arr[2] );


            // Incoming object for lookup
            arr.$findLastNot( { arr: 0 }, 2 ).should.equals( arr[2] );
            arr.$findLastNot( { arr: 0 }, true, 2 ).should.equals( arr[2] );
            Object.$equals( arr.$findLastNot( { arr: 0 }, false, 2 ), undefined ).should.true;
            arr.$findLastNot( { arr: 0 }, Object.$equals, 2 ).should.equals( arr[2] );
            // Pass in an array for lookup
            arr.$findLastNot( [ 'arr', 0 ], 2 ).should.equals( arr[2] );
            arr.$findLastNot( [ 'arr', 0 ], true, 2 ).should.equals( arr[2] );
            Object.$equals( arr.$findLastNot( [ 'arr', 0 ], false, 2 ), undefined ).should.true;
            arr.$findLastNot( [ 'arr', 0 ], Object.$equals, 2 ).should.equals( arr[2] );
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$findLastNot([ 'innerHTML', '1' ]).should.equals( span5 );
            div.$find('span').$findLastNot([ 'innerHTML', '2' ]).should.equals( span6 );
            div.$find('span').$findLastNot([ 'innerHTML', '3' ]).should.equals( span6 );
            div.$find('span').$findLastNot({ innerHTML: '1' }).should.equals( span5 );
            div.$find('span').$findLastNot({ innerHTML: '2' }).should.equals( span6 );
            div.$find('span').$findLastNot({ innerHTML: '3' }).should.equals( span6 );

            div.$find('span').$findLastNot( [ 'innerHTML', '3' ], 3 ).should.equals( span2 );
            div.$find('span').$findLastNot( [ 'innerHTML', '2' ], 3 ).should.equals( span4 );
            div.$find('span').$findLastNot( [ 'innerHTML', '1' ], 3 ).should.equals( span4 );
            div.$find('span').$findLastNot( { innerHTML: '3' }, 3 ).should.equals( span2 );
            div.$find('span').$findLastNot( { innerHTML: '2' }, 3 ).should.equals( span4 );
            div.$find('span').$findLastNot( { innerHTML: '1' }, 3 ).should.equals( span4 );
          }
        }
      ]
    }, {
      name: '$findLastNotIndex',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findLastNotIndex(function( value ){ return value === -4 }), 4 ).should.true;
            Object.$equals( arr.$findLastNotIndex(function( value ){ return value === -3 }), 4 ).should.true;
            Object.$equals( arr.$findLastNotIndex(function( value ){ return value === -2 }), 4 ).should.true;
            Object.$equals( arr.$findLastNotIndex(function( value ){ return value === -1 }), 4 ).should.true;
            Object.$equals( arr.$findLastNotIndex(function( value ){ return value }), 0 ).should.true;
            Object.$equals( arr.$findLastNotIndex(function( value ){ return value === 0 }), 4 ).should.true;
            Object.$equals( arr.$findLastNotIndex(function( value ){ return value === 1 }), 4 ).should.true;
            Object.$equals( arr.$findLastNotIndex(function( value ){ return value === 2 }), 4 ).should.true;
            Object.$equals( arr.$findLastNotIndex(function( value ){ return value === 3 }), 2 ).should.true;
            Object.$equals( arr.$findLastNotIndex(function( value ){ return value === 4 }), 4 ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findLastNotIndex(function( obj ){ return obj.name }).should.equals( -1 );
            arr.$findLastNotIndex(function( obj ){ return obj.type }).should.equals( 2 );
            arr.$findLastNotIndex(function( obj ){ return obj.name && obj.type }).should.equals( 2 );
            arr.$findLastNotIndex(function( obj ){ return obj.name == 'zenjs' }).should.equals( 4 );
            arr.$findLastNotIndex(function( obj ){ return obj.name == 'zenui' }).should.equals( 3 );
            arr.$findLastNotIndex(function( obj ){ return obj.type == 'js' }).should.equals( 4 );
            arr.$findLastNotIndex(function( obj ){ return obj.type == 'ui' }).should.equals( 3 );
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findLastNotIndex({ name: 'xxx' }).should.equals( 4 );
            arr.$findLastNotIndex({ name: 'zen' }).should.equals( 4 );
            arr.$findLastNotIndex({ name: 'zenjs' }).should.equals( 4 );
            arr.$findLastNotIndex({ name: 'zenui' }).should.equals( 3 );
            arr.$findLastNotIndex({ type: 'js' }).should.equals( 4 );
            arr.$findLastNotIndex({ type: 'ui' }).should.equals( 3 );
            arr.$findLastNotIndex({ name: 'zenjs', type: 'js' }).should.equals( 4 );
            arr.$findLastNotIndex({ name: 'zenui', type: 'ui' }).should.equals( 3 );
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            arr.$findLastNotIndex([ 'name', 'xxx' ]).should.equals( 4 );
            arr.$findLastNotIndex([ 'name', 'zen' ]).should.equals( 4 );
            arr.$findLastNotIndex([ 'name', 'zenjs' ]).should.equals( 4 );
            arr.$findLastNotIndex([ 'name', 'zenui' ]).should.equals( 3 );
            arr.$findLastNotIndex([ 'type', 'js' ]).should.equals( 4 );
            arr.$findLastNotIndex([ 'type', 'ui' ]).should.equals( 3 );
            arr.$findLastNotIndex([ 'name', 'zenjs', 'type', 'js' ]).should.equals( 4 );
            arr.$findLastNotIndex([ 'name', 'zenui', 'type', 'ui' ]).should.equals( 3 );
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findLastNotIndex( { arr: 0 } ).should.equals( 0 );
            arr.$findLastNotIndex( { arr: 0 }, true ).should.equals( 0 );
            arr.$findLastNotIndex( { arr: 0 }, false ).should.equals( -1 );
            arr.$findLastNotIndex( { arr: 0 }, Object.$equals ).should.equals( 0 );

            // Pass in an array for lookup
            arr.$findLastNotIndex( [ 'arr', 0 ] ).should.equals( 0 );
            arr.$findLastNotIndex( [ 'arr', 0 ], true ).should.equals( 0 );
            arr.$findLastNotIndex( [ 'arr', 0 ], false ).should.equals( -1 );
            arr.$findLastNotIndex( [ 'arr', 0 ], Object.$equals ).should.equals( 0 );
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            arr.$findLastNotIndex( function( obj ){ return obj.name }, 1 ).should.equals( -1 );
            arr.$findLastNotIndex( function( obj ){ return obj.name == 'zenjs' }, 2 ).should.equals( 2 );
            arr.$findLastNotIndex( function( obj ){ return obj.name == 'zenui' }, 3 ).should.equals( 3 );

            // Incoming object for lookup
            arr.$findLastNotIndex( { name: 'zen' }, 1 ).should.equals( 1 );
            arr.$findLastNotIndex( { name: 'zenjs' }, 2 ).should.equals( 2 );
            arr.$findLastNotIndex( { name: 'zenui' }, 3 ).should.equals( 3 );

            // Pass in an array for lookup
            arr.$findLastNotIndex( [ 'name', 'zen' ], 1 ).should.equals( 1 );
            arr.$findLastNotIndex( [ 'name', 'zenjs' ], 2 ).should.equals( 2 );
            arr.$findLastNotIndex( [ 'name', 'zenui' ], 3 ).should.equals( 3 );
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            arr.$findLastNotIndex( { arr: 0 } ).should.equals( 2 );
            arr.$findLastNotIndex( { arr: 0 }, true ).should.equals( 2 );
            arr.$findLastNotIndex( { arr: 0 }, false ).should.equals( -1 );
            arr.$findLastNotIndex( { arr: 0 }, Object.$equals ).should.equals( 2 );
            // Pass in an array for lookup
            arr.$findLastNotIndex( [ 'arr', 0 ] ).should.equals( 2 );
            arr.$findLastNotIndex( [ 'arr', 0 ], true ).should.equals( 2 );
            arr.$findLastNotIndex( [ 'arr', 0 ], false ).should.equals( -1 );
            arr.$findLastNotIndex( [ 'arr', 0 ], Object.$equals ).should.equals( 2 );


            // Incoming object for lookup
            arr.$findLastNotIndex( { arr: 0 }, 2 ).should.equals( 2 );
            arr.$findLastNotIndex( { arr: 0 }, true, 2 ).should.equals( 2 );
            arr.$findLastNotIndex( { arr: 0 }, false, 2 ).should.equals( -1 );
            arr.$findLastNotIndex( { arr: 0 }, Object.$equals, 2 ).should.equals( 2 );
            // Pass in an array for lookup
            arr.$findLastNotIndex( [ 'arr', 0 ], 2 ).should.equals( 2 );
            arr.$findLastNotIndex( [ 'arr', 0 ], true, 2 ).should.equals( 2 );
            arr.$findLastNotIndex( [ 'arr', 0 ], false, 2 ).should.equals( -1 );
            arr.$findLastNotIndex( [ 'arr', 0 ], Object.$equals, 2 ).should.equals( 2 );
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$findLastNotIndex([ 'innerHTML', '1' ]).should.equals( 4 );
            div.$find('span').$findLastNotIndex([ 'innerHTML', '2' ]).should.equals( 5 );
            div.$find('span').$findLastNotIndex([ 'innerHTML', '3' ]).should.equals( 5 );
            div.$find('span').$findLastNotIndex({ innerHTML: '1' }).should.equals( 4 );
            div.$find('span').$findLastNotIndex({ innerHTML: '2' }).should.equals( 5 );
            div.$find('span').$findLastNotIndex({ innerHTML: '3' }).should.equals( 5 );

            div.$find('span').$findLastNotIndex( [ 'innerHTML', '3' ], 3 ).should.equals( 1 );
            div.$find('span').$findLastNotIndex( [ 'innerHTML', '2' ], 3 ).should.equals( 3 );
            div.$find('span').$findLastNotIndex( [ 'innerHTML', '1' ], 3 ).should.equals( 3 );
            div.$find('span').$findLastNotIndex( { innerHTML: '3' }, 3 ).should.equals( 1 );
            div.$find('span').$findLastNotIndex( { innerHTML: '2' }, 3 ).should.equals( 3 );
            div.$find('span').$findLastNotIndex( { innerHTML: '1' }, 3 ).should.equals( 3 );
          }
        }
      ]
    }, {
      name: '$findLastNotChunk ( × )',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findLastNotChunk(function( value ){ return value === -4 }), [ 4, 3 ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( value ){ return value === -3 }), [ 4, 3 ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( value ){ return value === -2 }), [ 4, 3 ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( value ){ return value === -1 }), [ 4, 3 ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( value ){ return value }), [ 0, 0 ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( value ){ return value === 0 }), [ 4, 3 ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( value ){ return value === 1 }), [ 4, 3 ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( value ){ return value === 2 }), [ 4, 3 ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( value ){ return value === 3 }), [ 2, 2 ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( value ){ return value === 4 }), [ 4, 3 ] ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findLastNotChunk(function( obj ){ return obj.name }), undefined ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( obj ){ return obj.type }), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( obj ){ return obj.name && obj.type }), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( obj ){ return obj.name == 'zenjs' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( obj ){ return obj.name == 'zenui' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( obj ){ return obj.type == 'js' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk(function( obj ){ return obj.type == 'ui' }), [ 3, arr[3] ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findLastNotChunk({ name: 'xxx' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk({ name: 'zen' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk({ name: 'zenjs' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk({ name: 'zenui' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk({ type: 'js' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk({ type: 'ui' }), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk({ name: 'zenjs', type: 'js' }), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk({ name: 'zenui', type: 'ui' }), [ 3, arr[3] ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findLastNotChunk([ 'name', 'xxx' ]), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk([ 'name', 'zen' ]), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk([ 'name', 'zenjs' ]), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk([ 'name', 'zenui' ]), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk([ 'type', 'js' ]), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk([ 'type', 'ui' ]), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk([ 'name', 'zenjs', 'type', 'js' ]), [ 4, arr[4] ] ).should.true;
            Object.$equals( arr.$findLastNotChunk([ 'name', 'zenui', 'type', 'ui' ]), [ 3, arr[3] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findLastChunk( { arr: 0 } ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, true ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, false ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, Object.$equals ), [ 1, arr[1] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ] ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], true ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], false ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], Object.$equals ), [ 1, arr[1] ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findLastChunk( function( obj ){ return obj.name }, 1 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( function( obj ){ return obj.name == 'zenui' }, 3 ), [ 2, arr[2] ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findLastChunk( { name: 'zen' }, 1 ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { name: 'zenjs' }, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { name: 'zenui' }, 3 ), [ 2, arr[2] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findLastChunk( [ 'name', 'zen' ], 1 ), [ 0, arr[0] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'name', 'zenjs' ], 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'name', 'zenui' ], 3 ), [ 2, arr[2] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findLastChunk( { arr: 0 } ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, true ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, false ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, Object.$equals ), [ 3, arr[3] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ] ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], true ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], false ), [ 3, arr[3] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], Object.$equals ), [ 3, arr[3] ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findLastChunk( { arr: 0 }, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, true, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, false, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findLastChunk( { arr: 0 }, Object.$equals, 2 ), [ 1, arr[1] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], true, 2 ), [ 1, arr[1] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], false, 2 ), [ 2, arr[2] ] ).should.true;
            Object.$equals( arr.$findLastChunk( [ 'arr', 0 ], Object.$equals, 2 ), [ 1, arr[1] ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            div.$find('span').$findLastChunk([ 'innerHTML', '1' ]), [ 5, span6 ]
            div.$find('span').$findLastChunk([ 'innerHTML', '2' ]), [ 4, span5 ]
            div.$find('span').$findLastChunk([ 'innerHTML', '3' ]), [ 3, span4 ]
            div.$find('span').$findLastChunk({ innerHTML: '1' }), [ 5, span6 ]
            div.$find('span').$findLastChunk({ innerHTML: '2' }), [ 4, span5 ]
            div.$find('span').$findLastChunk({ innerHTML: '3' }), [ 3, span4 ]

            div.$find('span').$findLastChunk( [ 'innerHTML', '3' ], 3 ), [ 3, span4 ]
            div.$find('span').$findLastChunk( [ 'innerHTML', '2' ], 3 ), [ 1, span2 ]
            div.$find('span').$findLastChunk( [ 'innerHTML', '1' ], 3 ), [ 0, span1 ]
            div.$find('span').$findLastChunk( { innerHTML: '3' }, 3 ), [ 3, span4 ]
            div.$find('span').$findLastChunk( { innerHTML: '2' }, 3 ), [ 1, span2 ]
            div.$find('span').$findLastChunk( { innerHTML: '1' }, 3 ), [ 0, span1 ]
          }
        }
      ]
    }, {
      name: '$findAllNot ( × )',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findAll(function( value ){ return value === -4 }), [] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === -3 }), [] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === -2 }), [] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === -1 }), [] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value }), [ 1, 2, 3, 3 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 0 }), [ 0 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 1 }), [ 1 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 2 }), [ 2 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 3 }), [ 3, 3 ] ).should.true;
            Object.$equals( arr.$findAll(function( value ){ return value === 4 }), [] ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAll(function( obj ){ return obj.name }), [ { name: 'zen' }, { name: 'zenjs' }, { name: 'zenui' }, { name: 'zenjs', type: 'js' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.type }), [ { name: 'zenjs', type: 'js' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.name && obj.type }), [ { name: 'zenjs', type: 'js' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.name == 'zenjs' }), [ { name: 'zenjs' }, { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.name == 'zenui' }), [ { name: 'zenui' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.type == 'js' }), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll(function( obj ){ return obj.type == 'ui' }), [ { name: 'zenui', type: 'ui' } ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAll({ name: 'xxx' }), [] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zen' }), [ { name: 'zen' } ] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zenjs' }), [ { name: 'zenjs' }, { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zenui' }), [ { name: 'zenui' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll({ type: 'js' }), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll({ type: 'ui' }), [ { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zenjs', type: 'js' }), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll({ name: 'zenui', type: 'ui' }), [ { name: 'zenui', type: 'ui' } ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAll([ 'name', 'xxx' ]), [] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zen' ]), [ { name: 'zen' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zenjs' ]), [ { name: 'zenjs' }, { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zenui' ]), [ { name: 'zenui' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'type', 'js' ]), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'type', 'ui' ]), [ { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zenjs', 'type', 'js' ]), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll([ 'name', 'zenui', 'type', 'ui' ]), [ { name: 'zenui', type: 'ui' } ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAll( { arr: 0 } ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, true ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, false ), [ { arr: false }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, Object.$equals ), [ { arr: 0 } ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAll( [ 'arr', 0 ] ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], true ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], false ), [ { arr: false }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], Object.$equals ), [ { arr: 0 } ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findAll( function( obj ){ return obj.name }, 1 ), [ { name: 'zenjs' }, { name: 'zenui' }, { name: 'zenjs', type: 'js' }, { name: 'zenui', type: 'ui' } ] ).should.true;
            Object.$equals( arr.$findAll( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll( function( obj ){ return obj.name == 'zenui' }, 3 ), [ { name: 'zenui', type: 'ui' } ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findAll( { name: 'zen' }, 1 ), [] ).should.true;
            Object.$equals( arr.$findAll( { name: 'zenjs' }, 2 ), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll( { name: 'zenui' }, 3 ), [ { name: 'zenui', type: 'ui' } ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAll( [ 'name', 'zen' ], 1 ), [] ).should.true;
            Object.$equals( arr.$findAll( [ 'name', 'zenjs' ], 2 ), [ { name: 'zenjs', type: 'js' } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'name', 'zenui' ], 3 ), [ { name: 'zenui', type: 'ui' } ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAll( { arr: 0 } ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, true ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, false ), arr ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, Object.$equals ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAll( [ 'arr', 0 ] ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], true ), [ { arr: 0 }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], false ), arr ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], Object.$equals ), [ { arr: 0 }, { arr: 0 } ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findAll( { arr: 0 }, 2 ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, true, 2 ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, false, 2 ), [ { arr: false }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( { arr: 0 }, Object.$equals, 2 ), [ { arr: 0 } ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAll( [ 'arr', 0 ], 2 ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], true, 2 ), [ { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], false, 2 ), [ { arr: false }, { arr: 0 } ] ).should.true;
            Object.$equals( arr.$findAll( [ 'arr', 0 ], Object.$equals, 2 ), [ { arr: 0 } ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            Object.$equals( div.$find('span').$findAll([ 'innerHTML', '1' ]), [ span1, span6 ] ).should.true;
            Object.$equals( div.$find('span').$findAll([ 'innerHTML', '2' ]), [ span2, span5 ] ).should.true;
            Object.$equals( div.$find('span').$findAll([ 'innerHTML', '3' ]), [ span3, span4 ] ).should.true;
            Object.$equals( div.$find('span').$findAll({ innerHTML: '1' }), [ span1, span6 ] ).should.true;
            Object.$equals( div.$find('span').$findAll({ innerHTML: '2' }), [ span2, span5 ] ).should.true;
            Object.$equals( div.$find('span').$findAll({ innerHTML: '3' }), [ span3, span4 ] ).should.true;

            Object.$equals( div.$find('span').$findAll( [ 'innerHTML', '3' ], 3 ), [ span4 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( [ 'innerHTML', '2' ], 3 ), [ span5 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( [ 'innerHTML', '1' ], 3 ), [ span6 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( { innerHTML: '3' }, 3 ), [ span4 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( { innerHTML: '2' }, 3 ), [ span5 ] ).should.true;
            Object.$equals( div.$find('span').$findAll( { innerHTML: '1' }, 3 ), [ span6 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$findAllNotIndex ( × )',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findAllIndex(function( value ){ return value === -4 }), [] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === -3 }), [] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === -2 }), [] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === -1 }), [] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value }), [ 1, 2, 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 0 }), [ 0 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 1 }), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 2 }), [ 2 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 3 }), [ 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( value ){ return value === 4 }), [] ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.name }), [ 0, 1, 2, 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.type }), [ 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.name && obj.type }), [ 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.name == 'zenjs' }), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.name == 'zenui' }), [ 2, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.type == 'js' }), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex(function( obj ){ return obj.type == 'ui' }), [ 4 ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllIndex({ name: 'xxx' }), [] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zen' }), [ 0 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zenjs' }), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zenui' }), [ 2, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ type: 'js' }), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ type: 'ui' }), [ 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zenjs', type: 'js' }), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex({ name: 'zenui', type: 'ui' }), [ 4 ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllIndex([ 'name', 'xxx' ]), [] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zen' ]), [ 0 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zenjs' ]), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zenui' ]), [ 2, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'type', 'js' ]), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'type', 'ui' ]), [ 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zenjs', 'type', 'js' ]), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex([ 'name', 'zenui', 'type', 'ui' ]), [ 4 ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAllIndex( { arr: 0 } ), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, true ), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, false ), [ 0, 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, Object.$equals ), [ 1 ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ] ), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], true ), [ 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], false ), [ 0, 1 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], Object.$equals ), [ 1 ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findAllIndex( function( obj ){ return obj.name }, 1 ), [ 1, 2, 3, 4 ] ).should.true;
            Object.$equals( arr.$findAllIndex( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( function( obj ){ return obj.name == 'zenui' }, 3 ), [ 4 ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findAllIndex( { name: 'zen' }, 1 ), [] ).should.true;
            Object.$equals( arr.$findAllIndex( { name: 'zenjs' }, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { name: 'zenui' }, 3 ), [ 4 ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAllIndex( [ 'name', 'zen' ], 1 ), [] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'name', 'zenjs' ], 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'name', 'zenui' ], 3 ), [ 4 ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAllIndex( { arr: 0 } ), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, true ), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, false ), [ 0, 1, 2, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, Object.$equals ), [ 1, 3 ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ] ), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], true ), [ 1, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], false ), [ 0, 1, 2, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], Object.$equals ), [ 1, 3 ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findAllIndex( { arr: 0 }, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, true, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, false, 2 ), [ 2, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( { arr: 0 }, Object.$equals, 2 ), [ 3 ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], true, 2 ), [ 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], false, 2 ), [ 2, 3 ] ).should.true;
            Object.$equals( arr.$findAllIndex( [ 'arr', 0 ], Object.$equals, 2 ), [ 3 ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            Object.$equals( div.$find('span').$findAllIndex([ 'innerHTML', '1' ]), [ 0, 5 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex([ 'innerHTML', '2' ]), [ 1, 4 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex([ 'innerHTML', '3' ]), [ 2, 3 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex({ innerHTML: '1' }), [ 0, 5 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex({ innerHTML: '2' }), [ 1, 4 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex({ innerHTML: '3' }), [ 2, 3 ] ).should.true;

            Object.$equals( div.$find('span').$findAllIndex( [ 'innerHTML', '3' ], 3 ), [ 3 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( [ 'innerHTML', '2' ], 3 ), [ 4 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( [ 'innerHTML', '1' ], 3 ), [ 5 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( { innerHTML: '3' }, 3 ), [ 3 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( { innerHTML: '2' }, 3 ), [ 4 ] ).should.true;
            Object.$equals( div.$find('span').$findAllIndex( { innerHTML: '1' }, 3 ), [ 5 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$findAllNotChunk ( × )',
      describe: [
        {
          name: 'Traversing the contents of the collection using a custom method',
          it: function(){
            var arr = [ 0, 1, 2, 3, 3 ];

            Object.$equals( arr.$findAllChunk(function( value ){ return value === -4 }), [] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === -3 }), [] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === -2 }), [] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === -1 }), [] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value }), [ [ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 3 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 0 }), [ [ 0, 0 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 1 }), [ [ 1, 1 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 2 }), [ [ 2, 2 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 3 }), [ [ 3, 3 ], [ 4, 3 ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( value ){ return value === 4 }), [] ).should.true;

            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.name }), [ [ 0, { name: 'zen' } ], [ 1, { name: 'zenjs' } ], [ 2, { name: 'zenui' } ], [ 3, { name: 'zenjs', type: 'js' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.type }), [ [ 3, { name: 'zenjs', type: 'js' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.name && obj.type }), [ [ 3, { name: 'zenjs', type: 'js' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.name == 'zenjs' }), [ [ 1, { name: 'zenjs' } ], [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.name == 'zenui' }), [ [ 2, { name: 'zenui' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.type == 'js' }), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk(function( obj ){ return obj.type == 'ui' }), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
          }
        }, {
          name: 'Incoming object for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllChunk({ name: 'xxx' }), [] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zen' }), [ [ 0, { name: 'zen' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zenjs' }), [ [ 1, { name: 'zenjs' } ], [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zenui' }), [ [ 2, { name: 'zenui' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ type: 'js' }), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ type: 'ui' }), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zenjs', type: 'js' }), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk({ name: 'zenui', type: 'ui' }), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
          }
        }, {
          name: 'Pass in an array for lookup',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            Object.$equals( arr.$findAllChunk([ 'name', 'xxx' ]), [] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zen' ]), [ [ 0, { name: 'zen' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zenjs' ]), [ [ 1, { name: 'zenjs' } ], [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zenui' ]), [ [ 2, { name: 'zenui' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'type', 'js' ]), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'type', 'ui' ]), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zenjs', 'type', 'js' ]), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk([ 'name', 'zenui', 'type', 'ui' ]), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAllChunk( { arr: 0 } ), [ [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, true ), [ [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, false ), [ [ 0, { arr: false } ], [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, Object.$equals ), [ [ 1, { arr: 0 } ] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ] ), [ [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], true ), [ [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], false ), [ [ 0, { arr: false } ], [ 1, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], Object.$equals ), [ [ 1, { arr: 0 } ] ] ).should.true;
          }
        }, {
          name: 'Test the fromIndex parameter',
          it: function(){
            var arr = [
              { name: 'zen' },
              { name: 'zenjs' },
              { name: 'zenui' },
              { name: 'zenjs', type: 'js' },
              { name: 'zenui', type: 'ui' }
            ];

            // Traversing the contents of the collection using a custom method
            Object.$equals( arr.$findAllChunk( function( obj ){ return obj.name }, 1 ), [ [ 1, { name: 'zenjs' } ], [ 2, { name: 'zenui' } ], [ 3, { name: 'zenjs', type: 'js' } ], [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( function( obj ){ return obj.name == 'zenjs' }, 2 ), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( function( obj ){ return obj.name == 'zenui' }, 3 ), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;

            // Incoming object for lookup
            Object.$equals( arr.$findAllChunk( { name: 'zen' }, 1 ), [] ).should.true;
            Object.$equals( arr.$findAllChunk( { name: 'zenjs' }, 2 ), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { name: 'zenui' }, 3 ), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;

            // Pass in an array for lookup
            Object.$equals( arr.$findAllChunk( [ 'name', 'zen' ], 1 ), [] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'name', 'zenjs' ], 2 ), [ [ 3, { name: 'zenjs', type: 'js' } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'name', 'zenui' ], 3 ), [ [ 4, { name: 'zenui', type: 'ui' } ] ] ).should.true;
          }
        }, {
          name: 'Test the predicate parameter and fromIndex parameter',
          it: function(){
            var arr = [
              { arr: false },
              { arr: 0 },
              { arr: false },
              { arr: 0 }
            ];

            // Incoming object for lookup
            Object.$equals( arr.$findAllChunk( { arr: 0 } ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, true ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, false ), arr.map(function( obj, index ){ return [ index, obj ] }) ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, Object.$equals ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ] ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], true ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], false ), arr.map(function( obj, index ){ return [ index, obj ] }) ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], Object.$equals ), [ [ 1, { arr: 0 } ], [ 3, { arr: 0 } ] ] ).should.true;


            // Incoming object for lookup
            Object.$equals( arr.$findAllChunk( { arr: 0 }, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, true, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, false, 2 ), [ [ 2, { arr: false } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( { arr: 0 }, Object.$equals, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            // Pass in an array for lookup
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], true, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], false, 2 ), [ [ 2, { arr: false } ], [ 3, { arr: 0 } ] ] ).should.true;
            Object.$equals( arr.$findAllChunk( [ 'arr', 0 ], Object.$equals, 2 ), [ [ 3, { arr: 0 } ] ] ).should.true;
          }
        }, {
          name: 'Find non-pure objects in an array',
          it: function(){
            var div = window.div;
            var span1 = window.span.$appendTo( div ).$html( '1' );
            var span2 = window.span.$appendTo( div ).$html( '2' );
            var span3 = window.span.$appendTo( div ).$html( '3' );
            var span4 = window.span.$appendTo( div ).$html( '3' );
            var span5 = window.span.$appendTo( div ).$html( '2' );
            var span6 = window.span.$appendTo( div ).$html( '1' );

            Object.$equals( div.$find('span').$findAllChunk([ 'innerHTML', '1' ]), [ [ 0, span1 ], [ 5, span6 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk([ 'innerHTML', '2' ]), [ [ 1, span2 ], [ 4, span5 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk([ 'innerHTML', '3' ]), [ [ 2, span3 ], [ 3, span4 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk({ innerHTML: '1' }), [ [ 0, span1 ], [ 5, span6 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk({ innerHTML: '2' }), [ [ 1, span2 ], [ 4, span5 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk({ innerHTML: '3' }), [ [ 2, span3 ], [ 3, span4 ] ] ).should.true;

            Object.$equals( div.$find('span').$findAllChunk( [ 'innerHTML', '3' ], 3 ), [ [ 3, span4 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( [ 'innerHTML', '2' ], 3 ), [ [ 4, span5 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( [ 'innerHTML', '1' ], 3 ), [ [ 5, span6 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( { innerHTML: '3' }, 3 ), [ [ 3, span4 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( { innerHTML: '2' }, 3 ), [ [ 4, span5 ] ] ).should.true;
            Object.$equals( div.$find('span').$findAllChunk( { innerHTML: '1' }, 3 ), [ [ 5, span6 ] ] ).should.true;
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
      name: '$set',
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
            Object.$equals( [ 1, 2, 3 ].$set( 3, 6 ), [ 1, 2, 3, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( 4, 6 ), [ 1, 2, 3, undefined, 6 ] ).should.true;
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
            Object.$equals( [ 1, 2, 3 ].$set( { '3': 6 } ), [ 1, 2, 3, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$set( { '4': 6 } ), [ 1, 2, 3, undefined, 6 ] ).should.true;
          }
        }
      ]
    }, {
      name: '$edit',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            Object.$equals( [ 1, 2, 3 ].$edit( -5, 6 ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( -4, 6 ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( -3, 6 ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( -2, 6 ), [ 1, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( -1, 6 ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( 0, 6 ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( 1, 6 ), [ 1, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( 2, 6 ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( 3, 6 ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( 4, 6 ), [ 1, 2, 6 ] ).should.true;
          }
        }, {
          name: 'Batch setting',
          it: function(){
            Object.$equals( [ 1, 2, 3 ].$edit( { '-5': 6 } ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( { '-4': 6 } ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( { '-3': 6 } ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( { '-2': 6 } ), [ 1, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( { '-1': 6 } ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( { '0': 6 } ), [ 6, 2, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( { '1': 6 } ), [ 1, 6, 3 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( { '2': 6 } ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( { '3': 6 } ), [ 1, 2, 6 ] ).should.true;
            Object.$equals( [ 1, 2, 3 ].$edit( { '4': 6 } ), [ 1, 2, 6 ] ).should.true;
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
    }, {
      name: '$push',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            var arr = [ 1, 2, 3, 4, 5 ];
    
            arr.$push( 6 ).should.equals( arr );
            Object.$equals( arr, [ 1, 2, 3, 4, 5, 6 ] )
          }
        }
      ]
    }, {
      name: '$pop',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            var arr = [ 1, 2, 3, 4, 5 ];

            arr.$pop().should.equals( arr );
            Object.$equals( arr, [ 1, 2, 3, 4 ] );
          }
        }
      ]
    }, {
      name: '$unshift',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            var arr = [ 1, 2, 3, 4, 5 ];

            arr.$unshift( 0 ).should.equals( arr );
            Object.$equals( arr, [ 0, 1, 2, 3, 4 ] );
          }
        }
      ]
    }, {
      name: '$shift',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            var arr = [ 1, 2, 3, 4, 5 ];

            arr.$shift().should.equals( arr );
            Object.$equals( arr, [ 2, 3, 4, 5 ] );
          }
        }
      ]
    }, {
      name: '$splice',
      'default': function(){
        var arr = [ 1, 2, 3, 4, 5 ];

        arr.$splice( 1, 1 ).should.equals( arr );
        Object.$equals( arr, [ 1, 3, 4, 5 ] );
      }
    }
  ]
});