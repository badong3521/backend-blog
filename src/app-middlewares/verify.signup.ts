import { NextFunction } from "express";
import user from "../app-models/Users/user";
import { Response, Request } from "@app-helpers/httpExtends";
import MessageErrors from "@app-common/MessageErrors";
import { convertCountryCodePhoneNumber } from "@app-helpers/String.helper";
import { USER_STATUS } from "@app-common/constant/userConstant";
import logger from "@app-helpers/logger";
import ResponseCodes from "@app-type/ResCode/resCode";
// import { GOOGLE_CLIENT_ID } from "@app-configs";
// import { OAuth2Client } from "google-auth-library";
// import jwt_decode from "jwt-decode";

// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export enum TYPE_SOCIAL_AUTH {
  FACE_BOOK = 1,
  GOOGLE = 2,
  APPLE = 3,
}

export enum TYPE_SOCIAL {
  ADD_AUTH = 1,
  SIGN_AUTH = 2,
}
const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Username
    const user_username = await user.findOne({
      username: req.body.username,
      status: USER_STATUS.ACTIVE,
    });
    if (user_username) {
      return res.errorRes({ message: MessageErrors.field.username.isExist });
    }

    // Email
    const user_email = await user.findOne({
      email: req.body.email,
      status: USER_STATUS.ACTIVE,
    });
    if (user_email) {
      return res.errorRes({ message: MessageErrors.field.email.isExist });
    }

    //phone number
    const phoneNumber = req.body.phoneNumber;
    const convertPhoneNumber = convertCountryCodePhoneNumber(phoneNumber);
    const user_phoneNumber = await user.findOne({
      //$or: [{ phoneNumber: phoneNumber }, { phoneNumber: convertPhoneNumber }],
      phoneNumber: { $in: convertPhoneNumber },
      status: USER_STATUS.ACTIVE,
    });
    if (user_phoneNumber) {
      return res.errorRes({ message: MessageErrors.field.phoneNumber.isExist });
    }

    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(ResponseCodes.ServerError)
      .json({ message: MessageErrors.server.internal });
  }
};

const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //phone number
    console.log("PHONE", req.body);

    const phoneNumber = req.body.phoneNumber;
    const convertPhoneNumber = convertCountryCodePhoneNumber(phoneNumber);
    const user_phoneNumber = await user.findOne({
      $or: [{ phoneNumber: phoneNumber }, { phoneNumber: convertPhoneNumber }],
      phoneNumber: { $in: convertPhoneNumber },
      status: USER_STATUS.ACTIVE,
    });
    if (user_phoneNumber) {
      console.log("phoneNumber", phoneNumber);
      return res.json({ message: MessageErrors.field.phoneNumber.isExist });
    }

    // Email
    const user_email = await user.findOne({
      email: req.body.email,
      status: USER_STATUS.ACTIVE,
    });
    if (user_email) {
      return res.json({ message: MessageErrors.field.email.isExist });
    }
    console.log("PASS Duplicate");
    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(ResponseCodes.ServerError)
      .json({ message: MessageErrors.server.internal });
  }
};

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

const checkDuplicateUsernameOrEmailSocial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Username
    const user_username = await user.findOne({
      username: req.body.username,
      status: USER_STATUS.ACTIVE,
    });
    if (user_username) {
      return res.errorRes({ message: MessageErrors.field.username.isExist });
    }

    // Email
    const user_email = await user.findOne({
      email: req.resAuth.email,
      status: USER_STATUS.ACTIVE,
    });
    if (user_email) {
      return res.errorRes({ message: MessageErrors.field.email.isExist });
    }

    next();
  } catch (error) {
    return res.internal({ message: MessageErrors.server.internal });
  }
};

const checkVisibleFb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.successRes({ data: true });
    next();
  } catch (error) {
    return res.internal({ message: MessageErrors.server.internal });
  }
};

export const VerifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkDuplicateEmail,
  // checkVerifyAuthentication,
  checkDuplicateUsernameOrEmailSocial,
  checkVisibleFb,
};
