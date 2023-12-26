"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherHelper = void 0;
const lodash_1 = __importDefault(require("lodash"));
const crypto_1 = __importDefault(require("crypto"));
const OtherHelper = () => {
    const sortByKeys = (object) => {
        const keys = Object.keys(object);
        const sortedKeys = lodash_1.default.sortBy(keys);
        return lodash_1.default.fromPairs(lodash_1.default.map(sortedKeys, (key) => [key, object[key]]));
    };
    const changeAlias = (alias) => {
        let str = alias;
        if (alias) {
            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
        }
        return str;
    };
    const changeAliasWithOutWhiteSpaces = (alias) => {
        let str = alias;
        if (alias) {
            str = str.toLowerCase();
            str = str.replace(/\s/g, "");
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
        }
        return str;
    };
    const getSHA1 = (str) => {
        return crypto_1.default.createHash("sha1").update(str).digest("hex");
    };
    const toNumber = (str, defaultVal = 0) => {
        let num = Number(str);
        if (Number.isNaN(num))
            num = defaultVal;
        return num;
    };
    const replaceAll = (str, find, replace) => {
        return str.replace(new RegExp(find, "g"), replace);
    };
    return {
        sortByKeys,
        changeAlias,
        changeAliasWithOutWhiteSpaces,
        getSHA1,
        toNumber,
        replaceAll,
    };
};
exports.OtherHelper = OtherHelper;
