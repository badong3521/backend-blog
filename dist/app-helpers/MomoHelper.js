"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt_token = exports.encrypt_token = void 0;
const crypto = require("crypto");
const secretKey = "um76xDBeRmmj5kVMhXiCeFKixZTTlmZb";
const iv = new Buffer(16); // 16 byte buffer with random data
iv.fill(0); // fill with zeros
function encrypt_token(data) {
    const encipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv), buffer = Buffer.concat([encipher.update(data), encipher.final()]);
    return buffer.toString("base64");
}
exports.encrypt_token = encrypt_token;
function decrypt_token(data) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv), buffer = Buffer.concat([
        decipher.update(Buffer.from(data, "base64")),
        decipher.final(),
    ]);
    return buffer.toString();
}
exports.decrypt_token = decrypt_token;
