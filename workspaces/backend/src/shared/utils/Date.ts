import AppError from '@shared/infra/http/error/AppError';
import { parse } from 'date-fns';

export const date = {
  convertBrazilianStringDateToUTC(date: string): Date {
    try {
      return parse(date, 'dd/MM/yyyy', Date.now());
    } catch {
      throw new AppError('Erro ao converter a data');
    }
  }
};
