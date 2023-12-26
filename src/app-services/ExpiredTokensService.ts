// import { parseJwt } from '@app-helpers/Token.helper';
import expiredTokens, {
  ExpiredTokensModelInterface,
} from "../app-models/Users/expired-tokens";
// import _user from "@app-repositories/models/user";
import { injectable } from "inversify";
import { Types } from "mongoose";

@injectable()
export class ExpiredTokensService {
  async create(
    token: string,
    userId: string
  ): Promise<ExpiredTokensModelInterface> {
    // const { currentTime } = parseJwt(token);

    // const startTime = new Date(currentTime);

    // const tokenLimitTime = 60 * 24 * 60 * 60;

    // const endTime = new Date();

    // const expiredAfterSeconds = tokenLimitTime - (endTime.getTime() - startTime.getTime());

    const data: ExpiredTokensModelInterface = await expiredTokens.create({
      token,
      user: new Types.ObjectId(userId),
    });

    return data;
  }

  async get(token: string): Promise<ExpiredTokensModelInterface> {
    const data: any = await expiredTokens.findOne({
      token,
    });

    return data;
  }
}
