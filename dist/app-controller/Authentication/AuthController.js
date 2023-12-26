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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const bcrypt_1 = __importDefault(require("bcrypt"));
const types_1 = require("../../app-type/types");
const user_1 = __importDefault(require("../../app-models/Users/user"));
const helpFc_1 = require("../../app-utils/helpFc");
const http_extends_1 = require("../../app-helpers/http.extends");
const logger_1 = __importDefault(require("../../app-helpers/logger"));
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["USER"] = "user";
})(USER_ROLE || (USER_ROLE = {}));
let AuthenticationUserController = class AuthenticationUserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, http_extends_1.validationRequest)(req);
            if (!result.isEmpty()) {
                return res.errorRes({ errors: result.array() });
            }
            try {
                // const { phoneNumber, username, email, fullName, userRoleId } = req.body;
                // req.body.username = phoneNumber;
                // if (!userRoleId) {
                //   const userRoleName = USER_ROLE.USER;
                //   const _userRole = await this.userRoleService.getUserRole({
                //     name: userRoleName,
                //   });
                //   const userRole = [_userRole[0]._id];
                //   req.body.userRoleId = userRole;
                // }
                // const data = await this.userService.createUser({
                //   ...req.body,
                // });
                // // const newOtp = await this.otpService.generateOtpSendZalo(data);
                // return res.successRes({
                //   data: {
                //     _id: data._id,
                //     username: username || phoneNumber,
                //     email,
                //     phoneNumber,
                //     createdBy: data.createdBy,
                //     updatedBy: data.updatedBy,
                //     avatar: data.avatar,
                //     fullName,
                //     // hash: newOtp,
                //   },
                // });
            }
            catch (error) {
                logger_1.default.error(error);
                return res.internal({});
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const usersDb = yield user_1.default.find();
                const user = usersDb.find((u) => u.username === username);
                //   const userRes = usersDb.find((user: any) => (user.username = username));
                if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
                    return res.status(401).json({ message: "Authentication failed!" });
                }
                const { token, refreshToken } = (0, helpFc_1.generateToken)({
                    _id: user._id,
                    username: user.username,
                });
                const updateUserDb = yield user_1.default.findOneAndUpdate({ username: username }, { token: token, refreshToken: refreshToken }, { projection: { _id: 1, username: 1, token: 1, refreshToken: 1 } });
                return res.json(updateUserDb);
            }
            catch (error) {
                console.log("ERROR Insert mongoDb:", error);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("REQUEST: ", req.userData);
                const { userData } = req;
                yield user_1.default.findByIdAndUpdate({ _id: userData._id }, { token: "" });
                return res.json();
            }
            catch (error) {
                console.log("ERROR Insert mongoDb:", error);
            }
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.AuthenticationService),
    __metadata("design:type", Object)
], AuthenticationUserController.prototype, "authenticationService", void 0);
AuthenticationUserController = __decorate([
    (0, inversify_1.injectable)()
], AuthenticationUserController);
exports.default = AuthenticationUserController;
