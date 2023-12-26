const nameProject = "BASENODEJS";
export class MailTemplateOTP {
  public static otpTitle = `Gửi mã xác nhận OTP sử dụng ${nameProject}`;

  public static otpTemplate(params: {
    fullName: string | undefined;
    otpCode: string;
    phoneNumber: string;
  }) {
    return `<div id=":6j" class="a3s aiL "><div class="adM">
		</div><div><figure><img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png" alt="" class="CToWUd"></figure></div>
		<hr>
		<p>Xin chào ${params.fullName || ""}, </p>
		<p>Chúng tôi nhận được yêu cầu đăng ký  tài khoản bởi số điện thoại ${
      params.phoneNumber
    }. Mã OTP của bạn là: </p>
		<p><strong>${params.otpCode}</strong></p>
		<p>Vui lòng không chia sẻ thông tin này cho người khác. Mọi thắc mắc xin vui lòng liên hệ <a href="tel:0333482005">0333482005</a>. Hoặc truy cập <a href="https://www.facebook.com/profile.php?id=100031857005163&mibextid=LQQJ4d" target="_blank" data-saferedirecturl="https://www.facebook.com/profile.php?id=100031857005163&mibextid=LQQJ4d"</a> </p>
		<p>Trân trọng!</p><div class="yj6qo"></div><div class="adL">
		</div></div>`;
  }
  public static otpTemplateNode(params: { fullName: string | undefined }) {
    return `<div id=":6j" class="a3s aiL "><div class="adM">
		</div><div><figure><img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png" alt="" class="CToWUd"></figure></div>
		<hr>
		<p>Xin chào ${params.fullName || ""}, </p>
		<p>Vui lòng không chia sẻ thông tin này cho người khác. Mọi thắc mắc xin vui lòng liên hệ <a href="tel:0333482005">0333482005</a>. Hoặc truy cập <a href="https://www.facebook.com/profile.php?id=100031857005163&mibextid=LQQJ4d" target="_blank" data-saferedirecturl="https://www.facebook.com/profile.php?id=100031857005163&mibextid=LQQJ4d"</a> </p>
		<p>Trân trọng!</p><div class="yj6qo"></div><div class="adL">
		</div></div>`;
  }
}

export class MailTemplateOTPChangePassword {
  public static otpForgotPasswordTitle = "OTP quên mật khẩu";
  public static otpTitle = "OTP đổi mật khẩu";

  public static otpTemplate(params: {
    fullName: string | undefined;
    otpCode: string;
    phoneNumber: string;
  }) {
    return `<div id=":6j" class="a3s aiL "><div class="adM">
		</div><div><figure><img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png" alt="" class="CToWUd"></figure></div>
		<hr>
		<p>Xin chào ${params.fullName || ""}, </p>
    <p>Chúng tôi nhận được yêu cầu đổi mật khẩu của tài khoản đăng ký bởi số điện thoại ${
      params.phoneNumber
    }. Mã OTP của bạn là: </p>
		<p><strong>${params.otpCode}</strong></p>
		<p>Vui lòng không chia sẻ thông tin này cho người khác. </p>
		<p>Cảm ơn bạn đã sử dụng dịch vụ của FRIEND.</p><div class="yj6qo"></div><div class="adL">
		</div></div>`;
  }

  public static passwordTemplate(params: {
    fullName: string | undefined;
    newPassword: string;
    phoneNumber: string;
  }) {
    return `<div id=":6j" class="a3s aiL "><div class="adM">
		</div><div><figure><img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png" alt="" class="CToWUd"></figure></div>
		<hr>
		<p>Xin chào ${params.fullName || ""}, </p>
    <p>${nameProject} gửi bạn mật khẩu mới cho tài khoản ${
      params.phoneNumber
    }. Mật khẩu mới của bạn là: </p>
		<p><strong>${params.newPassword}</strong></p>
		<p>Vui lòng không chia sẻ thông tin này cho người khác. </p>
		<p>Cảm ơn bạn đã sử dụng dịch vụ của ${nameProject}.</p><div class="yj6qo"></div><div class="adL">
		</div></div>`;
  }
}
