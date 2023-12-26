"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUUID = exports.formatCurrency = exports.isPasswordValid = exports.isEmail = exports.isMobile = exports.convertCountryCodePhoneNumber = exports.convertCountryCodeTo84 = exports.convertCountryCodeToZero = exports.formatDateTime = exports.cleanObject = exports.formatInput = exports.isNullOrEmpty = void 0;
const _ = require("lodash");
const isNullOrEmpty = (str) => {
    return str === "" || str === null || str === undefined;
};
exports.isNullOrEmpty = isNullOrEmpty;
const formatInput = (data, defaultValue) => {
    return _.isNil(data) ? defaultValue : data;
};
exports.formatInput = formatInput;
const cleanObject = (obj) => {
    for (const key in obj) {
        if (_.isNil(obj[key])) {
            delete obj[key];
        }
    }
    return obj;
};
exports.cleanObject = cleanObject;
const formatDateTime = (data) => {
    const date = Date.parse(data);
    if (isNaN(date)) {
        return null;
    }
    return new Date(date);
};
exports.formatDateTime = formatDateTime;
const convertCountryCodeToZero = (str) => {
    if (str.substring(0, 3) === "+84") {
        str = str.replace("+84", "0");
    }
    else if (str.substring(0, 1) === "0") {
        str = str.slice(1);
        str = "+84" + str;
    }
    return str;
};
exports.convertCountryCodeToZero = convertCountryCodeToZero;
const convertCountryCodeTo84 = (str) => {
    if (str.substring(0, 3) === "+84") {
        str = str.replace("+84", "84");
    }
    else if (str.substring(0, 4) === "0084") {
        str = str.slice(4);
        str = "84" + str;
    }
    else if (str.substring(0, 1) === "0") {
        str = str.slice(1);
        str = "84" + str;
    }
    return str;
};
exports.convertCountryCodeTo84 = convertCountryCodeTo84;
const convertCountryCodePhoneNumber = (str) => {
    let phoneList = [str];
    if (str.substring(0, 3) === "+84") {
        str = str.slice(3);
        phoneList = [...phoneList, "0" + str, "84" + str, "0084" + str];
    }
    else if (str.substring(0, 1) === "0" && str.substring(0, 2) !== "00") {
        str = str.slice(1);
        phoneList = [...phoneList, "+84" + str, "84" + str, "0084" + str];
    }
    else if (str.substring(0, 4) === "0084") {
        str = str.slice(4);
        phoneList = [...phoneList, "+84" + str, "84" + str, "0" + str];
    }
    else if (str.substring(0, 2) === "84") {
        str = str.slice(2);
        phoneList = [...phoneList, "+84" + str, "0" + str, "0084" + str];
    }
    return phoneList;
};
exports.convertCountryCodePhoneNumber = convertCountryCodePhoneNumber;
const isMobile = (phoneNumber = "") => {
    return new RegExp(/^[0]{1}[0-9]{9}$/).test(phoneNumber);
};
exports.isMobile = isMobile;
const isEmail = (email = "") => {
    return new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
};
exports.isEmail = isEmail;
const isPasswordValid = (password = "") => {
    // return new RegExp(
    //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*()]{8,16}$/
    return new RegExp(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()]{6,16}$/).test(password);
};
exports.isPasswordValid = isPasswordValid;
const formatCurrency = (n, currency = "VND") => {
    if (currency === "VND") {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return n.toString();
};
exports.formatCurrency = formatCurrency;
const createUUID = () => {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
};
exports.createUUID = createUUID;
