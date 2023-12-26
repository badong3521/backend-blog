"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABUCKET_SYSTEM_API_KEY = exports.DATABUCKET_URL = exports.BIDV_SERVICE_ID = exports.BIDV_PASSWORD = exports.BIDV_USERNAME = exports.BIDV_APP_CODE = exports.BIDV_PRIVATE_KEY = exports.BIDV_GEN_QR = exports.GOOGLE_CLIENT_ID = exports.VNPAY_QUERY = exports.VNPAY_HASHSECRET = exports.VNPAY_URL = exports.MOMO_QUERY_STATUS_ENDPOINT = exports.MOMO_REFUND_API_ENDPOINT = exports.MOMO_API_ENDPOINT = exports.MOMO_HOST_NAME = exports.MOMO_SECRETKEY = exports.MOMO_ACCESSKEY = exports.MOMO_PARTNERCODE = exports.ZALO_APP_ID = exports.ZALO_SECRET_KEY = exports.FIREBASE_KEY = exports.FIREBASE_SERVER = exports.SERVER_URL = exports.DISCORD_WEBHOOK = exports.S3_BUCKET_NAME = exports.S3_REGION = exports.S3_SECRET_ACCESS_KEY = exports.S3_ACCESS_KEY_ID = exports.EMAIL_PASSWORD = exports.EMAIL_USER = exports.SOURCE = exports.API_VERSION = exports.REGION = exports.SECRET_ACCESS_KEY = exports.ACCESS_KEY_ID = exports.RANDOM_TOKEN_SECRET = exports.REDIS_CACHE_ROLES_PREFIX = exports.REDIS_CACHE_PREFIX = exports.REDIS_CACHE_PASSWORD = exports.REDIS_CACHE_PORT = exports.REDIS_CACHE_HOST = exports.MONGO_DB_URI = exports.PORT = exports.NODE_ENV = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
exports.NODE_ENV = process.env.NODE_ENV || "undefind";
exports.PORT = Number(process.env.PORT || 443);
exports.MONGO_DB_URI = process.env.MONGO_DB_URI || "";
exports.REDIS_CACHE_HOST = process.env.REDIS_CACHE_HOST || "127.0.0.1";
exports.REDIS_CACHE_PORT = process.env.REDIS_CACHE_PORT || "6379";
exports.REDIS_CACHE_PASSWORD = process.env.REDIS_CACHE_PASSWORD || "";
exports.REDIS_CACHE_PREFIX = process.env.REDIS_CACHE_PREFIX || "OneBox:";
exports.REDIS_CACHE_ROLES_PREFIX = process.env.REDIS_CACHE_ROLES_PREFIX || "IAM:";
exports.RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET || "RANDOM_TOKEN_SECRET";
exports.ACCESS_KEY_ID = process.env.ACCESS_KEY_ID || "";
exports.SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY || "";
exports.REGION = process.env.REGION || "";
exports.API_VERSION = process.env.API_VERSION || "";
exports.SOURCE = process.env.SOURCE || "";
exports.EMAIL_USER = process.env.EMAIL_USER || "";
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
exports.S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || "";
exports.S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || "";
exports.S3_REGION = process.env.S3_REGION || "";
exports.S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
exports.DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK || "";
exports.SERVER_URL = process.env.SERVER_URL || "";
exports.FIREBASE_SERVER = process.env.FIREBASE_SERVER || "https://fcm.googleapis.com/fcm/send";
exports.FIREBASE_KEY = process.env.FIREBASE_KEY || "";
exports.ZALO_SECRET_KEY = process.env.ZALO_SECRET_KEY || "";
exports.ZALO_APP_ID = process.env.ZALO_APP_ID || "";
exports.MOMO_PARTNERCODE = process.env.MOMO_PARTNERCODE || "";
exports.MOMO_ACCESSKEY = process.env.MOMO_ACCESSKEY || "";
exports.MOMO_SECRETKEY = process.env.MOMO_SECRETKEY || "";
exports.MOMO_HOST_NAME = process.env.MOMO_HOST_NAME || "";
exports.MOMO_API_ENDPOINT = process.env.MOMO_API_ENDPOINT || "";
exports.MOMO_REFUND_API_ENDPOINT = process.env.MOMO_REFUND_API_ENDPOINT || "";
exports.MOMO_QUERY_STATUS_ENDPOINT = process.env.MOMO_QUERY_STATUS_ENDPOINT || "";
exports.VNPAY_URL = process.env.VNPAY_URL || "";
exports.VNPAY_HASHSECRET = process.env.VNPAY_HASHSECRET || "";
exports.VNPAY_QUERY = process.env.VNPAY_QUERY || "";
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
exports.BIDV_GEN_QR = process.env.BIDV_GEN_QR || "";
exports.BIDV_PRIVATE_KEY = process.env.BIDV_PRIVATE_KEY || "";
exports.BIDV_APP_CODE = process.env.BIDV_APP_CODE || "";
exports.BIDV_USERNAME = process.env.BIDV_USERNAME || "";
exports.BIDV_PASSWORD = process.env.BIDV_PASSWORD || "";
exports.BIDV_SERVICE_ID = process.env.BIDV_SERVICE_ID || "";
exports.DATABUCKET_URL = process.env.DATABUCKET_URL || "";
exports.DATABUCKET_SYSTEM_API_KEY = process.env.DATABUCKET_SYSTEM_API_KEY || "";
if (exports.NODE_ENV == "production") {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.log = function () { };
}
