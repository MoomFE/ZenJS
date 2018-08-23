'use strict';

var MS = 'millisecond';
var D = 'day';
var W = 'week';
var Y = 'year';

var index = (function (o, c, d) {
  var proto = c.prototype;

  proto.week = function () {
    var endOfYear = this.endOf(Y);

    if (endOfYear.day() !== 6 && this.month() === 11 && 31 - this.date() <= endOfYear.day()) {
      return 1;
    }

    var startOfYear = d(this.$d).startOf(Y);
    var compareDay = startOfYear.subtract(startOfYear.day(), D).subtract(1, MS);
    var diffInWeek = this.diff(compareDay, W, true);
    return Math.ceil(diffInWeek);
  };
});

module.exports = index;
