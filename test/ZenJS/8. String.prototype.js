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
        }
      ]
    }, {
      name: '$toCapitalize',
      describe: [
        {
          name: 'Capitalization, other lowercase',
          it: function(){
            '123'.$toCapitalize().should.equals( '123' );
            'zen'.$toCapitalize().should.equals( 'Zen' );
            'zEN'.$toCapitalize().should.equals( 'Zen' );
          }
        }, {
          name: 'Just capitalize the first letter',
          it: function(){
            '123'.$toCapitalize( true ).should.equals( '123' );
            'zen'.$toCapitalize( true ).should.equals( 'Zen' );
            'zEN'.$toCapitalize( true ).should.equals( 'ZEN' );
          }
        }
      ]
    }
  ]
});