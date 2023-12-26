import { UserRoleModelInterface } from "../../app-models/Users/user-role";

import { Types } from "mongoose";

export interface IUserRoleService {
  checkUserRoleExistence(_userRole: UserRoleModelInterface): Promise<boolean>;
  createUserRole(
    _userRole: UserRoleModelInterface
  ): Promise<UserRoleModelInterface>;
  updateUserRole(_userRole: UserRoleModelInterface): Promise<any>;
  getUserRole(
    _userRole: UserRoleModelInterface | any
  ): Promise<UserRoleModelInterface[]>;
  getUserRoleDetail(_id: Types.ObjectId): Promise<UserRoleModelInterface>;
  getUserRoleList(
    _ids: Array<Types.ObjectId>
  ): Promise<UserRoleModelInterface[]>;
}
