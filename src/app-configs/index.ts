/* eslint-disable @typescript-eslint/no-var-requires */
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
export const NODE_ENV = process.env.NODE_ENV || "undefind";
export const PORT = Number(process.env.PORT || 443);
export const MONGO_DB_URI = process.env.MONGO_DB_URI || "";

export const REDIS_CACHE_HOST = process.env.REDIS_CACHE_HOST || "127.0.0.1";
export const REDIS_CACHE_PORT = process.env.REDIS_CACHE_PORT || "6379";
export const REDIS_CACHE_PASSWORD = process.env.REDIS_CACHE_PASSWORD || "";
export const REDIS_CACHE_PREFIX = process.env.REDIS_CACHE_PREFIX || "OneBox:";
export const REDIS_CACHE_ROLES_PREFIX =
  process.env.REDIS_CACHE_ROLES_PREFIX || "IAM:";
export const RANDOM_TOKEN_SECRET =
  process.env.RANDOM_TOKEN_SECRET || "RANDOM_TOKEN_SECRET";

export const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID || "";
export const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY || "";
export const REGION = process.env.REGION || "";
export const API_VERSION = process.env.API_VERSION || "";
export const SOURCE = process.env.SOURCE || "";
export const EMAIL_USER = process.env.EMAIL_USER || "";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || "";
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || "";
export const S3_REGION = process.env.S3_REGION || "";
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";

export const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK || "";

export const SERVER_URL = process.env.SERVER_URL || "";

export const FIREBASE_SERVER =
  process.env.FIREBASE_SERVER || "https://fcm.googleapis.com/fcm/send";
export const FIREBASE_KEY = process.env.FIREBASE_KEY || "";

export const ZALO_SECRET_KEY = process.env.ZALO_SECRET_KEY || "";
export const ZALO_APP_ID = process.env.ZALO_APP_ID || "";
export const MOMO_PARTNERCODE = process.env.MOMO_PARTNERCODE || "";
export const MOMO_ACCESSKEY = process.env.MOMO_ACCESSKEY || "";
export const MOMO_SECRETKEY = process.env.MOMO_SECRETKEY || "";
export const MOMO_HOST_NAME = process.env.MOMO_HOST_NAME || "";
export const MOMO_API_ENDPOINT = process.env.MOMO_API_ENDPOINT || "";
export const MOMO_REFUND_API_ENDPOINT =
  process.env.MOMO_REFUND_API_ENDPOINT || "";
export const MOMO_QUERY_STATUS_ENDPOINT =
  process.env.MOMO_QUERY_STATUS_ENDPOINT || "";

export const VNPAY_URL = process.env.VNPAY_URL || "";
export const VNPAY_HASHSECRET = process.env.VNPAY_HASHSECRET || "";
export const VNPAY_QUERY = process.env.VNPAY_QUERY || "";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";

export const BIDV_GEN_QR = process.env.BIDV_GEN_QR || "";
export const BIDV_PRIVATE_KEY = process.env.BIDV_PRIVATE_KEY || "";
export const BIDV_APP_CODE = process.env.BIDV_APP_CODE || "";
export const BIDV_USERNAME = process.env.BIDV_USERNAME || "";
export const BIDV_PASSWORD = process.env.BIDV_PASSWORD || "";
export const BIDV_SERVICE_ID = process.env.BIDV_SERVICE_ID || "";

export const DATABUCKET_URL = process.env.DATABUCKET_URL || "";
export const DATABUCKET_SYSTEM_API_KEY =
  process.env.DATABUCKET_SYSTEM_API_KEY || "";

if (NODE_ENV == "production") {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = function () {};
}
