"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifySignUp = exports.TYPE_SOCIAL = exports.TYPE_SOCIAL_AUTH = void 0;
const user_1 = __importDefault(require("../app-models/Users/user"));
const MessageErrors_1 = __importDefault(require("../app-common/MessageErrors"));
const String_helper_1 = require("../app-helpers/String.helper");
const userConstant_1 = require("../app-common/constant/userConstant");
const logger_1 = __importDefault(require("../app-helpers/logger"));
const resCode_1 = __importDefault(require("../app-type/ResCode/resCode"));
// import { GOOGLE_CLIENT_ID } from "../app-configs";
// import { OAuth2Client } from "google-auth-library";
// import jwt_decode from "jwt-decode";
// const client = new OAuth2Client(GOOGLE_CLIENT_ID);
var TYPE_SOCIAL_AUTH;
(function (TYPE_SOCIAL_AUTH) {
    TYPE_SOCIAL_AUTH[TYPE_SOCIAL_AUTH["FACE_BOOK"] = 1] = "FACE_BOOK";
    TYPE_SOCIAL_AUTH[TYPE_SOCIAL_AUTH["GOOGLE"] = 2] = "GOOGLE";
    TYPE_SOCIAL_AUTH[TYPE_SOCIAL_AUTH["APPLE"] = 3] = "APPLE";
})(TYPE_SOCIAL_AUTH = exports.TYPE_SOCIAL_AUTH || (exports.TYPE_SOCIAL_AUTH = {}));
var TYPE_SOCIAL;
(function (TYPE_SOCIAL) {
    TYPE_SOCIAL[TYPE_SOCIAL["ADD_AUTH"] = 1] = "ADD_AUTH";
    TYPE_SOCIAL[TYPE_SOCIAL["SIGN_AUTH"] = 2] = "SIGN_AUTH";
})(TYPE_SOCIAL = exports.TYPE_SOCIAL || (exports.TYPE_SOCIAL = {}));
const checkDuplicateUsernameOrEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Username
        const user_username = yield user_1.default.findOne({
            username: req.body.username,
            status: userConstant_1.USER_STATUS.ACTIVE,
        });
        if (user_username) {
            return res.errorRes({ message: MessageErrors_1.default.field.username.isExist });
        }
        // Email
        const user_email = yield user_1.default.findOne({
            email: req.body.email,
            status: userConstant_1.USER_STATUS.ACTIVE,
        });
        if (user_email) {
            return res.errorRes({ message: MessageErrors_1.default.field.email.isExist });
        }
        //phone number
        const phoneNumber = req.body.phoneNumber;
        const convertPhoneNumber = (0, String_helper_1.convertCountryCodePhoneNumber)(phoneNumber);
        const user_phoneNumber = yield user_1.default.findOne({
            //$or: [{ phoneNumber: phoneNumber }, { phoneNumber: convertPhoneNumber }],
            phoneNumber: { $in: convertPhoneNumber },
            status: userConstant_1.USER_STATUS.ACTIVE,
        });
        if (user_phoneNumber) {
            return res.errorRes({ message: MessageErrors_1.default.field.phoneNumber.isExist });
        }
        next();
    }
    catch (error) {
        logger_1.default.error(error);
        return res
            .status(resCode_1.default.ServerError)
            .json({ message: MessageErrors_1.default.server.internal });
    }
});
const checkDuplicateEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //phone number
        const phoneNumber = req.body.phoneNumber;
        const convertPhoneNumber = (0, String_helper_1.convertCountryCodePhoneNumber)(phoneNumber);
        const user_phoneNumber = yield user_1.default.findOne({
            $or: [{ phoneNumber: phoneNumber }, { phoneNumber: convertPhoneNumber }],
            phoneNumber: { $in: convertPhoneNumber },
            status: userConstant_1.USER_STATUS.ACTIVE,
        });
        if (user_phoneNumber) {
            console.log("phoneNumber", phoneNumber);
            return res.json({ message: MessageErrors_1.default.field.phoneNumber.isExist });
        }
        // Email
        const user_email = yield user_1.default.findOne({
            email: req.body.email,
            status: userConstant_1.USER_STATUS.ACTIVE,
        });
        if (user_email) {
            return res.json({ message: MessageErrors_1.default.field.email.isExist });
        }
        console.log("PASS Duplicate");
        next();
    }
    catch (error) {
        logger_1.default.error(error);
        return res
            .status(resCode_1.default.ServerError)
            .json({ message: MessageErrors_1.default.server.internal });
    }
});
// const checkVerifyAuthentication = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { provider, token, userId, fullName, isAuth } = req.body;
//     if (isAuth === TYPE_SOCIAL.ADD_AUTH) {
//       if (provider === TYPE_SOCIAL_AUTH.FACE_BOOK) {
//         const payload = await axios
//           .get(
//             `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${token}`
//           )
//           .then((response) => {
//             return response.data;
//           })
//           .catch((error) => {
//             console.log("CALL API GRAPH FB ERROR", error);
//           });
//         const hasAccountAuthFacebook = await user.findOne({
//           idFacebook: payload.id,
//           status: USER_STATUS.ACTIVE,
//         });
//         if (hasAccountAuthFacebook) {
//           return res.errorRes({
//             message: MessageErrors.field.authentication.isExist,
//           });
//         }
//         const result = {
//           email: payload.email,
//           name: payload.name,
//           picture: payload.picture?.data?.url,
//           idFacebook: payload.id,
//         };
//         req.resAuth = result;
//       }
//       if (provider === TYPE_SOCIAL_AUTH.GOOGLE) {
//         const ticket: any = await client.verifyIdToken({
//           idToken: token,
//           audience: GOOGLE_CLIENT_ID,
//         });
//         const { payload } = ticket;
//         const hasAccountAuthGoogle = await user.findOne({
//           idGoogle: payload.sub,
//           status: USER_STATUS.ACTIVE,
//         });
//         if (hasAccountAuthGoogle) {
//           return res.errorRes({
//             message: MessageErrors.field.authentication.isExist,
//           });
//         }
//         const result = {
//           email: payload.email,
//           email_verified: payload.email_verified,
//           name: payload.name,
//           picture: payload.picture,
//           locale: payload.locale,
//           idGoogle: payload.sub,
//         };
//         req.resAuth = result;
//       }
//       if (provider === TYPE_SOCIAL_AUTH.APPLE) {
//         const payload: any = await jwt_decode(token);
//         const hasAccountApple = await user.findOne({
//           idApple: payload.sub,
//           status: USER_STATUS.ACTIVE,
//         });
//         if (hasAccountApple) {
//           return res.errorRes({
//             message: MessageErrors.field.authentication.isExist,
//           });
//         }
//         const result = {
//           email: payload.email,
//           email_verified: payload.email_verified,
//           name: fullName,
//           idApple: payload.sub,
//         };
//         req.resAuth = result;
//       }
//       next();
//     }
//     if (isAuth === TYPE_SOCIAL.SIGN_AUTH) {
//       if (provider === TYPE_SOCIAL_AUTH.FACE_BOOK) {
//         const payload = await axios
//           .get(
//             `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${token}`
//           )
//           .then((response) => {
//             return response.data;
//           })
//           .catch((error) => {
//             console.log("CALL API GRAPH FB ERROR", error);
//           });
//         const result = {
//           email: payload.email,
//           name: payload.name,
//           picture: payload.picture?.data?.url,
//           idFacebook: payload.id,
//         };
//         req.resAuth = result;
//       }
//       if (provider === TYPE_SOCIAL_AUTH.GOOGLE) {
//         const ticket: any = await client.verifyIdToken({
//           idToken: token,
//           audience: GOOGLE_CLIENT_ID,
//         });
//         const { payload } = ticket;
//         const result = {
//           email: payload.email,
//           email_verified: payload.email_verified,
//           name: payload.name,
//           picture: payload.picture,
//           locale: payload.locale,
//           idGoogle: payload.sub,
//         };
//         req.resAuth = result;
//       }
//       if (provider === TYPE_SOCIAL_AUTH.APPLE) {
//         const payload: any = await jwt_decode(token);
//         const result = {
//           email: payload.email,
//           email_verified: payload.email_verified,
//           name: fullName,
//           idApple: payload.sub,
//         };
//         req.resAuth = result;
//       }
//       next();
//     }
//   } catch (error) {
//     return res.internal({ message: MessageErrors.server.internal });
//   }
// };
const checkDuplicateUsernameOrEmailSocial = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Username
        const user_username = yield user_1.default.findOne({
            username: req.body.username,
            status: userConstant_1.USER_STATUS.ACTIVE,
        });
        if (user_username) {
            return res.errorRes({ message: MessageErrors_1.default.field.username.isExist });
        }
        // Email
        const user_email = yield user_1.default.findOne({
            email: req.resAuth.email,
            status: userConstant_1.USER_STATUS.ACTIVE,
        });
        if (user_email) {
            return res.errorRes({ message: MessageErrors_1.default.field.email.isExist });
        }
        next();
    }
    catch (error) {
        return res.internal({ message: MessageErrors_1.default.server.internal });
    }
});
const checkVisibleFb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.successRes({ data: true });
        next();
    }
    catch (error) {
        return res.internal({ message: MessageErrors_1.default.server.internal });
    }
});
exports.VerifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkDuplicateEmail,
    // checkVerifyAuthentication,
    checkDuplicateUsernameOrEmailSocial,
    checkVisibleFb,
};
