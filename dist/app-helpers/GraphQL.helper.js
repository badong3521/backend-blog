"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLHelper = void 0;
const lodash_1 = __importDefault(require("lodash"));
const createSchema = (listTypeDef, { query, mutation, }) => {
    let resolvers = {};
    const typeDefs = [query, mutation];
    listTypeDef.forEach((element) => {
        resolvers = lodash_1.default.merge(resolvers, element.resolvers);
        typeDefs.push(element.typeDef);
    });
    return {
        resolvers,
        typeDefs,
    };
};
exports.GraphQLHelper = {
    createSchema,
};
