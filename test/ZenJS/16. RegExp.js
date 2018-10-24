describes.push({
  name: 'RegExp',
  describe: [
    {
      name: '$parse',
      default: function(){
        Object.$equals( RegExp.$parse('()'), /\(\)/ ).should.true;
        Object.$equals( RegExp.$parse('\\'), /\\/ ).should.true;
        Object.$equals( RegExp.$parse('^[\\]$'), /\^\[\\\]\$/ ).should.true;
        Object.$equals( RegExp.$parse('.*+?|()[]{}^$\\'), /\.\*\+\?\|\(\)\[\]\{\}\^\$\\/ ).should.true;

        Object.$equals( RegExp.$parse('()','g'), /\(\)/g ).should.true;
        Object.$equals( RegExp.$parse('\\','g'), /\\/g ).should.true;
        Object.$equals( RegExp.$parse('^[\\]$','g'), /\^\[\\\]\$/g ).should.true;
        Object.$equals( RegExp.$parse('.*+?|()[]{}^$\\','g'), /\.\*\+\?\|\(\)\[\]\{\}\^\$\\/g ).should.true;
      }
    }
  ]
});