"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserService = void 0;
const inversify_1 = require("inversify");
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const lodash_2 = require("lodash");
const moment_1 = __importDefault(require("moment"));
const user_1 = __importDefault(require("../app-models/Users/user"));
const userConstant_1 = require("../app-common/constant/userConstant");
const String_helper_1 = require("../app-helpers/String.helper");
const otp_helper_1 = require("../app-helpers/otp.helper");
const logger_1 = __importDefault(require("../app-helpers/logger"));
const smtp_1 = require("../app-utils/smtp");
const MailTemplate_1 = require("../app-utils/smtp/MailTemplate");
const user_login_1 = __importDefault(require("../app-models/Users/user-login"));
function uniqueCode() {
    return __awaiter(this, void 0, void 0, function* () {
        const code = (0, otp_helper_1.stringGenerator)(6);
        const check = yield user_1.default.find({ code });
        if (check.length === 0)
            return code;
        return yield uniqueCode();
    });
}
let UserService = class UserService {
    createUser(_user) {
        return __awaiter(this, void 0, void 0, function* () {
            //Tìm user ở trạng thái INACTIVE
            const user_phoneNumber = yield this.getUserByPhoneNumber(_user.phoneNumber, userConstant_1.USER_STATUS.INACTIVE);
            if (!(0, String_helper_1.isNullOrEmpty)(user_phoneNumber)) {
                _user.phoneNumber = (0, String_helper_1.convertCountryCodeTo84)(_user.phoneNumber).toString();
                const userData = this.updateUser(user_phoneNumber._id, _user);
                return userData;
            }
            else {
                const hashPassword = yield bcryptjs_1.default.hash(_user.password, 10);
                _user.code = yield uniqueCode();
                _user.password = hashPassword;
                _user.phoneNumber = (0, String_helper_1.convertCountryCodeTo84)(_user.phoneNumber).toString();
                const userData = yield user_1.default.create(_user);
                return userData;
            }
        });
    }
    deleteUserLogin(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_login_1.default.deleteMany({
                userId: userId,
            });
            return result;
        });
    }
    getUserByPhoneNumber(phoneNumber, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const convertPhoneNumber = (0, String_helper_1.convertCountryCodePhoneNumber)(phoneNumber);
            //Tìm user ở trạng thái INACTIVE
            return yield user_1.default.findOne({
                phoneNumber: { $in: convertPhoneNumber },
                status: status,
            });
        });
    }
    getUser(_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield user_1.default.findOne(_user);
            if (!data)
                return;
            return data;
        });
    }
    updateUser(_id, _user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, personalId, address, gender, dob, avatar, email, phoneNumber, note, autoOrderConfirm, } = _user;
            const data = yield this.userInfo(_id);
            if (!data) {
                return;
            }
            const updateFields = {
                fullName: fullName,
                personalId: personalId,
                address: address,
                gender: gender,
                dob: dob,
                avatar: avatar,
                email: !(0, lodash_2.isNil)(email) && email !== "" ? email : data.email,
                phoneNumber: !(0, lodash_2.isNil)(phoneNumber) && phoneNumber !== ""
                    ? phoneNumber
                    : data.phoneNumber,
                note,
                autoOrderConfirm: autoOrderConfirm || false,
            };
            for (const key in updateFields) {
                if ((0, String_helper_1.isNullOrEmpty)(updateFields[key]) && key !== "address") {
                    delete updateFields[key];
                }
                else {
                    if (key === "dob") {
                        updateFields[key] = (0, moment_1.default)(`${dob} 07:00`, "YYYY/MM/DD HH:mm");
                    }
                }
            }
            yield user_1.default.findOneAndUpdate({ _id }, { $set: Object.assign({}, updateFields) }, { new: true, useFindAndModify: false });
            return Object.assign(Object.assign({}, updateFields), { _id, dob });
        });
    }
    userInfo(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield user_1.default
                .findOne(_id)
                .populate({ path: "username", select: "fullName _id" });
            if (!data) {
                return console.log("not UserInfo data");
            }
            return data;
        });
    }
    toggleActivateUser(_id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield user_1.default.find({
                _id: {
                    $in: _id.map((item) => {
                        return new mongoose_1.Types.ObjectId(item);
                    }),
                },
            });
            if (data.length < _id.length || lodash_1.default.isEmpty(data)) {
                return 0;
            }
            const result = yield user_1.default.updateMany({
                _id: {
                    $in: _id.map((item) => {
                        return new mongoose_1.Types.ObjectId(item);
                    }),
                },
            }, {
                $set: {
                    status: status === 1 ? userConstant_1.USER_STATUS.ACTIVE : userConstant_1.USER_STATUS.INACTIVE,
                },
            }, {
                new: true,
            });
            if (!result || lodash_1.default.isEmpty(result)) {
                return 0;
            }
            return _id.length;
        });
    }
    updateUserByFields(_id, _user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(_id) }, { $set: Object.assign({}, _user) });
        });
    }
    sendOtpSignUp(email, title = "(BaseNodejs) nhập OTP để tạo tài khoản.") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const newPassword = OtpHelper.generateCode();
                // const userdetail = await user.findOne(
                //   {
                //     _id: new Types.ObjectId(userId),
                //     status: USER_STATUS.ACTIVE,
                //   },
                //   { email: 1, fullName: 1, phoneNumber: 1 }
                // );
                // const { email } = body;
                // const index = userdetail.phoneNumber.length - 4;
                // const phoneNumber = userdetail.phoneNumber.substring(index);
                // const password = await bcrypt.hash(newPassword, 10);
                // if (!isNullOrEmpty(userdetail)) {
                //   await user.updateOne(
                //     {
                //       _id: userdetail._id,
                //     },
                //     {
                //       $set: {
                //         password: password,
                //         new: true,
                //         useFindAndModify: false,
                //       },
                //     }
                //   );
                // } else {
                //   return;
                // }
                yield smtp_1.SendEmail.nodeMailerSendMail([email], title, MailTemplate_1.MailTemplateOTP.otpTemplateNode({
                    fullName: "BASENODE JS",
                }));
                // return userdetail;
            }
            catch (err) {
                logger_1.default.error(err);
                throw err;
            }
        });
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)()
], UserService);
exports.UserService = UserService;
