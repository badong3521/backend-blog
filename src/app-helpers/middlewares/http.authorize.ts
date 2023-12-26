import jwt = require("jsonwebtoken");
import { Response, Request } from "../httpExtends";
import { RANDOM_TOKEN_SECRET } from "@app-configs";

const httpAuthorize = (req: Request, res: Response, next: () => void) => {
  try {
    if (!req.headers.authorization) {
      return res.unauthorize();
    }

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
    const { userId }: any = decodedToken;
    req.auth = {
      userId,
    };

    if (req.body.userId && req.body.userId !== userId) {
      return res.unauthorize();
    } else {
      next();
    }
  } catch (error) {
    return res.unauthorize();
  }
};

export default httpAuthorize;
