import { HashManager } from "../../src/services/HashManager";
import { TokenPayload, USER_ROLES } from "../../src/services/TokenManager";

export class TokenManagerMock implements HashManager {
  public hash = async (plainText: string): Promise<string> => {
    return `hashed-${plainText}`;
  }

  public compare = async (plainText: string, hash: string): Promise<boolean> => {
    const hashedPlainText = await this.hash(plainText);
    return hashedPlainText === hash;
  }

  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      // Signup de nova conta
      return "token-mock";
    } else if (payload.id === "id-mock-usernormal") {
      // Mock para usuário normal
      return "token-mock-usernormal";
    } else if (payload.id === "id-mock-useradmin") {
      // Mock para usuário admin
      return "token-mock-useradmin";
    } else {
      return "";
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
