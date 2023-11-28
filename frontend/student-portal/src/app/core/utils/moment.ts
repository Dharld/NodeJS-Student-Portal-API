import * as moment from 'moment';

export function formatDate(date: any) {
  const dateFormatted = moment(date).format('YYYY-MM-DD');
  return dateFormatted;
}
