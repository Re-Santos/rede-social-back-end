
import UserDatabase from "../database/UserDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, USER_ROLES, TokenPayload} from "../services/TokenManager";
import User, { UserDB, UserModel } from "../models/UserModel";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/users/signup.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/users/login.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/users/getUsers.dto";

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
      hashedPassword,
      USER_ROLES.NORMAL,
      new Date()
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
  };

//AllUsers

// public getAllUsers = async (input: GetUsersInputDTO): Promise<UserModel[] | GetUsersOutputDTO> => {
//   const { q, token } = input;

//   const payload = this.tokenManager.getPayload(token);

//   if (!payload || payload === null) {
//       throw new BadRequestError("Invalid token.");
//   }

//   if (payload.role !== USER_ROLES.NORMAL) {
//       throw new BadRequestError("Only Admins can use this function.");
//   }

//   if (q) {
//       const [userDB]: UserDB[] = await this.userDatabase.getUsersById(q);

//       if (!userDB) {
//           throw new NotFoundError("User not found.");
//       }

//       const user: User = new User(
//           userDB.id,
//           userDB.username,
//           userDB.email,
//           userDB.password,
//           userDB.role as USER_ROLES,
//           new Date(userDB.created_at)
//       );

//       const userModel: UserModel = user.toUserModel();

//       return [userModel];
      
//   } else {
//       const usersDB: UserDB[] = await this.userDatabase.getAllUsers();

//       const users: UserModel[] = usersDB.map((userDB) => {
//           const user = new User(
//               userDB.id,
//               userDB.username,
//               userDB.email,
//               userDB.password,
//               userDB.role,
//               new Date(userDB.created_at)
//           );

//           return user.toUserModel();
//       });

//       return users;
//   }
// }; // oficial



//login
public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {

  const { email, password } = input

  const userDB: UserDB | undefined = await this.userDatabase.getUserByEmail(email);

  if (!userDB) {
      throw new NotFoundError("Email not found.")
  }

  const hashedPassword: string = userDB.password

  const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)
  if (!isPasswordCorrect) {
      throw new BadRequestError("Incorrect email or password.")
  }

  const user: User = new User(
      userDB.id,
      userDB.username,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
  )

  const payload: TokenPayload = {
      id: user.getId(),
      username: user.getName(),
      role: user.getRole()
  }

  const token: string = this.tokenManager.createToken(payload)

  const output: LoginOutputDTO = {
      message: "Logged in.",
      token
  }

  return output
}


}