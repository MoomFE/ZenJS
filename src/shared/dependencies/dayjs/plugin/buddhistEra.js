'use strict';

var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ'; // regex

var index = (function (o, c) {
  // locale needed later
  var proto = c.prototype;
  var oldFormat = proto.format; // extend en locale here

  proto.format = function (formatStr) {
    var _this = this;

    var yearBias = 543;
    var utils = this.$utils();
    var str = formatStr || FORMAT_DEFAULT;
    var result = str.replace(/BBBB|BB/g, function (match) {
      switch (match) {
        case 'BB':
          return utils.padStart(String(_this.$y + yearBias).slice(-2), 2, '0');

        default:
          // BBBB
          return utils.padStart(String(_this.$y + yearBias), 4, '0');
      }
    });
    return oldFormat.bind(this)(result);
  };
});

module.exports = index;
