import { injectable } from "inversify";
import userLogin, {
  UserLoginModelInterface,
} from "../app-models/Users/user-login";
import { IUserLoginService } from "./interfaces/IUserLoginService";

@injectable()
export class UserLoginService implements IUserLoginService {
  async createUserLogin(_user: UserLoginModelInterface) {
    const userData: UserLoginModelInterface = await userLogin.create(_user);
    return userData;
  }
}
