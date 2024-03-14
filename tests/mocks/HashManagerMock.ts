
import { HashManager } from "../../src/services/HashManager";

export class HashManagerMock implements HashManager {
  public hash = async (plainText: string): Promise<string> => {
    return `hashed-${plainText}`;
  }

  public compare = async (plainText: string, hash: string): Promise<boolean> => {
    const hashedPlainText = await this.hash(plainText);
    return hashedPlainText === hash;
  }
}