import "reflect-metadata";
import { inject, injectable } from "inversify";
import { USER_STATUS, UserModelInterface } from "../app-models/Users/user";
// import { UserRoleModelInterface } from "@app-repositories/models/user-role";
import { TYPES } from "../app-type/types";
// import { Platform } from "@app-apis/requests";
// import { USER_STATUS } from "@app-common/constant/userConstant";
import { IAuthenticationService } from "./interfaces/IAuthenticationService";
// import { IUserRoleService } from "./interfaces/IUserRoleService";
import { IUserService } from "./interfaces/IUserService";
import { UserRoleModelInterface } from "@app-models/Users/user-role";
import { IUserRoleService } from "./interfaces/IUserRoleService";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  @inject(TYPES.UserRoleService) private readonly userRole!: IUserRoleService;
  @inject(TYPES.UserService) private readonly users!: IUserService;
  async signIn(_user: UserModelInterface | any): Promise<any> {
    delete _user.password;
    const { platform, username, phoneNumber } = _user;
    const userData = await this.users.getUserByPhoneNumber(
      phoneNumber,
      USER_STATUS.ACTIVE
    );

    const { fullName, avatar, _id, email } = userData;
    const userRoleId = userData.userRoleId;
    let isDriver = false;
    if (userRoleId != null) {
      const _userRole: UserRoleModelInterface[] =
        await this.userRole.getUserRoleList(userRoleId);

      if (_userRole.length > 0) {
        isDriver =
          _userRole.filter((x) => x.code?.toLocaleLowerCase() === "driver")
            .length > 0;
      }
    }
    isDriver = isDriver || userData.isDriver;

    return {
      payload: { userRoleId: _user.userRoleId, _id },
      //userRole: _userRole,
      fullName,
      avatar,
      email,
      phoneNumber,
      isDriver: isDriver,
    };
  }
}
