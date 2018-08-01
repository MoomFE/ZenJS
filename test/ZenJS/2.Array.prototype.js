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
    }


    // {
    //   name: '$deleteValue',
    //   it: function(){
    //     [ 1, 2, 3, 4 ].$deleteValue( 4 ).length.should.equals( 3 );
    //     Array.$create( 10 ).$deleteValue( undefined ).length.should.equals( 0 );
    //     Array.$create( 10, null ).concat( Array.$create( 10, 0 ) ).$deleteValue( false ).length.should.equals( 20 );
    //     Array.$create( 10, null ).concat( Array.$create( 10, 0 ) ).$deleteValue( false, false ).length.should.equals( 10 );
    //   }
    // }, {
    //   name: '$equals',
    //   it: function(){
    //     [].$equals( ZenJS ).should.false;
    //     [ 1, 2, 3 ].$equals( [ 3, 2, 1 ] ).should.false;
    //     [].$equals([]).should.true;
    //     [ 1, 2, 3 ].$equals( [ 1, 2, 3 ] ).should.true;
    //   }
    // }, {
    //   name: '$get',
    //   it: function(){
    //     [ 0, 1, 2, 3, 4, 5 ].$get().should.equals( 0 );
    //     [ 0, 1, 2, 3, 4, 5 ].$get( 2 ).should.equals( 2 );
    //     [ 0, 1, 2, 3, 4, 5 ].$get( -1 ).should.equals( 5 );
    //     [ 0, 1, 2, 3, 4, 5 ].$get( -2 ).should.equals( 4 );
    //     [ 0, 1, 2, 3, 4, 5 ].$get( -3 ).should.equals( 3 );
    //     [ 0, 1, 2, 3, 4, 5 ].$get( -4 ).should.equals( 2 );
    //     [ 0, 1, 2, 3, 4, 5 ].$get( -5 ).should.equals( 1 );
    //     [ 0, 1, 2, 3, 4, 5 ].$get( -6 ).should.equals( 0 );
    //     [ 0, 1, 2, 3, 4, 5 ].$get( -7 ).should.equals( 0 );
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( 2, undefined ), [ 2 ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( 0, 3 ), [ 0, 1, 2 ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( 2, 3 ), [ 2, 3, 4 ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( -1, 0 ), [ ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( -3, 2 ), [ 3, 4 ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( -1, 99 ), [ 5 ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( -2, 99 ), [ 4, 5 ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( -3, 99 ), [ 3, 4, 5 ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( -4, 99 ), [ 2, 3, 4, 5 ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( -5, 99 ), [ 1, 2, 3, 4, 5  ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( -6, 99 ), [ 0, 1, 2, 3, 4, 5 ] ).should.true;
    //     Object.$equals( [ 0, 1, 2, 3, 4, 5 ].$get( -7, 99 ), [ 0, 1, 2, 3, 4, 5 ] ).should.true;
    //   }
    // }, {
    //   name: '$inArray',
    //   it: function(){
    //     [ 1, 2, 3 ].$inArray( 1 ).should.true;
    //     [ 1, 2, 3 ].$inArray( 0 ).should.false;
    //     [ '' ].$inArray( false ).should.true;
    //     [ undefined ].$inArray( null ).should.true;
    //   }
    // }, {
    //   name: '$find',
    //   it: function(){
    //     var keys = [
    //       { name: 'zen' },
    //       { name: 'zenjs' },
    //       { name: 'zenjs', type: 'js' },
    //       { name: 'zenui', type: 'ui' }
    //     ];

    //     Object.$equals( keys.$find( 'name' ), keys[0] ).should.true;
    //     Object.$equals( keys.$find( 'name', 'zenjs' ), keys[1] ).should.true;
    //     Object.$equals( keys.$find( 'name', 'zenjs', 'type', 'js' ), keys[2] ).should.true;
    //     Object.$equals( keys.$find( 'type' ), keys[2] ).should.true;
    //     Object.$equals( keys.$find( 'type', 'js' ), keys[2] ).should.true;
    //     Object.$equals( keys.$find( 'type', 'ui' ), keys[3] ).should.true;

    //     Object.$equals( keys.$find( [ 'name' ] ), keys[0] ).should.true;
    //     Object.$equals( keys.$find( [ 'name', 'zenjs' ] ), keys[1] ).should.true;
    //     Object.$equals( keys.$find( [ 'name', 'zenjs', 'type', 'js' ] ), keys[2] ).should.true;
    //     Object.$equals( keys.$find( [ 'type' ] ), keys[2] ).should.true;
    //     Object.$equals( keys.$find( [ 'type', 'js' ] ), keys[2] ).should.true;
    //     Object.$equals( keys.$find( [ 'type', 'ui' ] ), keys[3] ).should.true;

    //     Object.$equals( keys.$find( { name: 'zen' } ), keys[0] ).should.true;
    //     Object.$equals( keys.$find( { name: 'zenjs' } ), keys[1] ).should.true;
    //     Object.$equals( keys.$find( { name: 'zenjs', type: 'js' } ), keys[2] ).should.true;
    //     Object.$equals( keys.$find( { type: 'js' } ), keys[2] ).should.true;
    //     Object.$equals( keys.$find( { type: 'ui' } ), keys[3] ).should.true;
    //   }
    // }, {
    //   name: '$findIndex',
    //   it: function(){
    //     var keys = [
    //       { name: 'zen' },
    //       { name: 'zenjs' },
    //       { name: 'zenjs', type: 'js' },
    //       { name: 'zenui', type: 'ui' }
    //     ];

    //     keys.$findIndex( 'name' ).should.equals( 0 );
    //     keys.$findIndex( 'name', 'zenjs' ).should.equals( 1 );
    //     keys.$findIndex( 'name', 'zenjs', 'type', 'js' ).should.equals( 2 );
    //     keys.$findIndex( 'type' ).should.equals( 2 );
    //     keys.$findIndex( 'type', 'js' ).should.equals( 2 );
    //     keys.$findIndex( 'type', 'ui' ).should.equals( 3 );

    //     keys.$findIndex( [ 'name' ] ).should.equals( 0 );
    //     keys.$findIndex( [ 'name', 'zenjs' ] ).should.equals( 1 );
    //     keys.$findIndex( [ 'name', 'zenjs', 'type', 'js' ] ).should.equals( 2 );
    //     keys.$findIndex( [ 'type' ] ).should.equals( 2 );
    //     keys.$findIndex( [ 'type', 'js' ] ).should.equals( 2 );
    //     keys.$findIndex( [ 'type', 'ui' ] ).should.equals( 3 );

    //     keys.$findIndex( { name: 'zen' } ).should.equals( 0 );
    //     keys.$findIndex( { name: 'zenjs' } ).should.equals( 1 );
    //     keys.$findIndex( { name: 'zenjs', type: 'js' } ).should.equals( 2 );
    //     keys.$findIndex( { type: 'js' } ).should.equals( 2 );
    //     keys.$findIndex( { type: 'ui' } ).should.equals( 3 );
    //   }
    // }, {
    //   name: '$set',
    //   it: function(){
    //     Object.$equals( [ 1, 2, 3 ].$set( 0, 4 ), [ 4, 2, 3 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$set( 1, 4 ), [ 1, 4, 3 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$set( 2, 4 ), [ 1, 2, 4 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$set( -1, 4 ), [ 1, 2, 4 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$set( -2, 4 ), [ 1, 4, 3 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$set( -3, 4 ), [ 4, 2, 3 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$set( -4, 4 ), [ 4, 2, 3 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$set({ 0: 5, 1: 6, 2: 7 }), [ 5, 6, 7 ] ).should.true;
    //   }
    // }, {
    //   name: '$move',
    //   it: function(){
    //     Object.$equals( [ 1, 2, 3 ].$move( 0, 1 ), [ 2, 1, 3 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$move( 0, 2 ), [ 2, 3, 1 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$move( 1, 2 ), [ 1, 3, 2 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$move( -1, 0 ), [ 3, 1, 2 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$move( -2, 0 ), [ 2, 1, 3 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$move( 0, -1 ), [ 2, 3, 1 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$move( 0, -2 ), [ 2, 1, 3 ] ).should.true;
    //     Object.$equals( [ 1, 2, 3 ].$move( 1, -1 ), [ 1, 3, 2 ] ).should.true;
    //   }
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