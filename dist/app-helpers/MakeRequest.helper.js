"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeRequestHelper = void 0;
const axios_1 = __importDefault(require("axios"));
const MakeRequestHelper = () => {
    const request = (request) => {
        let configOption;
        return new Promise((resolve, reject) => {
            try {
                const injectHeaders = {};
                const headers = request.headers || {};
                configOption = {
                    url: request.url,
                    method: request.method,
                    validateStatus: () => true,
                    headers: Object.assign(Object.assign({}, injectHeaders), headers),
                    params: request.params,
                    data: request.data,
                    auth: request.auth,
                };
                if (request.timeout) {
                    configOption.timeout = request.timeout;
                }
                if (request.query) {
                    configOption.params = request.query;
                }
                (0, axios_1.default)(configOption).then(function (response) {
                    if (!(response.status >= 200 && response.status < 300)) {
                        throw new Error(`${request.method} ${request.url} status: ${response.status}`);
                    }
                    return resolve(response.data);
                });
            }
            catch (err) {
                return reject(err);
            }
        });
    };
    return {
        request,
    };
};
exports.MakeRequestHelper = MakeRequestHelper;
