import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import GetAllBusiness from "../business/GetAllBusiness";

export default class GetAllController {
  constructor(private getAllBusiness: GetAllBusiness) {}

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.getAllBusiness.getAllUsers();

      // Respondendo com os usuários
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error during getAllUsers:", error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
}
