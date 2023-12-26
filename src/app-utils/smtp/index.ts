import {
  ACCESS_KEY_ID,
  API_VERSION,
  REGION,
  SECRET_ACCESS_KEY,
  SOURCE,
  EMAIL_PASSWORD,
  EMAIL_USER,
} from "@app-configs";
import logger from "@app-helpers/logger";
import * as AWS from "aws-sdk";
import nodemailer = require("nodemailer");

export class SendEmail {
  public static initConfiguration() {
    const sesConfig = {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
      apiVersion: API_VERSION,
    };

    const sesAws = new AWS.SES(sesConfig);

    return sesAws;
  }

  public static async sendEmail(
    toAddresses: Array<string>,
    subject: string,
    body: string
  ) {
    const params = {
      Destination: {
        ToAddresses: [...toAddresses],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: body,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: SOURCE,
    };

    const sesAws = this.initConfiguration();

    const sendPromise = sesAws.sendEmail(params).promise();

    return await sendPromise;
  }

  public static async nodeMailer() {
    try {
      //gmail
      const transporter = nodemailer.createTransport({
        // config mail server
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: EMAIL_USER, //Tài khoản gmail vừa tạo
          pass: EMAIL_PASSWORD, //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
      // const transporter = nodemailer.createTransport({
      //   host: "smtp.office365.com",
      //   port: "587",
      //   auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
      //   secureConnection: true,
      //   tls: { rejectUnauthorized: false },
      // });
      return transporter;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  public static async nodeMailerSendMail(
    toAddresses: string[],
    subject: string,
    body: string
  ) {
    try {
      const mainOptions = {
        // thiết lập đối tượng, nội dung gửi mail
        from: SOURCE,
        to: toAddresses.toString(),
        subject: subject,
        // text: body, //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: body,
      };
      const transporter = await this.nodeMailer();

      await transporter.sendMail(mainOptions);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
