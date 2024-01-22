
import UserDatabase from "../database/UserDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES, TokenPayload} from "../services/TokenManager";
import User, { UserDB, UserModel } from "../models/UserModel";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/signup.dto";

export default class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) {}

//signup
  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const userDB: UserDB | undefined = await this.userDatabase.findUserByEmail(input.email);
    try {
    if (userDB) {
      throw new BadRequestError("E-mail já cadastrado.");
    }

    const newId = this.idGenerator.generate();

    const hashedPassword = await this.hashManager.hash(input.password);

   // método signUp 
    const newUser = new User(
      newId,
      input.username,
      input.email,
      hashedPassword
    );
    
    //salva o novo usuário no banco de dados
    await this.userDatabase.createUser(newUser.toUserDB());
    
    // criando o payload do token
    const payload: TokenPayload = {
      id: newId,
      username: input.username,
      role: USER_ROLES.NORMAL,
    };
   
    const token = this.tokenManager.createToken(payload);

    const output: SignupOutputDTO = {
      token
    };

    return output;

} catch (error) {
    console.error("Erro durante o signup:", error);
    throw error; 
}
  }

public getAllUsers = async (): Promise<UserModel[]> => {
  const usersDB = await this.userDatabase.getAllUsers();
  const usersModels = usersDB.map(userDB => new User(userDB.id, userDB.username, userDB.email, userDB.password).toUserModel());
  return usersModels;
}

}
