import dayjs from 'dayjs';

var locale = {
  name: 'bg',
  weekdays: 'Неделя_Понеделник_Вторник_Сряда_Четвъртък_Петък_Събота'.split('_'),
  months: 'Януари_Февруари_Март_Април_Май_Юни_Юли_Август_Септември_Октомври_Ноември_Декември'.split('_'),
  ordinal: function ordinal(n) {
    return n + ".";
  }
};
dayjs.locale(locale, null, true);

export default locale;
