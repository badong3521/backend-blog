"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLE_STATUS = exports.USER_ROLE_COLLECTION_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.USER_ROLE_COLLECTION_NAME = "userroles";
var USER_ROLE_STATUS;
(function (USER_ROLE_STATUS) {
    USER_ROLE_STATUS[USER_ROLE_STATUS["ACTIVE"] = 1] = "ACTIVE";
    USER_ROLE_STATUS[USER_ROLE_STATUS["INACTIVE"] = 2] = "INACTIVE";
})(USER_ROLE_STATUS = exports.USER_ROLE_STATUS || (exports.USER_ROLE_STATUS = {}));
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: false,
    },
    description: {
        type: String,
    },
    status: {
        type: Number,
        default: USER_ROLE_STATUS.ACTIVE,
    },
    createdBy: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)(exports.USER_ROLE_COLLECTION_NAME, schema);
