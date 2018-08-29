describes.push({
  name: 'Window',
  describe: [
    {
      name: '$ready',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            $ready(function(){
              document.readyState.should.equals('complete')
            });
          }
        }
      ]
    }
  ]
});