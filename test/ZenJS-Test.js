Object.defineProperty( window, 'div', {
  get: () => {
    return document.createElement('div');
  }
});

!function(){

  const toString = function( obj ){
    return this.call( obj )
  }.bind(
    {}.toString
  );

  function isUndef( o ){
    return o === undefined;
  }
  function isEqual( first, second ){
    return first == second;
  }
  function isElement( elem ){
    return toString( elem ) === '[object HTMLDivElement]';
  }

  const describes = [];

  describes.push({
    name: '[ window, document, Element.prototype ].[ $data, $hasData, $deleteData ]',
    next: [
      {
        name: 'Element.prototype.[ $data, $hasData, $deleteData ]',
        describe: () => {
          it( '$data', () => {
            // 存储数据返回对象本身
            isElement( div.$data('Data','div') ).should.equal( true );
            isElement( div.$data({Data:'div'}) ).should.equal( true );
            isElement( div.$data({Data:'div'},true) ).should.equal( true );
            // 有对应数据返回对应数据
            div.$data('Data','div').$data('Data').should.equal( 'div' );
            // 无对应数据时返回 undefined
            isUndef( div.$data('noData') ).should.equal( true );
            // 未传入数据名, 返回全部数据集
            JSON.stringify( div.$data('Data','div').$data() ).should.equal( '{"Data":"div"}' );
            // 初始化添加方式
            div.$data('Data','div').$data('Data','no',true).should.equal( 'div' );
            div.$data('Data','yes',true).should.equal( 'yes' );
            // 批量添加
            JSON.stringify( div.$data({Data1:'div',Data2:'div'}).$data() ).should.equal( '{"Data1":"div","Data2":"div"}' );
          });
          it( '$hasData', () => {
            // 未传入对象则检测是否存过数据
            div.$hasData().should.equal( false );
            div.$data('Data','div').$hasData().should.equal( true );
            // 传入对象检测相应对象
            div.$hasData('noData').should.equal( false );
            div.$data('Data','div').$hasData('Data').should.equal( true );
          });
          it( '$deleteData', () => {
            // 始终返回自身
            isElement( div.$deleteData() ).should.equal( true );
            isElement( div.$deleteData('noData') ).should.equal( true );
            isElement( div.$deleteData('noData1 noData2') ).should.equal( true );
            // 删除单个数据
            div.$data('Data','div').$deleteData('Data').$hasData('Data').should.equal( false );
            div.$data('Data','div').$deleteData('Data1').$hasData('Data').should.equal( true );
            // 删除全部数据
            div.$data('Data','div').$deleteData().$hasData().should.equal( false );
          });
        }
      },
      function(){
        [ window, document ].forEach(( root, index ) => {
          describe( `${ index ? 'document' : 'window' }.[ $data, $hasData, $deleteData ]`, () => {
            it( '$data', () => {
              // 存储数据返回对象本身
              root.$data('Data','root').should.equal( root );
              root.$data({'Data':'root'}).should.equal( root );
              root.$data({'Data':'root'},true).should.equal( root );
              // 有对应数据返回对应数据
              root.$data('Data').should.equal( 'root' );
              // 无对应数据时返回 undefined
              isUndef( root.$data('noData') ).should.equal( true );
              // 未传入数据名, 返回全部数据集
              JSON.stringify( root.$data() ).should.equal( '{"Data":"root"}' );
              // 初始化添加方式
              root.$data('Data','no',true).should.equal( 'root' );
              root.$data('Data1','yes',true).should.equal( 'yes' );
              // 批量添加
              JSON.stringify( root.$data({'Data':'root','Data1':'yes'}).$data() ).should.equal( '{"Data":"root","Data1":"yes"}' );
            });
            it( '$hasData', () => {
              // 未传入对象则检测是否存过数据
              root[ root ] = {};
              root.$hasData().should.equal( false );
              root.$data('Data','root').$hasData().should.equal( true );
              // 传入对象检测相应对象
              root.$hasData('noData').should.equal( false );
              root.$hasData('Data').should.equal( true );
            });
            it( '$deleteData', () => {
              // 始终返回自身
              root.$deleteData().should.equal( root );
              root.$deleteData( 'noData' ).should.equal( root );
              root.$deleteData( 'noData1 noData2' ).should.equal( root );
              // 删除单个数据
              div.$data('Data','root').$deleteData('Data').$hasData('Data').should.equal( false );
              div.$data('Data','root').$deleteData('Data1').$hasData('Data').should.equal( true );
              // 删除全部数据
              root.$deleteData().$hasData().should.equal( false );
            });
          });
        });
      }
    ]
  });


  describe( 'ZenJS', function(){
    (function access( next = describes ){
      next.forEach( _describe => {
        if( typeof _describe === 'function' ) return _describe();
        describe( _describe.name, () => {
          if( _describe.next ) access( _describe.next );
          else if( _describe.describe ) _describe.describe();
        });
      });
    })();
  });

}();