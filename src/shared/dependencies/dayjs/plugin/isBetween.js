var index = (function (o, c, d) {
  var proto = c.prototype;

  proto.isBetween = function (a, b) {
    var dA = d(a);
    var dB = d(b);
    return this.isAfter(dA) && this.isBefore(dB) || this.isBefore(dA) && this.isAfter(dB);
  };
});

export default index;
