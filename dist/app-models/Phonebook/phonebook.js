"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHONEBOOK_COLLECTION_NAME = void 0;
const phonebookConstant_1 = require("../../app-common/constant/phonebookConstant");
const mongoose_1 = require("mongoose");
const user_1 = require("../Users/user");
exports.PHONEBOOK_COLLECTION_NAME = "phonebook";
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    location: {
        type: {
            type: phonebookConstant_1.PhoneBookLocationType,
            required: true,
            default: phonebookConstant_1.PhoneBookLocationType.ADDRESS,
        },
        boxId: { type: mongoose_1.Types.ObjectId, required: false },
        address: { type: String, required: false },
        coordinates: { type: [Number], required: false },
    },
    note: {
        type: String,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: user_1.USER_COLLECTION_NAME,
        required: true,
    },
    email: {
        type: String,
        required: false,
        default: "",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    isPayAfter: {
        type: Boolean,
        require: false,
        default: false,
    },
});
exports.default = (0, mongoose_1.model)(exports.PHONEBOOK_COLLECTION_NAME, schema);
