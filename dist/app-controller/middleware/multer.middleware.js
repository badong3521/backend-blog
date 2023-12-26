"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
function checkFileType(_, file, callback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(file.mimetype);
    if (extname) {
        return callback(null, true);
    }
    else {
        callback("IMAGE_ONLY");
    }
}
const MAX_NUMBER_FILE = 4;
const MAX_FILE_SIZE = 4194304;
function default_1(req, res, next) {
    const upload = (0, multer_1.default)({
        storage: multer_1.default.memoryStorage(),
        limits: { fileSize: MAX_FILE_SIZE },
        fileFilter: checkFileType,
    }).array("files", MAX_NUMBER_FILE);
    upload(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                return res.badRequest({
                    message: "Too many files",
                });
            }
            else if (err.code === "LIMIT_FILE_SIZE") {
                return res.badRequest({
                    message: "File to large, max size 4MB",
                });
            }
            // else if (err.code === "IMAGE_ONLY") {
            //   return res.badRequest({
            //     message: "Only accept image, format jpeg|jpg|png|gif",
            //   });
            // }
            return res.badRequest({
                message: "Upload file error",
            });
        }
        else if (err) {
            return res.internal({
                message: "Server error",
            });
        }
        //console.log("req.files", req);
        // if (!req.files) {
        //   return res.badRequest({
        //     message: "Field files is required",
        //   });
        // }
        next();
    });
}
exports.default = default_1;
