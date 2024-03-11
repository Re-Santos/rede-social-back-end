import { TokenManager } from "../../src/services/TokenManager";
import { TokenPayload, USER_ROLES } from "../../src/services/TokenManager";

export class HashManagerMock implements TokenManager {
  public createToken(payload: TokenPayload): string {
    if (payload.id === "id-mock") {
      // Signup de nova conta
      return "token-mock";
    } else if (payload.id === "id-mock-usernormal") {
    
      return "token-mock-usernormal";
    } else {
   
      return "token-mock-useradmin";
    }
  }

  public getPayload(token: string): TokenPayload | null {
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

  // public hash = async (plaintext: string): Promise<string> => {
  //   switch (plaintext) {
  //     case "usernormal":
  //       return "hash-mock-usernormal";

  //     case "useradmin":
  //       return "hash-mock-useradmin";

  //     default:
  //       return "hash-mock";
  //   }
  // }
  public hash = async (
    plaintext: string
  ): Promise<string> => {
    return "hash-mock"
  }
  
  public compare = async (plaintext: string, hash: string): Promise<boolean> => {
    console.log(`Comparando senhas - plaintext: ${plaintext} hash: ${hash}`);
    switch (plaintext) {
      case "usernormal":
        const result = hash === "hash-mock-usernormal";
        console.info(`Comparação de senhas resultou em: ${result}`);
        return result;
  
      case "useradmin":
        const resultAdmin = hash === "hash-mock-useradmin";
        console.info(`Comparação de senhas resultou em: ${resultAdmin}`);
        return resultAdmin;
  
      default:
        console.info("Comparação de senhas resultou em: false (default)");
        return false;
    }
  }
}