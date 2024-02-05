import { UserDB } from "../models/UserModel";
import { BaseError } from "../errors/BaseError";
import { BadRequestError } from "../errors/BadRequestError";
import GetAllDatabase from "../database/getAllDatabase";

export default class GetAllBusiness {
  constructor(private getAllDatabase: GetAllDatabase) {}

  public getAllUsers = async (): Promise<UserDB[]> => {
    try {
      const usersDB: UserDB[] = await this.getAllDatabase.getAllUsers();
      return usersDB;
    } catch (error) {
      console.error("Error during getAllUsers:", error);
      throw new BadRequestError("Mensagem de erro");
    }
  };
}
