Object.defineProperty( window, 'div', {
  get: function(){
    return document.createElement('div');
  }
});

!function(){

  var toString = function( obj ){
    return this.call( obj );
  }.bind(
    {}.toString
  );

  function isUndef( o ){
    return o === undefined;
  }
  function isEqual( first, second ){
    return first === second;
  }
  function isElement( elem ){
    return toString( elem ) === '[object HTMLDivElement]';
  }
  function isNull( o ){
    return o === null;
  }

  var describes = [];



  describes.push({
    name: 'Array',
    describe: [
      {
        name: '$create',
        it: function(){
          Array.$create( 10 ).length.should.equals( 10 );
          Array.$create( true ).length.should.equals( 1 );
          Array.$create( false ).length.should.equals( 0 );
          Array.$create( 1, true )[0].should.true;
          Array.$create( 1, false )[0].should.false;
          Array
            .$create( 10, function( index ){
              return 'ZenJS-' + index
            })
            [ 9 ]
            .should.equals( 'ZenJS-9' )
        }
      }
    ]
  });

  describes.push({
    name: 'Array.prototype',
    describe: [
      {
        name: '$add',
        it: function(){
          [ 1 ].$add( 0, 0 )[ 0 ].should.equals( 0 );
          [ 1 ].$add( 0, 0 )[ 1 ].should.equals( 1 );
          [ 1 ].$add( 0, 0 ).length.should.equals( 2 );
          [ 5 ].$add( 1, 4, 3, 2, 1 ).length.should.equals( 5 );
        }
      }, {
        name: '$delete',
        it: function(){
          [ 1 ].$delete( 0 ).length.should.equals( 0 );
          [ 0, 1 ].$delete( 0, 2 ).length.should.equals( 0 );
          [ 0, 1, 2 ].$delete( 0, 2 ).length.should.equals( 1 );
          [ 0, 1, 2 ].$delete( 0, 2 )[ 0 ].should.equals( 2 );
        }
      }, {
        name: '$deleteValue',
        it: function(){
          [ 1, 2, 3, 4 ].$deleteValue( 4 ).length.should.equals( 3 );
          Array.$create( 10 ).$deleteValue( undefined ).length.should.equals( 0 );
          Array.$create( 10, null ).concat( Array.$create( 10, 0 ) ).$deleteValue( false ).length.should.equals( 20 );
          Array.$create( 10, null ).concat( Array.$create( 10, 0 ) ).$deleteValue( false, false ).length.should.equals( 10 );
        }
      }, {
        name: '$each',
        it: function(){
          var test1 = [ 1, 2, 3 ].$each(function( value, index, arr ){
            if( index === 0 ) arr[ index ] = 3;
            else if( index === 2 ) arr[ index ] = 1;
          });

          test1[ 0 ].should.equals( 3 );
          test1[ 2 ].should.equals( 1 );


          var test2 = [ 1, 2, 3 ].$each(function( value, index, arr ){
            if( index === 0 ){
              arr[ index ] = 3;
              return false;
            }
            else if( index === 2 ) arr[ index ] = 1;
          });

          test2[ 0 ].should.equals( 3 );
          test2[ 2 ].should.equals( 3 );
        }
      }, {
        name: '$equals',
        it: function(){
          [].$equals( ZenJS ).should.false;
          [ 1, 2, 3 ].$equals( [ 3, 2, 1 ] ).should.false;
          [].$equals([]).should.true;
          [ 1, 2, 3 ].$equals( [ 1, 2, 3 ] ).should.true;
        }
      }, {
        name: '$get',
        it: function(){
          [ 0, 1, 2, 3, 4, 5 ].$get().should.equals( 0 );
          [ 0, 1, 2, 3, 4, 5 ].$get( 2 ).should.equals( 2 );
          [ 0, 1, 2, 3, 4, 5 ].$get( 0, 3 ).length.should.equals( 3 );
          [ 0, 1, 2, 3, 4, 5 ].$get( 2, 3 ).length.should.equals( 3 );
        }
      }, {
        name: '$inArray',
        it: function(){
          [ 1, 2, 3 ].$inArray( 1 ).should.true;
          [ 1, 2, 3 ].$inArray( 0 ).should.false;
          [ '' ].$inArray( false ).should.true;
          [ undefined ].$inArray( null ).should.true;
        }
      }, {
        name: '$set',
        it: function(){
          [ 1, 2, 3 ].$set( 1, 4 )[ 1 ].should.equals( 4 );
          [ 1 ].$set( 1, 2 )[ 1 ].should.equals( 2 );
          [].$set( 1, 1 )[ 1 ].should.equals( 1 );
          [].$set({ 0: 0, 1: 1, 2: 2 }).length.should.equals( 3 );
        }
      }, {
        name: '$push',
        it: function(){
          [ 1 ].$push( 2 ).length.should.equals( 2 );
          [ 1 ].$push( 2 )[ 1 ].should.equals( 2 );
        }
      }, {
        name: '$unshift',
        it: function(){
          [ 1 ].$unshift( 0 ).length.should.equals( 2 );
          [ 1 ].$unshift( 0 )[ 0 ].should.equals( 0 );
        }
      }, {
        name: '$pop',
        it: function(){
          [ 1, 2, 3 ].$pop().length.should.equals( 2 );
          [ 1, 2, 3 ].$pop()[ 1 ].should.equals( 2 );
        }
      }, {
        name: '$shift',
        it: function(){
          [ 1, 2, 3 ].$shift().length.should.equals( 2 );
          [ 1, 2, 3 ].$shift()[ 1 ].should.equals( 3 );
        }
      }
    ]
  });

  describes.push({
    name: 'document',
    describe: [
      {
        name: '$ready',
        it: function(){
          // 手动测试的 (*^▽^*)
        }
      }
    ]
  });

  describes.push({
    name: 'EventTarget',
    describe: [
      {
        name: 'Element.prototype.[ $data, $hasData, $deleteData ]',
        describe: () => {
          it( '$data', () => {
            // 存储数据返回对象本身
            isElement( div.$data('Data','div') ).should.true;
            isElement( div.$data({Data:'div'}) ).should.true;
            isElement( div.$data({Data:'div'},true) ).should.true;
            // 有对应数据返回对应数据
            div.$data('Data','div').$data('Data').should.equals( 'div' );
            // 无对应数据时返回 undefined
            isUndef( div.$data('noData') ).should.true;
            // 未传入数据名, 返回全部数据集
            JSON.stringify( div.$data('Data','div').$data() ).should.equals( '{"Data":"div"}' );
            // 初始化添加方式
            div.$data('Data','div').$data('Data','no',true).should.equals( 'div' );
            div.$data('Data','yes',true).should.equals( 'yes' );
            // 批量添加
            JSON.stringify( div.$data({Data1:'div',Data2:'div'}).$data() ).should.equals( '{"Data1":"div","Data2":"div"}' );
          });
          it( '$hasData', () => {
            // 未传入对象则检测是否存过数据
            div.$hasData().should.false;
            div.$data('Data','div').$hasData().should.true;
            // 传入对象检测相应对象
            div.$hasData('noData').should.false;
            div.$data('Data','div').$hasData('Data').should.true;
          });
          it( '$deleteData', () => {
            // 始终返回自身
            isElement( div.$deleteData() ).should.true;
            isElement( div.$deleteData('noData') ).should.true;
            isElement( div.$deleteData('noData1 noData2') ).should.true;
            // 删除单个数据
            div.$data('Data','div').$deleteData('Data').$hasData('Data').should.false;
            div.$data('Data','div').$deleteData('Data1').$hasData('Data').should.true;
            // 删除全部数据
            div.$data('Data','div').$deleteData().$hasData().should.false;
          });
        }
      },
      function(){
        [ window, document ].forEach(( root, index ) => {
          describe( `${ index ? 'document' : 'window' }.[ $data, $hasData, $deleteData ]`, () => {
            it( '$data', () => {
              // 存储数据返回对象本身
              root.$data('Data','root').should.equals( root );
              root.$data({'Data':'root'}).should.equals( root );
              root.$data({'Data':'root'},true).should.equals( root );
              // 有对应数据返回对应数据
              root.$data('Data').should.equals( 'root' );
              // 无对应数据时返回 undefined
              isUndef( root.$data('noData') ).should.true;
              // 未传入数据名, 返回全部数据集
              JSON.stringify( root.$data() ).should.equals( '{"Data":"root"}' );
              // 初始化添加方式
              root.$data('Data','no',true).should.equals( 'root' );
              root.$data('Data1','yes',true).should.equals( 'yes' );
              // 批量添加
              JSON.stringify( root.$data({'Data':'root','Data1':'yes'}).$data() ).should.equals( '{"Data":"root","Data1":"yes"}' );
            });
            it( '$hasData', () => {
              // 未传入对象则检测是否存过数据
              root[ root ] = {};
              root.$hasData().should.false;
              root.$data('Data','root').$hasData().should.true;
              // 传入对象检测相应对象
              root.$hasData('noData').should.false;
              root.$hasData('Data').should.true;
            });
            it( '$deleteData', () => {
              // 始终返回自身
              root.$deleteData().should.equals( root );
              root.$deleteData( 'noData' ).should.equals( root );
              root.$deleteData( 'noData1 noData2' ).should.equals( root );
              // 删除单个数据
              div.$data('Data','root').$deleteData('Data').$hasData('Data').should.false;
              div.$data('Data','root').$deleteData('Data1').$hasData('Data').should.true;
              // 删除全部数据
              root.$deleteData().$hasData().should.false;
            });
          });
        });
      }
    ]
  });

  describes.push({
    name: 'Math',
    describe: [
      {
        name: '$mean',
        it: function(){
          Math.$mean( 2, 4, 6 ).should.equals( 4 );
          Math.$mean( -1, 1 ).should.equals( 0 );
          Math.$mean( -1, 3 ).should.equals( 1 );
        }
      },
      function(){
        function compare( num, min, max ){
          return num >= min && num <= max;
        }
        it( '$random', function(){
          for( var i = 0; i < 100; i++ ){
            compare( Math.$random(), 0, 9 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( 90 ), 0, 90 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( 36, 126 ), 36, 126 ).should.true;
          }
        });

        it( '$randomPlus', function(){
          for( var i = 0; i < 100; i++ ){
            compare( Math.$random(), 0, 9 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( 90 ), 0, 90 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( 36, 126 ), 36, 126 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( -90 ), -90, 0 ).should.true;
          }
          for( var i = 0; i < 1000; i++ ){
            compare( Math.$random( -36, -126 ), -126, -36 ).should.true;
          }
        });
      }
    ]
  });

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

  describes.push({
    name: 'Object',
    describe: [
      {
        name: '$assign',
        it: function(){

          Object.$isPlainObject( Object.$assign() ).should.true;
          Object.$isEmptyObject( Object.$assign() ).should.true;

          var obj1 = {},
              obj2 = { asd: 123 },
              obj3 = { asd: 1234 };

          Object.$assign( obj1 ).should.equals( obj1 )
          Object.$isEmptyObject( Object.$assign( obj1 ) ).should.true;

          Object.$assign( obj1, obj2 ).should.equals( obj1 );
          Object.$isEmptyObject( Object.$assign( obj1, obj2 ) ).should.false;

          Object.$assign( obj1, obj2 ).asd.should.equals( 123 );
          Object.$assign( obj1, obj2, obj3 ).asd.should.equals( 1234 );

          var obj4 = { infiniteLoop: obj5 },
              obj5 = { infiniteLoop: obj4 };

          isUndef( Object.$assign( obj4, obj5 ).infiniteLoop ).should.true;
        }
      }, {
        name: '$create',
        it: function(){
          Object.$isEmptyObject( Object.$create() ).should.true;
          Object.$isPlainObject( Object.$create() ).should.true;
          Object.$isPlainObject( Object.$create( true ) ).should.true;
          Object.$isPlainObject( Object.$create( false ) ).should.true;

          ( Object.getPrototypeOf( Object.$create( true ) ) == null ).should.true;
          ( Object.$create().constructor != null ).should.true;

          var obj1 = { asd: 123 },
              obj2 = { asd: 1234 };

          Object.$create( obj1 ).asd.should.equals( 123 );
          Object.$create( obj1, obj2 ).asd.should.equals( 1234 );
          isEqual( obj1, Object.$create( obj1 ) ).should.false;
        }
      }, {
        name: '$each',
        it: function(){
          var test1 = Object.$each( { "1": 3, "2": 2, "3": 1 }, function( key, value, obj ){
            switch( key ){
              case "3": obj[ key ] = 3; break;
              case "1": obj[ key ] = 1; break; 
            }
          });

          test1[ "3" ].should.equals( 3 );
          test1[ "1" ].should.equals( 1 );

          var test2 = Object.$each( { "1": 3, "2": 2, "3": 1 }, function( key, value, obj ){
            switch( key ){
              case "3": obj[ key ] = 3; break; 
              case "1": obj[ key ] = 1; 
                        return false;
            }
          });

          test2[ "1" ].should.equals( 1 );
          test2[ "3" ].should.equals( 1 );
        }
      }, {
        name: '$isEmptyObject',
        it: function(){
          Object.$isEmptyObject( {} ).should.true;
          Object.$isEmptyObject( { Empty: false } ).should.false;
        }
      }, {
        name: '$isPlainObject',
        it: function(){
          Object.$isPlainObject( {} ).should.true;
          Object.$isPlainObject( Object.create( null ) ).should.true;
          Object.$isPlainObject( div ).should.false;
          Object.$isPlainObject( Element ).should.false;
          Object.$isPlainObject( Element.prototype ).should.false;
        }
      }
    ]
  });

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

  describes.push({
    name: 'String',
    describe: [
      {
        name: '$random',
        it: function(){
          for( var i = 0; i < 260; i++ ){
            /[a-z]/.test( String.$random() ).should.true;
          }
          for( var i = 0; i < 260; i++ ){
            /[A-Z]/.test( String.$random( true ) ).should.true;
          }
        }
      }, {
        name: '$someRandom',
        it: function(){
          for( var i = 0; i < 260; i++ ){
            /[a-z]+/.test( String.$someRandom() ).should.true;
            String.$someRandom( i ).length.should.equals( i );
          }
          for( var i = 0; i < 260; i++ ){
            /[a-zA-Z]/.test( String.$someRandom( 12, true ) ).should.true;
            String.$someRandom( i, true ).length.should.equals( i );
          }
          for( var i = 0; i < 260; i++ ){
            /[a-zA-Z0-9]/.test( String.$someRandom( 12, true, true ) ).should.true;
            String.$someRandom( i, true, true ).length.should.equals( i );
          }
        }
      }
    ]
  });

  describes.push({
    name: 'String.prototype',
    describe: [
      {
        name: '$toCapitalize',
        it: function(){
          '123'.$toCapitalize().should.equals( '123' );
          'zen'.$toCapitalize().should.equals( 'Zen' );
          'zEN'.$toCapitalize().should.equals( 'Zen' );
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

  describes.push({
    name: 'window',
    describe: [
      {
        name: '$querystring',
        describe: [
          {
            name: 'stringify',
            it: function(){
              $querystring.stringify( { 1: 1 } ).should.equals( '1=1' );
              $querystring.stringify( { zen: window } ).should.equals( 'zen=' );
              $querystring.stringify( { zen: Infinity } ).should.equals( 'zen=' );
              $querystring.stringify( { zen: true } ).should.equals( 'zen=true' );
              $querystring.stringify( { zen: false } ).should.equals( 'zen=false' );
              $querystring.stringify( { 1: 1, 2: 2 } ).should.equals( '1=1&2=2' );

              $querystring.stringify( { 1: 1, 2: 2 }, 'z', 'w' ).should.equals( '1w1z2w2' );
              $querystring.stringify( { 1: 1, 2: 2 }, '1', '2' ).should.equals( '1211222' );
            }
          }, {
            name: 'parse',
            it: function(){
              $querystring.parse( '1=1' )[ 1 ].should.equals( '1' );
              $querystring.parse( '1=2&2=3' )[ 1 ].should.equals( '2' );
              $querystring.parse( '1=2&2=3' )[ 2 ].should.equals( '3' );

              $querystring.parse( '1w1z2w2', 'z', 'w' )[ 1 ].should.equals( '1' );
              $querystring.parse( '1w1z2w2', 'z', 'w' )[ 2 ].should.equals( '2' );
            }
          }
        ]
      }, {
        name: '$ready',
        it: function(){
          // 手动测试的 (*^▽^*)
        }
      }, {
        name: '$typeof',
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
  });





  describe( 'ZenJS', function(){
    (function access( next ){
      ( next || describes ).forEach(function( _describe ){
        if( typeof _describe === 'function' ) return _describe();
        if( _describe.it ) it( _describe.name, _describe.it );
        else if( _describe.describe ){
          describe( _describe.name, function(){
            if( Array.isArray( _describe.describe ) ) access( _describe.describe );
            else _describe.describe();
          });
        };
      });
    })();
  });

}();