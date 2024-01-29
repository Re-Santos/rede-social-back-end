

import { UserDB } from "../models/UserModel";
import { BaseDatabase } from "./BaseDatabase";

export default class GetAllDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public getAllUsers = async (): Promise<UserDB[]> => {
    const users: UserDB[] = await BaseDatabase
      .connection(GetAllDatabase.TABLE_USERS)
      .select("*");
  
    return users;
  }
}
