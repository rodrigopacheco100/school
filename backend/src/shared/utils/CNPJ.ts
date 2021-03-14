import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';

export const CNPJ = {
  isValid(cnpj: string): boolean {
    return cnpjValidator.isValid(cnpj);
  },

  format(cnpj: string): string {
    return cnpjValidator.format(cnpj);
  }
};
