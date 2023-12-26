"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const _app_configs_1 = require("../../app-configs");
const httpAuthorize = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.unauthorize();
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, _app_configs_1.RANDOM_TOKEN_SECRET);
        const { userId } = decodedToken;
        req.auth = {
            userId,
        };
        if (req.body.userId && req.body.userId !== userId) {
            return res.unauthorize();
        }
        else {
            next();
        }
    }
    catch (error) {
        return res.unauthorize();
    }
};
exports.default = httpAuthorize;
