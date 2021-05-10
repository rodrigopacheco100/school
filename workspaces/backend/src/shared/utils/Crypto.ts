import { compare as BCryptCompare, hash as BCryptHash } from 'bcrypt';

export const crypto = {
  async encrypt(word: string): Promise<string> {
    const encryptedWord = await BCryptHash(word, 8);
    return encryptedWord;
  },

  async compare(encryptedWord: string, word: string): Promise<boolean> {
    const result = await BCryptCompare(word, encryptedWord);
    return result;
  }
};
