import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'

export function FormatUpdate({ update }) {
  const targetDate = new Date(update)
  return (
    <div>
      <div>最終更新: {formatDistanceToNow(targetDate, {locale: ja})}前</div>
    </div>
  );
}
