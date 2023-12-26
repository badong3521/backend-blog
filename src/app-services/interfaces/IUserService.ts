// import { USER_STATUS } from "../../app-common/Constant/userConstant";
import {
  InactiveUserRequest,
  UnlockUser,
  UserListItem,
} from "../../app-type/UserType/user";
import { USER_STATUS, UserModelInterface } from "../../app-models/Users/user";
import { Types } from "mongoose";

export interface IUserService {
  sendOtpSignUp(email: any): any;
  createUser(_user: UserModelInterface): any;
  getUser(_user: object): any;
  // userInfo(_id: Types.ObjectId): Promise<UserModelInterface>;
  // verifyUserByPhone(
  //   phoneNumber: string
  // ): Promise<UserModelInterface | undefined>;
  // verifyUserByEmail(email: string): Promise<UserModelInterface | undefined>;
  // forgotPassword(_id: Types.ObjectId, newPassword: string): Promise<boolean>;
  toggleActivateUser(_id: Array<Types.ObjectId>, status: number): any;
  getUserByPhoneNumber(phoneNumber: string, status: USER_STATUS): any;
  updateUserByFields(_id: string, _user: any): any;
  deleteUserLogin(userId: Types.ObjectId): any;
  // inactiveUser({
  //   _id,
  //   lockReason,
  // }: InactiveUserRequest): Promise<UserModelInterface>;
  // unLockUser({ _id }: UnlockUser): Promise<UserModelInterface>;
  // getAllUsers(): Promise<UserListItem[]>;
  // generatePassword(userId: string, title?: string): Promise<any>;
  // getRegisterDriverInfo(userId: string): Promise<any>;
  // inAutoConfirm(userId: string, inAutoConfirm: boolean): Promise<any>;
}
