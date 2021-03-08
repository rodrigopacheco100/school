import { parse } from 'date-fns';

export const convertBrazilianStringDateToUTC = (date: string): Date => {
  return parse(date, 'dd/MM/yyyy', Date.now());
};
