Object.defineProperty( window, 'div', {
  get: () => {
    return document.createElement('div');
  }
});

!function(){

  const toString = function( obj ){
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

  const describes = [];

/* #region */

  // describes.push({
  //   name: '[ window, document, Element.prototype ].[ $data, $hasData, $deleteData ]',
  //   describe: [
  //     {
  //       name: 'Element.prototype.[ $data, $hasData, $deleteData ]',
  //       describe: () => {
  //         it( '$data', () => {
  //           // 存储数据返回对象本身
  //           isElement( div.$data('Data','div') ).should.equal( true );
  //           isElement( div.$data({Data:'div'}) ).should.equal( true );
  //           isElement( div.$data({Data:'div'},true) ).should.equal( true );
  //           // 有对应数据返回对应数据
  //           div.$data('Data','div').$data('Data').should.equal( 'div' );
  //           // 无对应数据时返回 undefined
  //           isUndef( div.$data('noData') ).should.equal( true );
  //           // 未传入数据名, 返回全部数据集
  //           JSON.stringify( div.$data('Data','div').$data() ).should.equal( '{"Data":"div"}' );
  //           // 初始化添加方式
  //           div.$data('Data','div').$data('Data','no',true).should.equal( 'div' );
  //           div.$data('Data','yes',true).should.equal( 'yes' );
  //           // 批量添加
  //           JSON.stringify( div.$data({Data1:'div',Data2:'div'}).$data() ).should.equal( '{"Data1":"div","Data2":"div"}' );
  //         });
  //         it( '$hasData', () => {
  //           // 未传入对象则检测是否存过数据
  //           div.$hasData().should.equal( false );
  //           div.$data('Data','div').$hasData().should.equal( true );
  //           // 传入对象检测相应对象
  //           div.$hasData('noData').should.equal( false );
  //           div.$data('Data','div').$hasData('Data').should.equal( true );
  //         });
  //         it( '$deleteData', () => {
  //           // 始终返回自身
  //           isElement( div.$deleteData() ).should.equal( true );
  //           isElement( div.$deleteData('noData') ).should.equal( true );
  //           isElement( div.$deleteData('noData1 noData2') ).should.equal( true );
  //           // 删除单个数据
  //           div.$data('Data','div').$deleteData('Data').$hasData('Data').should.equal( false );
  //           div.$data('Data','div').$deleteData('Data1').$hasData('Data').should.equal( true );
  //           // 删除全部数据
  //           div.$data('Data','div').$deleteData().$hasData().should.equal( false );
  //         });
  //       }
  //     },
  //     function(){
  //       [ window, document ].forEach(( root, index ) => {
  //         describe( `${ index ? 'document' : 'window' }.[ $data, $hasData, $deleteData ]`, () => {
  //           it( '$data', () => {
  //             // 存储数据返回对象本身
  //             root.$data('Data','root').should.equal( root );
  //             root.$data({'Data':'root'}).should.equal( root );
  //             root.$data({'Data':'root'},true).should.equal( root );
  //             // 有对应数据返回对应数据
  //             root.$data('Data').should.equal( 'root' );
  //             // 无对应数据时返回 undefined
  //             isUndef( root.$data('noData') ).should.equal( true );
  //             // 未传入数据名, 返回全部数据集
  //             JSON.stringify( root.$data() ).should.equal( '{"Data":"root"}' );
  //             // 初始化添加方式
  //             root.$data('Data','no',true).should.equal( 'root' );
  //             root.$data('Data1','yes',true).should.equal( 'yes' );
  //             // 批量添加
  //             JSON.stringify( root.$data({'Data':'root','Data1':'yes'}).$data() ).should.equal( '{"Data":"root","Data1":"yes"}' );
  //           });
  //           it( '$hasData', () => {
  //             // 未传入对象则检测是否存过数据
  //             root[ root ] = {};
  //             root.$hasData().should.equal( false );
  //             root.$data('Data','root').$hasData().should.equal( true );
  //             // 传入对象检测相应对象
  //             root.$hasData('noData').should.equal( false );
  //             root.$hasData('Data').should.equal( true );
  //           });
  //           it( '$deleteData', () => {
  //             // 始终返回自身
  //             root.$deleteData().should.equal( root );
  //             root.$deleteData( 'noData' ).should.equal( root );
  //             root.$deleteData( 'noData1 noData2' ).should.equal( root );
  //             // 删除单个数据
  //             div.$data('Data','root').$deleteData('Data').$hasData('Data').should.equal( false );
  //             div.$data('Data','root').$deleteData('Data1').$hasData('Data').should.equal( true );
  //             // 删除全部数据
  //             root.$deleteData().$hasData().should.equal( false );
  //           });
  //         });
  //       });
  //     }
  //   ]
  // });

/* #endregion */

  describes.push({
    name: 'window',
    describe: [
      {
        name: '$ready',
        it: function(){
          // 手动测试的 (*^▽^*)
        }
      }, {
        name: '$typeof',
        it: function(){
          $typeof( undefined ).should.equal( 'undefined' );
          $typeof( null ).should.equal( 'null' );
          $typeof( [] ).should.equal( 'array' );
          $typeof( {} ).should.equal( 'object' );
          $typeof( '' ).should.equal( 'string' );
          $typeof( 123 ).should.equal( 'number' );
          $typeof( true ).should.equal( 'boolean' );
          $typeof( false ).should.equal( 'boolean' );
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
    name: 'Object',
    describe: [
      {
        name: '$isEmptyObject',
        it: function(){
          Object.$isEmptyObject( {} ).should.equal( true );
          Object.$isEmptyObject( { Empty: false } ).should.equal( false );
        }
      }, {
        name: '$isPlainObject',
        it: function(){
          Object.$isPlainObject( {} ).should.equal( true );
          Object.$isPlainObject( Object.create( null ) ).should.equal( true );
          Object.$isPlainObject( div ).should.equal( false );
          Object.$isPlainObject( Element ).should.equal( false );
          Object.$isPlainObject( Element.prototype ).should.equal( false );
        }
      }, {
        name: '$assign',
        it: function(){

          Object.$isPlainObject( Object.$assign() ).should.equal( true );
          Object.$isEmptyObject( Object.$assign() ).should.equal( true );

          var obj1 = {},
              obj2 = { asd: 123 },
              obj3 = { asd: 1234 };

          Object.$assign( obj1 ).should.equal( obj1 )
          Object.$isEmptyObject( Object.$assign( obj1 ) ).should.equal( true );

          Object.$assign( obj1, obj2 ).should.equal( obj1 );
          Object.$isEmptyObject( Object.$assign( obj1, obj2 ) ).should.equal( false );

          Object.$assign( obj1, obj2 ).asd.should.equal( 123 );
          Object.$assign( obj1, obj2, obj3 ).asd.should.equal( 1234 );

          var obj4 = { infiniteLoop: obj5 },
              obj5 = { infiniteLoop: obj4 };

          isUndef( Object.$assign( obj4, obj5 ).infiniteLoop ).should.equal( true );
        }
      }, {
        name: '$create',
        it: function(){
          Object.$isEmptyObject( Object.$create() ).should.equal( true );
          Object.$isPlainObject( Object.$create() ).should.equal( true );
          Object.$isPlainObject( Object.$create( true ) ).should.equal( true );
          Object.$isPlainObject( Object.$create( false ) ).should.equal( true );

          ( Object.getPrototypeOf( Object.$create( true ) ) == null ).should.equal( true );
          ( Object.$create().constructor != null ).should.equal( true );

          var obj1 = { asd: 123 },
              obj2 = { asd: 1234 };

          Object.$create( obj1 ).asd.should.equal( 123 );
          Object.$create( obj1, obj2 ).asd.should.equal( 1234 );
          isEqual( obj1, Object.$create( obj1 ) ).should.equal( false );
        }
      }
    ]
  });

  describes.push({
    name: 'String',
    describe: [
      {
        name: '$toCapitalize',
        it: function(){
          '123'.$toCapitalize().should.equal( '123' );
          'zen'.$toCapitalize().should.equal( 'Zen' );
          'zEN'.$toCapitalize().should.equal( 'Zen' );
        }
      }
    ]
  });

  describes.push({
    name: 'Array',
    describe: [
      {
        name: '$create',
        it: function(){
          Array.$create( 10 ).length.should.equal( 10 );
          Array.$create( true ).length.should.equal( 1 );
          Array.$create( false ).length.should.equal( 0 );
          Array.$create( 1, true )[0].should.equal( true );
          Array.$create( 1, false )[0].should.equal( false );
          Array
            .$create( 10, function( index ){
              return 'ZenJS-' + index
            })
            [ 9 ]
            .should.equal( 'ZenJS-9' )
        }
      }
    ]
  });


  describe( 'ZenJS', function(){
    (function access( next = describes ){
      next.forEach( _describe => {
        if( typeof _describe === 'function' ) return _describe();
        if( _describe.it ) it( _describe.name, _describe.it );
        else if( _describe.describe ){
          describe( _describe.name, () => {
            if( Array.isArray( _describe.describe ) ) access( _describe.describe );
            else _describe.describe();
          });
        };
      });
    })();
  });

}();