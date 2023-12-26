import { Types } from "mongoose";

export interface BaseModelInterface {
  _id: Types.ObjectId;
  createdBy: string;
  createDate: Date;
  updatedBy: string;
  updatedDate: Date;
}
