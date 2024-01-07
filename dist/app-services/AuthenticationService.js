"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const user_1 = require("../app-models/Users/user");
// import { UserRoleModelInterface } from "@app-repositories/models/user-role";
const types_1 = require("../app-type/types");
let AuthenticationService = class AuthenticationService {
    signIn(_user) {
        return __awaiter(this, void 0, void 0, function* () {
            delete _user.password;
            const { platform, username, phoneNumber } = _user;
            const userData = yield this.users.getUserByPhoneNumber(phoneNumber, user_1.USER_STATUS.ACTIVE);
            const { fullName, avatar, _id, email } = userData;
            const userRoleId = userData.userRoleId;
            let isDriver = false;
            if (userRoleId != null) {
                const _userRole = yield this.userRole.getUserRoleList(userRoleId);
                if (_userRole.length > 0) {
                    isDriver =
                        _userRole.filter((x) => { var _a; return ((_a = x.code) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === "driver"; })
                            .length > 0;
                }
            }
            isDriver = isDriver || userData.isDriver;
            return {
                payload: { userRoleId: _user.userRoleId, _id },
                //userRole: _userRole,
                fullName,
                avatar,
                email,
                phoneNumber,
                isDriver: isDriver,
            };
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.UserRoleService),
    __metadata("design:type", Object)
], AuthenticationService.prototype, "userRole", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.UserService),
    __metadata("design:type", Object)
], AuthenticationService.prototype, "users", void 0);
AuthenticationService = __decorate([
    (0, inversify_1.injectable)()
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
