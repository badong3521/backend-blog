import { model, Schema, Types } from "mongoose";
import { BaseModelInterface } from "../Base-Model";
import { USER_COLLECTION_NAME } from "./user";

export const EXPIRED_TOKENS = "expired_tokens";

export interface ExpiredTokensModelInterface extends BaseModelInterface {
  token: string;
  user: Types.ObjectId;
}

const expiredTokensSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: USER_COLLECTION_NAME,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ExpiredTokensModelInterface>(
  EXPIRED_TOKENS,
  expiredTokensSchema
);
