import { Types } from "mongoose";
import { UserModelInterface } from "../../app-models/Users/user";

export interface IOtpService {
  generateOtp(user: UserModelInterface, title?: any): Promise<string>;
  generateOtpSendZalo(user: UserModelInterface): Promise<string>;
  updateOtpByFields(_id: Types.ObjectId, _otp: any): any;
  getOtpById(_id: Types.ObjectId): any;
  getOtpByOtp(otpCode: string): any;
  deleteOtp(id: Types.ObjectId[]): any;
}
