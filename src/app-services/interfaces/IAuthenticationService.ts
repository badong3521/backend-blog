import { Request, Response } from "express";
import { UserModelInterface } from "../../app-models/Users/user";

export interface IAuthenticationService {
  signIn(_user: UserModelInterface | any): Promise<any>;
}
