"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(user) {
    const jwtsecreat = process.env.SECRET_KEY || "default_secret_key";
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, jwtsecreat, { expiresIn: "10h" });
    return token;
}
exports.generateToken = generateToken;
