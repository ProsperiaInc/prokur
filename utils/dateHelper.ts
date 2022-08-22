import { format, parseISO } from 'date-fns';
import constants from './constants';

export default function parseDate(dateToParse: string) {
  let date;
  try {
    date = format(
      parseISO(dateToParse, 'yyyy-MM-ddTHH:mm:ss.SSS', new Date()),
      constants.DATE_FORMAT,
    );
  } catch (error) {
    date = '— —';
  }

  return date;
}
