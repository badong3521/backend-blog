import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "@app-type/UserType/user";
import ResponseCodes from "@app-type/ResCode/resCode";

const ACCESS_TOKEN_SECRET: string | undefined = process.env.ACCESS_TOKEN_SECRET;

const AuthVerifyTokenJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { headers }: any = req;
    const token = headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(ResponseCodes.TokenInvalid)
        .json({ message: "Authentication failed, not token!" });
    }
    const decodedToken = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET"
    ) as User[];

    const userData: User[] = decodedToken;
    (req as any).userData = userData;
    next();
  } catch (err) {
    return res
      .status(ResponseCodes.TokenInvalid)
      .json({ message: "Authentication failed verify:", err });
  }
};

export default AuthVerifyTokenJWT;
