!function(){

  var isLowBrowser = true;
  var div = document.createElement('div');

  div.addEventListener( 'click', function(){
    isLowBrowser = false;
  });
  div.click();

  if( isLowBrowser ){
    Object.defineProperty( window, '$div', {
      get: function(){
        var parent = document.createElement('mark');
        var div = document.createElement('div');
        return parent.appendChild( div );
      }
    });
  }else{
    Object.defineProperty( window, '$div', {
      get: function(){
        return document.createElement('div');
      }
    });
  }

  Object.defineProperty( window, 'div', {
    get: function(){
      return document.createElement('div');
    }
  });

  Object.defineProperty( window, 'span', {
    get: function(){
      return document.createElement('span');
    }
  });

  Object.defineProperty( window, 'a', {
    get: function(){
      return document.createElement('a');
    }
  });

  Object.defineProperty( window, 'input', {
    get: function(){
      return document.createElement('input');
    }
  });

  Object.defineProperty( window, 'select', {
    get: function(){
      return document.createElement('select');
    }
  });

  Object.defineProperty( window, 'option', {
    get: function(){
      return document.createElement('option');
    }
  });

}();

var toString = function( obj ){
  return this.call( obj );
}.bind(
  {}.toString
);

function isUndef( obj ){
  return obj === undefined;
}
function isNull( obj ){
  return obj === null;
}
function isLikeNull( obj ){
  return obj == null;
}
function isEqual( first, second ){
  return first === second;
}
function isElement( elem ){
  return toString( elem ) === '[object HTMLDivElement]';
}
function isWindow( obj ){
  return obj != null && obj === obj.window;
}
function compare( num, min, max ){
  return num >= min && num <= max;
}

var describes = [];