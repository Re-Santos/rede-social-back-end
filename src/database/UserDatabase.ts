
import { UserDB } from "../models/UserModel";
import { BaseDatabase } from "./BaseDatabase";

export default class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public createUser = async (userDB: UserDB): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(userDB)
  }

  public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
    const [result]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ email })

    return result
  }

  // public getAllUsers = async (): Promise<UserDB[]> => {
  //   const users: UserDB[] = await BaseDatabase
  //     .connection(UserDatabase.TABLE_USERS)
  //     .select("*");
  
  //   return users;
  // }


public getUserByEmail = async (email: string): Promise<UserDB | undefined> => {
  const [user] = await BaseDatabase
    .connection(UserDatabase.TABLE_USERS)
    .where({ email });

  return user;
};


// get user by id
public async getUsersById(id?: string): Promise<UserDB[]> {

  const result = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({ id: id })

  return result
}
}
