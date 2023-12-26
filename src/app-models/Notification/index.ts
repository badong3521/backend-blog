import { Schema, model, Types } from "mongoose";
import { BaseModelInterface } from "../Base-Model";

export const NOTIFICATION_COLLECTION_NAME = "notifications";

export enum IS_READ {
  READ = 1,
  UNREAD = 2,
}

export enum NOTIFICATION_STATUS {
  SUCCESS = 1,
  PENDING = 2,
  FALSE = 3,
}

export enum NOTIFICATION_SCREEN {
  MyOrderDetail = "MyOrderDetailScreen",
  GiftNotification = "GiftNotificationScreen",
  RequestOrderScreen = "RequestOrderScreen",
}

export interface NotificationNavigate {
  screen: NOTIFICATION_SCREEN;
  params: {
    orderId?: Types.ObjectId;
    title?: string;
    body?: string;
  };
}

export interface NotificationModelInterface extends BaseModelInterface {
  title: string;
  body: string;
  link: string;
  iconLink: string;
  navigate?: NotificationNavigate;
  topic: string;
  isRead: number;
  user: Types.ObjectId;
  startTime: Date;
  status: number;
  createdAt: Date;
}

export interface CreateNotificationMode {
  title: string;
  body: string;
  link: string;
  iconLink?: string;
  navigate?: NotificationNavigate;
  isRead: number;
  user: Types.ObjectId;
  status: number;
  startTime: Date;
  createdAt: Date;
}

const schema = new Schema(
  {
    title: {
      type: String,
      required: false,
      default: "",
    },
    body: {
      type: String,
      required: false,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    iconLink: {
      type: String,
      default: "",
    },
    isRead: {
      type: Number,
      require: true,
      default: IS_READ.UNREAD,
    },
    user: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    navigate: {
      screen: {
        type: String,
      },
      params: {
        orderId: {
          type: Types.ObjectId,
        },
      },
    },
    createdBy: {
      type: String,
      required: true,
      default: "admin",
    },
    updatedBy: {
      type: String,
      required: true,
      default: "admin",
    },
    topic: {
      type: String,
      required: false,
      default: null,
    },
    startTime: {
      type: Date,
      required: false,
      default: new Date(),
    },
    status: {
      type: Number,
      required: false,
      default: 2,
    },
    createdAt: {
      type: Date,
      default: new Date(new Date().toISOString()),
    },
  },
  {
    timestamps: true,
  }
);

export default model<NotificationModelInterface>(
  NOTIFICATION_COLLECTION_NAME,
  schema
);
