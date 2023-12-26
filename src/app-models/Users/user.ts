import { Schema, model, Types } from "mongoose";
import { BaseModelInterface } from "../Base-Model";
import { NOTIFICATION_COLLECTION_NAME } from "../Notification";
import { USER_ROLE_COLLECTION_NAME } from "./user-role";
// import { PARTNER_COLLECTION_NAME } from "./partner";

export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  LOCK = "LOCK",
  INACTIVE = "INACTIVE",
}
export enum PROFILE_STATUS {
  VERIFYING = "VERIFYING",
  VERIFYED = "VERIFYED",
}

export const USER_COLLECTION_NAME = "users";
export interface UserModelInterface extends BaseModelInterface {
  findByIdAndUpdate(
    _id: any,
    arg1: { newPassword: any },
    arg2: { new: boolean; useFindAndModify: boolean }
  ): unknown;
  username: string;
  password: string;
  newPassword: string;
  code: string;
  avatar: string;
  description: string;
  status: string;
  profileStatus: string;
  fullName: string;
  email: string;
  userRoleId: Array<Types.ObjectId>;
  address: string;
  dob: Date;
  gender: Number;
  phoneNumber: string;
  lockReason: string;
  lockExpire: Date;
  passwordExpire: Date;
  accessExpire: Date;
  personalId: string; //Chung minh thu
  deviceIdentifier: Array<any>;
  notification: Array<Types.ObjectId>;
  partnerId: Array<Types.ObjectId>;
  note: string;
  createdAt?: Date;
  affCode?: string; //Ma gioi thieu
  autoOrderConfirm: boolean;
  loginTime?: Date; //thời gian đầu tiên
  preLockStatus: string;
  isDriver: boolean;
  inAutoConfirm: boolean;
  idGoogle: string;
  idFacebook: string;
  idApple: string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    idGoogle: {
      type: String,
      default: "",
    },
    idFacebook: {
      type: String,
      default: "",
    },
    idApple: {
      type: String,
      default: "",
    },
    newPassword: {
      type: String,
      required: false,
    },
    code: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: USER_STATUS,
      required: false,
      default: USER_STATUS.INACTIVE,
    },
    preLockStatus: {
      type: String,
    },
    profileStatus: {
      type: String,
      enum: PROFILE_STATUS,
      required: false,
      default: PROFILE_STATUS.VERIFYING,
    },
    fullName: {
      type: String,
    },
    isDriver: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userRoleId: [
      {
        type: Types.ObjectId,
        ref: USER_ROLE_COLLECTION_NAME,
        required: true,
      },
    ],
    address: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: new Date("1997-01-01"),
    },
    gender: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    lockReason: {
      type: String,
      default: "",
    },
    lockExpire: {
      type: Date,
    },
    passwordExpire: {
      type: Date,
    },
    accessExpire: {
      type: Date,
    },
    createdBy: {
      type: String,
      default: "admin",
    },
    updatedBy: {
      type: String,
      required: true,
      default: "admin",
    },
    personalId: {
      type: String,
      default: "",
    },
    inAutoConfirm: {
      type: Boolean,
      default: true, //Không bắt khách hàng xác thực tạm thời
    },
    deviceIdentifier: [
      {
        deviceId: {
          type: String,
        },
        firebaseToken: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
        default: [],
      },
    ],
    notification: [
      {
        type: Types.ObjectId,
        ref: NOTIFICATION_COLLECTION_NAME,
        default: [],
      },
    ],
    note: {
      type: String,
      required: false,
      default: "",
    },
    affCode: {
      type: String,
      required: false,
    },
    loginTime: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.plugin(UniqueValidator);

export default model<UserModelInterface>(USER_COLLECTION_NAME, userSchema);
