'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dayjs = _interopDefault(require('dayjs'));

var locale = {
  name: 'sv',
  weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
  months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
  ordinal: function ordinal(n) {
    var b = n % 10;
    var o = b === 1 || b === 2 ? 'a' : 'e';
    return "" + n + o;
  },
  relativeTime: {
    future: 'om %s',
    past: 'för %s sedan',
    s: 'några sekunder',
    m: 'en minut',
    mm: '%d minuter',
    h: 'en timme',
    hh: '%d timmar',
    d: 'en dag',
    dd: '%d dagar',
    M: 'en månad',
    MM: '%d månader',
    y: 'ett år',
    yy: '%d år'
  }
};
dayjs.locale(locale, null, true);

export default locale;
