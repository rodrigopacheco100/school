import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export const CPF = {
  isValid(cpf: string): boolean {
    return cpfValidator.isValid(cpf);
  },

  format(cpf: string): string {
    return cpfValidator.format(cpf);
  }
};
