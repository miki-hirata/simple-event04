import { format } from 'date-fns';
import ja from 'date-fns/locale/ja'

export function FormatDate({ date }) {
  let formatYear = format(new Date(date), 'yyyy');
  let formatMonth = format(new Date(date), 'MM');
  let formatDay = format(new Date(date), 'dd');
  let formatWeek = format(new Date(date), 'E', {locale: ja});
  return (
    <div className="date">
      <div className="top">
        <span className="month">{formatMonth}</span>
        <span className="day">{formatDay}</span>
      </div>
      <div className="bottom">
        <span className="year">{formatYear}</span>
        <span className="week">{formatWeek}</span>
      </div>
    </div>
  );
}