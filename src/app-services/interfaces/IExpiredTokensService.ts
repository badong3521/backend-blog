import { ExpiredTokensModelInterface } from "@app-models/Users/expired-tokens";

export interface IExpiredTokensService {
  create(token: string, userId: string): Promise<ExpiredTokensModelInterface>;
}
