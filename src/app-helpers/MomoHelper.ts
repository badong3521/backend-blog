import crypto = require("crypto");
const secretKey = "um76xDBeRmmj5kVMhXiCeFKixZTTlmZb";
const iv = new Buffer(16); // 16 byte buffer with random data
iv.fill(0); // fill with zeros

export function encrypt_token(data: crypto.BinaryLike) {
  const encipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv),
    buffer = Buffer.concat([encipher.update(data), encipher.final()]);
  return buffer.toString("base64");
}

export function decrypt_token(
  data:
    | WithImplicitCoercion<string>
    | { [Symbol.toPrimitive](hint: "string"): string }
) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv),
    buffer = Buffer.concat([
      decipher.update(Buffer.from(data, "base64")),
      decipher.final(),
    ]);
  return buffer.toString();
}
