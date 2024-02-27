"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const graphql_1 = require("graphql");
const check_auth = (context) => {
    const authHeader = context.req.headers.authorization;
    const jwtsecreat = process.env.SECRET_KEY || "default_secret_key";
    if (authHeader) {
        const token = authHeader.split("Bearer ")[1];
        if (token) {
            try {
                const user = jsonwebtoken_1.default.verify(token, jwtsecreat);
                return user;
            }
            catch (error) {
                throw new graphql_1.GraphQLError("Invalid/Expired Token");
            }
        }
        throw new graphql_1.GraphQLError("Authencation Token must Be 'Bearer [Token] ");
    }
    throw new graphql_1.GraphQLError("Authorization Header must Be Provided ");
};
exports.check_auth = check_auth;
