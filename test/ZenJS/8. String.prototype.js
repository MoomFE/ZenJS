describes.push({
  name: 'String.prototype',
  describe: [
    {
      name: '$replaceAll',
      describe: [
        {
          name: 'Use string matching',
          it: function(){
            'ZenJS zenjs'.$replaceAll( 'JS', 'UI' ).should.equals( 'ZenUI zenjs' );
          }
        }, {
          name: 'Use regexp matching',
          it: function(){
            'ZenJS zenjs'.$replaceAll( /JS/, 'UI' ).should.equals( 'ZenUI zenjs' );
            'ZenJS zenjs'.$replaceAll( /JS/g, 'UI' ).should.equals( 'ZenUI zenjs' );
            'ZenJS zenjs'.$replaceAll( /JS/i, 'UI' ).should.equals( 'ZenUI zenUI' );
            'ZenJS zenjs'.$replaceAll( /JS/ig, 'UI' ).should.equals( 'ZenUI zenUI' );
          }
        }, {
          name: 'The second parameter has a default value, and the default value is null',
          it: function(){
            'ZenJS zenjs'.$replaceAll( 'JS' ).should.equals( 'Zen zenjs' );
            'ZenJS zenjs'.$replaceAll( /JS/ ).should.equals( 'Zen zenjs' );
            'ZenJS zenjs'.$replaceAll( /JS/g ).should.equals( 'Zen zenjs' );
            'ZenJS zenjs'.$replaceAll( /JS/i ).should.equals( 'Zen zen' );
            'ZenJS zenjs'.$replaceAll( /JS/ig ).should.equals( 'Zen zen' );
          }
        }, {
          name: 'The second parameter can be passed to the method',
          it: function(){
            'ZenJS zenjs'.$replaceAll( 'JS', function(){ return 'UI' } ).should.equals( 'ZenUI zenjs' );
            'ZenJS zenjs'.$replaceAll( /JS/, function(){ return 'UI' } ).should.equals( 'ZenUI zenjs' );
            'ZenJS zenjs'.$replaceAll( /JS/g, function(){ return 'UI' } ).should.equals( 'ZenUI zenjs' );
            'ZenJS zenjs'.$replaceAll( /JS/i, function(){ return 'UI' } ).should.equals( 'ZenUI zenUI' );
            'ZenJS zenjs'.$replaceAll( /JS/ig, function(){ return 'UI' } ).should.equals( 'ZenUI zenUI' );
            'ZenJS zenjs'.$replaceAll( /JS/i, function( str, indexOf ){ return str + ':' + indexOf } ).should.equals( 'ZenJS:3 zenjs:9' )
          }
        }, {
          name: 'When a string is passed in, the keywords within the string are escaped',
          it: function(){
            '.*+?|()[]{}^$\\ .*+?|()[]{}^$\\'.$replaceAll('.*+?|()[]{}^$\\','').should.equals(' ');
          }
        }
      ]
    }, {
      name: '$toCapitalize / $toUpperFirstCase',
      describe: [
        {
          name: 'Capitalization, other lowercase',
          it: function(){
            '123'.$toCapitalize().should.equals( '123' );
            'zen'.$toCapitalize().should.equals( 'Zen' );
            'zEN'.$toCapitalize().should.equals( 'Zen' );
            
            '123'.$toUpperFirstCase().should.equals( '123' );
            'zen'.$toUpperFirstCase().should.equals( 'Zen' );
            'zEN'.$toUpperFirstCase().should.equals( 'Zen' );
          }
        }, {
          name: 'Just capitalize the first letter',
          it: function(){
            '123'.$toCapitalize( true ).should.equals( '123' );
            'zen'.$toCapitalize( true ).should.equals( 'Zen' );
            'zEN'.$toCapitalize( true ).should.equals( 'ZEN' );
            
            '123'.$toUpperFirstCase( true ).should.equals( '123' );
            'zen'.$toUpperFirstCase( true ).should.equals( 'Zen' );
            'zEN'.$toUpperFirstCase( true ).should.equals( 'ZEN' );
          }
        }
      ]
    }, {
      name: '$toLowerFirstCase',
      describe: [
        {
          name: 'Capitalization, other lowercase',
          it: function(){
            '123'.$toLowerFirstCase().should.equals( '123' );
            'Zen'.$toLowerFirstCase().should.equals( 'zEN' );
            'ZEN'.$toLowerFirstCase().should.equals( 'zEN' );
          }
        }, {
          name: 'Just capitalize the first letter',
          it: function(){
            '123'.$toLowerFirstCase( true ).should.equals( '123' );
            'Zen'.$toLowerFirstCase( true ).should.equals( 'zen' );
            'ZEN'.$toLowerFirstCase( true ).should.equals( 'zEN' );
          }
        }
      ]
    }
  ]
});