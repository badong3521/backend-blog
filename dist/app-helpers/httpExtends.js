"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationRequest = void 0;
const express_validator_1 = require("express-validator");
const errorFormatter = (error) => {
    return error;
};
function validationRequest(req) {
    const errors = (0, express_validator_1.validationResult)(req);
    return errors;
}
exports.validationRequest = validationRequest;
