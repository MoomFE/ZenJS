var should = chai.should();

describe( 'ZenJS', () => {

  describe( '[ injection ].$data', () => {

    describe( 'Element.prototype.$data', () => {

      const div1 = document.createElement('div'),
            div2 = document.createElement('div');

      it( '$data', () => {
        div2.$data( 'Data', 'div1' ).should.equal( div2 );
        div2.$data( 'Data' ).should.equal( 'div1' );
        JSON.stringify( div2.$data() ).should.equal( '{"Data":"div1"}' )
      });

      it( '$hasData', () => {
        div1.$hasData().should.equal( false );
        div2.$hasData().should.equal( true );
        div1.$hasData('noData').should.equal( false );
        div2.$hasData('Data').should.equal( true );
      });

      it( '$deleteData', () => {
        div1.$deleteData().should.equal( div1 );
        div1.$deleteData('noData').should.equal( div1 );
        div1.$deleteData('noData1 noData2').should.equal( div1 );
        div2.$deleteData('Data').$hasData('Data').should.equal( false );
        div2.$data('Data','div2').$deleteData().$hasData().should.equal( false );
      });

    });

    [ window, document ].forEach(( root, index ) => {

      describe( `${ index ? 'document' : 'window' }.$data`, () => {

      });

    });
    

  });
});