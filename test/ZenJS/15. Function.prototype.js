describes.push({
  name: 'Function.prototype',
  describe: [
    {
      name: '$after',
      describe: [
        {
          name: 'If not passed, the default is 1',
          it: function(){
            var index = 0;
            var func = function(){ index++ }.$after();
    
            func();
            index.should.equals( 0 );
            func();
            index.should.equals( 1 );
            func();
            index.should.equals( 2 );
          }
        }, {
          name: 'Normal use',
          it: function(){
            var index = 0;
            var func = function(){ index++ }.$after( 3 );

            func();
            index.should.equals( 0 );
            func();
            index.should.equals( 0 );
            func();
            index.should.equals( 0 );
            func();
            index.should.equals( 1 );
          }
        }
      ]
    }, {
      name: '$args',
      describe: [
        {
          name: 'Define start bit parameters in advance',
          it: function(){
            function _add( num, num2 ){
              return Math.$add( num, num2 );
            }

            var add1 = _add.$args({ 0: 1 });
            var add2 = _add.$args({ 0: 1, 1: 2 });

            add1( 5 ).should.equals( 6 );
            add2( 5 ).should.equals( 3 );
            add2().should.equals( 3 );
          }
        }, {
          name: 'Define start bit parameters in advance ( 2 )',
          it: function(){
            function math( func, num1, num2 ){
              return Math[ func ]( num1, num2 );
            }

            var jia = math.$args({ 0: '$jia' });
            var jian = math.$args({ 0: '$jian' });
            var cheng = math.$args({ 0: '$cheng' });
            var chu = math.$args({ 0: '$chu' });

            jia( 0.2, 0.1 ).should.equals( 0.3 );
            jian( 0.3, 0.1 ).should.equals( 0.2 );
            cheng( 0.2, 0.1 ).should.equals( 0.02 );
            chu( 33.77, 10 ).should.equals( 3.377 );
          }
        }, {
          name: 'Define the end bit parameter in advance',
          it: function(){
            function math( func, num1, num2 ){
              return Math[ func ]( num1, num2 );
            }

            var math1 = math.$args({ 1: 0.2, 2: 0.1 });
            var math2 = math.$args({ 1: 0.3, 2: 0.1 });
            var math3 = math.$args({ 1: 0.2, 2: 0.1 });
            var math4 = math.$args({ 1: 33.77, 2: 10 });

            math1( '$jia' ).should.equals( 0.3 );
            math2( '$jian' ).should.equals( 0.2 );
            math3( '$cheng' ).should.equals( 0.02 );
            math4( '$chu' ).should.equals( 3.377 );
          }
        }, {
          name: 'Define any bit parameter in advance',
          it: function(){
            function math( func, num1, none, num2 ){
              return Math[ func ]( num1, num2 );
            }

            var math1 = math.$args({ 1: 0.2, 3: 0.1 });
            var math2 = math.$args({ 1: 0.3, 3: 0.1 });
            var math3 = math.$args({ 1: 0.2, 3: 0.1 });
            var math4 = math.$args({ 1: 33.77, 3: 10 });

            math1( '$jia', null ).should.equals( 0.3 );
            math2( '$jian', null ).should.equals( 0.2 );
            math3( '$cheng', null ).should.equals( 0.02 );
            math4( '$chu', null ).should.equals( 3.377 );

            math1( '$jia' ).should.equals( 0.3 );
            math2( '$jian' ).should.equals( 0.2 );
            math3( '$cheng' ).should.equals( 0.02 );
            math4( '$chu' ).should.equals( 3.377 );
          }
        }
      ]
    }, {
      name: '$one / $once',
      describe: [
        {
          name: 'If not passed, the default is 1',
          it: function(){
            var index = 0;
            var func = function(){ index++ }.$one();

            func();
            index.should.equals( 1 );
            func();
            index.should.equals( 1 );
          }
        }, {
          name: 'Incoming parameters',
          it: function(){
            var index = 0;
            var func = function(){ index++ }.$one( 2 );

            func();
            index.should.equals( 0 );
            func();
            index.should.equals( 1 );
            func();
            index.should.equals( 1 );
          }
        }
      ]
    }
  ]
});