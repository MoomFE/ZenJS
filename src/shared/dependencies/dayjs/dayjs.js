var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND; // English locales

var MS = 'millisecond';
var S = 'second';
var MIN = 'minute';
var H = 'hour';
var D = 'day';
var W = 'week';
var M = 'month';
var Q = 'quarter';
var Y = 'year';
var DATE = 'date';
var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
var INVALID_DATE_STRING = 'Invalid Date'; // regex

var REGEX_PARSE = /^(\d{4})-?(\d{1,2})-?(\d{0,2})(.*?(\d{1,2}):(\d{1,2}):(\d{1,2}))?.?(\d{1,3})?$/;
var REGEX_FORMAT = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
var en = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
};

var padStart = function padStart(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length) return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};

var padZoneStr = function padZoneStr(negMinuts) {
  var minutes = Math.abs(negMinuts);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return "" + (negMinuts <= 0 ? '+' : '-') + padStart(hourOffset, 2, '0') + ":" + padStart(minuteOffset, 2, '0');
};

var monthDiff = function monthDiff(a, b) {
  // function from moment.js in order to keep the same result
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, 'months');
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), 'months');
  return Number(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};

var absFloor = function absFloor(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};

var prettyUnit = function prettyUnit(u) {
  var special = {
    M: M,
    y: Y,
    w: W,
    d: D,
    h: H,
    m: MIN,
    s: S,
    ms: MS
  };
  return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
};

var isUndefined = function isUndefined(s) {
  return s === undefined;
};

var U = {
  padStart: padStart,
  padZoneStr: padZoneStr,
  monthDiff: monthDiff,
  absFloor: absFloor,
  prettyUnit: prettyUnit,
  isUndefined: isUndefined
};

var L = 'en'; // global locale

var Ls = {}; // global loaded locale

Ls[L] = en;

var isDayjs = function isDayjs(d) {
  return d instanceof Dayjs;
}; // eslint-disable-line no-use-before-define


var parseLocale = function parseLocale(preset, object, isLocal) {
  var l;
  if (!preset) return null;

  if (typeof preset === 'string') {
    if (Ls[preset]) {
      l = preset;
    }

    if (object) {
      Ls[preset] = object;
      l = preset;
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l = name;
  }

  if (!isLocal) L = l;
  return l;
};

var dayjs = function dayjs(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  } // eslint-disable-next-line no-nested-ternary


  var cfg = c ? typeof c === 'string' ? {
    format: c
  } : c : {};
  cfg.date = date;
  return new Dayjs(cfg); // eslint-disable-line no-use-before-define
};

var wrapper = function wrapper(date, instance) {
  return dayjs(date, {
    locale: instance.$L
  });
};

var Utils = U; // for plugin use

Utils.parseLocale = parseLocale;
Utils.isDayjs = isDayjs;
Utils.wrapper = wrapper;

var parseDate = function parseDate(date) {
  var reg;
  if (date === null) return new Date(NaN); // Treat null as an invalid date

  if (Utils.isUndefined(date)) return new Date();
  if (date instanceof Date) return date; // eslint-disable-next-line no-cond-assign

  if (typeof date === 'string' && /.*[^Z]$/i.test(date) // looking for a better way
  && (reg = date.match(REGEX_PARSE))) {
    // 2018-08-08 or 20180808
    return new Date(reg[1], reg[2] - 1, reg[3] || 1, reg[5] || 0, reg[6] || 0, reg[7] || 0, reg[8] || 0);
  }

  return new Date(date); // timestamp
};

