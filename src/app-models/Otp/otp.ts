import { Schema, model } from "mongoose";
import { BaseModelInterface } from "../Base-Model";
import { Types } from "mongoose";

export const OTP_COLLECTION_NAME = "otp";

export interface OtpModelInterface extends BaseModelInterface {
  otp: string;
  verified: boolean;
  expirationTime: Date;
  salt: string;
}

export interface OtpClientInterface {
  _id: Types.ObjectId;
  otp: string;
  verified: boolean;
  expirationTime: Date;
  salt: string;
}

const userSchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    expirationTime: {
      type: Date,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<OtpModelInterface>(OTP_COLLECTION_NAME, userSchema);
