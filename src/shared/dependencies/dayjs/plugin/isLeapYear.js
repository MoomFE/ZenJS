var index = (function (o, c) {
  var proto = c.prototype;

  proto.isLeapYear = function () {
    return this.$y % 4 === 0 && this.$y % 100 !== 0 || this.$y % 400 === 0;
  };
});

export default index;
