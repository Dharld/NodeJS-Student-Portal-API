import * as moment from 'moment';

export function formatDate(date: any) {
  const dateFormatted = moment(date).format('YYYY-MM-DD');
  return dateFormatted;
}

export function getWeekDay(date: string) {
  return moment(date).format('dddd');
}

export function getHoursAndMinutes(date: string) {
  return moment(date).format('hh:mm a');
}
