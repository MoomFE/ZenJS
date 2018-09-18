describes.push({
  name: 'Document',
  describe: [
    {
      name: '$id',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            document.$id.should.equals( document.getElementById );
          }
        }
      ]
    }, {
      name: '$ready',
      describe: [
        {
          name: 'Normal use',
          it: function(){
            document.$ready(function(){
              document.readyState.should.equals('complete')
            });
          }
        }
      ]
    }
  ]
});