describes.push({
  name: 'Element.prototype',
  describe: [
    {
      name: '_index',
      it: function(){

        var div = window.div;
        var div0 = div.appendChild( window.div );
        var div1 = div.appendChild( window.div );
        var div2 = div.appendChild( window.div );
        var div3 = div.appendChild( window.div );
        var div4 = div.appendChild( window.div );
        var div5 = div.appendChild( window.div );
        var div6 = div.appendChild( window.div );

        // [ div0, div1, div2, div3, div4, div5, div6 ]
        div0._index.should.equals( 0 );
        div1._index.should.equals( 1 );
        div2._index.should.equals( 2 );
        div3._index.should.equals( 3 );
        div4._index.should.equals( 4 );
        div5._index.should.equals( 5 );
        div6._index.should.equals( 6 );

        // [ div1, div0, div2, div3, div4, div5, div6 ]
        div0._index = 1;
        div0._index.should.equals( 1 );
        div1._index.should.equals( 0 );

        // [ div1, div2, div3, div4, div5, div6, div0 ]
        div0._index = 666;
        div0._index.should.equals( 6 );
        div1._index.should.equals( 0 );
        div2._index.should.equals( 1 );
        div3._index.should.equals( 2 );
        div4._index.should.equals( 3 );
        div5._index.should.equals( 4 );
        div6._index.should.equals( 5 );

        // [ div0, div1, div2, div3, div4, div5, div6 ]
        div0._index = 0;
        div0._index.should.equals( 0 );
        div1._index.should.equals( 1 );
        div2._index.should.equals( 2 );
        div3._index.should.equals( 3 );
        div4._index.should.equals( 4 );
        div5._index.should.equals( 5 );
        div6._index.should.equals( 6 );

      }
    }, {
      name: '$addClass',
      it: function(){

        var div = window.div;

        div.$addClass('test1').should.equals( div );
        div.className.should.equals('test1');
        div.$addClass('test1').className.should.equals('test1');
        div.$addClass('test2').className.should.equals('test1 test2');

        div.className = '';
        div.$addClass('test1 test2').className.should.equals('test1 test2');
        div.$addClass('test3').className.should.equals('test1 test2 test3');
        div.$addClass().className.should.equals('test1 test2 test3');
      }
    }, {
      name: '$removeClass',
      it: function(){

        var div = window.div;

        div.$addClass('test1');
        div.$removeClass('test1').should.equals( div );

        div.$addClass('test1 test2');
        div.$removeClass('test2').className.should.equals('test1');

        div.$addClass('test2');
        div.$removeClass('').className.should.equals('test1 test2');

      }
    }, {
      name: '$hasClass',
      it: function(){

        var div = window.div;

        div.$hasClass().should.false;
        div.$hasClass('').should.false;
        div.$hasClass('test1').should.false;

        div.$addClass('test1');
        div.$hasClass('test1').should.true;
        div.$hasClass('test2').should.false;

        div.$addClass('test2');
        div.$hasClass('test1 test2').should.true;
        div.$hasClass('test1 test3').should.false;

      }
    }, {
      name: '$toggleClass',
      it: function(){

        var div = window.div;

        div.$toggleClass().className.should.equals('');
        div.$toggleClass('test1').className.should.equals('test1');
        div.$toggleClass('test1').className.should.equals('');
        div.$toggleClass('test1 test2').className.should.equals('test1 test2');
        div.$removeClass('test1').$toggleClass('test1 test2').className.should.equals('test1');

        div.$toggleClass('test1',true).className.should.equals('test1');
        div.$toggleClass('test2',true).className.should.equals('test1 test2');
        div.$toggleClass('test2',false).className.should.equals('test1');
        div.$toggleClass('test2 test3',true).className.should.equals('test1 test2 test3');

      }
    }, {
      name: '$append',
      it: function(){
        var div = window.div;
        var div1 = div.appendChild( window.div );
        
        div.children.length.should.equals( 1 );
        div.$append( window.div );
        div1._index.should.equals( 0 );
        div.children.length.should.equals( 2 );
      }
    }, {
      name: '$prepend',
      it: function(){
        var div = window.div;
        var div1 = div.appendChild( window.div );
        
        div.children.length.should.equals( 1 );
        div.$prepend( window.div );
        div1._index.should.equals( 1 );
        div.children.length.should.equals( 2 );
      }
    }, {
      name: '$before',
      it: function(){
        var div = window.div;
        var div1 = div.appendChild( window.div );

        div.children.length.should.equals( 1 );
        div1.$before( window.div );
        div1._index.should.equals( 1 );
        div.children.length.should.equals( 2 );
      }
    }, {
      name: '$after',
      it: function(){
        var div = window.div;
        var div1 = div.appendChild( window.div );

        div.children.length.should.equals( 1 );
        div1.$after( window.div );
        div1._index.should.equals( 0 );
        div.children.length.should.equals( 2 );
      }
    }, {
      name: '$child / $children',
      it: function(){

        var div = window.div;
        var span = div.appendChild( window.span );
        var a = div.appendChild( window.a );

        div.$child().$equals([ span, a ]).should.true;
        div.$child('span').$equals([ span ]).should.true;
        div.$child('a').$equals([ a ]).should.true;
        div.$child('div').$equals([]).should.true;

        ( div.$child === div.$children ).should.true;

      }
    }, {
      name: '$first / $firstChild',
      it: function(){

        var div = window.div;
        var span = div.appendChild( window.span );
        var a = div.appendChild( window.a );

        div.$first().should.equals( span );
        div.$first('span').should.equals( span );
        div.$first('a').should.equals( a );
        isNull( div.$first('div') ).should.true;

        ( div.$first === div.$firstChild ).should.true;

      }
    }, {
      name: '$last / $lastChild',
      it: function(){

        var div = window.div;
        var span = div.appendChild( window.span );
        var a = div.appendChild( window.a );

        div.$last().should.equals( a );
        div.$last('span').should.equals( span );
        div.$last('a').should.equals( a );
        isNull( div.$last('div') ).should.true;

        ( div.$last === div.$lastChild ).should.true;

      }
    }, {
      name: '$is',
      it: function(){
        var div1 = div;

        div.$is( div ).should.false;
        div1.$is( div1 ).should.true;

        div.$is( 'span' ).should.false;
        div.$is( 'div' ).should.true;

        div.$is( window ).should.false;
      }
    }, {
      name: '$not',
      it: function(){
        var div1 = div;

        div.$not( div ).should.true;
        div1.$not( div1 ).should.false;

        div.$not( 'span' ).should.true;
        div.$not( 'div' ).should.false;

        div.$not( window ).should.true;
      }
    }, {
      name: '$next',
      it: function(){

        var div = window.div,
            div1 = div.appendChild( window.div ),
            div2 = div.appendChild( window.div ),
            div3 = div.appendChild( window.div.$set( 'id', 'div3' ) );

        div1.$next().should.equals( div2 );
        div1.$next('div').should.equals( div2 );
        div1.$next('#div3').should.equals( div3 );
        isLikeNull( div3.$next() ).should.true;
        isLikeNull( div3.$next('div') ).should.true;
      }
    }, {
      name: '$prev',
      it: function(){

        var div = window.div,
            div1 = div.appendChild( window.div.$set( 'id', 'div3' ) ),
            div2 = div.appendChild( window.div ),
            div3 = div.appendChild( window.div );

        div3.$prev().should.equals( div2 );
        div3.$prev('div').should.equals( div2 );
        div3.$prev('#div3').should.equals( div1 );
        isLikeNull( div1.$prev() ).should.true;
        isLikeNull( div1.$prev('div') ).should.true;

      }
    }, {
      name: '$nextAll',
      it: function(){

        var div = window.div,
            div1 = div.appendChild( window.div.$set( 'id', 'div3' ) ),
            div2 = div.appendChild( window.div ),
            div3 = div.appendChild( window.div );

        Object.$equals( div1.$nextAll(), [ div2, div3 ] ).should.true;
        Object.$equals( div2.$nextAll(), [ div3 ] ).should.true;
        Object.$equals( div3.$nextAll(), [  ] ).should.true;

        Object.$equals( div1.$nextAll('div'), [ div2, div3 ] ).should.true;
        Object.$equals( div2.$nextAll('div'), [ div3 ] ).should.true;
        Object.$equals( div3.$nextAll('div'), [  ] ).should.true;

      }
    }, {
      name: '$prevAll',
      it: function(){

        var div = window.div,
            div1 = div.appendChild( window.div.$set( 'id', 'div3' ) ),
            div2 = div.appendChild( window.div ),
            div3 = div.appendChild( window.div );

        Object.$equals( div3.$prevAll(), [ div1, div2 ] ).should.true;
        Object.$equals( div2.$prevAll(), [ div1 ] ).should.true;
        Object.$equals( div1.$prevAll(), [  ] ).should.true;

        Object.$equals( div3.$prevAll('div'), [ div1, div2 ] ).should.true;
        Object.$equals( div2.$prevAll('div'), [ div1 ] ).should.true;
        Object.$equals( div1.$prevAll('div'), [  ] ).should.true;

      }
    }, {
      name: '$parent',
      it: function(){

        var div = window.div,
            div_div = div.appendChild( window.div ),
            div_span = div.appendChild( span ),
            div_span_a = div_span.appendChild( a );

        isLikeNull( div.$parent() ).should.true;
        div_div.$parent().should.equals( div );
        div_span.$parent().should.equals( div );
        div_span_a.$parent().should.equals( div_span );

        isLikeNull( div.$parent('div') ).should.true;
        isLikeNull( div_span_a.$parent('div') ).should.true;
        div_div.$parent('div').should.equals( div );
        div_span.$parent('div').should.equals( div );

      }
    }, {
      name: '$parents',
      it: function(){

        var div = window.div,
            div_div = div.appendChild( window.div ),
            div_div_div = div_div.appendChild( window.div );

        div.id = 'div';
        div_div.id = 'div_div';

        isLikeNull( div.$parents() ).should.true;
        isLikeNull( div_div.$parents('span') ).should.true;

        div_div.$parents().should.equals( div );
        div_div.$parents('div').should.equals( div );
        div_div_div.$parents('div').should.equals( div_div );
        div_div_div.$parents('#div').should.equals( div );

        // checkSelf
        div_div_div.$parents( null, true ).should.equals( div_div_div );
      }
    }, {
      name: '$query',
      it: function(){
        div.$query.should.equal( div.querySelectorAll );
      }
    }, {
      name: '$queryFirst',
      it: function(){
        div.$queryFirst.should.equal( div.querySelector );
      }
    }, {
      name: '$delete / $remove',
      it: function(){
        var div = window.div;
        var childDiv = div.appendChild( window.div );

        div.children.length.should.equals( 1 );
        childDiv.$remove();
        div.children.length.should.equals( 0 );
      }
    }, {
      name: '$replaceWith / $replace',
      it: function(){
        var div = window.div;
        var div1 = div.appendChild( window.div );
        var div2 = window.div;

        div.$first().should.equals( div1 );
        div1.$replaceWith( div2 );
        div.$first().should.equals( div2 );
      }
    }, {
      name: '$siblings',
      it: function(){

        var div = window.div;
        var div1 = div.appendChild( window.div );
        var div2 = div.appendChild( window.div );
        var span = div.appendChild( window.span );
        var a = div.appendChild( window.a );

        div1.$siblings().$equals([ div2, span, a ]).should.true;
        div1.$siblings('div').$equals([ div2 ]).should.true;
        div1.$siblings('span').$equals([ span ]).should.true;
        div1.$siblings('a').$equals([ a ]).should.true;

        span.$siblings().$equals([ div1, div2, a ]).should.true;
        span.$siblings('div').$equals([ div1, div2 ]).should.true;
        span.$siblings('span').$equals([]).should.true;
        span.$siblings('a').$equals([ a ]).should.true;

      }
    }, {
      name: '$val',
      it: function(){

      }
    }
  ]
});