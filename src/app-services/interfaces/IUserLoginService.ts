import { UserLoginModelInterface } from "../../app-models/Users/user-login";

export interface IUserLoginService {
  createUserLogin(_user: UserLoginModelInterface): any;
}
