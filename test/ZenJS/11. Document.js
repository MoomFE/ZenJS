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
    }
  ]
});