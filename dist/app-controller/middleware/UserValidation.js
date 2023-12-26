"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDriver = exports.unLockUser = exports.inactiveUser = exports.toggleActivateUser = void 0;
const express_validator_1 = require("express-validator");
const MessageErrors_1 = __importDefault(require("../../app-common/MessageErrors"));
const lodash_1 = __importDefault(require("lodash"));
exports.toggleActivateUser = [
    (0, express_validator_1.check)("_id")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isArray()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        min: 1,
    })
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .custom((value) => {
        value.forEach((item) => {
            if (!lodash_1.default.isString(item) || item === "") {
                throw new Error(MessageErrors_1.default.field.string.invalid);
            }
        });
        return true;
    }),
    (0, express_validator_1.check)("status")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isInt({ min: 0, max: 1 })
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.inactiveUser = [
    (0, express_validator_1.body)("_id")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .custom((_id) => {
        if (_id.length !== 24) {
            return false;
        }
        return true;
    }),
    (0, express_validator_1.body)("lockReason")
        .exists({ checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid),
];
exports.unLockUser = [
    (0, express_validator_1.body)("_id")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isString()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .custom((_id) => {
        if (_id.length !== 24) {
            return false;
        }
        return true;
    }),
];
exports.registerDriver = [
    (0, express_validator_1.body)("images")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(MessageErrors_1.default.field.string.empty)
        .isArray()
        .withMessage(MessageErrors_1.default.field.string.invalid)
        .isLength({
        min: 3,
    })
        .withMessage(MessageErrors_1.default.field.string.invalid),
    (0, express_validator_1.body)("idCard")
        .custom((idCard) => {
        if (idCard) {
            if (isNaN(Number(idCard))) {
                return false;
            }
            else {
                if (idCard.length == 9 || idCard.length == 12) {
                    return true;
                }
                else
                    return false;
            }
        }
        return true;
    })
        .withMessage(MessageErrors_1.default.registerDriver.idCard),
];
