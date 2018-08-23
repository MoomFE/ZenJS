'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dayjs = _interopDefault(require('dayjs'));

var locale = {
  name: 'nb',
  weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
  months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  },
  relativeTime: {
    future: 'om %s',
    past: 'for %s siden',
    s: 'noen sekunder',
    m: 'ett minuttt',
    mm: '%d minutter',
    h: 'en time',
    hh: '%d timer',
    d: 'en dag',
    dd: '%d dager',
    M: 'en måned',
    MM: '%d måneder',
    y: 'ett år',
    yy: '%d år'
  }
};
dayjs.locale(locale, null, true);

export default locale;
