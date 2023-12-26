import { Request as RequestEX } from "express";
// import { discordLogger } from "@app-apis/middlewares";
import {
  Response,
  ErrorResParamType,
  BadRequestParamType,
  ForbiddenRequestParamType,
  UnauthorizedRequestParamType,
  InternalRequestParamType,
} from "../httpExtends";
import MessageErrors from "@app-common/MessageErrors";

const httpResponse = (req: RequestEX, res: Response, next: () => void) => {
  res.successRes = function ({
    data = {},
    errorCode = 0,
    message = MessageErrors.server.success,
  }) {
    //discordLogger(req as any, "success");
    return res.json({
      errorCode,
      message,
      data,
      errors: [],
    });
  };

  res.errorRes = function ({
    errorCode,
    message,
    data,
    errors,
  }: ErrorResParamType = {}) {
    errorCode = errorCode || -1;
    message = message || MessageErrors.server.error;
    data = data || {};
    errors = errors || [];

    return res.json({
      errorCode,
      message,
      data,
      errors,
    });
  };

  res.badRequest = function ({
    message = MessageErrors.server.badRequest,
  }: BadRequestParamType = {}) {
    return res.status(400).errorRes({ errorCode: 400, message: message });
  };

  res.forbidden = function ({
    message = MessageErrors.server.forbidden,
  }: ForbiddenRequestParamType = {}) {
    return res.status(403).errorRes({ errorCode: 403, message: message });
  };

  res.unauthorize = function ({
    message = MessageErrors.server.unauthorize,
  }: UnauthorizedRequestParamType = {}) {
    return res.status(401).errorRes({ errorCode: 401, message: message });
  };

  // res.internal = function ({
  //   message = MessageErrors.server.internal,
  //   error,
  // }: InternalRequestParamType = {}) {
  //   discordLogger(req as any, error);

  //   return res.status(500).errorRes({ errorCode: 500, message: message });
  // };

  next();
};

export default httpResponse;
