import { format, utcToZonedTime } from 'date-fns-tz';

const date = new Date('2021-04-13T16:27:53.425Z');
const timeZone = 'America/New_York';

const nyDate = utcToZonedTime(date, timeZone);
const formattedDate = format(nyDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

console.log(formattedDate);

export const utcToDate = utcDate => {
  const date = new Date(utcDate);
  const zonedDate = utcToZonedTime(date, timeZone);

  return format(zonedDate, 'yyyy-MM-dd', { timeZone });
};
