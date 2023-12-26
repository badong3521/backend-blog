enum ResponseCodes {
  Success = 200,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
  TokenInvalid = 401,
  Timeout = 408,
  Permission = 403,
  InvalidUser = 102,
  UserLocked = 101,
  UserNotActive = 999,
  UserExits = 402,
  DeviceExits = 405,
  Expires = 406,
  Used = 407,
  UserProfileExits = 409,
  EmailNotNull = 410,
  DecryptFail = 411,
}

export default ResponseCodes;
