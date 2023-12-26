import { injectable } from "inversify";
import { Error, Types } from "mongoose";
import userRole, {
  UserRoleModelInterface,
} from "../app-models/Users/user-role";
import _ = require("lodash");
import { IUserRoleService } from "./interfaces/IUserRoleService";

@injectable()
export class UserRoleService implements IUserRoleService {
  async checkUserRoleExistence(
    _userRole: UserRoleModelInterface
  ): Promise<boolean> {
    return userRole
      .find(_userRole)
      .then((data: UserRoleModelInterface[]) => {
        if (!_.isEmpty(data)) return true;
        return false;
      })
      .catch((err: Error) => {
        throw err;
      });
  }

  async createUserRole(
    _userRole: UserRoleModelInterface
  ): Promise<UserRoleModelInterface> {
    return userRole
      .create(_userRole)
      .then((data: UserRoleModelInterface) => {
        return data;
      })
      .catch((err: Error) => {
        throw err;
      });
  }

  async updateUserRole(_userRole: UserRoleModelInterface): Promise<any> {
    const { _id, name, updatedBy } = _userRole;
    return userRole
      .findByIdAndUpdate(
        _id,
        { name, updatedBy },
        { new: true, useFindAndModify: false }
      )
      .then(() => ({}))
      .catch((err: Error) => {
        throw err;
      });
  }

  async getUserRole(
    _userRole: UserRoleModelInterface | any
  ): Promise<UserRoleModelInterface[]> {
    return userRole
      .find(_userRole)
      .then((data: UserRoleModelInterface[]) => {
        return data;
      })
      .catch((err: Error) => {
        throw err;
      });
  }

  async getUserRoleDetail(
    _id: Types.ObjectId
  ): Promise<UserRoleModelInterface> {
    return userRole
      .findById({ _id })
      .then((data: any) => {
        return data;
      })
      .catch((err: Error) => {
        throw err;
      });
  }
  async getUserRoleList(
    _ids: Array<Types.ObjectId>
  ): Promise<UserRoleModelInterface[]> {
    return userRole
      .find({
        _id: {
          $in: _ids,
          // .map((item: string) => {
          //   return item;
          // }),
        },
      })
      .then((data: UserRoleModelInterface[]) => {
        return data;
      })
      .catch((err: Error) => {
        throw err;
      });
  }
}
