

import { USER_ROLES } from "../../services/TokenManager";

export interface GetUserDTO {
  id: string;
  username: string;
  email: string;
  role: USER_ROLES;
  createdAt: string;
}

export interface GetAllUsersDTO {
  users: GetUserDTO[];
}
