import _ from "lodash";
import crypto from "crypto";

export const OtherHelper = () => {
  const sortByKeys = (object: { [x: string]: any }) => {
    const keys = Object.keys(object);
    const sortedKeys = _.sortBy(keys);

    return _.fromPairs(_.map(sortedKeys, (key) => [key, object[key]]));
  };

  const changeAlias = (alias: string) => {
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

  const changeAliasWithOutWhiteSpaces = (alias: string) => {
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

  const getSHA1 = (str: string) => {
    return crypto.createHash("sha1").update(str).digest("hex");
  };

  const toNumber = (str: any, defaultVal = 0) => {
    let num = Number(str);
    if (Number.isNaN(num)) num = defaultVal;
    return num;
  };

  const replaceAll = (str: string, find: string, replace: string): string => {
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
