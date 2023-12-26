"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailTemplateOTPChangePassword = exports.MailTemplateOTP = void 0;
class MailTemplateOTP {
    static otpTemplate(params) {
        return `<div id=":6j" class="a3s aiL "><div class="adM">
		</div><div><figure><img src="https://ci3.googleusercontent.com/proxy/MiRGng5B4LgpRL1DYviIzfdXF0iuWdyT1dvYo35iXdZnIZmSGPlWTDVWVfmzkndbmf9l-qlhISZs6121E2ghOoDzyr5ohh5FNCzlHTvKGbs=s0-d-e1-ft#https://dangky.obx.vn/wp-content/uploads/2021/12/Group-34.png" alt="" class="CToWUd"></figure></div>
		<hr>
		<p>Xin chào ${params.fullName || ""}, </p>
		<p>Mã OTP của bạn là <strong>${params.otpCode}</strong></p>
		<p>Vui lòng không chia sẻ thông tin này cho người khác. Mọi thắc mắc xin vui lòng liên hệ <a href="tel:18006584">1800 6584</a>. Hoặc truy cập <a href="http://www.obx.vn/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.obx.vn/&amp;source=gmail&amp;ust=1649670522723000&amp;usg=AOvVaw3ltmoAEyb7_MRvwiOpcjPw">www.obx.vn</a> </p>
		<p>Trân trọng!</p><div class="yj6qo"></div><div class="adL">
		</div></div>`;
    }
}
exports.MailTemplateOTP = MailTemplateOTP;
MailTemplateOTP.otpTitle = "Gửi mã xác nhận OTP sử dụng ONEBOX";
class MailTemplateOTPChangePassword {
    static otpTemplate(params) {
        return `<div id=":6j" class="a3s aiL "><div class="adM">
		</div><div><figure><img src="https://ci3.googleusercontent.com/proxy/MiRGng5B4LgpRL1DYviIzfdXF0iuWdyT1dvYo35iXdZnIZmSGPlWTDVWVfmzkndbmf9l-qlhISZs6121E2ghOoDzyr5ohh5FNCzlHTvKGbs=s0-d-e1-ft#https://dangky.obx.vn/wp-content/uploads/2021/12/Group-34.png" alt="" class="CToWUd"></figure></div>
		<hr>
		<p>Xin chào ${params.fullName || ""}, </p>
    <p>Chúng tôi nhận được yêu cầu đổi mật khẩu của tài khoản đăng ký bởi số điện thoại ${params.phoneNumber}. Mã OTP của bạn là: </p>
		<p><strong>${params.otpCode}</strong></p>
		<p>Vui lòng không chia sẻ thông tin này cho người khác. </p>
		<p>Cảm ơn bạn đã sử dụng dịch vụ của ONEBOX.</p><div class="yj6qo"></div><div class="adL">
		</div></div>`;
    }
    static passwordTemplate(params) {
        return `<div id=":6j" class="a3s aiL "><div class="adM">
		</div><div><figure><img src="https://ci3.googleusercontent.com/proxy/MiRGng5B4LgpRL1DYviIzfdXF0iuWdyT1dvYo35iXdZnIZmSGPlWTDVWVfmzkndbmf9l-qlhISZs6121E2ghOoDzyr5ohh5FNCzlHTvKGbs=s0-d-e1-ft#https://dangky.obx.vn/wp-content/uploads/2021/12/Group-34.png" alt="" class="CToWUd"></figure></div>
		<hr>
		<p>Xin chào ${params.fullName || ""}, </p>
    <p>ONEBOX gửi bạn mật khẩu mới cho tài khoản ${params.phoneNumber}. Mật khẩu mới của bạn là: </p>
		<p><strong>${params.newPassword}</strong></p>
		<p>Vui lòng không chia sẻ thông tin này cho người khác. </p>
		<p>Cảm ơn bạn đã sử dụng dịch vụ của ONEBOX.</p><div class="yj6qo"></div><div class="adL">
		</div></div>`;
    }
}
exports.MailTemplateOTPChangePassword = MailTemplateOTPChangePassword;
MailTemplateOTPChangePassword.otpForgotPasswordTitle = "OTP quên mật khẩu";
MailTemplateOTPChangePassword.otpTitle = "OTP đổi mật khẩu";
