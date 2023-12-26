export enum AdvertisementStatus {
  Inactive,
  Active,
}

export enum PartnerStatus {
  Inactive,
  Active,
}

export enum DiscountStatus {
  Inactive,
  Active,
}

export enum Gender {
  Male,
  Female,
  Other,
}

export enum VerificationMethod {
  Mail,
  Sms,
}

export enum OrderSort {
  ExpireSoon,
  ExpireLate,
  Newest,
  Oldest,
}
export enum LCDApi {
  Heart = "heart",
  AccessCodeCheck = "accessCodeCheck",
  GetDoorStatus = "getDoorStatus",
  UnLookDoor = "unLockDoor",
  GetEWallet = "getEWallet",
  PaymentInformation = "paymentInformation",
  PaymentStatus = "paymentStatus",
  GetPhoneQRCode = "getPhoneQRCode",
  Banner = "banner",
  NewOrder = "newOrder",
  ListOrder = "listOrder",
}

export enum ZaloTemplate {
  OrderAfterOTP = "248266",
  OrderOTP = "228688",
  SignUpOTP = "229248",
  OrderConfirm = "240142",
  Mainten = "249288",
}
