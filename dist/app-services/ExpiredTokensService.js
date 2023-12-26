"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredTokensService = void 0;
// import { parseJwt } from '../app-helpers/Token.helper';
const expired_tokens_1 = __importDefault(require("../app-models/Users/expired-tokens"));
// import _user from "@app-repositories/models/user";
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
let ExpiredTokensService = class ExpiredTokensService {
    create(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { currentTime } = parseJwt(token);
            // const startTime = new Date(currentTime);
            // const tokenLimitTime = 60 * 24 * 60 * 60;
            // const endTime = new Date();
            // const expiredAfterSeconds = tokenLimitTime - (endTime.getTime() - startTime.getTime());
            const data = yield expired_tokens_1.default.create({
                token,
                user: new mongoose_1.Types.ObjectId(userId),
            });
            return data;
        });
    }
    get(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield expired_tokens_1.default.findOne({
                token,
            });
            return data;
        });
    }
};
ExpiredTokensService = __decorate([
    (0, inversify_1.injectable)()
], ExpiredTokensService);
exports.ExpiredTokensService = ExpiredTokensService;
