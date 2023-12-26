import { Schema, model, Types, Document } from "mongoose";
import { BaseModelInterface } from "../Base-Model";

export const CHAT_COLLECTION_NAME = "chats";

export interface ChatModelInterface extends BaseModelInterface {
  message: string;
  sender: string;
  roomId: string;
  timestamp: Date;
}

const schemaChat = new Schema(
  {
    message: String,
    sender: String,
    roomId: String,
  },
  {
    timestamps: true,
  }
);

export default model<ChatModelInterface>(CHAT_COLLECTION_NAME, schemaChat);
