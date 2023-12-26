import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../app-type/types";
import AuthenticationUserController from "../app-controller/Controller/AuthController";
import UserController from "../app-controller/Controller/UserController";

import { AuthenticationService } from "../app-services/AuthenticationService";
import { UserService } from "../app-services/UserService";
import { UserLoginService } from "@app-services/UserLoginService";
import { OtpService } from "@app-services/OtpService";
import { UserRoleService } from "@app-services/UserRoleService";
import { ExpiredTokensService } from "@app-services/ExpiredTokensService";

import { IUserLoginService } from "@app-services/interfaces/IUserLoginService";
import { IAuthenticationService } from "@app-services/interfaces/IAuthenticationService";
import { IUserService } from "@app-services/interfaces/IUserService";
import { IOtpService } from "@app-services/interfaces/IOtpService";
import { IUserRoleService } from "@app-services/interfaces/IUserRoleService";
import { IExpiredTokensService } from "@app-services/interfaces/IExpiredTokensService";

const container = new Container();

container.bind(AuthenticationUserController).toSelf();
container.bind(UserController).toSelf();

container
  .bind<IAuthenticationService>(TYPES.AuthenticationService)
  .to(AuthenticationService);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IOtpService>(TYPES.OtpService).to(OtpService);
container.bind<IUserLoginService>(TYPES.UserLoginService).to(UserLoginService);
container.bind<IUserRoleService>(TYPES.UserRoleService).to(UserRoleService);
container
  .bind<IExpiredTokensService>(TYPES.ExpiredTokensService)
  .to(ExpiredTokensService);

export { container };
