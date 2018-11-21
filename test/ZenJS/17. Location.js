describes.push({
  name: 'Location',
  describe: [
    {
      name: '$urlSearch',
      describe: [
        {
          name: 'Setter',
          it: function(){
            location.$urlSearch('http://www.zenjs.net/','asd','123').should.equals('http://www.zenjs.net/?asd=123');
            location.$urlSearch('http://www.zenjs.net/#asd','asd','123').should.equals('http://www.zenjs.net/?asd=123#asd');
            location.$urlSearch('http://www.zenjs.net/?#asd','asd','123').should.equals('http://www.zenjs.net/?asd=123#asd');
            location.$urlSearch('http://www.zenjs.net/?sdf=234#asd','asd','123').should.equals('http://www.zenjs.net/?sdf=234&asd=123#asd');
          }
        }, {
          name: 'Getter',
          it: function(){
            location.$urlSearch('http://www.zenjs.net/','asd').should.equals( '' );
            location.$urlSearch('http://www.zenjs.net/?','asd').should.equals( '' );
            location.$urlSearch('http://www.zenjs.net/#asd','asd').should.equals( '' );
            location.$urlSearch('http://www.zenjs.net/#asd=123','asd').should.equals( '' );
            location.$urlSearch('http://www.zenjs.net/?asd=123#asd=123','asd').should.equals( '123' );
            location.$urlSearch('http://www.zenjs.net/?asd=123&sdf=234#asd=123','sdf').should.equals( '234' );
          }
        }
      ]
    }
  ]
});