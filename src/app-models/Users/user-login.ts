import { Schema, model, Types } from "mongoose";
import { BaseModelInterface } from "../Base-Model";

export const USER_LOGIN_COLLECTION_NAME = "userLogins";

export interface UserLoginModelInterface extends BaseModelInterface {
  userId: Types.ObjectId;
  token: string;
  deviceId: string;
  loginTime: Date;
}

const schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    loginTime: {
      type: Date,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<UserLoginModelInterface>(
  USER_LOGIN_COLLECTION_NAME,
  schema
);
