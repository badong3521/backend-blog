import { Types } from "mongoose";

export default interface User {
  _id: Types.ObjectId;
  id: number;
  username: string;
  password: string;
  token: string;
  refreshToken: string;
}

export interface InactiveUserRequest {
  _id: string;
  lockReason: string;
}

export interface UnlockUser {
  _id: string;
}

export interface UserListItem {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
}
