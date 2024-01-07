"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("../app-type/types");
const AuthController_1 = __importDefault(require("../app-controller/Controller/AuthController"));
const UserController_1 = __importDefault(require("../app-controller/Controller/UserController"));
const AuthenticationService_1 = require("../app-services/AuthenticationService");
const UserService_1 = require("../app-services/UserService");
const UserLoginService_1 = require("../app-services/UserLoginService");
const OtpService_1 = require("../app-services/OtpService");
const UserRoleService_1 = require("../app-services/UserRoleService");
const ExpiredTokensService_1 = require("../app-services/ExpiredTokensService");
const container = new inversify_1.Container();
exports.container = container;
container.bind(AuthController_1.default).toSelf();
container.bind(UserController_1.default).toSelf();
container
    .bind(types_1.TYPES.AuthenticationService)
    .to(AuthenticationService_1.AuthenticationService);
container.bind(types_1.TYPES.UserService).to(UserService_1.UserService);
container.bind(types_1.TYPES.OtpService).to(OtpService_1.OtpService);
container.bind(types_1.TYPES.UserLoginService).to(UserLoginService_1.UserLoginService);
container.bind(types_1.TYPES.UserRoleService).to(UserRoleService_1.UserRoleService);
container
    .bind(types_1.TYPES.ExpiredTokensService)
    .to(ExpiredTokensService_1.ExpiredTokensService);
