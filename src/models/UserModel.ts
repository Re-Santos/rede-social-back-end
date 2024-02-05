import { USER_ROLES } from "../services/TokenManager";

// 
export interface UserDB {
  id: string;
  username: string;
  email: string;
  password: string;
  role: USER_ROLES;
  created_at: Date;
}

export interface UserModel {
  id: string;
  username: string;
  email: string;
  role?: USER_ROLES | undefined;
  createdAt: string;
}

// export interface TokenPayload {
//   id: string;
//   username:string;
// }

export default class User {
  constructor(
    private id: string,
    private username: string,
    private email: string,
    private password: string,
    public role: USER_ROLES | undefined,
    public created_at: Date
  ) {}

  public getId(): string {
    return this.id;
  }
  
  public getName(): string {
    return this.username;
  }

  public getRole(): USER_ROLES {
    return this.role as USER_ROLES;
  }

  public toUserModel(): UserModel {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role as USER_ROLES,
      createdAt: this.created_at.toISOString(), 
    };
  }

  public setId(value: string): void {
    this.id = value;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(value: string): void {
    this.username = value;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(value: string): void {
    this.email = value;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(value: string): void {
    this.password = value;
  }

  public toUserDB(): UserDB {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role:this.role as USER_ROLES,
      password: this.password,
      created_at: this.created_at
    };
    
  }
}
