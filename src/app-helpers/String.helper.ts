import _ = require("lodash");

export const isNullOrEmpty = (str: string | null | undefined) => {
  return str === "" || str === null || str === undefined;
};

export const formatInput = (data: any, defaultValue: any) => {
  return _.isNil(data) ? defaultValue : data;
};

export const cleanObject = (obj: any) => {
  for (const key in obj) {
    if (_.isNil(obj[key])) {
      delete obj[key];
    }
  }

  return obj;
};

export const formatDateTime = (data: any): Date | null => {
  const date = Date.parse(data);

  if (isNaN(date)) {
    return null;
  }

  return new Date(date);
};

export const convertCountryCodeToZero = (str: String) => {
  if (str.substring(0, 3) === "+84") {
    str = str.replace("+84", "0");
  } else if (str.substring(0, 1) === "0") {
    str = str.slice(1);
    str = "+84" + str;
  }
  return str;
};

export const convertCountryCodeTo84 = (str: String) => {
  if (str.substring(0, 3) === "+84") {
    str = str.replace("+84", "84");
  } else if (str.substring(0, 4) === "0084") {
    str = str.slice(4);
    str = "84" + str;
  } else if (str.substring(0, 1) === "0") {
    str = str.slice(1);
    str = "84" + str;
  }
  return str;
};

export const convertCountryCodePhoneNumber = (str: String) => {
  let phoneList = [str];
  if (str.substring(0, 3) === "+84") {
    str = str.slice(3);
    phoneList = [...phoneList, "0" + str, "84" + str, "0084" + str];
  } else if (str.substring(0, 1) === "0" && str.substring(0, 2) !== "00") {
    str = str.slice(1);
    phoneList = [...phoneList, "+84" + str, "84" + str, "0084" + str];
  } else if (str.substring(0, 4) === "0084") {
    str = str.slice(4);
    phoneList = [...phoneList, "+84" + str, "84" + str, "0" + str];
  } else if (str.substring(0, 2) === "84") {
    str = str.slice(2);
    phoneList = [...phoneList, "+84" + str, "0" + str, "0084" + str];
  }
  return phoneList;
};

export const isMobile = (phoneNumber = ""): boolean => {
  return new RegExp(/^[0]{1}[0-9]{9}$/).test(phoneNumber);
};

export const isEmail = (email = ""): boolean => {
  return new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
};

export const isPasswordValid = (password = ""): boolean => {
  // return new RegExp(
  //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*()]{8,16}$/
  return new RegExp(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()]{6,16}$/).test(password);
};

export const formatCurrency = (n: number, currency = "VND"): string => {
  if (currency === "VND") {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return n.toString();
};

export const createUUID = (): string => {
  let dt: number = new Date().getTime();
  const uuid: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (c) => {
      const r: number = (dt + Math.random() * 16) % 16 | 0;

      dt = Math.floor(dt / 16);

      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
};
