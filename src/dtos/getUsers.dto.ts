import { USER_ROLES } from "../services/TokenManager";


export interface GetUsersInputDTO {
    q: string;
    token: string;
  }

export interface GetUsersOutputDTO {
  id: string;
  username: string;
  email: string;
  role: USER_ROLES;
  createdAt: string;
}


