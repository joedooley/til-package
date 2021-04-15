import { format, utcToZonedTime } from 'date-fns-tz';

const timeZone = 'America/New_York';

export const utcToDate = (utcDate, pretty = false) => {
  const date = new Date(utcDate);
  const zonedDate = utcToZonedTime(date, timeZone);
  const dateFormat = pretty ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ssXXX';

  return format(zonedDate, dateFormat, { timeZone });
};
