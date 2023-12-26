import { injectable } from "inversify";
import _ from "lodash";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { isNil } from "lodash";
import moment from "moment";
import { IUserService } from "./interfaces/IUserService";
import user, { UserModelInterface } from "../app-models/Users/user";
import { USER_STATUS } from "@app-common/constant/userConstant";
import {
  convertCountryCodePhoneNumber,
  convertCountryCodeTo84,
  isNullOrEmpty,
} from "@app-helpers/String.helper";
import OtpHelper, { stringGenerator } from "@app-helpers/otp.helper";
import logger from "@app-helpers/logger";
import { SendEmail } from "@app-utils/smtp";
import { MailTemplateOTP } from "@app-utils/smtp/MailTemplate";
import _userlogin from "../app-models/Users/user-login";

async function uniqueCode(): Promise<any> {
  const code = stringGenerator(6);
  const check = await user.find({ code });
  if (check.length === 0) return code;
  return await uniqueCode();
}

@injectable()
export class UserService implements IUserService {
  async createUser(_user: UserModelInterface) {
    //Tìm user ở trạng thái INACTIVE
    const user_phoneNumber: any = await this.getUserByPhoneNumber(
      _user.phoneNumber,
      USER_STATUS.INACTIVE
    );

    if (!isNullOrEmpty(user_phoneNumber)) {
      _user.phoneNumber = convertCountryCodeTo84(_user.phoneNumber).toString();
      const userData = this.updateUser(user_phoneNumber._id, _user);
      return userData;
    } else {
      const hashPassword = await bcrypt.hash(_user.password, 10);
      _user.code = await uniqueCode();
      _user.password = hashPassword;
      _user.phoneNumber = convertCountryCodeTo84(_user.phoneNumber).toString();
      const userData: UserModelInterface = await user.create(_user);
      return userData;
    }
  }
  async deleteUserLogin(userId: Types.ObjectId) {
    const result = await _userlogin.deleteMany({
      userId: userId,
    });

    return result;
  }
  async getUserByPhoneNumber(phoneNumber: string, status: USER_STATUS) {
    const convertPhoneNumber = convertCountryCodePhoneNumber(phoneNumber);
    //Tìm user ở trạng thái INACTIVE
    return await user.findOne({
      phoneNumber: { $in: convertPhoneNumber },
      status: status,
    });
  }
  async getUser(_user: object) {
    const data = await user.findOne(_user);
    if (!data) return;
    return data;
  }
  async updateUser(_id: Types.ObjectId, _user: UserModelInterface) {
    const {
      fullName,
      personalId,
      address,
      gender,
      dob,
      avatar,
      email,
      phoneNumber,
      note,
      autoOrderConfirm,
    } = _user;

    const data = await this.userInfo(_id);

    if (!data) {
      return;
    }

    const updateFields: any = {
      fullName: fullName,
      personalId: personalId,
      address: address,
      gender: gender,
      dob: dob,
      avatar: avatar,
      email: !isNil(email) && email !== "" ? email : data.email,
      phoneNumber:
        !isNil(phoneNumber) && phoneNumber !== ""
          ? phoneNumber
          : data.phoneNumber,
      note,
      autoOrderConfirm: autoOrderConfirm || false,
    };

    for (const key in updateFields) {
      if (isNullOrEmpty(updateFields[key]) && key !== "address") {
        delete updateFields[key];
      } else {
        if (key === "dob") {
          updateFields[key] = moment(`${dob} 07:00`, "YYYY/MM/DD HH:mm");
        }
      }
    }
    await user.findOneAndUpdate(
      { _id },
      { $set: { ...updateFields } },
      { new: true, useFindAndModify: false }
    );

    return { ...updateFields, _id, dob };
  }
  async userInfo(_id: Types.ObjectId) {
    const data = await user
      .findOne(_id)
      .populate({ path: "username", select: "fullName _id" });

    if (!data) {
      return console.log("not UserInfo data");
    }

    return data;
  }

  async toggleActivateUser(
    _id: Array<Types.ObjectId>,
    status: number
  ): Promise<number> {
    const data: UserModelInterface[] = await user.find({
      _id: {
        $in: _id.map((item: any) => {
          return new Types.ObjectId(item);
        }),
      },
    });

    if (data.length < _id.length || _.isEmpty(data)) {
      return 0;
    }

    const result = await user.updateMany(
      {
        _id: {
          $in: _id.map((item: any) => {
            return new Types.ObjectId(item);
          }),
        },
      },
      {
        $set: {
          status: status === 1 ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE,
        },
      },
      {
        new: true,
      }
    );

    if (!result || _.isEmpty(result)) {
      return 0;
    }

    return _id.length;
  }
  async updateUserByFields(_id: string, _user: any) {
    await user.updateOne(
      { _id: new Types.ObjectId(_id) },
      { $set: { ..._user } }
    );
  }

  async sendOtpSignUp(
    email: any,
    title = "(BaseNodejs) nhập OTP để tạo tài khoản."
  ): Promise<any> {
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
      await SendEmail.nodeMailerSendMail(
        [email],
        title,
        MailTemplateOTP.otpTemplateNode({
          fullName: "BASENODE JS",
        })
      );
      // return userdetail;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