var Dayjs =
/*#__PURE__*/
function () {
  function Dayjs(cfg) {
    this.parse(cfg); // for plugin
  }

  var _proto = Dayjs.prototype;

  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg.date);
    this.init(cfg);
  };

  _proto.init = function init(cfg) {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
    this.$L = this.$L || parseLocale(cfg.locale, null, true) || L;
  } // eslint-disable-next-line class-methods-use-this
  ;

  _proto.$utils = function $utils() {
    return Utils;
  };

  _proto.isValid = function isValid() {
    return !(this.$d.toString() === INVALID_DATE_STRING);
  };

  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };

  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };

  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };

  _proto.year = function year() {
    return this.$y;
  };

  _proto.month = function month() {
    return this.$M;
  };

  _proto.day = function day() {
    return this.$W;
  };

  _proto.date = function date() {
    return this.$D;
  };

  _proto.hour = function hour() {
    return this.$H;
  };

  _proto.minute = function minute() {
    return this.$m;
  };

  _proto.second = function second() {
    return this.$s;
  };

  _proto.millisecond = function millisecond() {
    return this.$ms;
  };

  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1000);
  };

  _proto.valueOf = function valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime();
  };

  _proto.startOf = function startOf(units, _startOf) {
    var _this = this;

    // startOf -> endOf
    var isStartOf = !Utils.isUndefined(_startOf) ? _startOf : true;
    var unit = Utils.prettyUnit(units);

    var instanceFactory = function instanceFactory(d, m) {
      var ins = wrapper(new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(D);
    };

    var instanceFactorySet = function instanceFactorySet(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return wrapper(_this.toDate()[method].apply( // eslint-disable-line prefer-spread
      _this.toDate(), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
    };

    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

      case M:
        return isStartOf ? instanceFactory(1, this.$M) : instanceFactory(0, this.$M + 1);

      case W:
        return isStartOf ? instanceFactory(this.$D - this.$W, this.$M) : instanceFactory(this.$D + (6 - this.$W), this.$M);

      case D:
      case DATE:
        return instanceFactorySet('setHours', 0);

      case H:
        return instanceFactorySet('setMinutes', 1);

      case MIN:
        return instanceFactorySet('setSeconds', 2);

      case S:
        return instanceFactorySet('setMilliseconds', 3);

      default:
        return this.clone();
    }
  };

  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };

  _proto.$set = function $set(units, int) {
    var _C$D$C$DATE$C$M$C$Y$C;

    // private set
    var unit = Utils.prettyUnit(units);
    var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = 'setDate', _C$D$C$DATE$C$M$C$Y$C[DATE] = 'setDate', _C$D$C$DATE$C$M$C$Y$C[M] = 'setMonth', _C$D$C$DATE$C$M$C$Y$C[Y] = 'setFullYear', _C$D$C$DATE$C$M$C$Y$C[H] = 'setHours', _C$D$C$DATE$C$M$C$Y$C[MIN] = 'setMinutes', _C$D$C$DATE$C$M$C$Y$C[S] = 'setSeconds', _C$D$C$DATE$C$M$C$Y$C[MS] = 'setMilliseconds', _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === D ? this.$D + (int - this.$W) : int;
    if (this.$d[name]) this.$d[name](arg);
    this.init();
    return this;
  };

  _proto.set = function set(string, int) {
    return this.clone().$set(string, int);
  };

  _proto.add = function add(number, units) {
    var _this2 = this,
        _C$MIN$C$H$C$S$unit;

    number = Number(number); // eslint-disable-line no-param-reassign

    var unit = Utils.prettyUnit(units);

    var instanceFactory = function instanceFactory(u, n) {
      var date = _this2.set(DATE, 1).set(u, n + number);

      return date.set(DATE, Math.min(_this2.$D, date.daysInMonth()));
    };

    var instanceFactorySet = function instanceFactorySet(n) {
      var date = new Date(_this2.$d);
      date.setDate(date.getDate() + n * number);
      return wrapper(date, _this2);
    };

    if (unit === M) {
      return instanceFactory(M, this.$M);
    }

    if (unit === Y) {
      return instanceFactory(Y, this.$y);
    }

    if (unit === D) {
      return instanceFactorySet(1);
    }

    if (unit === W) {
      return instanceFactorySet(7);
    }

    var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1; // ms

    var nextTimeStamp = this.valueOf() + number * step;
    return wrapper(nextTimeStamp, this);
  };

  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };

  _proto.format = function format(formatStr) {
    var _this3 = this;

    if (!this.isValid()) return INVALID_DATE_STRING;
    var str = formatStr || FORMAT_DEFAULT;
    var zoneStr = Utils.padZoneStr(this.$d.getTimezoneOffset());
    var locale = this.$locale();
    var weekdays = locale.weekdays,
        months = locale.months;

    var getShort = function getShort(arr, index, full, length) {
      return arr && arr[index] || full[index].substr(0, length);
    };

    var get$H = function get$H(match) {
      if (_this3.$H === 0) return 12;
      return Utils.padStart(_this3.$H < 13 ? _this3.$H : _this3.$H - 12, match === 'hh' ? 2 : 1, '0');
    };

    return str.replace(REGEX_FORMAT, function (match) {
      if (match.indexOf('[') > -1) return match.replace(/\[|\]/g, '');
      return {
        YY: String(_this3.$y).slice(-2),
        YYYY: String(_this3.$y),
        M: String(_this3.$M + 1),
        MM: Utils.padStart(_this3.$M + 1, 2, '0'),
        MMM: getShort(locale.monthsShort, _this3.$M, months, 3),
        MMMM: months[_this3.$M],
        D: String(_this3.$D),
        DD: Utils.padStart(_this3.$D, 2, '0'),
        d: String(_this3.$W),
        dd: getShort(locale.weekdaysMin, _this3.$W, weekdays, 2),
        ddd: getShort(locale.weekdaysShort, _this3.$W, weekdays, 3),
        dddd: weekdays[_this3.$W],
        H: String(_this3.$H),
        HH: Utils.padStart(_this3.$H, 2, '0'),
        h: get$H(match),
        hh: get$H(match),
        a: _this3.$H < 12 ? 'am' : 'pm',
        A: _this3.$H < 12 ? 'AM' : 'PM',
        m: String(_this3.$m),
        mm: Utils.padStart(_this3.$m, 2, '0'),
        s: String(_this3.$s),
        ss: Utils.padStart(_this3.$s, 2, '0'),
        SSS: Utils.padStart(_this3.$ms, 3, '0'),
        Z: zoneStr
      }[match] || zoneStr.replace(':', ''); // 'ZZ'
    });
  };

  _proto.diff = function diff(input, units, float) {
    var _C$Y$C$M$C$Q$C$W$C$D$;

    var unit = Utils.prettyUnit(units);
    var that = dayjs(input);
    var diff = this - that;
    var result = Utils.monthDiff(this, that);
    result = (_C$Y$C$M$C$Q$C$W$C$D$ = {}, _C$Y$C$M$C$Q$C$W$C$D$[Y] = result / 12, _C$Y$C$M$C$Q$C$W$C$D$[M] = result, _C$Y$C$M$C$Q$C$W$C$D$[Q] = result / 3, _C$Y$C$M$C$Q$C$W$C$D$[W] = diff / MILLISECONDS_A_WEEK, _C$Y$C$M$C$Q$C$W$C$D$[D] = diff / MILLISECONDS_A_DAY, _C$Y$C$M$C$Q$C$W$C$D$[H] = diff / MILLISECONDS_A_HOUR, _C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff / MILLISECONDS_A_MINUTE, _C$Y$C$M$C$Q$C$W$C$D$[S] = diff / MILLISECONDS_A_SECOND, _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff; // milliseconds

    return float ? result : Utils.absFloor(result);
  };

  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(M).$D;
  };

  _proto.$locale = function $locale() {
    // get locale object
    return Ls[this.$L];
  };

  _proto.locale = function locale(preset, object) {
    var that = this.clone();
    that.$L = parseLocale(preset, object, true);
    return that;
  };

  _proto.clone = function clone() {
    return wrapper(this.toDate(), this);
  };

  _proto.toDate = function toDate() {
    return new Date(this.$d);
  };

  _proto.toArray = function toArray() {
    return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms];
  };

  _proto.toJSON = function toJSON() {
    return this.toISOString();
  };

  _proto.toISOString = function toISOString() {
    // ie 8 return
    // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
    // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    return this.$d.toISOString();
  };

  _proto.toObject = function toObject() {
    return {
      years: this.$y,
      months: this.$M,
      date: this.$D,
      hours: this.$H,
      minutes: this.$m,
      seconds: this.$s,
      milliseconds: this.$ms
    };
  };

  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };

  return Dayjs;
}();

dayjs.prototype = Dayjs.prototype;

dayjs.extend = function (plugin, option) {
  plugin(option, Dayjs, dayjs);
  return dayjs;
};

dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;

dayjs.unix = function (timestamp) {
  return dayjs(timestamp * 1e3);
};

dayjs.en = Ls[L];

export default dayjs;
