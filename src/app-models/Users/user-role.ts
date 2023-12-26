import { Schema, model } from "mongoose";
import { BaseModelInterface } from "../Base-Model";

export const USER_ROLE_COLLECTION_NAME = "userroles";

export enum USER_ROLE_STATUS {
  ACTIVE = 1, // đang chạy
  INACTIVE = 2, // hết hạn
}
export interface UserRoleModelInterface extends BaseModelInterface {
  name: string;
  code: string;
  description: string;
  status: USER_ROLE_STATUS;
}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: false,
    },
    description: {
      type: String,
    },
    status: {
      type: Number,
      default: USER_ROLE_STATUS.ACTIVE,
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

export default model<UserRoleModelInterface>(USER_ROLE_COLLECTION_NAME, schema);
