var should = chai.should();

function isUndef( o ){
  return o === undefined;
}
function isEqual( first, second ){
  return first === second;
}

describe( 'ZenJS', () => {

  describe( '[ window, document, Element.prototype ].$data', () => {

    describe( 'Element.prototype.$data', () => {

      const div1 = document.createElement('div'),
            div2 = document.createElement('div');

      it( '$data', () => {
        // 存储数据是返回对象本身
        div2.$data( 'Data', 'div1' ).should.equal( div2 );
        // 有对应数据返回对应数据
        div2.$data( 'Data' ).should.equal( 'div1' );
        // 无对应数据时返回 undefined
        isUndef( div1.$data( 'noData' ) ).should.equal( true );
        // 未传入数据名, 返回全部数据集
        JSON.stringify( div2.$data() ).should.equal( '{"Data":"div1"}' );
      });

      it( '$hasData', () => {
        // 未传入对象则检测是否存过数据
        div1.$hasData().should.equal( false );
        div2.$hasData().should.equal( true );
        // 传入对象检测相应对象
        div1.$hasData( 'noData' ).should.equal( false );
        div2.$hasData( 'Data' ).should.equal( true );
      });

      it( '$deleteData', () => {
        // 始终返回自身
        div1.$deleteData().should.equal( div1 );
        div1.$deleteData( 'noData' ).should.equal( div1 );
        div1.$deleteData( 'noData1 noData2' ).should.equal( div1 );
        // 删除单个数据
        div2.$deleteData( 'noData' ).$hasData( 'Data' ).should.equal( true );
        div2.$deleteData( 'Data' ).$hasData( 'Data' ).should.equal( false );
        // 删除全部数据
        div2.$data( 'Data', 'div2' ).$deleteData().$hasData().should.equal( false );
      });

    });

    [ window, document ].forEach(( root, index ) => {
      describe( `${ index ? 'document' : 'window' }.$data`, () => {

        it( '$data', () => {
          // 存储数据是返回对象本身
          isEqual( root.$data( 'Data', 'root' ), root ).should.equal( true );
          // 有对应数据返回对应数据
          root.$data( 'Data' ).should.equal( 'root' );
          // 无对应数据时返回 undefined
          isUndef( root.$data( 'noData' ) ).should.equal( true );
          // 未传入数据名, 返回全部数据集
          JSON.stringify( root.$data() ).should.equal( '{"Data":"root"}' );
        });

        it( '$hasData', () => {
          root[ root ] = {};

          // 未传入对象则检测是否存过数据
          root.$hasData().should.equal( false );
          root.$data( 'Data', 'root' ).$hasData().should.equal( true );
          // 传入对象检测相应对象
          root.$hasData( 'noData' ).should.equal( false );
          root.$hasData( 'Data' ).should.equal( true );
        });

        it( '$deleteData', () => {
          // 始终返回自身
          isEqual( root.$deleteData(), root ).should.equal( true );
          isEqual( root.$deleteData( 'noData' ), root ).should.equal( true );
          isEqual( root.$deleteData( 'noData1 noData2' ), root ).should.equal( true );
          // 删除单个数据
          root.$data( 'Data', 'root' ).$deleteData( 'noData' ).$hasData( 'Data' ).should.equal( true );
          root.$deleteData( 'Data' ).$hasData( 'Data' ).should.equal( false );
          // 删除全部数据
          root.$data( 'Data', 'root' ).$deleteData().$hasData().should.equal( false );
        });

      });
    });
    

  });
});