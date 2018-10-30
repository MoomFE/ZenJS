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
      }
      else if( _describe['default'] ){
        describe( _describe.name, function(){
          it( 'Normal use', _describe['default'] );
        });
      };
    });
  })();
});