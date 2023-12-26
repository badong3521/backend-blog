"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthRoute_1 = __importDefault(require("./AuthRoute"));
//Type Application ERROR TO EXPRESS
function appRoutes(app) {
    //Config WebAdmin ROUTE HERE
    app.use(AuthRoute_1.default);
    // app.use(`/admin/${Route}`);
}
exports.default = appRoutes;
