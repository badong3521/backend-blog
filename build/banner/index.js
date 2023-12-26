"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function Banner() {
    const dataPath = path_1.default.join(__dirname, "banner.txt");
    fs_1.default.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
}
exports.default = Banner;
//# sourceMappingURL=index.js.map