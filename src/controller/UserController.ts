import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { SignupSchema } from "../dtos/users/signup.dto";
import { LoginSchema } from "../dtos/users/login.dto";
import { GetUsersInputDTO } from "../dtos/users/getUsers.dto";

export default class UserController {
  constructor(
    private userBusiness: UserBusiness
  ) {}
//signup
  public signup = async (req: Request, res: Response) => {
    try {
        //validando os dados de entrada
      const input = SignupSchema.parse({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
       //chamando a lógica de signup no UserBusiness
      const output = await this.userBusiness.signup(input)

      //respondendo com o token
      res.status(201).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

public login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const input = LoginSchema.parse({
      email,
      password,
    });

    // Chamando a lógica de login na UserBusiness
    const output = await this.userBusiness.login(input);

    // Respondendo com o token
    res.status(200).send(output);
  } catch (error) {
    console.log(error);
    
    res.status(400).send({ message: "Invalid input data." });
  }
};
}
