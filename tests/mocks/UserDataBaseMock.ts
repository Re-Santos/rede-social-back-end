import { BaseDatabase } from "../../src/database/BaseDatabase";
import { UserDB } from "../../src/models/UserModel";
import { USER_ROLES } from "../../src/services/TokenManager";

const usersMock: UserDB[] = [
  {
    id: "id-mock-usernormal",
    username: "Usernormal",
    email: "usernormal@email.com",
    password: "hash-mock-usernormal",
    created_at: new Date(),
    role: USER_ROLES.NORMAL,
  },
];

export class UserDataBaseMock extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async createUser(userDB: UserDB): Promise<void> {
    usersMock.push(userDB);
  }

  public async getUserByEmail(email: string): Promise<UserDB | undefined> {

    return usersMock.find((user) => user.email === email);
  }

  public async getUsersById(id?: string): Promise<UserDB[]> {
    return id ? usersMock.filter((user) => user.id === id) : usersMock;
  }

  public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
    // Simulando um usuário existente no banco de dados
    const existingUser: UserDB = {
      id: "id-mock",
      username: "user-mock",
      email: "user@example.com",
      password: "hashed-password-mock",
      role: USER_ROLES.NORMAL,
      created_at: new Date(),
    };
  
    if (email === existingUser.email) {
      return existingUser;
    }
  
    return undefined;
  }

}