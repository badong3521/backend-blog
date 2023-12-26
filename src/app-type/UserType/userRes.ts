import { Types } from "mongoose";

export default interface UserResponse {
  _id: Types.ObjectId;
  id: number;
  username: string;
  token: string;
  refreshToken: string;
}
