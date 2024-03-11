// TokenManagerMock.ts
import { HashManager } from "../../src/services/HashManager";
import { TokenPayload, USER_ROLES } from "../../src/services/TokenManager";

export class TokenManagerMock implements HashManager {
  public hash = async (plainText: string): Promise<string> => {
    // Implementação do hash no mock (pode ser uma implementação simplificada para o propósito dos testes)
    return `hashed-${plainText}`;
  }

  public compare = async (plainText: string, hash: string): Promise<boolean> => {
    // Implementação da comparação no mock (pode ser uma implementação simplificada para o propósito dos testes)
    const hashedPlainText = await this.hash(plainText);
    return hashedPlainText === hash;
  }

  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      // Signup de nova conta
      return "token-mock";

    } else if (payload.id === "id-mock-usernormal") {

      return "token-mock-usernormal";

    } else {

      return "token-mock-useradmin";
    }
  }

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-usernormal") {
      return {
        id: "id-mock-usernormal",
        username: "Usernormal",
        role: USER_ROLES.NORMAL,
      };
    } else if (token === "token-mock-useradmin") {
      return {
        id: "id-mock-useradmin",
        username: "Useradmin",
        role: USER_ROLES.ADMIN,
      };
    } else {
      return null;
    }
  }
}
