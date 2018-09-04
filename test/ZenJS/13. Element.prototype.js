describes.push({
  name: 'Element.prototype',
  describe: [
    {
      name: '$addClass',
      default: function(){
        /** @type {Element} */
        var div = window.div;

        div.$addClass('a');
        div.className.should.equals('a');

        div.$addClass('a');
        div.className.should.equals('a');

        div.$addClass('a b c');
        div.className.should.equals('a b c');
      }
    }, {
      name: '$removeClass',
      default: function(){
        /** @type {Element} */
        var div = window.div.$addClass('a b c');

        div.$removeClass('b');
        div.className.should.equals('a c');

        div.$removeClass('a c');
        div.className.should.equals('');
      }
    }, {
      name: '$hasClass',
      default: function(){
        /** @type {Element} */
        var div = window.div.$addClass('a b c');

        div.$hasClass('a').should.true;
        div.$hasClass('b').should.true;
        div.$hasClass('c').should.true;
        div.$hasClass('a b').should.true;
        div.$hasClass('b c').should.true;
        div.$hasClass('a c').should.true;
        div.$hasClass('a b c').should.true;
        div.$hasClass('a c b').should.true;
        div.$hasClass('b a c').should.true;
        div.$hasClass('b c a').should.true;
        div.$hasClass('c a b').should.true;
        div.$hasClass('c b a').should.true;

        div.$hasClass().should.false;
        div.$hasClass('').should.false;
        div.$hasClass('d').should.false;
        div.$hasClass('a d').should.false;
      }
    }, {
      name: '$toggleClass',
      default: function(){
        /** @type {Element} */
        var div = window.div.$addClass('a b c');

        div.$toggleClass('a');
        div.className.should.equals('b c');

        div.$toggleClass('a');
        div.className.should.equals('b c a');

        div.$toggleClass( 'a', true );
        div.className.should.equals('b c a');

        div.$toggleClass( 'a', false );
        div.className.should.equals('b c');

        div.$toggleClass( 'c d' );
        div.className.should.equals('b d');
      }
    }, {
      name: '$is',
      default: function(){
        var div = window.div;

        div.$is( 'div' ).should.true;
        div.$is( div ).should.true;
        div.$is( window.div ).should.false;
        div.$is('#test').should.false;
        div.$is('.test').should.false;
        div.$is('#test.test').should.false;

        div.id = 'test';
        div.className = 'test';

        div.$is('#test').should.true;
        div.$is('.test').should.true;
        div.$is('#test.test').should.true;
      }
    }, {
      name: '$not',
      default: function(){
        var div = window.div;

        div.$not( 'div' ).should.false;
        div.$not( div ).should.false;
        div.$not( window.div ).should.true;
        div.$not('#test').should.true;
        div.$not('.test').should.true;
        div.$not('#test.test').should.true;

        div.id = 'test';
        div.className = 'test';

        div.$not('#test').should.false;
        div.$not('.test').should.false;
        div.$not('#test.test').should.false;
      }
    }, {
      name: '$first / $firstChild',
      default: function(){
        var div = window.div;
        var span = div.appendChild( window.span );
        var a = div.appendChild( window.a );
        var a2 = div.appendChild( window.a ).$set('id','test');

        div.$first().should.equals( span );
        div.$first('*').should.equals( span );
        div.$first('span').should.equals( span );
        div.$first(':first-child').should.equals( span );
        div.$first('a').should.equals( a );
        div.$first('#test').should.equals( a2 );
        
        isLikeNull( div.$first('input') ).should.true;
      }
    }, {
      name: '$last / $lastChild',
      default: function(){
        var div = window.div;
        var span = div.appendChild( window.span );
        var a = div.appendChild( window.a );
        var a2 = div.appendChild( window.a ).$set('id','test');

        div.$last().should.equals( a2 );
        div.$last('*').should.equals( a2 );
        div.$last('a').should.equals( a2 );
        div.$last(':last-child').should.equals( a2 );
        div.$last('#test').should.equals( a2 );
        div.$last('span').should.equals( span );

        isLikeNull( div.$last('input') ).should.true;
      }
    }, {
      name: '$next',
      default: function(){
        var div = window.div;
        var span = div.appendChild( window.span );
        var input = div.appendChild( window.input );
        var a = div.appendChild( window.a );

        span.$next().should.equals( input );
        span.$next('*').should.equals( input );
        span.$next('input').should.equals( input );
        span.$next('a').should.equals( a );

        isLikeNull( span.$next('div') ).should.true;
      }
    }, {
      name: '$prev',
      default: function(){
        var div = window.div;
        var span = div.appendChild( window.span );
        var input = div.appendChild( window.input );
        var a = div.appendChild( window.a );

        a.$prev().should.equals( input );
        a.$prev('*').should.equals( input );
        a.$prev('input').should.equals( input );
        a.$prev('span').should.equals( span );

        isLikeNull( a.$prev('div') ).should.true;
      }
    }, {
      name: '$nextAll',
      default: function(){
        var div = window.div;
        var span = div.appendChild( window.span );
        var input = div.appendChild( window.input );
        var a = div.appendChild( window.a );

        Object.$equals( span.$nextAll(), [ input, a ] ).should.true;
        Object.$equals( span.$nextAll('*'), [ input, a ] ).should.true;
        Object.$equals( span.$nextAll('input'), [ input ] ).should.true;
        Object.$equals( span.$nextAll('a'), [ a ] ).should.true;

        Object.$equals( span.$nextAll('div'), [] ).should.true;
      }
    }, {
      name: '$prevAll',
      default: function(){
        var div = window.div;
        var span = div.appendChild( window.span );
        var input = div.appendChild( window.input );
        var a = div.appendChild( window.a );

        Object.$equals( a.$prevAll(), [ input, span ] ).should.true;
        Object.$equals( a.$prevAll('*'), [ input, span ] ).should.true;
        Object.$equals( a.$prevAll('input'), [ input ] ).should.true;
        Object.$equals( a.$prevAll('span'), [ span ] ).should.true;

        Object.$equals( a.$prevAll('div'), [] ).should.true;
      }
    }, {
      name: '$child / $children',
      default: function(){
        var div = window.div;
        var span = div.appendChild( window.span );
        var input = div.appendChild( window.input );
        var a = div.appendChild( window.a );

        Object.$equals( div.$child(), [ span, input, a ] ).should.true;
        Object.$equals( div.$child('*'), [ span, input, a ] ).should.true;
        Object.$equals( div.$child('span'), [ span ] ).should.true;
        Object.$equals( div.$child('input'), [ input ] ).should.true;
        Object.$equals( div.$child('a'), [ a ] ).should.true;

        Object.$equals( div.$child('div'), [] ).should.true;
      }
    }, {
      name: '$parent',
      default: function(){
        var div = window.div;
        var div2 = div.appendChild( window.div );

        div2.$parent().should.equals( div );
        div2.$parent('*').should.equals( div );
        div2.$parent('div').should.equals( div );

        isLikeNull( div2.$parent('span') ).should.true;
      }
    }, {
      name: '$parents',
      default: function(){
        var div = window.div.$set('id','test');
        var div2 = div.appendChild( window.div );
        var div3 = div2.appendChild( window.div );

        div3.$parents().should.equals( div2 );
        div3.$parents('*').should.equals( div2 );
        div3.$parents('div').should.equals( div2 );
        div3.$parents('#test').should.equals( div );

        isLikeNull( div2.$parents('span') ).should.true;
      }
    }, {
      name: '$siblings',
      default: function(){
        var div = window.div.$set('id','test');
        var div2 = div.appendChild( window.div );
        var div3 = div.appendChild( window.div );
        var span = div.appendChild( window.span );
        var input = div.appendChild( window.input );

        Object.$equals( div2.$siblings(), [ div3, span, input ] ).should.true;
        Object.$equals( div2.$siblings('*'), [ div3, span, input ] ).should.true;
        Object.$equals( div2.$siblings(':last-child'), [ input ] ).should.true;
        Object.$equals( div2.$siblings('div'), [ div3 ] ).should.true;
        Object.$equals( div2.$siblings('span'), [ span ] ).should.true;
        Object.$equals( div2.$siblings('input'), [ input ] ).should.true;
      }
    }, {
      name: '$append',
      default: function(){
        var div = window.div;
        var span = window.span;
        var input = window.input;

        div.$append( span ).$append( input );

        div.$first().should.equals( span );
        div.$last().should.equals( input );
      }
    }, {
      name: '$prepend',
      default: function(){
        var div = window.div;
        var span = window.span;
        var input = window.input;

        div.$prepend( span ).$prepend( input );

        div.$first().should.equals( input );
        div.$last().should.equals( span );
      }
    }, {
      name: '$appendTo',
      default: function(){
        var div = window.div;
        var span = window.span.$appendTo( div );
        var input = window.input.$appendTo( div );

        div.$first().should.equals( span );
        div.$last().should.equals( input );
      }
    }, {
      name: '$prependTo',
      default: function(){
        var div = window.div;
        var span = window.span.$prependTo( div );
        var input = window.input.$prependTo( div );

        div.$first().should.equals( input );
        div.$last().should.equals( span );
      }
    }, {
      name: '$before',
      default: function(){
        var div = window.div;
        var input = window.input;
        var span = window.span.$appendTo( div ).$before( input );

        span.$prev().should.equals( input );
      }
    }, {
      name: '$after',
      default: function(){
        var div = window.div;
        var input = window.input;
        var span = window.span.$appendTo( div ).$after( input );

        span.$next().should.equals( input );
      }
    }, {
      name: '$delete / $remove',
      default: function(){
        var div = window.div;
        var div2 = window.div.$prependTo( div );
        var div3 = window.div.$prependTo( div );

        Object.$equals( div.$child(), [ div2, div3 ] ).should.true;
        div2.$delete();
        Object.$equals( div.$child(), [ div3 ] ).should.true;
      }
    }, {
      name: '$query / $find',
      default: function(){
        Object.$equals( div.$query, div.querySelectorAll ).should.true;
      }
    }, {
      name: '$queryFirst / $findFirst',
      default: function(){
        Object.$equals( div.$queryFirst, div.querySelector ).should.true;
      }
    }, {
      name: '$replaceWith / $replace',
      default: function(){
        var div = window.div;
        var div2 = window.div.$prependTo( div );
        var div3 = window.div;

        div.$first().should.equals( div2 );
        div2.$replace( div3 );
        div.$first().should.equals( div3 );
      }
    }, {
      name: '_nodeName',
      default: function(){
        div._nodeName.should.equals('div');
        a._nodeName.should.equals('a');
        span._nodeName.should.equals('span');
        input._nodeName.should.equals('input');
        select._nodeName.should.equals('select');
        option._nodeName.should.equals('option');
      }
    }, {
      name: '_index',
      default: function(){

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
      name: '_width',
      default: function(){
        var div = window.div;

        div._width.should.equals( 0 );

        div._width = 123;
        div._width.should.equals( 0 );
        div.style.width.should.equals('123px');
      }
    }, {
      name: '_height',
      default: function(){
        var div = window.div;

        div._height.should.equals( 0 );

        div._height = 123;
        div._height.should.equals( 0 );
        div.style.height.should.equals('123px');
      }
    }, {
      name: '_val / _value',
      it: function(){
        var input = window.input;
            input.type = 'text';
        
        input._val.should.equals('');
        input._val = 'ZenJS';
        input._val.should.equals('ZenJS');


        var select = window.select;
        var option1 = select.appendChild( window.option ).$set( '_val', 0 );
        var option2 = select.appendChild( window.option ).$set( '_val', 1 );

        select._val.should.equals('0');

        option2.selected = true;
        select._val.should.equals('1');

        option1._val.should.equals('0');
        option2._val.should.equals('1');


        var select2 = window.select;
            select2.multiple = true;
        var option3 = select2.appendChild( window.option ).$set( '_val', 2 );
        var option4 = select2.appendChild( window.option ).$set( '_val', 3 );

        select2._val = [ '2', '3' ];

        option3.selected.should.true;
        option4.selected.should.true;

        [ '2', '3' ].$equals( select2._val ).should.true;
      }
    }
  ]
});

// describes.push({
//   name: 'Element.prototype',
//   describe: [
//     {
//       name: '_html',
//       it: function(){
//         var div = window.div;
//         div._html = 123;
//         div._html.should.equals('123');
//       }
//     }
//   ]
// });