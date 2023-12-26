export const REFUND_HOUR = 0.25;
export enum PackageType {
  ELECTRONIC = 2,
  STATIONERY = 3,
  DOCUMENT = 4,
  FRAGILE = 5,
  OTHER = 1,
}

// TODO: update these status
export enum PAYMENT_STATUS { // payment status
  PENDING = 1, //Chưa thanh toán
  SENT = 2, // Đang thanh toán
  COMPLETED = 3, // Thành công
  FALSE = 4, // Thất bại
  CANCELED = 5, // Bỏ qua
  EXPIRED = 6, // Hết hạn
}

export enum ORDER_STATUS {
  PENDING = 1, //Tạo đơn
  WAITING_FOR_SHIPPER = 2, //Chờ tài xế
  PRODUCT_IMPORTING = 3, //Chờ để hàng vào
  PRODUCT_EXPORTING = 4, // Chờ lấy hàng ra
  EXPIRED = 5, // Hết hạn
  COMPLETED = 6, //Hoàn thành
  CANCELED = 7, //Bị hủy
  REVOKED = 8, // Thu hồi
  LOCKED = 9, // Bị khóa
  CONFIRM_FALSE = 10, // Xác nhận thất bại
  END_BY_ADMIN = 11, //Kết thúc bởi Admin
  RECALLED = 12, // Đã Thu hồi
}
export enum CONFIRM_STATUS { // KHÁCH hàng xác nhận
  APPROVE = 1,
  REJECT = 2,
}

export enum CANCEL_BY {
  SYSTEM = "-1",
  CUSTOMER = "1",
  DRIVER = "2",
}
export enum CANCEL_REASON {
  PAYMENT_FALE = "do thanh toán thất bại",
  CUSTOMER_NOT_IMPORT = "do khách hàng không sử dụng tủ",
}
export enum CREATED_BY {
  CUSTOMER = "1",
  DRIVER = "2",
}
export enum ORDER_STATUS_ICON_LINK { // payment status
  ICON_DEFAULT = "https://obximage.s3.amazonaws.com/ic_avatar.png",
  L_SUCCESS = "https://obximage.s3.amazonaws.com/ic_order_box_l1.png",
  L_DISABLE = "https://obximage.s3.amazonaws.com/ic_order_box_l_disable.png",
  L_ERROR = "https://obximage.s3.amazonaws.com/ic_order_box_l_error.png",
  M_SUCCESS = "https://obximage.s3.amazonaws.com/ic_order_box_m.png",
  M_DISABLE = "https://obximage.s3.amazonaws.com/ic_order_box_m_disable.png",
  M_ERROR = "https://obximage.s3.amazonaws.com/ic_order_box_m_error.png",
  S_SUCCESS = "https://obximage.s3.amazonaws.com/ic_order_box_s.png",
  S_DISABLE = "https://obximage.s3.amazonaws.com/ic_order_box_s_disable.png",
  S_ERROR = "https://obximage.s3.amazonaws.com/ic_order_box_s_error.png",
}
