// import { BaseDatabase } from "../../src/database/BaseDatabase"
// import { UserDB } from "../../src/models/UserModel"
// import { USER_ROLES } from "../../src/services/TokenManager"


//     const usersMock: UserDB[] = [
//         {
//           id: "id-mock-amanda",
//           username: "Amanda",
//           email: "amanda@email.com",
//           password: "hash-mock-amanda", 
//           created_at: new Date(),
//           role: USER_ROLES.NORMAL,
//         },
//     {
//       id: "id-mock-ana",
//       username: "Ana",
//       email: "ana@email.com",
//       password: "hash-mock-ana",
//       created_at: new Date(), 
//       role: USER_ROLES.ADMIN
//     },
//   ]

//   export class UserDataBaseMock extends BaseDatabase{
//     public static TABLE_USERS= "users"

//     public async insertUser(newUser: UserDB):Promise<void>{
//     }


//     public async findUserByEmail(email:string):Promise<UserDB | undefined>{
//      return usersMock.filter(user => user.email === email)[0]
//     }
//   }
// UserDataBaseMock.ts

// UserDataBaseMock.ts
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
  {
    id: "id-mock-useradmin",
    username: "Useradmin",
    email: "useradmin@email.com",
    password: "hash-mock-useradmin",
    created_at: new Date(),
    role: USER_ROLES.ADMIN,
  },
];

export class UserDataBaseMock extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async createUser(userDB: UserDB): Promise<void> {
    // Implementação para criar um novo usuário no mock
    usersMock.push(userDB);
  }

  public async getUserByEmail(email: string): Promise<UserDB | undefined> {
    // Implementação para buscar usuário por e-mail no mock
    return usersMock.find((user) => user.email === email);
  }

  public async getUsersById(id?: string): Promise<UserDB[]> {
    // Implementação para buscar usuários por ID no mock
    return id ? usersMock.filter((user) => user.id === id) : usersMock;
  }

  public async findUserByEmail(email: string): Promise<UserDB | undefined> {
    // Implementação para encontrar usuário por e-mail no mock
    
    return usersMock.find((user) => user.email === email);
  }
}
